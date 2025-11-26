import { NextRequest, NextResponse } from "next/server";
import { generatePinterestPinDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, keywords, tone, language, turnstileToken } = body;

        // Verify Turnstile token first
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

        // Validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generate description with DeepSeek
        const description = await generatePinterestPinDescription({
            topic: topic.trim(),
            keywords: keywords?.trim() || undefined,
            tone: tone || "friendly",
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "pinterest",
            tool: "pin-description",
            requestData: body,
            responseData: { description },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            description,
        });
    } catch (error) {
        console.error("Pinterest pin description generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate description",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Pinterest Pin Description Generator",
    });
}
