import { NextRequest, NextResponse } from "next/server";
import { generateTwitchStreamPlan } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { activity, duration, tone, language, turnstileToken } = body;

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

    if (!activity || activity.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Activity/Game is required" },
        { status: 400 }
      );
    }

    const plan = await generateTwitchStreamPlan({
      activity: activity.trim(),
      duration: duration || "2 hours",
      tone: tone || "friendly",
      language: language || "en",
    });

    await saveGenerationLog({
      platform: "twitch",
      tool: "stream-plan-generator",
      requestData: body,
      responseData: { plan },
      userIp,
      language: language || "en",
    });

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate stream plan. Please try again." },
      { status: 500 }
    );
  }
}
