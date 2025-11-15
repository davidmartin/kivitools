import { NextRequest, NextResponse } from "next/server";
import { generateTwitterThread } from "@/lib/deepseek";
import type { ThreadMakerRequest, ThreadMakerResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: ThreadMakerRequest = await request.json();
        const { topic, tone, numberOfTweets, language } = body;

        // Validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as ThreadMakerResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be less than 500 characters",
                } as ThreadMakerResponse,
                { status: 400 }
            );
        }

        // Generate thread
        const tweets = await generateTwitterThread({
            topic,
            tone,
            numberOfTweets,
            language,
        });

        return NextResponse.json({
            success: true,
            tweets,
        } as ThreadMakerResponse);
    } catch (error) {
        console.error("Error generating thread:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate thread",
            } as ThreadMakerResponse,
            { status: 500 }
        );
    }
}
