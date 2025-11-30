import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeChannelNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, style, keywords, turnstileToken } = body;

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

        if (!niche || niche.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Channel niche is required",
                },
                { status: 400 }
            );
        }

        if (niche.length > 200) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Niche description is too long (max 200 characters)",
                },
                { status: 400 }
            );
        }

        const channelNames = await generateYouTubeChannelNames({
            niche: niche.trim(),
            style: style || "creative",
            keywords: keywords?.trim() || undefined,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "youtube",
            tool: "channel-name-generator",
            requestData: body,
            responseData: { channelNames },
            userIp: getUserIpFromRequest(request),
            language: "en",
        });

        return NextResponse.json({
            success: true,
            channelNames,
        });
    } catch (error) {
        console.error("Channel name generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate channel names. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "YouTube Channel Name Generator" });
}
