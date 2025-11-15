import { NextRequest, NextResponse } from "next/server";
import { generateSnapchatLensIdeas } from "@/lib/deepseek";
import type {
    SnapchatLensIdeasRequest,
    SnapchatLensIdeasResponse,
} from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: SnapchatLensIdeasRequest = await request.json();
        const { topic, language } = body;

        // Validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as SnapchatLensIdeasResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as SnapchatLensIdeasResponse,
                { status: 400 }
            );
        }

        // Generate ideas
        const ideas = await generateSnapchatLensIdeas({
            topic,
            language,
        });

        return NextResponse.json({
            success: true,
            ideas,
        } as SnapchatLensIdeasResponse);
    } catch (error) {
        console.error("Error generating lens ideas:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate ideas",
            } as SnapchatLensIdeasResponse,
            { status: 500 }
        );
    }
}
