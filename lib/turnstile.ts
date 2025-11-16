/**
 * Server-side Cloudflare Turnstile token verification
 */

interface TurnstileVerificationResponse {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
}

/**
 * Verify a Turnstile token with Cloudflare's API
 * @param token - The token received from the client-side widget
 * @param remoteIp - Optional: The user's IP address for additional validation
 * @returns Promise<boolean> - true if verification succeeds, false otherwise
 */
export async function verifyTurnstileToken(
    token: string,
    remoteIp?: string
): Promise<boolean> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        console.error("TURNSTILE_SECRET_KEY is not configured");
        return false;
    }

    if (!token) {
        console.error("No Turnstile token provided");
        return false;
    }

    try {
        const formData = new URLSearchParams();
        formData.append("secret", secretKey);
        formData.append("response", token);
        if (remoteIp) {
            formData.append("remoteip", remoteIp);
        }

        const response = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            }
        );

        if (!response.ok) {
            console.error(
                `Turnstile verification request failed: ${response.status}`
            );
            return false;
        }

        const data: TurnstileVerificationResponse = await response.json();

        if (!data.success) {
            console.error("Turnstile verification failed:", data["error-codes"]);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error verifying Turnstile token:", error);
        return false;
    }
}
