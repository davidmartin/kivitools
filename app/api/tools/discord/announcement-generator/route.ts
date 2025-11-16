import { NextRequest, NextResponse } from "next/server";
import { generateDiscordAnnouncement } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import type { DiscordAnnouncementResponse } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { topic, tone, language } = await req.json();

        // Validation
        if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
            return NextResponse.json<DiscordAnnouncementResponse>(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        if (topic.length > 500) {
            return NextResponse.json<DiscordAnnouncementResponse>(
                { success: false, error: "Topic is too long (max 500 characters)" },
                { status: 400 }
            );
        }

        // Generate announcement
        const announcement = await generateDiscordAnnouncement(topic, tone || "friendly", language || "en");

        // Log generation to Appwrite
        await saveGenerationLog({
            platform: "discord",
            tool: "announcement-generator",
            requestData: { topic, tone, language },
            responseData: { announcement },
            userIp: getUserIpFromRequest(req),
            language: language || "en",
        });

        return NextResponse.json<DiscordAnnouncementResponse>({
            success: true,
            announcement,
        });
    } catch (error) {
        console.error("Error in Discord announcement API:", error);
        return NextResponse.json<DiscordAnnouncementResponse>(
            { success: false, error: "Failed to generate announcement" },
            { status: 500 }
        );
    }
}
