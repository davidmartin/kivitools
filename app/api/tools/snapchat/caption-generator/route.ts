import { NextRequest, NextResponse } from "next/server";
import { generateSnapchatCaption } from "@/lib/deepseek";
import type {
    SnapchatCaptionRequest,
    SnapchatCaptionResponse,
} from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: SnapchatCaptionRequest = await request.json();
        const { topic, tone, includeEmojis, language } = body;

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
