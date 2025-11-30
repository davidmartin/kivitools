import { NextRequest, NextResponse } from "next/server";
import { generatePatreonTierDescriptions } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { creatorType, tierNames, benefits, language, turnstileToken } = body;

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

        if (!creatorType || creatorType.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Creator type is required" },
                { status: 400 }
            );
        }

        if (creatorType.length > 300) {
            return NextResponse.json(
                { success: false, error: "Creator type is too long (max 300 characters)" },
                { status: 400 }
            );
        }

        const tiers = await generatePatreonTierDescriptions({
            creatorType: creatorType.trim(),
            tierNames: tierNames?.trim() || undefined,
            benefits: benefits?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "patreon",
            tool: "tier-description-generator",
            requestData: body,
            responseData: { tiers },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            tiers,
        });
    } catch (error) {
        console.error("Patreon tier generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate tier descriptions. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Patreon Tier Description Generator" });
}
