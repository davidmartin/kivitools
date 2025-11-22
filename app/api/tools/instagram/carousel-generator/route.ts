import { NextRequest, NextResponse } from "next/server";
import { generateInstagramCarousel } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, slideCount, tone, language, turnstileToken } = body;

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
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                },
                { status: 400 }
            );
        }

        // Generate carousel with DeepSeek
        const slides = await generateInstagramCarousel({
            topic: topic.trim(),
            slideCount: slideCount || "5",
            tone: tone || "Educational",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "instagram",
            tool: "carousel-generator",
            requestData: body,
            responseData: { slides },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            slides,
        });
    } catch (error) {
        console.error("Instagram carousel generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate carousel. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Instagram Carousel Generator" });
}
