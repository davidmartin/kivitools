import { NextRequest, NextResponse } from "next/server";
import { generateWhatsAppQuickReplies } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { scenario, language, turnstileToken } = body;

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

        if (!scenario?.trim()) {
            return NextResponse.json(
                { success: false, error: "Scenario is required" },
                { status: 400 }
            );
        }

        const result = await generateWhatsAppQuickReplies({
            scenario: scenario.trim(),
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "whatsapp",
            tool: "quick-replies",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("WhatsApp quick replies error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate quick replies" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "WhatsApp Quick Replies Generator" });
}
