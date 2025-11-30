import { NextRequest, NextResponse } from "next/server";
import { generateOnlyFansPromo } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { platform, niche, language, turnstileToken } = body;

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

        if (!niche || niche.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Content niche is required" },
                { status: 400 }
            );
        }

        if (!platform || platform.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Target platform is required" },
                { status: 400 }
            );
        }

        const promos = await generateOnlyFansPromo({
            platform: platform.trim(),
            niche: niche.trim(),
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "onlyfans",
            tool: "promo-generator",
            requestData: body,
            responseData: { promos },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            promos,
        });
    } catch (error) {
        console.error("OnlyFans promo generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate promos. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "OnlyFans Promo Generator" });
}
