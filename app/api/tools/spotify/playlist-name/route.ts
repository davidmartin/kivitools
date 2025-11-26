import { NextRequest, NextResponse } from "next/server";
import { generateSpotifyPlaylistNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mood, genres, occasion, language, turnstileToken } = body;

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

        // Validation
        if (!mood || mood.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Mood is required" },
                { status: 400 }
            );
        }

        if (!genres || genres.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Genres are required" },
                { status: 400 }
            );
        }

        // Generate names with DeepSeek
        const names = await generateSpotifyPlaylistNames({
            mood: mood.trim(),
            genres: genres.trim(),
            occasion: occasion?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "spotify",
            tool: "playlist-name",
            requestData: body,
            responseData: { names },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            names,
        });
    } catch (error) {
        console.error("Spotify playlist name generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate names",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Spotify Playlist Name Generator",
    });
}
