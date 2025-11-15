import { NextRequest, NextResponse } from "next/server";
import { generateHashtags } from "@/lib/deepseek";
import type { HashtagGeneratorRequest, HashtagGeneratorResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: HashtagGeneratorRequest = await request.json();

        // Validación
        if (!body.keyword || typeof body.keyword !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Keyword is required",
                } as HashtagGeneratorResponse,
                { status: 400 }
            );
        }

        if (body.keyword.length > 100) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Keyword is too long (max 100 characters)",
                } as HashtagGeneratorResponse,
                { status: 400 }
            );
        }

        // Generar hashtags
        const hashtags = await generateHashtags({
            keyword: body.keyword,
        });

        return NextResponse.json({
            success: true,
            hashtags,
        } as HashtagGeneratorResponse);
    } catch (error) {
        console.error("Hashtag generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate hashtags",
            } as HashtagGeneratorResponse,
            { status: 500 }
        );
    }
}
