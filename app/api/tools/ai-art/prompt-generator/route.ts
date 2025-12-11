import { NextRequest, NextResponse } from "next/server";
import { generateAiArtPrompt } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { subject, style, mood, platform, language, turnstileToken } = body;

        // Verify Turnstile
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

        if (!subject?.trim()) {
            return NextResponse.json(
                { success: false, error: "Subject is required" },
                { status: 400 }
            );
        }

        const result = await generateAiArtPrompt({
            subject: subject.trim(),
            style: style || "photorealistic",
            mood: mood || "dramatic",
            platform: platform || "midjourney",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "ai-art",
            tool: "prompt-generator",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("AI Art prompt generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate prompts" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "AI Art Prompt Generator" });
}
