import { NextRequest, NextResponse } from "next/server";
import { generateTikTokThumbnailText } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { videoTopic, style, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification failed",
                },
                { status: 403 }
            );
        }

        // Validation
        if (!videoTopic || videoTopic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Video topic is required",
                },
                { status: 400 }
            );
        }

        // Generate thumbnail text with DeepSeek
        const thumbnailTexts = await generateTikTokThumbnailText({
            videoTopic: videoTopic.trim(),
            style: style || "clickbait",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "thumbnail-text-generator",
            requestData: body,
            responseData: { thumbnailTexts },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            thumbnailTexts,
        });
    } catch (error) {
        console.error("Thumbnail text generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate thumbnail text. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Thumbnail Text Generator" });
}
