import { NextRequest, NextResponse } from "next/server";
import { generateTikTokSongRecommendations } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { videoDescription, mood, language, turnstileToken } = body;

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

        // Validation
        if (!videoDescription || videoDescription.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Video description is required",
                },
                { status: 400 }
            );
        }

        // Generate song recommendations with DeepSeek
        const songs = await generateTikTokSongRecommendations({
            videoDescription: videoDescription.trim(),
            mood: mood || "energetic",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "song-recommendations",
            requestData: body,
            responseData: { songs },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            songs,
        });
    } catch (error) {
        console.error("Song recommendations error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate recommendations. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Song Recommendations" });
}
