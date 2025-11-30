import { NextRequest, NextResponse } from "next/server";
import { generatePatreonPosts } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { postType, topic, tier, language, turnstileToken } = body;

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

        if (!postType || postType.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Post type is required" },
                { status: 400 }
            );
        }

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        const post = await generatePatreonPosts({
            postType: postType.trim(),
            topic: topic.trim(),
            tier: tier?.trim() || undefined,
            language: language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "patreon",
            tool: "post-generator",
            requestData: body,
            responseData: { post },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            post,
        });
    } catch (error) {
        console.error("Patreon post generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate post. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Patreon Post Generator" });
}
