import { NextRequest, NextResponse } from "next/server";
import { generateTwitchPanel } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { TwitchPanelResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { panelType, content, language } = await req.json();

        // Validation
        if (!panelType || typeof panelType !== "string" || panelType.trim().length === 0) {
            return NextResponse.json<TwitchPanelResponse>(
                { success: false, error: "Panel type is required" },
                { status: 400 }
            );
        }

        if (!content || typeof content !== "string" || content.trim().length === 0) {
            return NextResponse.json<TwitchPanelResponse>(
                { success: false, error: "Panel content is required" },
                { status: 400 }
            );
        }

        if (panelType.length > 100) {
            return NextResponse.json<TwitchPanelResponse>(
                { success: false, error: "Panel type is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        if (content.length > 1000) {
            return NextResponse.json<TwitchPanelResponse>(
                { success: false, error: "Content is too long (max 1000 characters)" },
                { status: 400 }
            );
        }

        // Generate panel description
        const description = await generateTwitchPanel(panelType, content, language || "en");

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "twitch",
            tool: "panel-description",
            requestData: { panelType, content, language },
            responseData: { description },
            userIp: getUserIpFromRequest(req),
            language: language || "en",
        });

        return NextResponse.json<TwitchPanelResponse>({
            success: true,
            description,
        });
    } catch (error) {
        console.error("Error in Twitch panel description API:", error);
        return NextResponse.json<TwitchPanelResponse>(
            { success: false, error: "Failed to generate panel description" },
            { status: 500 }
        );
    }
}
