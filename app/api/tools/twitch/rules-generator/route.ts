import { NextRequest, NextResponse } from "next/server";
import { generateTwitchRules } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { context, tone, language, turnstileToken } = body;

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

        // Context is optional, but if provided should be trimmed
        const rules = await generateTwitchRules({
            context: context ? context.trim() : "",
            tone: tone || "friendly",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "twitch",
            tool: "rules-generator",
            requestData: body,
            responseData: { rules },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            rules,
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate rules. Please try again." },
            { status: 500 }
        );
    }
}
