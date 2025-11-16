import { NextRequest, NextResponse } from "next/server";
import { generateRedditPost } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { RedditPostRequest, RedditPostResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: RedditPostRequest = await request.json();
        const { topic, subreddit, tone, language } = body;

        // Validate required fields
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as RedditPostResponse,
                { status: 400 }
            );
        }

        if (!subreddit || subreddit.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Subreddit is required",
                } as RedditPostResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as RedditPostResponse,
                { status: 400 }
            );
        }

        // Generate post using DeepSeek
        const { title, content } = await generateRedditPost(topic, subreddit, tone, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "reddit",
            tool: "post-generator",
            requestData: body,
            responseData: { title, content },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            title,
            content,
        } as RedditPostResponse);
    } catch (error) {
        console.error("Reddit post generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate post",
            } as RedditPostResponse,
            { status: 500 }
        );
    }
}
