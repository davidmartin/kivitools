import { NextRequest, NextResponse } from "next/server";
import { generateRedditAMAQuestions } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { RedditAMARequest, RedditAMAResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: RedditAMARequest = await request.json();
        const { topic, language, turnstileToken } = body;
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


        // Validate required fields
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as RedditAMAResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as RedditAMAResponse,
                { status: 400 }
            );
        }

        // Generate questions using DeepSeek
        const questions = await generateRedditAMAQuestions(topic, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "reddit",
            tool: "ama-questions",
            requestData: body,
            responseData: { questions },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            questions,
        } as RedditAMAResponse);
    } catch (error) {
        console.error("Reddit AMA question generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate questions",
            } as RedditAMAResponse,
            { status: 500 }
        );
    }
}
