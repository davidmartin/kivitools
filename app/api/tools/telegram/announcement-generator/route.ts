import { NextRequest, NextResponse } from "next/server";
import { generateTelegramAnnouncement } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, tone, language, turnstileToken } = body;

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

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Announcement topic is required" },
                { status: 400 }
            );
        }

        const result = await generateTelegramAnnouncement({
            topic: topic.trim(),
            tone: tone || "professional",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "telegram",
            tool: "announcement-generator",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Telegram announcement error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate announcements. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Telegram Announcement Generator" });
}
