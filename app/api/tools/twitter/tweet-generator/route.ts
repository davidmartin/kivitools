import { NextRequest, NextResponse } from "next/server";
import { generateTweet } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { TweetGeneratorRequest, TweetGeneratorResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: TweetGeneratorRequest = await request.json();
        const { topic, tone, language } = body;

        // Validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as TweetGeneratorResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as TweetGeneratorResponse,
                { status: 400 }
            );
        }

        // Generate tweets
        const tweets = await generateTweet({
            topic,
            tone,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "twitter",
            tool: "tweet-generator",
            requestData: body,
            responseData: { tweets },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            tweets,
        } as TweetGeneratorResponse);
    } catch (error) {
        console.error("Error generating tweets:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate tweets",
            } as TweetGeneratorResponse,
            { status: 500 }
        );
    }
}
