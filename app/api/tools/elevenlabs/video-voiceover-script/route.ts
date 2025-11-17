import { NextRequest, NextResponse } from "next/server";
import { generateVideoVoiceoverScript } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, videoType, duration, tone, language, turnstileToken } = body;

    // 1. Verify Turnstile token
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

    // 2. Validate inputs
    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Topic is required" },
        { status: 400 }
      );
    }

    // 3. Generate video voiceover script with DeepSeek
    const script = await generateVideoVoiceoverScript({
      topic: topic.trim(),
      videoType: videoType || "youtube",
      duration: duration || "60s",
      tone: tone || "friendly",
      language: language || "en",
    });

    // 4. Log to Appwrite
    await saveGenerationLog({
      platform: "elevenlabs",
      tool: "video-voiceover-script",
      requestData: body,
      responseData: { script },
      userIp: getUserIpFromRequest(request),
      language: language || "en",
    });

    // 5. Return success
    return NextResponse.json({
      success: true,
      script,
    });
  } catch (error) {
    console.error("Video voiceover script generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate video voiceover script. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ElevenLabs Video Voiceover Script Generator",
  });
}
