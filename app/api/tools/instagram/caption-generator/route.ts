import { NextResponse } from "next/server";
import { generateInstagramCaption } from "@/lib/deepseek";
import type { CaptionGeneratorRequest, CaptionGeneratorResponse } from "@/types";

export async function POST(request: Request) {
    try {
        const body: CaptionGeneratorRequest = await request.json();
        const { topic, tone, includeEmojis, includeHashtags, language } = body;

        // Validación
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json<CaptionGeneratorResponse>(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json<CaptionGeneratorResponse>(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generar caption con DeepSeek
        const caption = await generateInstagramCaption({
            topic: topic.trim(),
            tone,
            includeEmojis,
            includeHashtags,
            language,
        });

        return NextResponse.json<CaptionGeneratorResponse>({
            success: true,
            caption,
        });
    } catch (error) {
        console.error("Caption generation error:", error);
        return NextResponse.json<CaptionGeneratorResponse>(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate caption",
            },
            { status: 500 }
        );
    }
}
