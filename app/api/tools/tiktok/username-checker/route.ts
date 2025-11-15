import { NextRequest, NextResponse } from "next/server";
import { generateTikTokUsernames } from "@/lib/deepseek";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username } = body;

        if (!username || username.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Username is required",
                },
                { status: 400 }
            );
        }

        if (username.length > 30) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Username is too long (max 30 characters)",
                },
                { status: 400 }
            );
        }

        // Simulate checking (30% chance of being available for demo purposes)
        const isAvailable = Math.random() > 0.7;

        if (isAvailable) {
            return NextResponse.json({
                success: true,
                available: true,
            });
        }

        // Generate alternative suggestions using AI
        const suggestions = await generateTikTokUsernames({
            keywords: username,
            style: "creative",
        });

        return NextResponse.json({
            success: true,
            available: false,
            suggestions: suggestions.slice(0, 6),
        });
    } catch (error) {
        console.error("Username check error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to check username. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Username Checker" });
}
