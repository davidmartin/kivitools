import { NextRequest, NextResponse } from "next/server";
import { generateBlueskyThread } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, tone, postCount, language, turnstileToken } = body;

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

        const count = parseInt(postCount) || 5;
        if (count < 3 || count > 10) {
            return NextResponse.json(
                { success: false, error: "Post count must be between 3 and 10" },
                { status: 400 }
            );
        }

        const thread = await generateBlueskyThread({
            topic: topic.trim(),
            tone: tone || "casual",
            postCount: count,
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "bluesky",
            tool: "thread-composer",
            requestData: body,
            responseData: { thread },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, thread });
    } catch (error) {
        console.error("Bluesky thread generation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate thread. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Bluesky Thread Composer" });
}
