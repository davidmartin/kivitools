import { NextRequest, NextResponse } from "next/server";
import { generateAdScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { product, duration, style, cta, audience, language, turnstileToken } = body;

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
        if (!product || product.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Product/service is required" },
                { status: 400 }
            );
        }

        // 3. Generate ad script with DeepSeek
        const script = await generateAdScript({
            product: product.trim(),
            duration: duration || "30s",
            style: style || "informative",
            cta: cta.trim() || "",
            audience: audience.trim() || "",
            language: language || "en",
        });

        // 4. Log to Appwrite
        await saveGenerationLog({
            platform: "elevenlabs",
            tool: "ad-script",
            requestData: body,
            responseData: { script },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        // 5. Return success
        return NextResponse.json({
            success: true,
            script,
        });
    } catch (error) {
        console.error("Ad script generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate ad script. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "ElevenLabs Ad/Commercial Script Generator"
    });
}
