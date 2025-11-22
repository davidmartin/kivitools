import { NextRequest, NextResponse } from "next/server";
import { generateInstagramStoryIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, goal, mood, language, turnstileToken } = body;

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

        // Generate story ideas with DeepSeek
        const ideas = await generateInstagramStoryIdeas({
            niche: niche.trim(),
            goal: goal || "Engagement",
            mood: mood || "Fun",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "instagram",
            tool: "story-ideas",
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
        console.error("Instagram story ideas generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate story ideas. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Instagram Story Ideas" });
}
