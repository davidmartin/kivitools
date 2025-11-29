import { NextRequest, NextResponse } from "next/server";
import { generateKickBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, content, personality, language, turnstileToken } = body;

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

        if (!name || name.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Channel name is required" },
                { status: 400 }
            );
        }

        if (!content || content.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Content type is required" },
                { status: 400 }
            );
        }

        const result = await generateKickBio({
            name: name.trim(),
            content: content.trim(),
            personality: personality || "chill",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "kick",
            tool: "bio-generator",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Kick bio generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate bios. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Kick Bio Generator" });
}
