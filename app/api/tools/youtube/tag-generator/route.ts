import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeTags } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, language, turnstileToken } = body;

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
                    error: "Video topic is required",
                },
                { status: 400 }
            );
        }

        // Generate tags with DeepSeek
        const tags = await generateYouTubeTags({
            topic: topic.trim(),
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "youtube",
            tool: "tag-generator",
            requestData: body,
            responseData: { tags },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            tags,
        });
    } catch (error) {
        console.error("YouTube tag generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate tags. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "YouTube Tag Generator" });
}
