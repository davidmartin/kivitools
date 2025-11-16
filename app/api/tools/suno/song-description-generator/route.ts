import { NextRequest, NextResponse } from "next/server";
import { generateSongDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface SongDescriptionRequest {
    theme: string;
    genre: string;
    mood: string;
    platform: string;
    language: string;
    turnstileToken: string;
}

interface SongDescriptionResponse {
    success: boolean;
    descriptions?: string[];
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: SongDescriptionRequest = await request.json();
        const { theme, genre, mood, platform, language, turnstileToken } =
            body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as SongDescriptionResponse,
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
                } as SongDescriptionResponse,
                { status: 403 }
            );
        }

        // Validación básica
        if (!theme || theme.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Theme is required",
                } as SongDescriptionResponse,
                { status: 400 }
            );
        }

        if (theme.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Theme is too long (max 500 characters)",
                } as SongDescriptionResponse,
                { status: 400 }
            );
        }

        // Generate descriptions with DeepSeek
        const descriptions = await generateSongDescription({
            theme: theme.trim(),
            genre: genre || "pop",
            mood: mood || "uplifting",
            platform: platform || "spotify",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "song-description-generator",
            requestData: body,
            responseData: { descriptions },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            descriptions,
        } as SongDescriptionResponse);
    } catch (error) {
        console.error("Song description generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate descriptions. Please try again.",
            } as SongDescriptionResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Song Description Generator",
    });
}
