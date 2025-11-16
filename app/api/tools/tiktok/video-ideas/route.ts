import { NextRequest, NextResponse } from "next/server";
import { generateVideoIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { VideoIdeasRequest, VideoIdeasResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: VideoIdeasRequest = await request.json();

        // Validación
        if (!body.topic || typeof body.topic !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as VideoIdeasResponse,
                { status: 400 }
            );
        }

        if (body.topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is too long (max 500 characters)",
                } as VideoIdeasResponse,
                { status: 400 }
            );
        }

        // Generar ideas
        const ideas = await generateVideoIdeas({
            topic: body.topic,
            language: body.language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "tiktok",
            tool: "video-ideas",
            requestData: body,
            responseData: { ideas },
            userIp: getUserIpFromRequest(request),
            language: body.language || "en",
        });

        return NextResponse.json({
            success: true,
            ideas,
        } as VideoIdeasResponse);
    } catch (error) {
        console.error("Video ideas generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate ideas",
            } as VideoIdeasResponse,
            { status: 500 }
        );
    }
}
