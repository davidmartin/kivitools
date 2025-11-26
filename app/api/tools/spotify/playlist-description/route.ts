import { NextRequest, NextResponse } from "next/server";
import { generateSpotifyPlaylistDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { playlistName, mood, genres, targetAudience, language, turnstileToken } = body;

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
        if (!playlistName || playlistName.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Playlist name is required" },
                { status: 400 }
            );
        }

        if (!mood || mood.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Mood is required" },
                { status: 400 }
            );
        }

        // Generate description with DeepSeek
        const description = await generateSpotifyPlaylistDescription({
            playlistName: playlistName.trim(),
            mood: mood.trim(),
            genres: genres?.trim() || "",
            targetAudience: targetAudience?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "spotify",
            tool: "playlist-description",
            requestData: body,
            responseData: { description },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            description,
        });
    } catch (error) {
        console.error("Spotify playlist description generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate description",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Spotify Playlist Description Generator",
    });
}
