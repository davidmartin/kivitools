import { NextRequest, NextResponse } from "next/server";
import { generateForocochesTroll } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

// POST /api/tools/forocoches/troll-response
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { comment, intensity, turnstileToken } = body;

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
        if (!comment || comment.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Comment is required",
                },
                { status: 400 }
            );
        }

        if (comment.length > 1000) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Comment is too long (max 1000 characters)",
                },
                { status: 400 }
            );
        }

        // Generate response
        const content = await generateForocochesTroll({
            comment: comment.trim(),
            intensity: intensity || "medium",
        });

        // Log generation
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "forocoches",
            tool: "troll-response",
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
        console.error("Response generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate response. Please try again.",
            },
            { status: 500 }
        );
    }
}
