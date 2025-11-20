import { NextRequest, NextResponse } from "next/server";
import { generateAmazonProductComparison } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productA, productB, criteria, tone, language, turnstileToken } = body;

        // 1. Verify Turnstile token
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

        // 2. Validate inputs
        if (!productA || !productB) {
            return NextResponse.json(
                { success: false, error: "Both product names are required" },
                { status: 400 }
            );
        }

        // 3. Generate content with DeepSeek
        const result = await generateAmazonProductComparison({
            productA: productA.trim(),
            productB: productB.trim(),
            criteria: criteria || "",
            tone: tone || "objective",
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "amazon",
            tool: "product-comparison-generator",
            requestData: { productA, productB, criteria, tone, language },
            responseData: { result },
            userIp,
            language: language || "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Amazon Product Comparison Generator"
    });
}
