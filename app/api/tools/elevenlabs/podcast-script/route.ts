import { NextRequest, NextResponse } from "next/server";
import { generatePodcastScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, format, duration, segments, tone, language, turnstileToken } = body;

        // 1. Verify Turnstile token
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

        // 2. Validate inputs
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        // 3. Generate podcast script with DeepSeek
        const script = await generatePodcastScript({
            topic: topic.trim(),
            format: format || "monologue",
            duration: duration || "30min",
            segments: segments || "3",
            tone: tone || "professional",
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "elevenlabs",
            tool: "podcast-script",
            requestData: body,
            responseData: { script },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            script,
        });
    } catch (error) {
        console.error("Podcast script generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate podcast script. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "ElevenLabs Podcast Script Generator"
    });
}
