import { NextRequest, NextResponse } from "next/server";
import { generateEtsyShopAnnouncement } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { shopName, brandStory, specialty, language, turnstileToken } = body;

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

        if (!shopName || shopName.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Shop name is required" },
                { status: 400 }
            );
        }

        if (!specialty || specialty.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Specialty is required" },
                { status: 400 }
            );
        }

        const announcement = await generateEtsyShopAnnouncement({
            shopName: shopName.trim(),
            brandStory: brandStory?.trim() || undefined,
            specialty: specialty.trim(),
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "etsy",
            tool: "shop-announcement-generator",
            requestData: body,
            responseData: { announcement },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            announcement,
        });
    } catch (error) {
        console.error("Etsy announcement generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate announcement. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Etsy Shop Announcement Generator" });
}
