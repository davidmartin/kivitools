import { NextRequest, NextResponse } from "next/server";
import { generateFacebookAdCopy } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, targetAudience, benefit, tone, language, turnstileToken } = body;

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
    if (!product || product.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Product is required" },
        { status: 400 }
      );
    }

    if (!targetAudience || targetAudience.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Target audience is required" },
        { status: 400 }
      );
    }

    if (!benefit || benefit.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Benefit is required" },
        { status: 400 }
      );
    }

    // Generate ad copy
    const adCopy = await generateFacebookAdCopy({
      product: product.trim(),
      targetAudience: targetAudience.trim(),
      benefit: benefit.trim(),
      tone: tone || "persuasive",
      language: language || "en",
    });

    // Log to Appwrite
    await saveGenerationLog({
      platform: "facebook",
      tool: "ad-copy",
      requestData: body,
      responseData: { adCopy },
      userIp: getUserIpFromRequest(request),
      language: language || "en",
    });

    return NextResponse.json({
      success: true,
      headline: adCopy.headline,
      primaryText: adCopy.primaryText,
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
    service: "Facebook Ad Copy Generator"
  });
}
