import { NextRequest, NextResponse } from "next/server";
import { generateInstagramAdCopy } from "@/lib/deepseek";
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

        // Generate ad copy with DeepSeek
        const adCopy = await generateInstagramAdCopy({
            productName: productName.trim(),
            productDescription: productDescription?.trim() || "",
            targetAudience: targetAudience?.trim() || "General Audience",
            tone: tone || "Persuasive",
            language: language || "en",
        });

        // Log generation to Appwrite
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "instagram",
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
        console.error("Instagram ad copy generation error:", error);

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
    return NextResponse.json({ status: "ok", service: "Instagram Ad Copy Generator" });
}
