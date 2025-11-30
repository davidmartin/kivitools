import { NextRequest, NextResponse } from "next/server";
import { generateSunoAlbumNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface AlbumNameRequest {
    concept: string;
    genre: string;
    releaseType: string;
    trackCount?: number;
    language: string;
    turnstileToken: string;
}

interface AlbumNameResponse {
    success: boolean;
    names?: string[];
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: AlbumNameRequest = await request.json();
        const { concept, genre, releaseType, trackCount, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                } as AlbumNameResponse,
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
                } as AlbumNameResponse,
                { status: 403 }
            );
        }

        // Validate inputs
        if (!concept || concept.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Album concept is required",
                } as AlbumNameResponse,
                { status: 400 }
            );
        }

        if (concept.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Concept is too long (max 500 characters)",
                } as AlbumNameResponse,
                { status: 400 }
            );
        }

        // Generate album names with DeepSeek
        const names = await generateSunoAlbumNames({
            concept: concept.trim(),
            genre: genre || "pop",
            releaseType: releaseType || "album",
            trackCount: trackCount,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "album-name-generator",
            requestData: body,
            responseData: { names },
            userIp: userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            names,
        } as AlbumNameResponse);
    } catch (error) {
        console.error("Album name generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate album names. Please try again.",
            } as AlbumNameResponse,
            { status: 500 }
        );
    }
}

// GET for health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Album Name Generator",
    });
}
