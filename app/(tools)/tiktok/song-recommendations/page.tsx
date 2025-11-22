"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import {
    generateToolJsonLd,
    generateBreadcrumbJsonLd,
    generateFaqJsonLd,
} from "@/lib/seo-metadata";

const MOODS = [
    { value: "energetic", label: "Energetic" },
    { value: "happy", label: "Happy" },
    { value: "sad", label: "Sad/Emotional" },
    { value: "funny", label: "Funny" },
    { value: "relaxing", label: "Relaxing" },
    { value: "dark", label: "Dark/Mysterious" },
    { value: "romantic", label: "Romantic" },
    { value: "inspirational", label: "Inspirational" },
];

export default function TikTokSongRecommendationsPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [videoDescription, setVideoDescription] = useState("");
    const [mood, setMood] = useState("energetic");
    const [language, setLanguage] = useState(uiLanguage);
    const [songs, setSongs] = useState<Array<{ title: string; artist: string; reason: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!videoDescription.trim()) {
            setError(t("tiktokSongRecommendations.form.error.emptyVideoDescription"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setSongs([]);

        try {
            const response = await fetch("/api/tools/tiktok/song-recommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    videoDescription: videoDescription.trim(),
                    mood,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate recommendations");
            }

            setSongs(data.songs || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (song: { title: string; artist: string; reason: string }) => {
        try {
            const text = `${song.title} - ${song.artist}`;
            await navigator.clipboard.writeText(text);
            alert(t("tiktokSongRecommendations.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setSongs([]);
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "tiktok",
        toolName: "Song Recommendations",
        title: t("tiktokSongRecommendations.title"),
        description: t("tiktokSongRecommendations.description"),
        englishSlug: "song-recommendations",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "tiktok",
        toolName: "Song Recommendations",
        englishSlug: "song-recommendations",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("tiktokSongRecommendations.faq.q1"), answer: t("tiktokSongRecommendations.faq.a1") },
        { question: t("tiktokSongRecommendations.faq.q2"), answer: t("tiktokSongRecommendations.faq.a2") },
        { question: t("tiktokSongRecommendations.faq.q3"), answer: t("tiktokSongRecommendations.faq.a3") },
        { question: t("tiktokSongRecommendations.faq.q4"), answer: t("tiktokSongRecommendations.faq.a4") },
        { question: t("tiktokSongRecommendations.faq.q5"), answer: t("tiktokSongRecommendations.faq.a5") },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                            🎵 TikTok Tool
                        </div>
                        <h1 className="text-5xl font-bold text-foreground mb-4">
                            {t("tiktokSongRecommendations.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("tiktokSongRecommendations.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="tiktok" />

                    {/* Main Card */}
                    <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Form Section */}
                        <div className="space-y-4">
                            {/* Video Description Input */}
                            <div>
                                <label
                                    htmlFor="videoDescription"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("tiktokSongRecommendations.form.videoDescription")}
                                </label>
                                <textarea
                                    id="videoDescription"
                                    value={videoDescription}
                                    onChange={(e) => setVideoDescription(e.target.value)}
                                    placeholder={t("tiktokSongRecommendations.form.videoDescriptionPlaceholder")}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Mood Select */}
                                <div>
                                    <label
                                        htmlFor="mood"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("tiktokSongRecommendations.form.mood")}
                                    </label>
                                    <select
                                        id="mood"
                                        value={mood}
                                        onChange={(e) => setMood(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {MOODS.map((m) => (
                                            <option key={m.value} value={m.value}>
                                                {m.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Language Select */}
                                <div>
                                    <label
                                        htmlFor="language"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("tiktokSongRecommendations.form.language")}
                                    </label>
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value as any)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {LANGUAGES.map((l) => (
                                            <option key={l.value} value={l.value}>
                                                {t(l.labelKey)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Turnstile Widget */}
                            {songs.length === 0 && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {songs.length === 0 && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full"
                                >
                                    {isLoading ? t("tiktokSongRecommendations.form.generating") : t("tiktokSongRecommendations.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {songs.length > 0 && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("tiktokSongRecommendations.form.useAgain")}
                                </Button>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <p className="text-red-800 dark:text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Result Section */}
                        {songs.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("tiktokSongRecommendations.result.title")}
                                </h3>
                                <div className="grid gap-4">
                                    {songs.map((song, index) => (
                                        <div key={index} className="bg-background border border-border rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="text-lg font-bold text-foreground">{song.title}</h4>
                                                    <p className="text-purple-600 dark:text-purple-400 font-medium">{song.artist}</p>
                                                    <p className="text-sm text-muted mt-2">{song.reason}</p>
                                                </div>
                                                <Button
                                                    onPress={() => handleCopy(song)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-4"
                                                >
                                                    {t("tiktokSongRecommendations.result.copy")}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("tiktokSongRecommendations.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokSongRecommendations.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("tiktokSongRecommendations.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("tiktokSongRecommendations.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokSongRecommendations.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokSongRecommendations.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokSongRecommendations.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("tiktokSongRecommendations.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("tiktokSongRecommendations.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("tiktokSongRecommendations.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("tiktokSongRecommendations.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokSongRecommendations.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("tiktokSongRecommendations.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokSongRecommendations.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/tiktok/video-ideas"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("videoIdeas.title")}
                                </span>
                            </Link>
                            <Link
                                href="/tiktok/script-writer"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("scriptWriter.title")}
                                </span>
                            </Link>
                            <Link
                                href="/tiktok/hook-generator"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("hookGenerator.title")}
                                </span>
                            </Link>
                            <Link
                                href="/tiktok/caption-generator"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("tiktokCaptionGenerator.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
