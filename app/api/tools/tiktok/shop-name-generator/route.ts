import { NextRequest, NextResponse } from "next/server";
import { generateTikTokShopNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { category, keywords, style, turnstileToken } = body;
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


        if (!category || category.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Category is required",
                },
                { status: 400 }
            );
        }

        if (category.length > 100) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Category is too long (max 100 characters)",
                },
                { status: 400 }
            );
        }

        const names = await generateTikTokShopNames({
            category: category.trim(),
            keywords: keywords?.trim(),
            style: style || "modern",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "tiktok",
            tool: "shop-name-generator",
            requestData: body,
            responseData: { names },
            userIp: getUserIpFromRequest(request),
            language: "en",
        });

        return NextResponse.json({
            success: true,
            names,
        });
    } catch (error) {
        console.error("Shop name generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate shop names. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Shop Name Generator" });
}
