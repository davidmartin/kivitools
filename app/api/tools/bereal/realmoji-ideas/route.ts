import { NextRequest, NextResponse } from "next/server";
import { generateBeRealRealmojiIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { situation, personality, language, turnstileToken } = body;

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

        if (!situation || situation.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Situation is required" },
                { status: 400 }
            );
        }

        const result = await generateBeRealRealmojiIdeas({
            situation: situation.trim(),
            personality: personality || "expressive",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bereal",
            tool: "realmoji-ideas",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("BeReal RealMoji ideas error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate RealMoji ideas. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "BeReal RealMoji Ideas Generator" });
}
