import { NextRequest, NextResponse } from "next/server";
import { generateTwitchCommand } from "@/lib/deepseek";
import type { TwitchCommandResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { commandName, purpose, tone, language } = await req.json();

        // Validation
        if (!commandName || typeof commandName !== "string" || commandName.trim().length === 0) {
            return NextResponse.json<TwitchCommandResponse>(
                { success: false, error: "Command name is required" },
                { status: 400 }
            );
        }

        if (!purpose || typeof purpose !== "string" || purpose.trim().length === 0) {
            return NextResponse.json<TwitchCommandResponse>(
                { success: false, error: "Command purpose is required" },
                { status: 400 }
            );
        }

        if (commandName.length > 100) {
            return NextResponse.json<TwitchCommandResponse>(
                { success: false, error: "Command name is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        if (purpose.length > 500) {
            return NextResponse.json<TwitchCommandResponse>(
                { success: false, error: "Purpose is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generate command response
        const response = await generateTwitchCommand(commandName, purpose, tone || "friendly", language || "en");

        return NextResponse.json<TwitchCommandResponse>({
            success: true,
            response,
        });
    } catch (error) {
        console.error("Error in Twitch command API:", error);
        return NextResponse.json<TwitchCommandResponse>(
            { success: false, error: "Failed to generate command response" },
            { status: 500 }
        );
    }
}
