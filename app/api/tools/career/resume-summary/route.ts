import { NextRequest, NextResponse } from "next/server";
import { generateResumeSummary } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { profession, experience, skills, language, turnstileToken } = body;

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

        if (!profession?.trim()) {
            return NextResponse.json(
                { success: false, error: "Profession is required" },
                { status: 400 }
            );
        }

        const result = await generateResumeSummary({
            profession: profession.trim(),
            experience: experience?.trim() || "",
            skills: skills?.trim() || "",
            language: language || "en",
        });

        await saveGenerationLog({
            platform: "career",
            tool: "resume-summary",
            requestData: body,
            responseData: { result },
            userIp,
            language: language || "en",
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Resume summary error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate resume summary" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: "ok", service: "Resume Summary Generator" });
}
