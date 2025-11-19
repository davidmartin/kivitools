import { NextRequest, NextResponse } from "next/server";
import { createCustomTool, getUserTools, CreateToolParams } from "@/lib/custom-tools";

export async function GET(request: NextRequest) {
    try {
        // In a real app, we would get the user ID from the session/auth
        // For now, we'll accept a query param or header, or default to "anonymous" if allowed,
        // but the plan implies user-specific tools.
        // Let's check for a 'x-user-id' header for simplicity in this MVP, 
        // or query param 'userId'.

        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get("userId") || request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const tools = await getUserTools(userId);
        return NextResponse.json({ tools });
    } catch (error) {
        console.error("Error fetching tools:", error);
        return NextResponse.json(
            { error: "Failed to fetch tools" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.userId || !body.name || !body.inputs || !body.promptTemplate) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const params: CreateToolParams = {
            userId: body.userId,
            name: body.name,
            description: body.description || "",
            icon: body.icon || "⚡",
            inputs: body.inputs,
            promptTemplate: body.promptTemplate,
            systemPrompt: body.systemPrompt,
        };

        const tool = await createCustomTool(params);
        return NextResponse.json({ tool }, { status: 201 });
    } catch (error) {
        console.error("Error creating tool:", error);
        return NextResponse.json(
            { error: "Failed to create tool" },
            { status: 500 }
        );
    }
}
