import { Client, Databases, ID, Query } from "node-appwrite";
import crypto from "crypto";

// Appwrite Configuration
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

// Database and Collection IDs
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const API_TOKENS_COLLECTION = "api_tokens";
const API_USAGE_COLLECTION = "api_usage";

// Constants
export const DEFAULT_DAILY_LIMIT = 20;

// Types
export interface ApiToken {
    $id: string;
    userId: string;
    token: string;
    name: string | null;
    createdAt: string;
    lastUsedAt: string | null;
    isActive: boolean;
}

export interface ApiUsage {
    $id: string;
    userId: string;
    date: string;
    requestCount: number;
    dailyLimit: number;
    lastRequestAt: string | null;
    renewedAt: string | null;
}

/**
 * Generate a secure API token
 */
export function generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

/**
 * Hash a token for storage (we store hashed tokens for security)
 */
export function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Create a new API token for a user
 */
export async function createApiToken(userId: string, name?: string): Promise<{ token: string; tokenData: ApiToken }> {
    const plainToken = generateToken();
    const hashedToken = hashToken(plainToken);

    const doc = await databases.createDocument(
        DATABASE_ID,
        API_TOKENS_COLLECTION,
        ID.unique(),
        {
            userId,
            token: hashedToken,
            name: name || null,
            createdAt: new Date().toISOString(),
            lastUsedAt: null,
            isActive: true
        }
    );

    // Return the plain token (only shown once) and the stored data
    return {
        token: plainToken,
        tokenData: doc as unknown as ApiToken
    };
}

/**
 * Get all tokens for a user (without the actual token values)
 */
export async function getUserTokens(userId: string): Promise<ApiToken[]> {
    const result = await databases.listDocuments(
        DATABASE_ID,
        API_TOKENS_COLLECTION,
        [
            Query.equal("userId", userId),
            Query.orderDesc("createdAt")
        ]
    );

    return result.documents as unknown as ApiToken[];
}

/**
 * Validate an API token and return the user ID
 */
export async function validateToken(plainToken: string): Promise<{ valid: boolean; userId?: string; tokenId?: string }> {
    const hashedToken = hashToken(plainToken);

    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            [
                Query.equal("token", hashedToken),
                Query.equal("isActive", true)
            ]
        );

        if (result.documents.length === 0) {
            return { valid: false };
        }

        const tokenDoc = result.documents[0] as unknown as ApiToken;

        // Update last used timestamp
        await databases.updateDocument(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            tokenDoc.$id,
            { lastUsedAt: new Date().toISOString() }
        );

        return {
            valid: true,
            userId: tokenDoc.userId,
            tokenId: tokenDoc.$id
        };
    } catch (error) {
        console.error("Token validation error:", error);
        return { valid: false };
    }
}

/**
 * Revoke (deactivate) an API token
 */
export async function revokeToken(tokenId: string, userId: string): Promise<boolean> {
    try {
        // Verify ownership
        const doc = await databases.getDocument(DATABASE_ID, API_TOKENS_COLLECTION, tokenId);
        if (doc.userId !== userId) {
            return false;
        }

        await databases.updateDocument(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            tokenId,
            { isActive: false }
        );

        return true;
    } catch (error) {
        console.error("Token revocation error:", error);
        return false;
    }
}

/**
 * Delete an API token
 */
export async function deleteToken(tokenId: string, userId: string): Promise<boolean> {
    try {
        // Verify ownership
        const doc = await databases.getDocument(DATABASE_ID, API_TOKENS_COLLECTION, tokenId);
        if (doc.userId !== userId) {
            return false;
        }

        await databases.deleteDocument(DATABASE_ID, API_TOKENS_COLLECTION, tokenId);
        return true;
    } catch (error) {
        console.error("Token deletion error:", error);
        return false;
    }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
    return new Date().toISOString().split("T")[0];
}

/**
 * Get or create usage record for a user for today
 */
export async function getOrCreateDailyUsage(userId: string): Promise<ApiUsage> {
    const today = getTodayDate();

    try {
        // Try to find existing record
        const result = await databases.listDocuments(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            [
                Query.equal("userId", userId),
                Query.equal("date", today)
            ]
        );

        if (result.documents.length > 0) {
            return result.documents[0] as unknown as ApiUsage;
        }

        // Create new record for today
        const doc = await databases.createDocument(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            ID.unique(),
            {
                userId,
                date: today,
                requestCount: 0,
                dailyLimit: DEFAULT_DAILY_LIMIT,
                lastRequestAt: null,
                renewedAt: new Date().toISOString()
            }
        );

        return doc as unknown as ApiUsage;
    } catch (error) {
        console.error("Error getting/creating usage:", error);
        throw error;
    }
}

/**
 * Check if user has remaining requests and increment if yes
 */
export async function checkAndIncrementUsage(userId: string): Promise<{
    allowed: boolean;
    remaining: number;
    used: number;
    limit: number;
}> {
    const usage = await getOrCreateDailyUsage(userId);

    if (usage.requestCount >= usage.dailyLimit) {
        return {
            allowed: false,
            remaining: 0,
            used: usage.requestCount,
            limit: usage.dailyLimit
        };
    }

    // Increment usage
    const newCount = usage.requestCount + 1;
    await databases.updateDocument(
        DATABASE_ID,
        API_USAGE_COLLECTION,
        usage.$id,
        {
            requestCount: newCount,
            lastRequestAt: new Date().toISOString()
        }
    );

    return {
        allowed: true,
        remaining: usage.dailyLimit - newCount,
        used: newCount,
        limit: usage.dailyLimit
    };
}

/**
 * Renew user's daily limit (called when user visits dashboard)
 */
export async function renewDailyLimit(userId: string): Promise<ApiUsage> {
    const usage = await getOrCreateDailyUsage(userId);

    // Reset count to 0
    const doc = await databases.updateDocument(
        DATABASE_ID,
        API_USAGE_COLLECTION,
        usage.$id,
        {
            requestCount: 0,
            renewedAt: new Date().toISOString()
        }
    );

    return doc as unknown as ApiUsage;
}

/**
 * Get user's current usage stats
 */
export async function getUserUsageStats(userId: string): Promise<{
    used: number;
    remaining: number;
    limit: number;
    canRenew: boolean;
    renewedAt: string | null;
}> {
    const usage = await getOrCreateDailyUsage(userId);
    const remaining = Math.max(0, usage.dailyLimit - usage.requestCount);

    return {
        used: usage.requestCount,
        remaining,
        limit: usage.dailyLimit,
        canRenew: remaining === 0, // Only show renew button when exhausted
        renewedAt: usage.renewedAt
    };
}
