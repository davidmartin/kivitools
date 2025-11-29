import { NextRequest, NextResponse } from "next/server";
import { generateBlueskyPost } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, tone, language, turnstileToken } = body;

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

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        const posts = await generateBlueskyPost({
            topic: topic.trim(),
            tone: tone || "casual",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bluesky",
            tool: "post-generator",
            requestData: body,
            responseData: { posts },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error("Bluesky post generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate posts. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Bluesky Post Generator" });
}
