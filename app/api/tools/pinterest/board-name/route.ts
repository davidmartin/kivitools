import { NextRequest, NextResponse } from "next/server";
import { generatePinterestBoardNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { theme, style, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                { success: false, error: "Bot verification required" },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Bot verification failed" },
                { status: 403 }
            );
        }

        // Validation
        if (!theme || theme.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Theme is required" },
                { status: 400 }
            );
        }

        if (theme.length > 200) {
            return NextResponse.json(
                { success: false, error: "Theme is too long (max 200 characters)" },
                { status: 400 }
            );
        }

        // Generate board names with DeepSeek
        const names = await generatePinterestBoardNames({
            theme: theme.trim(),
            style: style || "creative",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "pinterest",
            tool: "board-name",
            requestData: body,
            responseData: { names },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            names,
        });
    } catch (error) {
        console.error("Pinterest board name generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate board names",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Pinterest Board Name Generator",
    });
}
