"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { Button, Card, Chip, Alert } from "@heroui/react";
import Link from "next/link";

// Platform emojis for display
const PLATFORM_EMOJIS: Record<string, string> = {
    amazon: "📦",
    linkedin: "💼",
    tiktok: "🎵",
    instagram: "📸",
    twitter: "🐦",
    snapchat: "👻",
    youtube: "📺",
    reddit: "🤖",
    discord: "💬",
    twitch: "🎮",
    suno: "🎵",
    elevenlabs: "🎙️",
    forocoches: "🚗",
    pinterest: "📌",
    spotify: "🎧",
    facebook: "📘",
    threads: "🧵",
};

// Tool interface
interface Tool {
    platform: string;
    name: string;
    href: string;
    slug: string;
}

// Flattened tool list from PLATFORM_TOOLS
const PLATFORM_TOOLS: Record<string, { name: string; href: string }[]> = {
    amazon: [
        { name: "productDescriptionGenerator.title", href: "/amazon/product-description-generator" },
        { name: "productReviewGenerator.title", href: "/amazon/product-review-generator" },
        { name: "productComparisonGenerator.title", href: "/amazon/product-comparison-generator" },
    ],
    linkedin: [
        { name: "linkedinPost.title", href: "/linkedin/post-generator" },
        { name: "linkedinHeadline.title", href: "/linkedin/headline-generator" },
        { name: "linkedinAbout.title", href: "/linkedin/about-generator" },
    ],
    tiktok: [
        { name: "scriptWriter.title", href: "/tiktok/script-writer" },
        { name: "videoIdeas.title", href: "/tiktok/video-ideas" },
        { name: "hookGenerator.title", href: "/tiktok/hook-generator" },
        { name: "hashtagGenerator.title", href: "/tiktok/hashtag-generator" },
    ],
    instagram: [
        { name: "captionGenerator.title", href: "/instagram/caption-generator" },
        { name: "bioGenerator.title", href: "/instagram/bio-generator" },
        { name: "reelScript.title", href: "/instagram/reel-script" },
    ],
    twitter: [
        { name: "threadMaker.title", href: "/twitter/thread-maker" },
        { name: "twitterBio.title", href: "/twitter/bio-generator" },
        { name: "tweetGenerator.title", href: "/twitter/tweet-generator" },
    ],
    snapchat: [
        { name: "snapchatCaption.title", href: "/snapchat/caption-generator" },
        { name: "snapchatStoryIdeas.title", href: "/snapchat/story-ideas" },
        { name: "snapchatLensIdeas.title", href: "/snapchat/lens-ideas" },
    ],
    youtube: [
        { name: "youtubeScript.title", href: "/youtube/script-generator" },
        { name: "youtubeTitle.title", href: "/youtube/title-generator" },
        { name: "youtubeDescription.title", href: "/youtube/description-generator" },
        { name: "youtubeTagGenerator.title", href: "/youtube/tag-generator" },
        { name: "youtubeVideoIdeas.title", href: "/youtube/video-ideas" },
        { name: "youtubeCommunityPost.title", href: "/youtube/community-post-generator" },
    ],
    reddit: [
        { name: "redditPost.title", href: "/reddit/post-generator" },
        { name: "redditComment.title", href: "/reddit/comment-generator" },
        { name: "redditAMA.title", href: "/reddit/ama-questions" },
    ],
    discord: [
        { name: "discordAnnouncement.title", href: "/discord/announcement-generator" },
        { name: "discordWelcome.title", href: "/discord/welcome-message" },
        { name: "discordEvent.title", href: "/discord/event-description" },
    ],
    twitch: [
        { name: "twitchStreamTitle.title", href: "/twitch/stream-title" },
        { name: "twitchCommand.title", href: "/twitch/chat-command" },
        { name: "twitchPanel.title", href: "/twitch/panel-description" },
    ],
    suno: [
        { name: "sunoLyricGenerator.title", href: "/suno/lyric-generator" },
        { name: "sunoMusicPrompt.title", href: "/suno/music-prompt-generator" },
        { name: "sunoSongDescription.title", href: "/suno/song-description-generator" },
    ],
    elevenlabs: [
        { name: "voiceScriptWriter.title", href: "/elevenlabs/voice-script-writer" },
        { name: "videoVoiceoverScript.title", href: "/elevenlabs/video-voiceover-script" },
        { name: "voiceTextFormatter.title", href: "/elevenlabs/voice-text-formatter" },
    ],
    forocoches: [
        { name: "forocochesThread.title", href: "/forocoches/thread-generator" },
        { name: "forocochesPole.title", href: "/forocoches/pole-generator" },
        { name: "forocochesTroll.title", href: "/forocoches/troll-response" },
    ],
    pinterest: [
        { name: "pinterestPinDescription.title", href: "/pinterest/pin-description" },
        { name: "pinterestBoardName.title", href: "/pinterest/board-name" },
        { name: "pinterestProfileBio.title", href: "/pinterest/profile-bio" },
    ],
    spotify: [
        { name: "spotifyPlaylistName.title", href: "/spotify/playlist-name" },
        { name: "spotifyPlaylistDescription.title", href: "/spotify/playlist-description" },
        { name: "spotifyArtistBio.title", href: "/spotify/artist-bio" },
    ],
    facebook: [
        { name: "facebookPost.title", href: "/facebook/post-generator" },
        { name: "facebookPageBio.title", href: "/facebook/page-bio" },
        { name: "facebookAdCopy.title", href: "/facebook/ad-copy" },
    ],
    threads: [
        { name: "threadsPost.title", href: "/threads/post-generator" },
        { name: "threadsBio.title", href: "/threads/bio-generator" },
    ],
};

// Get all tools flattened
function getAllTools(t: (key: string) => string): Tool[] {
    return Object.entries(PLATFORM_TOOLS)
        .flatMap(([platform, tools]) =>
            tools.map(tool => ({
                platform,
                name: t(tool.name),
                href: tool.href,
                slug: tool.href.split("/").pop() || "",
            }))
        )
        .filter(tool => tool.slug);
}

type WorkflowStep = "select" | "prompt" | "upload" | "caption" | "ready";

interface UploadedVideo {
    file: File;
    objectUrl: string;
    fileName: string;
}

interface CaptionData {
    caption: string;
    hashtags: string[];
    toolUrl: string;
}

export default function VideoGeneratorPage() {
    const { user, loading: authLoading } = useAuth();
    const { t, language } = useLanguage();
    const router = useRouter();

    // Workflow state
    const [currentStep, setCurrentStep] = useState<WorkflowStep>("select");
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [video, setVideo] = useState<UploadedVideo | null>(null);
    const [caption, setCaption] = useState<CaptionData | null>(null);
    const [editedCaption, setEditedCaption] = useState<string>("");

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [showToolSelector, setShowToolSelector] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get all tools with translations
    const allTools = getAllTools(t);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
                return;
            }
            if (!user.labels || !user.labels.includes("admin")) {
                setPageLoading(false);
                return;
            }
            setPageLoading(false);
        }
    }, [user, authLoading, router]);

    // Cleanup video object URL on unmount
    useEffect(() => {
        return () => {
            if (video?.objectUrl) {
                URL.revokeObjectURL(video.objectUrl);
            }
        };
    }, [video]);

    // Loading state
    if (authLoading || pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Access Denied View
    if (!user || !user.labels || !user.labels.includes("admin")) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-3xl font-bold text-danger mb-4">🚫 {t("admin.accessDenied")}</h1>
                <Link href="/">
                    <Button variant="ghost">{t("admin.backHome")}</Button>
                </Link>
            </div>
        );
    }

    // Get tool description from translation
    const getToolDescription = (tool: Tool): string => {
        const descKey = tool.slug
            .split("-")
            .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
            .join("") + ".description";
        return t(descKey) || tool.name;
    };

    // Handle tool selection
    const handleSelectTool = (tool: Tool) => {
        setSelectedTool(tool);
        setShowToolSelector(false);
        setCurrentStep("prompt");
        setError("");
    };

    // Generate Veo 2 prompt
    const handleGeneratePrompt = async () => {
        if (!selectedTool) {
            setError(t("admin.videoGenerator.error.noTool"));
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/video-generator/prompt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platform: selectedTool.platform,
                    toolSlug: selectedTool.slug,
                    toolName: selectedTool.name,
                    toolDescription: getToolDescription(selectedTool),
                    language,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to generate prompt");
            }

            setPrompt(data.prompt);
            setCurrentStep("upload");
        } catch (err) {
            setError(t("admin.videoGenerator.error.promptFailed"));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Copy prompt to clipboard
    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            alert(t("admin.videoGenerator.promptCopied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Handle video upload
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate format
        if (!file.type.includes("mp4")) {
            setError(t("admin.videoGenerator.error.invalidFormat"));
            return;
        }

        // Validate size (100MB)
        if (file.size > 100 * 1024 * 1024) {
            setError(t("admin.videoGenerator.error.tooLarge"));
            return;
        }

        // Clean up previous video
        if (video?.objectUrl) {
            URL.revokeObjectURL(video.objectUrl);
        }

        const objectUrl = URL.createObjectURL(file);
        setVideo({
            file,
            objectUrl,
            fileName: file.name,
        });
        setError("");
        setCurrentStep("caption");
    };

    // Generate TikTok caption
    const handleGenerateCaption = async () => {
        if (!selectedTool) {
            setError(t("admin.videoGenerator.error.noTool"));
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/video-generator/caption", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platform: selectedTool.platform,
                    toolSlug: selectedTool.slug,
                    toolName: selectedTool.name,
                    toolDescription: getToolDescription(selectedTool),
                    language,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to generate caption");
            }

            setCaption({
                caption: data.caption,
                hashtags: data.hashtags,
                toolUrl: data.toolUrl,
            });
            setEditedCaption(data.caption);
            setCurrentStep("ready");
        } catch (err) {
            setError(t("admin.videoGenerator.error.captionFailed"));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Copy caption with hashtags
    const handleCopyCaption = async () => {
        if (!caption) return;

        const fullCaption = `${editedCaption}\n\n${caption.hashtags.map(h => `#${h}`).join(" ")}`;
        try {
            await navigator.clipboard.writeText(fullCaption);
            alert(t("admin.videoGenerator.captionCopied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Download video
    const handleDownloadVideo = () => {
        if (!video || !selectedTool) return;

        const link = document.createElement("a");
        link.href = video.objectUrl;
        link.download = `kivitools-${selectedTool.platform}-${selectedTool.slug}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Start over
    const handleStartOver = () => {
        if (video?.objectUrl) {
            URL.revokeObjectURL(video.objectUrl);
        }
        setSelectedTool(null);
        setPrompt("");
        setVideo(null);
        setCaption(null);
        setEditedCaption("");
        setCurrentStep("select");
        setError("");
    };

    // Step indicator
    const steps = [
        { key: "select", label: t("admin.videoGenerator.step1") },
        { key: "prompt", label: t("admin.videoGenerator.step2") },
        { key: "upload", label: t("admin.videoGenerator.step3") },
        { key: "ready", label: t("admin.videoGenerator.step4") },
    ];

    const getStepStatus = (stepKey: string): "completed" | "current" | "upcoming" => {
        const stepOrder = ["select", "prompt", "upload", "caption", "ready"];
        const currentIndex = stepOrder.indexOf(currentStep);
        const stepIndex = stepOrder.indexOf(stepKey === "ready" ? "ready" : stepKey);

        if (stepIndex < currentIndex) return "completed";
        if (stepKey === currentStep || (stepKey === "upload" && currentStep === "caption")) return "current";
        return "upcoming";
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">🎬 {t("admin.videoGenerator.title")}</h1>
                <p className="text-muted">{t("admin.videoGenerator.subtitle")}</p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center gap-2 flex-wrap">
                {steps.map((step) => {
                    const status = getStepStatus(step.key);
                    return (
                        <Chip
                            key={step.key}
                            size="sm"
                            className={
                                status === "completed"
                                    ? "bg-success/20 text-success"
                                    : status === "current"
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-surface text-muted"
                            }
                        >
                            {status === "completed" ? "✓ " : ""}{step.label}
                        </Chip>
                    );
                })}
            </div>

            {/* Error Alert */}
            {error && (
                <Alert status="danger">
                    <Alert.Content>
                        <Alert.Description>{error}</Alert.Description>
                    </Alert.Content>
                </Alert>
            )}

            {/* Tool Selector */}
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{t("admin.videoGenerator.selectTool")}</h2>

                {selectedTool ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{PLATFORM_EMOJIS[selectedTool.platform]}</span>
                            <div>
                                <div className="font-bold">{selectedTool.name}</div>
                                <div className="text-sm text-muted capitalize">{selectedTool.platform}</div>
                            </div>
                        </div>
                        <Button variant="ghost" onPress={() => setShowToolSelector(true)}>
                            Change
                        </Button>
                    </div>
                ) : (
                    <Button onPress={() => setShowToolSelector(true)} className="w-full">
                        {t("admin.videoGenerator.selectToolPlaceholder")}
                    </Button>
                )}

                {/* Tool selector dropdown */}
                {showToolSelector && (
                    <div className="mt-4 max-h-96 overflow-y-auto border border-border rounded-lg">
                        {Object.entries(PLATFORM_TOOLS).map(([platform, tools]) => (
                            <div key={platform}>
                                <div className="sticky top-0 bg-surface px-4 py-2 font-bold text-sm uppercase text-muted border-b border-border">
                                    {PLATFORM_EMOJIS[platform]} {platform}
                                </div>
                                {tools.map((tool) => {
                                    const toolData: Tool = {
                                        platform,
                                        name: t(tool.name),
                                        href: tool.href,
                                        slug: tool.href.split("/").pop() || "",
                                    };
                                    return (
                                        <button
                                            key={tool.href}
                                            className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors border-b border-border/50"
                                            onClick={() => handleSelectTool(toolData)}
                                        >
                                            {t(tool.name)}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Prompt Generation Section */}
            {selectedTool && currentStep !== "select" && (
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">🎨 {t("admin.videoGenerator.generatePrompt")}</h2>

                    {!prompt ? (
                        <div className="space-y-4">
                            <Button
                                onPress={handleGeneratePrompt}
                                isDisabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? t("admin.videoGenerator.generatingPrompt") : t("admin.videoGenerator.generatePrompt")}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-surface/50 p-4 rounded-lg border border-border">
                                <pre className="whitespace-pre-wrap text-sm font-mono">{prompt}</pre>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <Button onPress={handleCopyPrompt}>
                                    📋 {t("admin.videoGenerator.copyPrompt")}
                                </Button>
                                <a
                                    href="https://aistudio.google.com/prompts/new_video"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="ghost">
                                        🔗 {t("admin.videoGenerator.aiStudioLink")}
                                    </Button>
                                </a>
                            </div>

                            <p className="text-sm text-muted">
                                💡 {t("admin.videoGenerator.aiStudioHint")}
                            </p>
                        </div>
                    )}
                </Card>
            )}

            {/* Video Upload Section */}
            {prompt && (currentStep === "upload" || currentStep === "caption" || currentStep === "ready") && (
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">📹 {t("admin.videoGenerator.uploadVideo")}</h2>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4"
                        className="hidden"
                        onChange={handleVideoUpload}
                    />

                    {!video ? (
                        <div className="space-y-4">
                            <Button
                                onPress={() => fileInputRef.current?.click()}
                                className="w-full"
                            >
                                📂 {t("admin.videoGenerator.uploadVideo")}
                            </Button>
                            <p className="text-sm text-muted">
                                {t("admin.videoGenerator.uploadVideoHint")}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <video
                                src={video.objectUrl}
                                controls
                                className="w-full max-h-96 rounded-lg bg-black"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted">{video.fileName}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => fileInputRef.current?.click()}
                                >
                                    {t("admin.videoGenerator.changeVideo")}
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            )}

            {/* Caption Generation Section */}
            {video && (currentStep === "caption" || currentStep === "ready") && (
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">✍️ {t("admin.videoGenerator.generateCaption")}</h2>

                    {!caption ? (
                        <Button
                            onPress={handleGenerateCaption}
                            isDisabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? t("admin.videoGenerator.generatingCaption") : t("admin.videoGenerator.generateCaption")}
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t("admin.videoGenerator.editCaption")}
                                </label>
                                <textarea
                                    value={editedCaption}
                                    onChange={(e) => setEditedCaption(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground resize-none"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t("admin.videoGenerator.hashtags")}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {caption.hashtags.map((tag, i) => (
                                        <Chip key={i} size="sm">#{tag}</Chip>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t("admin.videoGenerator.toolUrl")}
                                </label>
                                <div className="text-sm text-muted">{caption.toolUrl}</div>
                            </div>
                        </div>
                    )}
                </Card>
            )}

            {/* Ready to Publish Section */}
            {currentStep === "ready" && caption && video && (
                <Card className="p-6 border-2 border-success">
                    <h2 className="text-xl font-bold mb-4 text-success">
                        🎉 {t("admin.videoGenerator.readyToPublish")}
                    </h2>
                    <p className="text-muted mb-6">{t("admin.videoGenerator.readyToPublishHint")}</p>

                    <div className="flex gap-4 flex-wrap">
                        <Button onPress={handleCopyCaption}>
                            📋 {t("admin.videoGenerator.copyCaption")}
                        </Button>
                        <Button onPress={handleDownloadVideo} variant="secondary">
                            ⬇️ {t("admin.videoGenerator.downloadVideo")}
                        </Button>
                        <Button onPress={handleStartOver} variant="ghost">
                            🔄 {t("admin.videoGenerator.startOver")}
                        </Button>
                    </div>
                </Card>
            )}

            {/* Start Over Button (when not at ready step) */}
            {currentStep !== "select" && currentStep !== "ready" && (
                <div className="text-center">
                    <Button variant="ghost" onPress={handleStartOver}>
                        🔄 {t("admin.videoGenerator.startOver")}
                    </Button>
                </div>
            )}
        </div>
    );
}
