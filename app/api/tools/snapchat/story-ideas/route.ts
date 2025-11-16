import { NextRequest, NextResponse } from "next/server";
import { generateSnapchatStoryIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type {
    SnapchatStoryIdeasRequest,
    SnapchatStoryIdeasResponse,
} from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: SnapchatStoryIdeasRequest = await request.json();
        const { topic, language } = body;

        // Validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as SnapchatStoryIdeasResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as SnapchatStoryIdeasResponse,
                { status: 400 }
            );
        }

        // Generate ideas
        const ideas = await generateSnapchatStoryIdeas({
            topic,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "snapchat",
            tool: "story-ideas",
            requestData: body,
            responseData: { ideas },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            ideas,
        } as SnapchatStoryIdeasResponse);
    } catch (error) {
        console.error("Error generating story ideas:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate ideas",
            } as SnapchatStoryIdeasResponse,
            { status: 500 }
        );
    }
}
