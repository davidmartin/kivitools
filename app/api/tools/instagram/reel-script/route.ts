import { NextResponse } from "next/server";
import { generateReelScript } from "@/lib/deepseek";
import type { ReelScriptRequest, ReelScriptResponse } from "@/types";

export async function POST(request: Request) {
    try {
        const body: ReelScriptRequest = await request.json();
        const { topic, tone, duration, language } = body;

        // Validación
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json<ReelScriptResponse>(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json<ReelScriptResponse>(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generar script con DeepSeek
        const script = await generateReelScript({
            topic: topic.trim(),
            tone,
            duration,
            language,
        });

        return NextResponse.json<ReelScriptResponse>({
            success: true,
            script,
        });
    } catch (error) {
        console.error("Reel script generation error:", error);
        return NextResponse.json<ReelScriptResponse>(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate script",
            },
            { status: 500 }
        );
    }
}
