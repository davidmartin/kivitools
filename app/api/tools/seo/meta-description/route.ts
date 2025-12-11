import { NextRequest, NextResponse } from "next/server";
import { generateMetaDescription } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page, keywords, language, turnstileToken } = body;

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

        if (!page?.trim()) {
            return NextResponse.json(
                { success: false, error: "Page content is required" },
                { status: 400 }
            );
        }

        const result = await generateMetaDescription({
            page: page.trim(),
            keywords: keywords?.trim() || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "seo",
            tool: "meta-description",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Meta description error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate meta description" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Meta Description Generator" });
}
