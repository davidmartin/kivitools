import { NextRequest, NextResponse } from "next/server";
import { generatePatreonAboutPage } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { creatorName, creatorType, mission, language, turnstileToken } = body;

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

        if (!creatorName || creatorName.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Creator name is required" },
                { status: 400 }
            );
        }

        if (!creatorType || creatorType.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Creator type is required" },
                { status: 400 }
            );
        }

        const aboutPage = await generatePatreonAboutPage({
            creatorName: creatorName.trim(),
            creatorType: creatorType.trim(),
            mission: mission?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "patreon",
            tool: "about-page-generator",
            requestData: body,
            responseData: { aboutPage },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            aboutPage,
        });
    } catch (error) {
        console.error("Patreon about page generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate about page. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Patreon About Page Generator" });
}
