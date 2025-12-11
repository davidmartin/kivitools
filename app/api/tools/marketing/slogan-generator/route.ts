import { NextRequest, NextResponse } from "next/server";
import { generateSlogan } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { brand, industry, values, language, turnstileToken } = body;

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

        if (!brand?.trim()) {
            return NextResponse.json(
                { success: false, error: "Brand name is required" },
                { status: 400 }
            );
        }

        const result = await generateSlogan({
            brand: brand.trim(),
            industry: industry?.trim() || "",
            values: values?.trim() || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "marketing",
            tool: "slogan-generator",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Slogan error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate slogan" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Slogan Generator" });
}
