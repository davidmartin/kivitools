import { NextResponse } from "next/server";
import { generateInstagramBio } from "@/lib/deepseek";
import type { BioGeneratorRequest, BioGeneratorResponse } from "@/types";

export async function POST(request: Request) {
    try {
        const body: BioGeneratorRequest = await request.json();
        const { description, tone, includeEmojis, language } = body;

        // Validación
        if (!description || description.trim().length === 0) {
            return NextResponse.json<BioGeneratorResponse>(
                { success: false, error: "Description is required" },
                { status: 400 }
            );
        }

        if (description.length > 300) {
            return NextResponse.json<BioGeneratorResponse>(
                { success: false, error: "Description is too long (max 300 characters)" },
                { status: 400 }
            );
        }

        // Generar bio con DeepSeek
        const bio = await generateInstagramBio({
            description: description.trim(),
            tone,
            includeEmojis,
            language,
        });

        return NextResponse.json<BioGeneratorResponse>({
            success: true,
            bio,
        });
    } catch (error) {
        console.error("Bio generation error:", error);
        return NextResponse.json<BioGeneratorResponse>(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate bio",
            },
            { status: 500 }
        );
    }
}
