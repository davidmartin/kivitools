import { NextRequest, NextResponse } from "next/server";
import { generateHooks } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { HookGeneratorRequest, HookGeneratorResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: HookGeneratorRequest = await request.json();

        // Validación
        if (!body.topic || typeof body.topic !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as HookGeneratorResponse,
                { status: 400 }
            );
        }

        if (body.topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is too long (max 500 characters)",
                } as HookGeneratorResponse,
                { status: 400 }
            );
        }

        // Generar hooks
        const hooks = await generateHooks({
            topic: body.topic,
            tone: body.tone || "friendly",
            language: body.language || "en",
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "tiktok",
            tool: "hook-generator",
            requestData: body,
            responseData: { hooks },
            userIp: getUserIpFromRequest(request),
            language: body.language || "en",
        });

        return NextResponse.json({
            success: true,
            hooks,
        } as HookGeneratorResponse);
    } catch (error) {
        console.error("Hook generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate hooks",
            } as HookGeneratorResponse,
            { status: 500 }
        );
    }
}
