import { NextRequest, NextResponse } from "next/server";
import { generateSchemaMarkup } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { pageType, content, language, turnstileToken } = body;

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

        if (!pageType?.trim()) {
            return NextResponse.json(
                { success: false, error: "Page type is required" },
                { status: 400 }
            );
        }

        const result = await generateSchemaMarkup({
            pageType: pageType.trim(),
            content: content?.trim() || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "seo",
            tool: "schema-markup",
            requestData: body,
            responseData: { result },
            userIp,
            language: "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Schema markup error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate schema markup" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Schema Markup Generator" });
}
