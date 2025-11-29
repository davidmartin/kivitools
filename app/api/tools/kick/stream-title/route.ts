import { NextRequest, NextResponse } from "next/server";
import { generateKickStreamTitle } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { game, style, language, turnstileToken } = body;

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

        if (!game || game.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Game or content type is required" },
                { status: 400 }
            );
        }

        const result = await generateKickStreamTitle({
            game: game.trim(),
            style: style || "hype",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "kick",
            tool: "stream-title",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Kick stream title error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate titles. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Kick Stream Title Generator" });
}
