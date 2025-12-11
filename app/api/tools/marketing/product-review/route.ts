import { NextRequest, NextResponse } from "next/server";
import { generateProductReview } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { product, rating, language, turnstileToken } = body;

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

        if (!product?.trim()) {
            return NextResponse.json(
                { success: false, error: "Product is required" },
                { status: 400 }
            );
        }

        const result = await generateProductReview({
            product: product.trim(),
            rating: rating || "5",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "marketing",
            tool: "product-review",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Product review error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate product review" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Product Review Generator" });
}
