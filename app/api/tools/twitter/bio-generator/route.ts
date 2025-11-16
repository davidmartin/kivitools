import { NextRequest, NextResponse } from "next/server";
import { generateTwitterBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { TwitterBioRequest, TwitterBioResponse } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body: TwitterBioRequest = await request.json();
        const { description, tone, includeEmojis, language } = body;

        // Validation
        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description is required",
                } as TwitterBioResponse,
                { status: 400 }
            );
        }

        if (description.length > 300) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Description must be less than 300 characters",
                } as TwitterBioResponse,
                { status: 400 }
            );
        }

        // Generate bio
        const bio = await generateTwitterBio({
            description,
            tone,
            includeEmojis,
            language,
        });

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "twitter",
            tool: "bio-generator",
            requestData: body,
            responseData: { bio },
            userIp: getUserIpFromRequest(request),
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
            bio,
        } as TwitterBioResponse);
    } catch (error) {
        console.error("Error generating bio:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate bio",
            } as TwitterBioResponse,
            { status: 500 }
        );
    }
}
