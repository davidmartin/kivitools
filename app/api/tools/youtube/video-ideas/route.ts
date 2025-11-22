import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeVideoIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, targetAudience, language, turnstileToken } = body;

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
        if (!niche || niche.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Niche is required",
                },
                { status: 400 }
            );
        }

        // Generate video ideas with DeepSeek
        const ideas = await generateYouTubeVideoIdeas({
            niche: niche.trim(),
            targetAudience: targetAudience?.trim() || "General Audience",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "youtube",
            tool: "video-ideas",
            requestData: body,
            responseData: { ideas },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            ideas,
        });
    } catch (error) {
        console.error("YouTube video ideas generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate video ideas. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "YouTube Video Ideas Generator" });
}
