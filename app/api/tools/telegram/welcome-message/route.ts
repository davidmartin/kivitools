import { NextRequest, NextResponse } from "next/server";
import { generateTelegramWelcomeMessage } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { channel, type, language, turnstileToken } = body;

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

        if (!channel || channel.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Channel/group name is required" },
                { status: 400 }
            );
        }

        const result = await generateTelegramWelcomeMessage({
            channel: channel.trim(),
            type: type || "community",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "telegram",
            tool: "welcome-message",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Telegram welcome message error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate welcome messages. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Telegram Welcome Message Generator" });
}
