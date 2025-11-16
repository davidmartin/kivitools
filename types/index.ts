// Base interface for all tool requests with Turnstile protection
export interface BaseToolRequest {
    turnstileToken?: string;
}

// TikTok Script Writer Types
export interface ScriptWriterRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    duration: string;
    language: string;
}

export interface ScriptWriterResponse {
    success: boolean;
    script?: string;
    error?: string;
}

// TikTok Video Ideas Generator Types
export interface VideoIdeasRequest extends BaseToolRequest {
    topic: string;
    language: string;
}

export interface VideoIdeasResponse {
    success: boolean;
    ideas?: string[];
    error?: string;
}

// TikTok Hook Generator Types
export interface HookGeneratorRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    language: string;
}

export interface HookGeneratorResponse {
    success: boolean;
    hooks?: string[];
    error?: string;
}

// TikTok Hashtag Generator Types
export interface HashtagGeneratorRequest extends BaseToolRequest {
    keyword: string;
}

export interface HashtagGeneratorResponse {
    success: boolean;
    hashtags?: Array<{
        tag: string;
        views: string;
        relevance: string;
    }>;
    error?: string;
}

// Instagram Caption Generator Types
export interface CaptionGeneratorRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    includeEmojis: boolean;
    includeHashtags: boolean;
    language: string;
}

export interface CaptionGeneratorResponse {
    success: boolean;
    caption?: string;
    error?: string;
}

// Instagram Bio Generator Types
export interface BioGeneratorRequest extends BaseToolRequest {
    description: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}

export interface BioGeneratorResponse {
    success: boolean;
    bio?: string;
    error?: string;
}

// Instagram Reel Script Types
export interface ReelScriptRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    duration: string;
    language: string;
}

export interface ReelScriptResponse {
    success: boolean;
    script?: string;
    error?: string;
}

// Twitter Thread Maker Types
export interface ThreadMakerRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    numberOfTweets: number;
    language: string;
}

export interface ThreadMakerResponse {
    success: boolean;
    tweets?: string[];
    error?: string;
}

// Twitter Bio Generator Types
export interface TwitterBioRequest extends BaseToolRequest {
    description: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}

export interface TwitterBioResponse {
    success: boolean;
    bio?: string;
    error?: string;
}

// Tweet Generator Types
export interface TweetGeneratorRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    language: string;
}

export interface TweetGeneratorResponse {
    success: boolean;
    tweets?: string[];
    error?: string;
}

// Snapchat Caption Generator Types
export interface SnapchatCaptionRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}

export interface SnapchatCaptionResponse {
    success: boolean;
    caption?: string;
    error?: string;
}

// Snapchat Story Idea Generator Types
export interface SnapchatStoryIdeasRequest extends BaseToolRequest {
    topic: string;
    language: string;
}

export interface SnapchatStoryIdeasResponse {
    success: boolean;
    ideas?: string[];
    error?: string;
}

// Snapchat Lens Idea Generator Types
export interface SnapchatLensIdeasRequest extends BaseToolRequest {
    topic: string;
    language: string;
}

export interface SnapchatLensIdeasResponse {
    success: boolean;
    ideas?: string[];
    error?: string;
}

// Opciones disponibles
export const TONE_KEYS = [
    "formal",
    "friendly",
    "casual",
    "professional",
    "diplomatic",
    "confident",
    "middleSchool",
    "highSchool",
    "academic",
    "simplified",
    "bold",
    "empathetic",
    "luxury",
    "engaging",
    "direct",
    "persuasive",
] as const;

export const TONES = [
    { value: "formal", labelKey: "tones.formal" },
    { value: "friendly", labelKey: "tones.friendly" },
    { value: "casual", labelKey: "tones.casual" },
    { value: "professional", labelKey: "tones.professional" },
    { value: "diplomatic", labelKey: "tones.diplomatic" },
    { value: "confident", labelKey: "tones.confident" },
    { value: "middle-school", labelKey: "tones.middleSchool" },
    { value: "high-school", labelKey: "tones.highSchool" },
    { value: "academic", labelKey: "tones.academic" },
    { value: "simplified", labelKey: "tones.simplified" },
    { value: "bold", labelKey: "tones.bold" },
    { value: "empathetic", labelKey: "tones.empathetic" },
    { value: "luxury", labelKey: "tones.luxury" },
    { value: "engaging", labelKey: "tones.engaging" },
    { value: "direct", labelKey: "tones.direct" },
    { value: "persuasive", labelKey: "tones.persuasive" },
] as const;

export const THREAD_LENGTHS = [
    { value: 3, label: "3 tweets" },
    { value: 5, label: "5 tweets" },
    { value: 7, label: "7 tweets" },
    { value: 10, label: "10 tweets" },
] as const;

export const DURATIONS = [
    { value: "30-60s", labelKey: "durations.tiktok.short" },
    { value: "30s", labelKey: "durations.tiktok.thirty" },
    { value: "60s", labelKey: "durations.tiktok.sixty" },
] as const;

export const REEL_DURATIONS = [
    { value: "15s", labelKey: "durations.reel.fifteen" },
    { value: "30s", labelKey: "durations.reel.thirty" },
    { value: "60s", labelKey: "durations.reel.sixty" },
] as const;

export const LANGUAGES = [
    { value: "en", labelKey: "languages.en" },
    { value: "es", labelKey: "languages.es" },
    { value: "fr", labelKey: "languages.fr" },
    { value: "zh", labelKey: "languages.zh" },
    { value: "hi", labelKey: "languages.hi" },
    { value: "ar", labelKey: "languages.ar" },
    { value: "ru", labelKey: "languages.ru" },
    { value: "de", labelKey: "languages.de" },
    { value: "ja", labelKey: "languages.ja" },
    { value: "id", labelKey: "languages.id" },
    { value: "vi", labelKey: "languages.vi" },
    { value: "th", labelKey: "languages.th" },
    { value: "ko", labelKey: "languages.ko" },
] as const;

// YouTube Video Script Generator Types
export interface YouTubeScriptRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    duration: string;
    language: string;
}

export interface YouTubeScriptResponse {
    success: boolean;
    script?: string;
    error?: string;
}

// YouTube Title Generator Types
export interface YouTubeTitleRequest extends BaseToolRequest {
    topic: string;
    language: string;
}

export interface YouTubeTitleResponse {
    success: boolean;
    titles?: string[];
    error?: string;
}

// YouTube Description Generator Types
export interface YouTubeDescriptionRequest extends BaseToolRequest {
    topic: string;
    keywords: string;
    language: string;
}

export interface YouTubeDescriptionResponse {
    success: boolean;
    description?: string;
    error?: string;
}

// Reddit Post Generator Types
export interface RedditPostRequest extends BaseToolRequest {
    topic: string;
    subreddit: string;
    tone: string;
    language: string;
}

export interface RedditPostResponse {
    success: boolean;
    title?: string;
    content?: string;
    error?: string;
}

// Reddit Comment Generator Types
export interface RedditCommentRequest extends BaseToolRequest {
    postContext: string;
    tone: string;
    language: string;
}

export interface RedditCommentResponse {
    success: boolean;
    comment?: string;
    error?: string;
}

// Reddit AMA Question Generator Types
export interface RedditAMARequest extends BaseToolRequest {
    topic: string;
    language: string;
}

export interface RedditAMAResponse {
    success: boolean;
    questions?: string[];
    error?: string;
}

export const YOUTUBE_DURATIONS = [
    { value: "1-3min", labelKey: "durations.youtube.short" },
    { value: "5-10min", labelKey: "durations.youtube.medium" },
    { value: "15-20min", labelKey: "durations.youtube.long" },
] as const;

// Discord Server Announcement Types
export interface DiscordAnnouncementRequest extends BaseToolRequest {
    topic: string;
    tone: string;
    language: string;
}

export interface DiscordAnnouncementResponse {
    success: boolean;
    announcement?: string;
    error?: string;
}

// Discord Welcome Message Types
export interface DiscordWelcomeRequest extends BaseToolRequest {
    serverName: string;
    tone: string;
    language: string;
}

export interface DiscordWelcomeResponse {
    success: boolean;
    message?: string;
    error?: string;
}

// Discord Event Description Types
export interface DiscordEventRequest extends BaseToolRequest {
    eventName: string;
    eventDetails: string;
    tone: string;
    language: string;
}

export interface DiscordEventResponse {
    success: boolean;
    description?: string;
    error?: string;
}

// Twitch Stream Title Types
export interface TwitchStreamTitleRequest extends BaseToolRequest {
    game: string;
    tone: string;
    language: string;
}

export interface TwitchStreamTitleResponse {
    success: boolean;
    titles?: string[];
    error?: string;
}

// Twitch Chat Command Response Types
export interface TwitchCommandRequest extends BaseToolRequest {
    commandName: string;
    purpose: string;
    tone: string;
    language: string;
}

export interface TwitchCommandResponse {
    success: boolean;
    response?: string;
    error?: string;
}

// Twitch Panel Description Types
export interface TwitchPanelRequest extends BaseToolRequest {
    panelType: string;
    content: string;
    language: string;
}

export interface TwitchPanelResponse {
    success: boolean;
    description?: string;
    error?: string;
}
