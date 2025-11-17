import { NextRequest, NextResponse } from "next/server";
import { optimizeAudiobookChapter } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, genre, narrative, language, turnstileToken } = body;

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
        if (!text || text.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Text is required" },
                { status: 400 }
            );
        }

        // 3. Check character limit (5000 characters)
        if (text.trim().length > 5000) {
            return NextResponse.json(
                { success: false, error: "Text exceeds 5000 character limit. Please shorten your text." },
                { status: 400 }
            );
        }

        // 4. Optimize audiobook chapter with DeepSeek
        const optimizedText = await optimizeAudiobookChapter({
            text: text.trim(),
            genre: genre || "fiction",
            narrative: narrative || "third-person",
            language: language || "en",
        });

        // 5. Log to Appwrite
        await saveGenerationLog({
            platform: "elevenlabs",
            tool: "audiobook-optimizer",
            requestData: body,
            responseData: { optimizedText },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        // 6. Return success
        return NextResponse.json({
            success: true,
            optimizedText,
        });
    } catch (error) {
        console.error("Audiobook optimization error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to optimize audiobook text. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "ElevenLabs Audiobook Chapter Optimizer"
    });
}
