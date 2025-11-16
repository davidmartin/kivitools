import { NextResponse } from "next/server";
import { databases, getUserIpFromRequest } from "@/lib/appwrite";
import { ID } from "node-appwrite";

const CONTACT_DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const CONTACT_COLLECTION_ID = process.env.APPWRITE_CONTACT_COLLECTION_ID || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, language } = body;

    // Validate required fields
    if (!name || !email || !message) {
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
    if (!CONTACT_DATABASE_ID || !CONTACT_COLLECTION_ID) {
      console.error("Appwrite contact collection not configured");
      return NextResponse.json(
        { error: "Contact service not configured" },
        { status: 500 }
      );
    }

    await databases.createDocument(
      CONTACT_DATABASE_ID,
      CONTACT_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        language: language || "en",
        userIp,
        status: "new",
        createdAt: new Date().toISOString(),
      }
    );

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
