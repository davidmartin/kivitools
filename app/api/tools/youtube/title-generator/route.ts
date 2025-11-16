import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeTitles } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { YouTubeTitleRequest, YouTubeTitleResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: YouTubeTitleRequest = await request.json();
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


        // Validate required fields
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as YouTubeTitleResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as YouTubeTitleResponse,
                { status: 400 }
            );
        }

        // Generate titles using DeepSeek
        const titles = await generateYouTubeTitles(topic, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "youtube",
            tool: "title-generator",
            requestData: body,
            responseData: { titles },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            titles,
        } as YouTubeTitleResponse);
    } catch (error) {
        console.error("YouTube title generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate titles",
            } as YouTubeTitleResponse,
            { status: 500 }
        );
    }
}
