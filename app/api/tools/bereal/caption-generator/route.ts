import { NextRequest, NextResponse } from "next/server";
import { generateBeRealCaption } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { moment, mood, language, turnstileToken } = body;

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

        if (!moment || moment.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Moment description is required" },
                { status: 400 }
            );
        }

        const result = await generateBeRealCaption({
            context: moment.trim(),
            mood: mood || "casual",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bereal",
            tool: "caption-generator",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("BeReal caption error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate captions. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "BeReal Caption Generator" });
}
