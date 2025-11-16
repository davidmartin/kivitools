import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { YouTubeDescriptionRequest, YouTubeDescriptionResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: YouTubeDescriptionRequest = await request.json();
        const { topic, keywords, language } = body;

        // Validate required fields
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as YouTubeDescriptionResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as YouTubeDescriptionResponse,
                { status: 400 }
            );
        }

        // Generate description using DeepSeek
        const description = await generateYouTubeDescription(topic, keywords, language);

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "youtube",
            tool: "description-generator",
            requestData: body,
            responseData: { description },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            description,
        } as YouTubeDescriptionResponse);
    } catch (error) {
        console.error("YouTube description generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate description",
            } as YouTubeDescriptionResponse,
            { status: 500 }
        );
    }
}
