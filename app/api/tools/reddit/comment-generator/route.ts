import { NextRequest, NextResponse } from "next/server";
import { generateRedditComment } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { RedditCommentRequest, RedditCommentResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: RedditCommentRequest = await request.json();
        const { postContext, tone, language, turnstileToken } = body;
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
        if (!postContext || postContext.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Post context is required",
                } as RedditCommentResponse,
                { status: 400 }
            );
        }

        if (postContext.length > 1000) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Post context must be less than 1000 characters",
                } as RedditCommentResponse,
                { status: 400 }
            );
        }

        // Generate comment using DeepSeek
        const comment = await generateRedditComment(postContext, tone, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "reddit",
            tool: "comment-generator",
            requestData: body,
            responseData: { comment },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            comment,
        } as RedditCommentResponse);
    } catch (error) {
        console.error("Reddit comment generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate comment",
            } as RedditCommentResponse,
            { status: 500 }
        );
    }
}
