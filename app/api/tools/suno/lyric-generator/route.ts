import { NextRequest, NextResponse } from "next/server";
import { generateSunoLyrics } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface LyricGeneratorRequest {
    theme: string;
    genre: string;
    mood: string;
    language: string;
    turnstileToken: string;
}

interface LyricGeneratorResponse {
    success: boolean;
    lyrics?: string;
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: LyricGeneratorRequest = await request.json();
        const { theme, genre, mood, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as LyricGeneratorResponse,
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
                } as LyricGeneratorResponse,
                { status: 403 }
            );
        }

        // Validación básica
        if (!theme || theme.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Theme is required",
                } as LyricGeneratorResponse,
                { status: 400 }
            );
        }

        if (theme.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Theme is too long (max 500 characters)",
                } as LyricGeneratorResponse,
                { status: 400 }
            );
        }

        // Generate lyrics with DeepSeek
        const lyrics = await generateSunoLyrics({
            theme: theme.trim(),
            genre: genre || "pop",
            mood: mood || "uplifting",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "lyric-generator",
            requestData: body,
            responseData: { lyrics },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            lyrics,
        } as LyricGeneratorResponse);
    } catch (error) {
        console.error("Lyric generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate lyrics. Please try again.",
            } as LyricGeneratorResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Lyric Generator",
    });
}
