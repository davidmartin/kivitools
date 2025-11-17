import { NextRequest, NextResponse } from "next/server";
import { formatTextForVoice } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, language, turnstileToken } = body;

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

        // 3. Format text for voice with DeepSeek
        const formattedText = await formatTextForVoice({
            text: text.trim(),
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "elevenlabs",
            tool: "voice-text-formatter",
            requestData: body,
            responseData: { formattedText },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            formattedText,
        });
    } catch (error) {
        console.error("Voice text formatting error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to format text for voice. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "ElevenLabs Voice Text Formatter",
    });
}
