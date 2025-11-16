import { NextRequest, NextResponse } from "next/server";
import { generateDiscordWelcome } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { DiscordWelcomeResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { serverName, tone, language } = await req.json();

        // Validation
        if (!serverName || typeof serverName !== "string" || serverName.trim().length === 0) {
            return NextResponse.json<DiscordWelcomeResponse>(
                { success: false, error: "Server name is required" },
                { status: 400 }
            );
        }

        if (serverName.length > 200) {
            return NextResponse.json<DiscordWelcomeResponse>(
                { success: false, error: "Server name is too long (max 200 characters)" },
                { status: 400 }
            );
        }

        // Generate welcome message
        const message = await generateDiscordWelcome(serverName, tone || "friendly", language || "en");

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "discord",
            tool: "welcome-message",
            requestData: { serverName, tone, language },
            responseData: { message },
            userIp: getUserIpFromRequest(req),
            language: language || "en",
        });

        return NextResponse.json<DiscordWelcomeResponse>({
            success: true,
            message,
        });
    } catch (error) {
        console.error("Error in Discord welcome message API:", error);
        return NextResponse.json<DiscordWelcomeResponse>(
            { success: false, error: "Failed to generate welcome message" },
            { status: 500 }
        );
    }
}
