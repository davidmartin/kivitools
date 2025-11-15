import { NextRequest, NextResponse } from "next/server";
import { generateTikTokUsernames } from "@/lib/deepseek";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { keywords, style } = body;

        if (!keywords || keywords.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Keywords are required",
                },
                { status: 400 }
            );
        }

        if (keywords.length > 200) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Keywords are too long (max 200 characters)",
                },
                { status: 400 }
            );
        }

        const usernames = await generateTikTokUsernames({
            keywords: keywords.trim(),
            style: style || "creative",
        });

        return NextResponse.json({
            success: true,
            usernames,
        });
    } catch (error) {
        console.error("Username generation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate usernames. Please try again.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "TikTok Username Generator" });
}
