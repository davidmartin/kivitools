import { NextRequest, NextResponse } from "next/server";
import { generateWhatsAppBusinessMessage } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { businessType, messageType, language, turnstileToken } = body;

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

        if (!businessType?.trim()) {
            return NextResponse.json(
                { success: false, error: "Business type is required" },
                { status: 400 }
            );
        }

        const result = await generateWhatsAppBusinessMessage({
            businessType: businessType.trim(),
            messageType: messageType || "welcome",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "whatsapp",
            tool: "business-message",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("WhatsApp business message error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate messages" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "WhatsApp Business Message Generator" });
}
