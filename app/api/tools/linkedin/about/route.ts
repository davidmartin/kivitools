import { generateLinkedInAbout } from "@/lib/deepseek";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { role, experience, skills, achievements, language } = await req.json();

        if (!role || !experience || !skills) {
            return NextResponse.json(
                { error: "Role, experience, and skills are required" },
                { status: 400 }
            );
        }

        const about = await generateLinkedInAbout({
            role,
            experience,
            skills,
            achievements,
            language: language || "es",
        });

        return NextResponse.json({ result: about });
    } catch (error) {
        console.error("Error in LinkedIn about API:", error);
        return NextResponse.json(
            { error: "Failed to generate about section" },
            { status: 500 }
        );
    }
}
