import { NextRequest, NextResponse } from "next/server";
import { generateFacebookPost } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, tone, includeEmojis, includeHashtags, language, turnstileToken } = body;

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
    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Topic is required" },
        { status: 400 }
      );
    }

    // Generate post
    const post = await generateFacebookPost({
      topic: topic.trim(),
      tone: tone || "casual",
      includeEmojis: includeEmojis ?? true,
      includeHashtags: includeHashtags ?? false,
      language: language || "en",
    });

    // Log to Appwrite
    await saveGenerationLog({
      platform: "facebook",
      tool: "post-generator",
      requestData: body,
      responseData: { post },
      userIp: getUserIpFromRequest(request),
      language: language || "en",
    });

    return NextResponse.json({
      success: true,
      post,
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
    service: "Facebook Post Generator"
  });
}
