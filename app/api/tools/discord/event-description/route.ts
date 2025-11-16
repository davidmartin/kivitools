import { NextRequest, NextResponse } from "next/server";
import { generateDiscordEvent } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { DiscordEventResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { eventName, eventDetails, tone, language } = await req.json();

        // Validation
        if (!eventName || typeof eventName !== "string" || eventName.trim().length === 0) {
            return NextResponse.json<DiscordEventResponse>(
                { success: false, error: "Event name is required" },
                { status: 400 }
            );
        }

        if (!eventDetails || typeof eventDetails !== "string" || eventDetails.trim().length === 0) {
            return NextResponse.json<DiscordEventResponse>(
                { success: false, error: "Event details are required" },
                { status: 400 }
            );
        }

        if (eventName.length > 200) {
            return NextResponse.json<DiscordEventResponse>(
                { success: false, error: "Event name is too long (max 200 characters)" },
                { status: 400 }
            );
        }

        if (eventDetails.length > 1000) {
            return NextResponse.json<DiscordEventResponse>(
                { success: false, error: "Event details are too long (max 1000 characters)" },
                { status: 400 }
            );
        }

        // Generate event description
        const description = await generateDiscordEvent(eventName, eventDetails, tone || "friendly", language || "en");

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "discord",
            tool: "event-description",
            requestData: { eventName, eventDetails, tone, language },
            responseData: { description },
            userIp: getUserIpFromRequest(req),
            language: language || "en",
        });

        return NextResponse.json<DiscordEventResponse>({
            success: true,
            description,
        });
    } catch (error) {
        console.error("Error in Discord event description API:", error);
        return NextResponse.json<DiscordEventResponse>(
            { success: false, error: "Failed to generate event description" },
            { status: 500 }
        );
    }
}
