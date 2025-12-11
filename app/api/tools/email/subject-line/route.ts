import { NextRequest, NextResponse } from "next/server";
import { generateEmailSubjectLine } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { emailPurpose, audience, language, turnstileToken } = body;

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

        if (!emailPurpose?.trim()) {
            return NextResponse.json(
                { success: false, error: "Email purpose is required" },
                { status: 400 }
            );
        }

        const result = await generateEmailSubjectLine({
            emailPurpose: emailPurpose.trim(),
            audience: audience?.trim() || "general",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "email",
            tool: "subject-line",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Email subject line error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate email subject line" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Email Subject Line Generator" });
}
