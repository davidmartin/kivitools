import { generateLinkedInPost } from "@/lib/deepseek";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { topic, tone, language } = await req.json();

        if (!topic) {
            return NextResponse.json(
                { error: "Topic is required" },
                { status: 400 }
            );
        }

        const post = await generateLinkedInPost({
            topic,
            tone: tone || "professional",
            language: language || "es",
        });

        return NextResponse.json({ result: post });
    } catch (error) {
        console.error("Error in LinkedIn post API:", error);
        return NextResponse.json(
            { error: "Failed to generate post" },
            { status: 500 }
        );
    }
}
