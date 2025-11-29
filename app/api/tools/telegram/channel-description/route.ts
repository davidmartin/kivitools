import { NextRequest, NextResponse } from "next/server";
import { generateTelegramChannelDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { channelName, topic, language, turnstileToken } = body;

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

        if (!channelName || channelName.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Channel name is required" },
                { status: 400 }
            );
        }

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Channel topic is required" },
                { status: 400 }
            );
        }

        const result = await generateTelegramChannelDescription({
            name: channelName.trim(),
            topic: topic.trim(),
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "telegram",
            tool: "channel-description",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Telegram channel description error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate descriptions. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Telegram Channel Description Generator" });
}
