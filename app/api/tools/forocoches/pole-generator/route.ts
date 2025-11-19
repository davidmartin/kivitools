import { NextRequest, NextResponse } from "next/server";
import { generateForocochesPole } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

// POST /api/tools/forocoches/pole-generator
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { style, turnstileToken } = body;

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

        const content = await generateForocochesPole({
            style: style || "classic",
            topic: body.topic,
        });

        // Log generation
        const requestIp = getUserIpFromRequest(request);
        await saveGenerationLog({
            platform: "forocoches",
            tool: "pole-generator",
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
        console.error("Pole generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate pole. Please try again.",
            },
            { status: 500 }
        );
    }
}
