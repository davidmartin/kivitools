import { NextRequest, NextResponse } from "next/server";
import { generateSunoSongTags } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface SongTagRequest {
    description: string;
    genre: string;
    mood: string;
    language: string;
    turnstileToken: string;
}

interface SongTagResponse {
    success: boolean;
    tags?: string[];
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: SongTagRequest = await request.json();
        const { description, genre, mood, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as SongTagResponse,
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
                } as SongTagResponse,
                { status: 403 }
            );
        }

        // Validate inputs
        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Song description is required",
                } as SongTagResponse,
                { status: 400 }
            );
        }

        if (description.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is too long (max 500 characters)",
                } as SongTagResponse,
                { status: 400 }
            );
        }

        // Generate tags with DeepSeek
        const tags = await generateSunoSongTags({
            description: description.trim(),
            genre: genre || "pop",
            mood: mood || "uplifting",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "song-tag-generator",
            requestData: body,
            responseData: { tags },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            tags,
        } as SongTagResponse);
    } catch (error) {
        console.error("Song tag generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate song tags. Please try again.",
            } as SongTagResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Song Tag Generator",
    });
}
