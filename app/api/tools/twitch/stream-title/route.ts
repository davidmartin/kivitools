import { NextRequest, NextResponse } from "next/server";
import { generateTwitchStreamTitles } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { TwitchStreamTitleResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { game, tone, language } = await req.json();

        // Validation
        if (!game || typeof game !== "string" || game.trim().length === 0) {
            return NextResponse.json<TwitchStreamTitleResponse>(
                { success: false, error: "Game/Category is required" },
                { status: 400 }
            );
        }

        if (game.length > 200) {
            return NextResponse.json<TwitchStreamTitleResponse>(
                { success: false, error: "Game/Category is too long (max 200 characters)" },
                { status: 400 }
            );
        }

        // Generate stream titles
        const titles = await generateTwitchStreamTitles(game, tone || "friendly", language || "en");

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "twitch",
            tool: "stream-title",
            requestData: { game, tone, language },
            responseData: { titles },
            userIp: getUserIpFromRequest(req),
            language: language || "en",
        });

        return NextResponse.json<TwitchStreamTitleResponse>({
            success: true,
            titles,
        });
    } catch (error) {
        console.error("Error in Twitch stream title API:", error);
        return NextResponse.json<TwitchStreamTitleResponse>(
            { success: false, error: "Failed to generate stream titles" },
            { status: 500 }
        );
    }
}
