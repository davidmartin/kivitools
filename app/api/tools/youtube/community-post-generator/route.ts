import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeCommunityPost } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, type, tone, language, turnstileToken } = body;

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

        // Generate post with DeepSeek
        const post = await generateYouTubeCommunityPost({
            topic: topic.trim(),
            type: type || "Update",
            tone: tone || "engaging",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "youtube",
            tool: "community-post-generator",
            requestData: body,
            responseData: { post },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            post,
        });
    } catch (error) {
        console.error("YouTube community post generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate post. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "YouTube Community Post Generator" });
}
