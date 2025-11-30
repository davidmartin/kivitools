import { NextRequest, NextResponse } from "next/server";
import { generateMediumBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { expertise, personality, language, turnstileToken } = body;

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

        if (!expertise || expertise.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Expertise is required" },
                { status: 400 }
            );
        }

        if (expertise.length > 300) {
            return NextResponse.json(
                { success: false, error: "Expertise is too long (max 300 characters)" },
                { status: 400 }
            );
        }

        const bios = await generateMediumBio({
            expertise: expertise.trim(),
            personality: personality?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "medium",
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
        console.error("Medium bio generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate bios. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Medium Bio Generator" });
}
