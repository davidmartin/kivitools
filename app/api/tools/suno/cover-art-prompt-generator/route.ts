import { NextRequest, NextResponse } from "next/server";
import { generateSunoCoverArtPrompts } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { songTitle, mood, genre, artStyle, targetPlatform, language, turnstileToken } = body;

        // 1. Verify Turnstile token
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

        // 2. Validate inputs
        if (!songTitle || songTitle.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Song title is required" },
                { status: 400 }
            );
        }

        if (songTitle.trim().length > 200) {
            return NextResponse.json(
                { success: false, error: "Song title is too long (max 200 characters)" },
                { status: 400 }
            );
        }

        // 3. Generate cover art prompts with DeepSeek
        const result = await generateSunoCoverArtPrompts({
            songTitle: songTitle.trim(),
            mood: mood?.trim() || "",
            genre: genre?.trim() || "",
            artStyle: artStyle || "abstract",
            targetPlatform: targetPlatform || "suno",
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "cover-art-prompt-generator",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Cover art prompt generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate cover art prompts. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Cover Art Prompt Generator"
    });
}
