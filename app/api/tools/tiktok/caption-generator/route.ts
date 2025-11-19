import { NextRequest, NextResponse } from "next/server";
import { generateTikTokCaption } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, tone, language, turnstileToken } = body;

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
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is too long (max 500 characters)",
                },
                { status: 400 }
            );
        }

        // Generate caption with DeepSeek
        const caption = await generateTikTokCaption({
            topic: topic.trim(),
            tone: tone || "friendly",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "caption-generator",
            requestData: body,
            responseData: { caption },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            caption,
        });
    } catch (error) {
        console.error("Caption generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate caption. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Caption Generator" });
}
