import { NextRequest, NextResponse } from "next/server";
import { generateSnapchatLensIdeas } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type {
    SnapchatLensIdeasRequest,
    SnapchatLensIdeasResponse,
} from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: SnapchatLensIdeasRequest = await request.json();
        const { topic, language, turnstileToken } = body;
        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification failed",
                },
                { status: 403 }
            );
        }


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

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "snapchat",
            tool: "lens-ideas",
            requestData: body,
            responseData: { ideas },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
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
