import { NextRequest, NextResponse } from "next/server";
import { generateTikTokScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { ScriptWriterRequest, ScriptWriterResponse } from "@/types";

// POST /api/tools/tiktok/script-writer
export async function POST(request: NextRequest) {
    try {
        const body: ScriptWriterRequest = await request.json();
        const { topic, tone, duration, language } = body;

        // Validación básica
        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is required",
                } as ScriptWriterResponse,
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic is too long (max 500 characters)",
                } as ScriptWriterResponse,
                { status: 400 }
            );
        }

        // Generar script con DeepSeek (oculto del cliente)
        const script = await generateTikTokScript({
            topic: topic.trim(),
            tone: tone || "friendly",
            duration: duration || "30-60s",
            language: language || "en",
        });

        // Log generation to Appwrite (backend only, non-blocking)
        await saveGenerationLog({
            platform: "tiktok",
            tool: "script-writer",
            requestData: body,
            responseData: { script },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            script,
        } as ScriptWriterResponse);
    } catch (error) {
        console.error("Script generation error:", error);

        // No exponemos detalles del error al cliente por seguridad
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate script. Please try again.",
            } as ScriptWriterResponse,
            { status: 500 }
        );
    }
}

// Opcional: GET para health check
export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Script Writer" });
}
