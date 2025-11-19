import { NextRequest, NextResponse } from "next/server";
import { getToolById, deleteTool } from "@/lib/custom-tools";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const tool = await getToolById(id);
        return NextResponse.json({ tool });
    } catch (error) {
        console.error("Error fetching tool:", error);
        return NextResponse.json(
            { error: "Tool not found or failed to fetch" },
            { status: 404 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteTool(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting tool:", error);
        return NextResponse.json(
            { error: "Failed to delete tool" },
            { status: 500 }
        );
    }
}
