import { NextRequest, NextResponse } from "next/server";
import { generateToolFromQuery } from "@/lib/deepseek";
import type { AutoCreateRequest, AutoCreateResponse } from "@/types/search";

/**
 * POST /api/tools/auto-create
 *
 * Generates a tool configuration from a user's search query using AI.
 * Used when user clicks "Create this tool" in search results.
 */
export async function POST(request: NextRequest): Promise<NextResponse<AutoCreateResponse>> {
    try {
        const body: AutoCreateRequest = await request.json();
        const { query, language = "en", suggestedPlatform } = body;

        // Validate query
        if (!query || query.trim().length < 3) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Query must be at least 3 characters",
                },
                { status: 400 }
            );
        }

        // Validate language
        if (language && !["en", "es"].includes(language)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Language must be 'en' or 'es'",
                },
                { status: 400 }
            );
        }

        // Generate tool configuration using AI
        const config = await generateToolFromQuery({
            query: query.trim(),
            language: language as "en" | "es",
            suggestedPlatform,
        });

        return NextResponse.json({
            success: true,
            config,
        });
    } catch (error) {
        console.error("Auto-create API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate tool configuration. Please try again.",
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/tools/auto-create
 *
 * Health check endpoint.
 */
export async function GET(): Promise<NextResponse> {
    return NextResponse.json({
        status: "ok",
        service: "Auto-Create Tool Generator",
    });
}
