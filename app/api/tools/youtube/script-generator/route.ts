import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { YouTubeScriptRequest, YouTubeScriptResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: YouTubeScriptRequest = await request.json();
        const { topic, tone, duration, language, turnstileToken } = body;
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
                } as YouTubeScriptResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as YouTubeScriptResponse,
                { status: 400 }
            );
        }

        // Generate script using DeepSeek
        const script = await generateYouTubeScript(topic, tone, duration, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "youtube",
            tool: "script-generator",
            requestData: body,
            responseData: { script },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            script,
        } as YouTubeScriptResponse);
    } catch (error) {
        console.error("YouTube script generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate script",
            } as YouTubeScriptResponse,
            { status: 500 }
        );
    }
}
