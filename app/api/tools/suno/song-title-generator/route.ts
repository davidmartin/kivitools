import { NextRequest, NextResponse } from "next/server";
import { generateSunoSongTitles } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface SongTitleRequest {
    description: string;
    genre: string;
    mood: string;
    language: string;
    turnstileToken: string;
}

interface SongTitleResponse {
    success: boolean;
    titles?: string[];
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: SongTitleRequest = await request.json();
        const { description, genre, mood, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as SongTitleResponse,
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
                } as SongTitleResponse,
                { status: 403 }
            );
        }

        // Validate inputs
        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Song description is required",
                } as SongTitleResponse,
                { status: 400 }
            );
        }

        if (description.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is too long (max 500 characters)",
                } as SongTitleResponse,
                { status: 400 }
            );
        }

        // Generate titles with DeepSeek
        const titles = await generateSunoSongTitles({
            description: description.trim(),
            genre: genre || "pop",
            mood: mood || "uplifting",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "song-title-generator",
            requestData: body,
            responseData: { titles },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            titles,
        } as SongTitleResponse);
    } catch (error) {
        console.error("Song title generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate song titles. Please try again.",
            } as SongTitleResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Song Title Generator",
    });
}
