import { NextRequest, NextResponse } from "next/server";
import { generateSpotifyArtistBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { artistName, genre, style, achievements, language, turnstileToken } = body;

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
        if (!artistName || artistName.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Artist name is required" },
                { status: 400 }
            );
        }

        if (!genre || genre.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Genre is required" },
                { status: 400 }
            );
        }

        // Generate bio with DeepSeek
        const bio = await generateSpotifyArtistBio({
            artistName: artistName.trim(),
            genre: genre.trim(),
            style: style?.trim() || "",
            achievements: achievements?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "spotify",
            tool: "artist-bio",
            requestData: body,
            responseData: { bio },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            bio,
        });
    } catch (error) {
        console.error("Spotify artist bio generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate bio",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Spotify Artist Bio Generator",
    });
}
