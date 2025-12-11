import { NextRequest, NextResponse } from "next/server";
import { validateToken, checkAndIncrementUsage } from "@/lib/api-tokens";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";

// Import all generation functions from deepseek
import {
    generateTikTokScript,
    generateVideoIdeas,
    generateHooks,
    generateHashtags,
    generateTikTokUsernames,
    generateInstagramCaption,
    generateInstagramBio,
    generateYouTubeTitles,
    generateYouTubeDescription,
    generateYouTubeScript,
    generateTweet,
    generateTwitterThread,
    generateTwitterBio,
    generateSnapchatCaption,
    generateSnapchatStoryIdeas,
    generateRedditPost,
    generateDiscordAnnouncement,
    generateTwitchStreamTitles,
} from "@/lib/deepseek";

// Wrapper to convert multi-arg functions to single object param
const createWrapper = (fn: (...args: any[]) => Promise<any>) => {
    return async (params: Record<string, any>) => {
        // For functions that expect object params, pass directly
        return fn(params);
    };
};

// Mapping of platform/tool to deepseek function
const TOOL_FUNCTIONS: Record<string, Record<string, (params: any) => Promise<any>>> = {
    tiktok: {
        "script-writer": createWrapper(generateTikTokScript),
        "video-ideas": createWrapper(generateVideoIdeas),
        "hook-generator": createWrapper(generateHooks),
        "hashtag-generator": createWrapper(generateHashtags),
        "username-generator": createWrapper(generateTikTokUsernames),
    },
    instagram: {
        "caption-generator": createWrapper(generateInstagramCaption),
        "bio-generator": createWrapper(generateInstagramBio),
    },
    youtube: {
        "title-generator": async (params: any) => generateYouTubeTitles(params.topic, params.language || "en"),
        "description-generator": async (params: any) => generateYouTubeDescription(params.topic, params.keywords || "", params.language || "en"),
        "script-generator": async (params: any) => generateYouTubeScript(params.topic, params.tone || "professional", params.duration || "10 minutes", params.language || "en"),
    },
    twitter: {
        "tweet-generator": createWrapper(generateTweet),
        "thread-maker": createWrapper(generateTwitterThread),
        "bio-generator": createWrapper(generateTwitterBio),
    },
    snapchat: {
        "caption-generator": createWrapper(generateSnapchatCaption),
        "story-ideas": createWrapper(generateSnapchatStoryIdeas),
    },
    reddit: {
        "post-generator": async (params: any) => generateRedditPost(params.topic, params.subreddit || "general", params.tone || "casual", params.language || "en"),
    },
    discord: {
        "announcement-generator": createWrapper(generateDiscordAnnouncement),
    },
    twitch: {
        "stream-title": createWrapper(generateTwitchStreamTitles),
    },
};

// Extract Bearer token from Authorization header
function extractToken(request: NextRequest): string | null {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7);
}

interface RouteParams {
    params: Promise<{
        platform: string;
        tool: string;
    }>;
}

/**
 * POST /api/v1/tools/[platform]/[tool]
 * Authenticated API access with token
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
    const { platform, tool } = await params;

    // 1. Extract and validate token
    const token = extractToken(request);

    if (!token) {
        return NextResponse.json(
            {
                success: false,
                error: "Authorization required. Use 'Authorization: Bearer YOUR_TOKEN' header.",
                docs: "https://kivitools.com/docs/api"
            },
            { status: 401 }
        );
    }

    const tokenValidation = await validateToken(token);

    if (!tokenValidation.valid) {
        return NextResponse.json(
            {
                success: false,
                error: "Invalid or revoked API token",
                hint: "Generate a new token at kivitools.com/dashboard/api-access"
            },
            { status: 401 }
        );
    }

    // 2. Check rate limit
    const usageCheck = await checkAndIncrementUsage(tokenValidation.userId!);

    if (!usageCheck.allowed) {
        return NextResponse.json(
            {
                success: false,
                error: "Daily request limit exceeded",
                limit: usageCheck.limit,
                used: usageCheck.used,
                hint: "Visit kivitools.com/dashboard/api-access to renew your limit",
                renewUrl: "https://kivitools.com/dashboard/api-access"
            },
            { status: 429 }
        );
    }

    // 3. Validate platform and tool exist
    const platformTools = TOOL_FUNCTIONS[platform];
    if (!platformTools) {
        return NextResponse.json(
            {
                success: false,
                error: `Platform '${platform}' not found`,
                availablePlatforms: Object.keys(TOOL_FUNCTIONS)
            },
            { status: 404 }
        );
    }

    const toolFunction = platformTools[tool];
    if (!toolFunction) {
        return NextResponse.json(
            {
                success: false,
                error: `Tool '${tool}' not found for platform '${platform}'`,
                availableTools: Object.keys(platformTools)
            },
            { status: 404 }
        );
    }

    // 4. Process the request
    try {
        const body = await request.json();

        // Execute the tool function
        const result = await toolFunction(body);

        // Log the API usage
        await saveGenerationLog({
            platform,
            tool,
            requestData: { ...body, apiAccess: true },
            responseData: { result },
            userId: tokenValidation.userId,
            userIp: getUserIpFromRequest(request),
            language: body.language || "en"
        });

        return NextResponse.json({
            success: true,
            result,
            usage: {
                remaining: usageCheck.remaining,
                limit: usageCheck.limit
            }
        });
    } catch (error) {
        console.error(`API v1 error [${platform}/${tool}]:`, error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate content. Please try again.",
                usage: {
                    remaining: usageCheck.remaining,
                    limit: usageCheck.limit
                }
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/v1/tools/[platform]/[tool]
 * Returns tool info and required parameters
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { platform, tool } = await params;

    // Check if tool exists
    const platformTools = TOOL_FUNCTIONS[platform];
    if (!platformTools) {
        return NextResponse.json(
            {
                success: false,
                error: `Platform '${platform}' not found`,
                availablePlatforms: Object.keys(TOOL_FUNCTIONS)
            },
            { status: 404 }
        );
    }

    if (!platformTools[tool]) {
        return NextResponse.json(
            {
                success: false,
                error: `Tool '${tool}' not found`,
                availableTools: Object.keys(platformTools)
            },
            { status: 404 }
        );
    }

    // Return tool info
    return NextResponse.json({
        success: true,
        platform,
        tool,
        endpoint: `/api/v1/tools/${platform}/${tool}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        example: getToolExample(platform, tool)
    });
}

// Helper function to get example request body for each tool
function getToolExample(platform: string, tool: string): object {
    const examples: Record<string, Record<string, object>> = {
        tiktok: {
            "script-writer": { topic: "productivity tips", tone: "friendly", duration: "30-60s", language: "en" },
            "video-ideas": { topic: "cooking", count: 5, language: "en" },
            "hook-generator": { topic: "fitness", count: 5, language: "en" },
            "hashtag-generator": { topic: "travel vlog", count: 10, language: "en" },
            "username-generator": { keywords: "gaming", style: "creative", count: 10 },
            "bio-generator": { niche: "fitness coach", style: "professional", language: "en" }
        },
        instagram: {
            "caption-generator": { topic: "beach sunset", tone: "aesthetic", language: "en" },
            "bio-generator": { niche: "travel blogger", style: "creative", language: "en" },
            "hashtag-generator": { topic: "food photography", count: 20, language: "en" },
            "story-ideas": { topic: "behind the scenes", count: 5, language: "en" },
            "reel-ideas": { topic: "fashion tips", count: 5, language: "en" }
        },
        youtube: {
            "title-generator": { topic: "how to learn coding", style: "clickbait", count: 5, language: "en" },
            "description-generator": { title: "10 VS Code Tips", topic: "programming", language: "en" },
            "script-generator": { topic: "react tutorial", duration: "10 minutes", language: "en" },
            "tag-generator": { topic: "tech review", count: 15, language: "en" },
            "video-ideas": { niche: "technology", count: 5, language: "en" }
        },
        twitter: {
            "tweet-generator": { topic: "AI news", tone: "professional", count: 5, language: "en" },
            "thread-maker": { topic: "startup lessons", points: 10, language: "en" },
            "bio-generator": { profession: "software engineer", interests: "AI, startups", language: "en" }
        }
    };

    return examples[platform]?.[tool] || { topic: "your topic here", language: "en" };
}
