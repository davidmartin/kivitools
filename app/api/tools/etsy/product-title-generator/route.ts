import { NextRequest, NextResponse } from "next/server";
import { generateEtsyProductTitles } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { product, keywords, category, language, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                { success: false, error: "Bot verification required" },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Bot verification failed" },
                { status: 403 }
            );
        }

        if (!product || product.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Product description is required" },
                { status: 400 }
            );
        }

        if (product.length > 500) {
            return NextResponse.json(
                { success: false, error: "Product description is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        const titles = await generateEtsyProductTitles({
            product: product.trim(),
            keywords: keywords?.trim() || undefined,
            category: category?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "etsy",
            tool: "product-title-generator",
            requestData: body,
            responseData: { titles },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            titles,
        });
    } catch (error) {
        console.error("Etsy title generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate titles. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Etsy Product Title Generator" });
}
