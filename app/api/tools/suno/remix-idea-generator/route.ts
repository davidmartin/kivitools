import { NextRequest, NextResponse } from "next/server";
import { generateSunoRemixIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { originalSong, originalGenre, remixStyle, language, turnstileToken } = body;

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
        if (!originalSong || originalSong.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Original song description is required" },
                { status: 400 }
            );
        }

        if (originalSong.trim().length > 500) {
            return NextResponse.json(
                { success: false, error: "Song description is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // 3. Generate remix ideas with DeepSeek
        const result = await generateSunoRemixIdeas({
            originalSong: originalSong.trim(),
            originalGenre: originalGenre?.trim() || "",
            remixStyle: remixStyle || "electronic",
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "suno",
            tool: "remix-idea-generator",
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
        console.error("Remix idea generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate remix ideas. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Suno Remix Idea Generator"
    });
}
