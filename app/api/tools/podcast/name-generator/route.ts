import { NextRequest, NextResponse } from "next/server";
import { generatePodcastNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, style, keywords, turnstileToken } = body;

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

        // 3. Generate names with DeepSeek
        const names = await generatePodcastNames({
            topic: topic.trim(),
            style: style || "creative",
            keywords: keywords?.trim() || undefined,
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "podcast",
            tool: "name-generator",
            requestData: body,
            responseData: { names },
            userIp: getUserIpFromRequest(request),
            language: "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            names,
        });
    } catch (error) {
        console.error("Podcast name generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate podcast names. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Podcast Name Generator"
    });
}
