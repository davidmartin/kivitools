import { NextRequest, NextResponse } from "next/server";
import { generateMusicPrompt } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface MusicPromptRequest {
    style: string;
    instruments: string;
    bpm: string;
    mood: string;
    language: string;
    turnstileToken: string;
}

interface MusicPromptResponse {
    success: boolean;
    prompt?: string;
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: MusicPromptRequest = await request.json();
        const { style, instruments, bpm, mood, language, turnstileToken } =
            body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as MusicPromptResponse,
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
                } as MusicPromptResponse,
                { status: 403 }
            );
        }

        // Validación básica
        if (!style || style.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Style is required",
                } as MusicPromptResponse,
                { status: 400 }
            );
        }

        if (style.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Style is too long (max 500 characters)",
                } as MusicPromptResponse,
                { status: 400 }
            );
        }

        // Generate music prompt with DeepSeek
        const prompt = await generateMusicPrompt({
            style: style.trim(),
            instruments: instruments || "acoustic guitar",
            bpm: bpm || "120",
            mood: mood || "uplifting",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "music-prompt-generator",
            requestData: body,
            responseData: { prompt },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            prompt,
        } as MusicPromptResponse);
    } catch (error) {
        console.error("Music prompt generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate prompt. Please try again.",
            } as MusicPromptResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Music Prompt Generator",
    });
}
