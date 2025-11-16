import { NextRequest, NextResponse } from "next/server";
import { generateHashtags } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
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

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "tiktok",
            tool: "hashtag-generator",
            requestData: body,
            responseData: { hashtags },
            userIp: getUserIpFromRequest(request),
            language: "en",
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
