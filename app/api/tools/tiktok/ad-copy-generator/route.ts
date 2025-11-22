import { NextRequest, NextResponse } from "next/server";
import { generateTikTokAdCopy } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productName, productDescription, targetAudience, tone, language, turnstileToken } = body;

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
        if (!productName || productName.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Product name is required",
                },
                { status: 400 }
            );
        }

        if (!productDescription || productDescription.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Product description is required",
                },
                { status: 400 }
            );
        }

        // Generate ad copy with DeepSeek
        const adCopy = await generateTikTokAdCopy({
            productName: productName.trim(),
            productDescription: productDescription.trim(),
            targetAudience: targetAudience?.trim() || "General Audience",
            tone: tone || "persuasive",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "tiktok",
            tool: "ad-copy-generator",
            requestData: body,
            responseData: { adCopy },
            userIp: requestIp,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            adCopy,
        });
    } catch (error) {
        console.error("Ad copy generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate ad copy. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Ad Copy Generator" });
}
