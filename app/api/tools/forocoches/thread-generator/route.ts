import { NextRequest, NextResponse } from "next/server";
import { generateForocochesThread } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

// POST /api/tools/forocoches/thread-generator
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, tone, turnstileToken } = body;

        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification failed",
                },
                { status: 403 }
            );
        }

        // Basic validation
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is too long (max 500 characters)",
                },
                { status: 400 }
            );
        }

        // Generate thread
        const content = await generateForocochesThread({
            topic: topic.trim(),
            tone: tone || "serious",
        });

        // Log generation
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "forocoches",
            tool: "thread-generator",
            requestData: body,
            responseData: { content },
            userIp: requestIp,
            language: "es",
        });

        return NextResponse.json({
            success: true,
            content,
        });
    } catch (error) {
        console.error("Thread generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate thread. Please try again.",
            },
            { status: 500 }
        );
    }
}
