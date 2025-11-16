import { NextRequest, NextResponse } from "next/server";
import { generateInstagramCaption } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { CaptionGeneratorRequest, CaptionGeneratorResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: CaptionGeneratorRequest = await request.json();
        const { topic, tone, includeEmojis, includeHashtags, language, turnstileToken } = body;
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
            return NextResponse.json<CaptionGeneratorResponse>(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json<CaptionGeneratorResponse>(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generar caption con DeepSeek
        const caption = await generateInstagramCaption({
            topic: topic.trim(),
            tone,
            includeEmojis,
            includeHashtags,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "instagram",
            tool: "caption-generator",
            requestData: body,
            responseData: { caption },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json<CaptionGeneratorResponse>({
            success: true,
            caption,
        });
    } catch (error) {
        console.error("Caption generation error:", error);
        return NextResponse.json<CaptionGeneratorResponse>(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate caption",
            },
            { status: 500 }
        );
    }
}
