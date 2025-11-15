import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeTitles } from "@/lib/deepseek";
import type { YouTubeTitleRequest, YouTubeTitleResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: YouTubeTitleRequest = await request.json();
        const { topic, language } = body;

        // Validate required fields
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as YouTubeTitleResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as YouTubeTitleResponse,
                { status: 400 }
            );
        }

        // Generate titles using DeepSeek
        const titles = await generateYouTubeTitles(topic, language);

        return NextResponse.json({
            success: true,
            titles,
        } as YouTubeTitleResponse);
    } catch (error) {
        console.error("YouTube title generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate titles",
            } as YouTubeTitleResponse,
            { status: 500 }
        );
    }
}
