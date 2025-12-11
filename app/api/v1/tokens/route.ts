import { NextRequest, NextResponse } from "next/server";
import {
    createApiToken,
    getUserTokens,
    deleteToken,
    revokeToken,
    getUserUsageStats,
    renewDailyLimit
} from "@/lib/api-tokens";
import { Client, Account } from "node-appwrite";

// Initialize Appwrite client for user verification
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "");

/**
 * Verify the user's session from the request
 */
async function verifySession(request: NextRequest): Promise<string | null> {
    const sessionCookie = request.cookies.get("a_session_" + process.env.APPWRITE_PROJECT_ID)?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const userClient = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_PROJECT_ID || "")
            .setSession(sessionCookie);

        const account = new Account(userClient);
        const user = await account.get();
        return user.$id;
    } catch (error) {
        console.error("Session verification failed:", error);
        return null;
    }
}

/**
 * GET /api/v1/tokens - Get user's tokens and usage stats
 */
export async function GET(request: NextRequest) {
    const userId = await verifySession(request);

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "Unauthorized. Please login." },
            { status: 401 }
        );
    }

    try {
        const [tokens, usage] = await Promise.all([
            getUserTokens(userId),
            getUserUsageStats(userId)
        ]);

        // Return tokens without the actual token hash (for security)
        const safeTokens = tokens.map(t => ({
            id: t.$id,
            name: t.name,
            createdAt: t.createdAt,
            lastUsedAt: t.lastUsedAt,
            isActive: t.isActive,
            // Show only last 8 chars of token hash for identification
            tokenPreview: `...${t.token.slice(-8)}`
        }));

        return NextResponse.json({
            success: true,
            tokens: safeTokens,
            usage: {
                used: usage.used,
                remaining: usage.remaining,
                limit: usage.limit,
                canRenew: usage.canRenew
            }
        });
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch tokens" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/v1/tokens - Create a new API token
 */
export async function POST(request: NextRequest) {
    const userId = await verifySession(request);

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "Unauthorized. Please login." },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const { name } = body;

        // Check if user already has tokens (limit to 5 active tokens)
        const existingTokens = await getUserTokens(userId);
        const activeTokens = existingTokens.filter(t => t.isActive);

        if (activeTokens.length >= 5) {
            return NextResponse.json(
                { success: false, error: "Maximum 5 active tokens allowed. Please revoke an existing token." },
                { status: 400 }
            );
        }

        const { token, tokenData } = await createApiToken(userId, name);

        return NextResponse.json({
            success: true,
            // IMPORTANT: This is the only time the plain token is shown!
            token: token,
            message: "Token created successfully. Copy it now - it won't be shown again!",
            tokenInfo: {
                id: tokenData.$id,
                name: tokenData.name,
                createdAt: tokenData.createdAt
            }
        });
    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create token" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/v1/tokens - Delete a token
 */
export async function DELETE(request: NextRequest) {
    const userId = await verifySession(request);

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "Unauthorized. Please login." },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const tokenId = searchParams.get("tokenId");

        if (!tokenId) {
            return NextResponse.json(
                { success: false, error: "Token ID required" },
                { status: 400 }
            );
        }

        const deleted = await deleteToken(tokenId, userId);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: "Token not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Token deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting token:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete token" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/v1/tokens - Renew daily limit OR revoke token
 */
export async function PATCH(request: NextRequest) {
    const userId = await verifySession(request);

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "Unauthorized. Please login." },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const { action, tokenId } = body;

        if (action === "renew") {
            // Renew daily limit
            const usage = await renewDailyLimit(userId);
            const stats = await getUserUsageStats(userId);

            return NextResponse.json({
                success: true,
                message: "Daily limit renewed! You now have 20 requests available.",
                usage: {
                    used: stats.used,
                    remaining: stats.remaining,
                    limit: stats.limit,
                    canRenew: stats.canRenew
                }
            });
        } else if (action === "revoke" && tokenId) {
            // Revoke a token
            const revoked = await revokeToken(tokenId, userId);

            if (!revoked) {
                return NextResponse.json(
                    { success: false, error: "Token not found or unauthorized" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                message: "Token revoked successfully"
            });
        }

        return NextResponse.json(
            { success: false, error: "Invalid action" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error in PATCH:", error);
        return NextResponse.json(
            { success: false, error: "Operation failed" },
            { status: 500 }
        );
    }
}
