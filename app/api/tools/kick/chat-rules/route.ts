import { NextRequest, NextResponse } from "next/server";
import { generateKickChatRules } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { channel, strictness, language, turnstileToken } = body;

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
                { success: false, error: "Channel name is required" },
                { status: 400 }
            );
        }

        const result = await generateKickChatRules({
            channel: channel.trim(),
            strictness: strictness || "balanced",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "kick",
            tool: "chat-rules",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Kick chat rules error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate rules. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Kick Chat Rules Generator" });
}
