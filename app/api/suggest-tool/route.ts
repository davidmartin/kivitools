import { NextResponse } from "next/server";
import { databases, getUserIpFromRequest } from "@/lib/appwrite";
import { ID } from "node-appwrite";

const CONTACT_DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const SUGGESTIONS_COLLECTION_ID = process.env.APPWRITE_SUGGESTIONS_COLLECTION_ID || "";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, platform, toolName, toolPurpose, additionalInfo, language } = body;

        // Validate required fields
        if (!name || !email || !platform || !toolName || !toolPurpose) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Get user IP
        const userIp = getUserIpFromRequest(request);

        // Save to Appwrite
        if (!CONTACT_DATABASE_ID || !SUGGESTIONS_COLLECTION_ID) {
            console.error("Appwrite suggestions collection not configured");
            return NextResponse.json(
                { error: "Suggestion service not configured" },
                { status: 500 }
            );
        }

        await databases.createDocument(
            CONTACT_DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                platform,
                toolName,
                toolPurpose,
                additionalInfo: additionalInfo || "",
                language: language || "en",
                userIp,
                status: "new",
                createdAt: new Date().toISOString(),
            }
        );

        return NextResponse.json(
            { success: true, message: "Suggestion sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving tool suggestion:", error);
        return NextResponse.json(
            { error: "Failed to send suggestion" },
            { status: 500 }
        );
    }
}
