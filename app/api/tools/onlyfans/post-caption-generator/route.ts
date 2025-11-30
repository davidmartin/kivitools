import { NextRequest, NextResponse } from "next/server";
import { generateOnlyFansPostCaptions } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { contentType, mood, language, turnstileToken } = body;

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

        if (!contentType || contentType.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Content type is required" },
                { status: 400 }
            );
        }

        if (contentType.length > 300) {
            return NextResponse.json(
                { success: false, error: "Content type is too long (max 300 characters)" },
                { status: 400 }
            );
        }

        const captions = await generateOnlyFansPostCaptions({
            contentType: contentType.trim(),
            mood: mood?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "onlyfans",
            tool: "post-caption-generator",
            requestData: body,
            responseData: { captions },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            captions,
        });
    } catch (error) {
        console.error("OnlyFans caption generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate captions. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "OnlyFans Post Caption Generator" });
}
