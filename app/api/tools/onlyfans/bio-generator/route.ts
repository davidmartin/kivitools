import { NextRequest, NextResponse } from "next/server";
import { generateOnlyFansBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, personality, language, turnstileToken } = body;

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

        if (niche.length > 300) {
            return NextResponse.json(
                { success: false, error: "Niche description is too long (max 300 characters)" },
                { status: 400 }
            );
        }

        const bios = await generateOnlyFansBio({
            niche: niche.trim(),
            personality: personality?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "onlyfans",
            tool: "bio-generator",
            requestData: body,
            responseData: { bios },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            bios,
        });
    } catch (error) {
        console.error("OnlyFans bio generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate bios. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "OnlyFans Bio Generator" });
}
