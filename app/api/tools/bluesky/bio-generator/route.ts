import { NextRequest, NextResponse } from "next/server";
import { generateBlueskyBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, profession, interests, personality, language, turnstileToken } = body;

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

        if (!name || name.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Name is required" },
                { status: 400 }
            );
        }

        if (!profession || profession.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Profession is required" },
                { status: 400 }
            );
        }

        const bios = await generateBlueskyBio({
            name: name.trim(),
            profession: profession.trim(),
            interests: interests?.trim() || "",
            personality: personality?.trim() || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bluesky",
            tool: "bio-generator",
            requestData: body,
            responseData: { bios },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, bios });
    } catch (error) {
        console.error("Bluesky bio generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate bios. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Bluesky Bio Generator" });
}
