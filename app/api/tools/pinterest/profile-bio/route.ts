import { NextRequest, NextResponse } from "next/server";
import { generatePinterestProfileBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { businessType, personality, language, turnstileToken } = body;

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
        if (!businessType || businessType.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Business type is required" },
                { status: 400 }
            );
        }

        if (businessType.length > 100) {
            return NextResponse.json(
                { success: false, error: "Business type is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        // Generate profile bio with DeepSeek
        const bio = await generatePinterestProfileBio({
            businessType: businessType.trim(),
            personality: personality || "professional",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "pinterest",
            tool: "profile-bio",
            requestData: body,
            responseData: { bio },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            bio,
        });
    } catch (error) {
        console.error("Pinterest profile bio generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate bio",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Pinterest Profile Bio Generator",
    });
}
