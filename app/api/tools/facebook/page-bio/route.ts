import { NextRequest, NextResponse } from "next/server";
import { generateFacebookPageBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, industry, description, tone, language, turnstileToken } = body;

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Bot verification required" },
        { status: 403 }
      );
    }

    const userIp = getUserIpFromRequest(request);
    const isValid = await verifyTurnstileToken(turnstileToken, userIp);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Bot verification failed" },
        { status: 403 }
      );
    }

    // Validate inputs
    if (!businessName || businessName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 }
      );
    }

    if (!industry || industry.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Industry is required" },
        { status: 400 }
      );
    }

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Description is required" },
        { status: 400 }
      );
    }

    // Generate bio
    const bio = await generateFacebookPageBio({
      businessName: businessName.trim(),
      industry: industry.trim(),
      description: description.trim(),
      tone: tone || "professional",
      language: language || "en",
    });

    // Log to Appwrite
    await saveGenerationLog({
      platform: "facebook",
      tool: "page-bio",
      requestData: body,
      responseData: { bio },
      userIp: getUserIpFromRequest(request),
      language: language || "en",
    });

    return NextResponse.json({
      success: true,
      bio,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Facebook Page Bio Generator"
  });
}
