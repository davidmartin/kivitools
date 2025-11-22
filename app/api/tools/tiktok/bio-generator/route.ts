import { NextRequest, NextResponse } from "next/server";
import { generateTikTokBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { description, tone, includeEmojis, language, turnstileToken } = body;

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
        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is required",
                },
                { status: 400 }
            );
        }

        if (description.length > 300) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is too long (max 300 characters)",
                },
                { status: 400 }
            );
        }

        // Generate bios with DeepSeek
        const bios = await generateTikTokBio({
            description: description.trim(),
            tone: tone || "creative",
            includeEmojis: includeEmojis !== false, // Default to true
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "bio-generator",
            requestData: body,
            responseData: { bios },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            bios,
        });
    } catch (error) {
        console.error("Bio generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate bios. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Bio Generator" });
}
