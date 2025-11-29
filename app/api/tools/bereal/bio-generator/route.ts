import { NextRequest, NextResponse } from "next/server";
import { generateBeRealBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, vibe, interests, language, turnstileToken } = body;

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

        const result = await generateBeRealBio({
            name: name.trim(),
            vibe: vibe || "authentic",
            interests: interests || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bereal",
            tool: "bio-generator",
            requestData: body,
            responseData: { result },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("BeReal bio error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate bios. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "BeReal Bio Generator" });
}
