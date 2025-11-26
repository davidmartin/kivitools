import { NextRequest, NextResponse } from "next/server";
import { generateTikTokToolCaption } from "@/lib/deepseek";
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

        // Generate the TikTok caption
        const result = await generateTikTokToolCaption({
            platform: platform.trim(),
            toolSlug: toolSlug.trim(),
            toolName: toolName.trim(),
            toolDescription: toolDescription.trim(),
            language: outputLanguage,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "admin",
            tool: "video-generator-caption",
            requestData: { platform, toolSlug, toolName, language: outputLanguage },
            responseData: { captionLength: result.caption.length, hashtagCount: result.hashtags.length },
            userIp: getUserIpFromRequest(request),
            language: outputLanguage,
        });

        return NextResponse.json({
            success: true,
            caption: result.caption,
            hashtags: result.hashtags,
            toolUrl: result.toolUrl,
        });
    } catch (error) {
        console.error("TikTok caption generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate caption. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Admin Video Generator - Caption"
    });
}
