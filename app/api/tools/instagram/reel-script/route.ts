import { NextRequest, NextResponse } from "next/server";
import { generateReelScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { ReelScriptRequest, ReelScriptResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: ReelScriptRequest = await request.json();
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


        // Validación
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json<ReelScriptResponse>(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json<ReelScriptResponse>(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generar script con DeepSeek
        const script = await generateReelScript({
            topic: topic.trim(),
            tone,
            duration,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "instagram",
            tool: "reel-script",
            requestData: body,
            responseData: { script },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json<ReelScriptResponse>({
            success: true,
            script,
        });
    } catch (error) {
        console.error("Reel script generation error:", error);
        return NextResponse.json<ReelScriptResponse>(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate script",
            },
            { status: 500 }
        );
    }
}
