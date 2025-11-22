import { NextRequest, NextResponse } from "next/server";
import { generateTwitchBio } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, tone, language, turnstileToken } = body;

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

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Description is required" },
        { status: 400 }
      );
    }

    const bios = await generateTwitchBio({
      description: description.trim(),
      tone: tone || "friendly",
      language: language || "en",
    });

    await saveGenerationLog({
      platform: "twitch",
      tool: "bio-generator",
      requestData: body,
      responseData: { bios },
      userIp,
      language: language || "en",
    });

    return NextResponse.json({
      success: true,
      bios,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate bios. Please try again." },
      { status: 500 }
    );
  }
}
