import { NextRequest, NextResponse } from "next/server";
import { generateNegativePrompt } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { style, platform, language, turnstileToken } = body;

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

        if (!style?.trim()) {
            return NextResponse.json(
                { success: false, error: "Style is required" },
                { status: 400 }
            );
        }

        const result = await generateNegativePrompt({
            style: style.trim(),
            platform: platform || "stable-diffusion",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "ai-art",
            tool: "negative-prompt",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Negative prompt error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate negative prompt" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Negative Prompt Generator" });
}
