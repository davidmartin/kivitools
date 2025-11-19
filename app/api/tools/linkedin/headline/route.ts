import { generateLinkedInHeadline } from "@/lib/deepseek";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { role, industry, keywords, language } = await req.json();

        if (!role || !industry) {
            return NextResponse.json(
                { error: "Role and industry are required" },
                { status: 400 }
            );
        }

        const headlines = await generateLinkedInHeadline({
            role,
            industry,
            keywords,
            language: language || "es",
        });

        return NextResponse.json({ result: headlines });
    } catch (error) {
        console.error("Error in LinkedIn headline API:", error);
        return NextResponse.json(
            { error: "Failed to generate headlines" },
            { status: 500 }
        );
    }
}
