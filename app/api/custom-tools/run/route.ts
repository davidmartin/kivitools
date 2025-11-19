import { NextRequest, NextResponse } from "next/server";
import { runCustomTool } from "@/lib/custom-tools";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { toolId, inputs } = body;

        if (!toolId || !inputs) {
            return NextResponse.json(
                { error: "Missing toolId or inputs" },
                { status: 400 }
            );
        }

        const result = await runCustomTool(toolId, inputs);
        return NextResponse.json({ result });
    } catch (error) {
        console.error("Error running tool:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to run tool" },
            { status: 500 }
        );
    }
}
