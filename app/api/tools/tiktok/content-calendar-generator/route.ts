import { NextRequest, NextResponse } from "next/server";
import { generateTikTokContentCalendar } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, frequency, duration, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification failed",
                },
                { status: 403 }
            );
        }

        // Validation
        if (!niche || niche.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Niche is required",
                },
                { status: 400 }
            );
        }

        // Generate calendar with DeepSeek
        const calendar = await generateTikTokContentCalendar({
            niche: niche.trim(),
            frequency: frequency || "Daily",
            duration: duration || "1 week",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "content-calendar-generator",
            requestData: body,
            responseData: { calendar },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            calendar,
        });
    } catch (error) {
        console.error("Content calendar generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate calendar. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Content Calendar Generator" });
}
