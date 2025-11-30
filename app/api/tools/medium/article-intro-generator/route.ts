import { NextRequest, NextResponse } from "next/server";
import { generateMediumArticleIntros } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, keyPoints, tone, language, turnstileToken } = body;

        // Verify Turnstile token first
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

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        const intro = await generateMediumArticleIntros({
            topic: topic.trim(),
            keyPoints: keyPoints?.trim() || undefined,
            tone: tone || "professional",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "medium",
            tool: "article-intro-generator",
            requestData: body,
            responseData: { intro },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            intro,
        });
    } catch (error) {
        console.error("Medium intro generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate intro. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Medium Article Intro Generator" });
}
