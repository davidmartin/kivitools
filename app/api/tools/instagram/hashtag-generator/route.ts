import { NextRequest, NextResponse } from "next/server";
import { generateInstagramHashtags } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { description, niche, quantity, language, turnstileToken } = body;

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
        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is required",
                },
                { status: 400 }
            );
        }

        // Generate hashtags with DeepSeek
        const hashtags = await generateInstagramHashtags({
            description: description.trim(),
            niche: niche?.trim() || "General",
            quantity: quantity || "30",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "instagram",
            tool: "hashtag-generator",
            requestData: body,
            responseData: { hashtags },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            hashtags,
        });
    } catch (error) {
        console.error("Instagram hashtag generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate hashtags. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Instagram Hashtag Generator" });
}
