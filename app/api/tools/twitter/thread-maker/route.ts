import { NextRequest, NextResponse } from "next/server";
import { generateTwitterThread } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { ThreadMakerRequest, ThreadMakerResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: ThreadMakerRequest = await request.json();
        const { topic, tone, numberOfTweets, language, turnstileToken } = body;
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
                } as ThreadMakerResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as ThreadMakerResponse,
                { status: 400 }
            );
        }

        // Generate thread
        const tweets = await generateTwitterThread({
            topic,
            tone,
            numberOfTweets,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "twitter",
            tool: "thread-maker",
            requestData: body,
            responseData: { tweets },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            tweets,
        } as ThreadMakerResponse);
    } catch (error) {
        console.error("Error generating thread:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate thread",
            } as ThreadMakerResponse,
            { status: 500 }
        );
    }
}
