import { NextRequest, NextResponse } from "next/server";
import { generateSnapchatCaption } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type {
    SnapchatCaptionRequest,
    SnapchatCaptionResponse,
} from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: SnapchatCaptionRequest = await request.json();
        const { topic, tone, includeEmojis, language, turnstileToken } = body;
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
                } as SnapchatCaptionResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as SnapchatCaptionResponse,
                { status: 400 }
            );
        }

        // Generate caption
        const caption = await generateSnapchatCaption({
            topic,
            tone,
            includeEmojis,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "snapchat",
            tool: "caption-generator",
            requestData: body,
            responseData: { caption },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            caption,
        } as SnapchatCaptionResponse);
    } catch (error) {
        console.error("Error generating caption:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate caption",
            } as SnapchatCaptionResponse,
            { status: 500 }
        );
    }
}
