import { NextRequest, NextResponse } from "next/server";
import { generateVeo2Prompt } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { platform, toolSlug, toolName, toolDescription, language } = body;

        // Validate required fields
        if (!platform || !toolSlug || !toolName || !toolDescription) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields: platform, toolSlug, toolName, toolDescription",
                },
                { status: 400 }
            );
        }

        // Validate language
        const validLanguages = ["en", "es"];
        const outputLanguage = validLanguages.includes(language) ? language : "en";

        // Generate the Veo 2 prompt
        const prompt = await generateVeo2Prompt({
            platform: platform.trim(),
            toolSlug: toolSlug.trim(),
            toolName: toolName.trim(),
            toolDescription: toolDescription.trim(),
            language: outputLanguage,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "admin",
            tool: "video-generator-prompt",
            requestData: { platform, toolSlug, toolName, language: outputLanguage },
            responseData: { promptLength: prompt.length },
            userIp: getUserIpFromRequest(request),
            language: outputLanguage,
        });

        return NextResponse.json({
            success: true,
            prompt,
        });
    } catch (error) {
        console.error("Veo 2 prompt generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate prompt. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Admin Video Generator - Prompt"
    });
}
