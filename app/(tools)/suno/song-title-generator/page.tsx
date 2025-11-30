"use client";

import { useState } from "react";
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
import Link from "next/link";

const GENRES = [
    { value: "pop", label: "Pop" },
    { value: "rap", label: "Hip-Hop / Rap" },
    { value: "indie", label: "Indie" },
    { value: "rock", label: "Rock" },
    { value: "reggaeton", label: "Reggaeton" },
    { value: "electronic", label: "Electronic/EDM" },
    { value: "rnb", label: "R&B" },
    { value: "acoustic", label: "Acoustic" },
    { value: "metal", label: "Metal" },
    { value: "jazz", label: "Jazz" },
];

const MOODS = [
    { value: "uplifting", label: "Uplifting" },
    { value: "energetic", label: "Energetic" },
    { value: "sad", label: "Sad / Melancholic" },
    { value: "romantic", label: "Romantic" },
    { value: "aggressive", label: "Aggressive" },
    { value: "calm", label: "Calm / Peaceful" },
    { value: "mysterious", label: "Mysterious" },
    { value: "motivational", label: "Motivational" },
    { value: "playful", label: "Playful / Fun" },
    { value: "dark", label: "Dark" },
];

export default function SunoSongTitleGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("pop");
    const [mood, setMood] = useState("uplifting");
    const [language, setLanguage] = useState(uiLanguage);
    const [titles, setTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError(t("sunoTitleGenerator.form.error.emptyDescription"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setTitles([]);

        try {
            const response = await fetch("/api/tools/suno/song-title-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: description.trim(),
                    genre,
                    mood,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate titles");
            }

            setTitles(data.titles || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (title: string) => {
        try {
            await navigator.clipboard.writeText(title);
            alert(t("sunoTitleGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleCopyAll = async () => {
        try {
            const allTitles = titles.map((title, i) => `${i + 1}. ${title}`).join("\n");
            await navigator.clipboard.writeText(allTitles);
            alert(t("sunoTitleGenerator.result.copiedAll"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setTitles([]);
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "suno",
        toolName: "Song Title Generator",
        title: t("sunoTitleGenerator.title"),
        description: t("sunoTitleGenerator.description"),
        englishSlug: "song-title-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "suno",
        toolName: "Song Title Generator",
        englishSlug: "song-title-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        {
            question: t("sunoTitleGenerator.faq.q1"),
            answer: t("sunoTitleGenerator.faq.a1"),
        },
        {
            question: t("sunoTitleGenerator.faq.q2"),
            answer: t("sunoTitleGenerator.faq.a2"),
        },
        {
            question: t("sunoTitleGenerator.faq.q3"),
            answer: t("sunoTitleGenerator.faq.a3"),
        },
        {
            question: t("sunoTitleGenerator.faq.q4"),
            answer: t("sunoTitleGenerator.faq.a4"),
        },
        {
            question: t("sunoTitleGenerator.faq.q5"),
            answer: t("sunoTitleGenerator.faq.a5"),
        },
    ]);

    const relatedTools = [
        { name: "🎵 Lyric Generator", href: "/suno/lyric-generator" },
        { name: "🎶 Music Prompt", href: "/suno/music-prompt-generator" },
        { name: "📝 Song Description", href: "/suno/song-description-generator" },
        { name: "🏷️ Song Tags", href: "/suno/song-tag-generator" },
        { name: "💿 Album Names", href: "/suno/album-name-generator" },
        { name: "🎨 Cover Art Prompts", href: "/suno/cover-art-prompt-generator" },
    ];

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
            <div className="min-h-screen bg-background py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                            🎵 {t("sunoTitleGenerator.header")}
                        </div>
                        <h1 className="text-5xl font-bold text-foreground mb-4">
                            {t("sunoTitleGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("sunoTitleGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="suno" />

                    {/* Main Card */}
                    <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Form Section */}
                        <div className="space-y-4">
                            {/* Description Input */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("sunoTitleGenerator.form.description")}
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={t("sunoTitleGenerator.form.descriptionPlaceholder")}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Genre Select */}
                            <div>
                                <label
                                    htmlFor="genre"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("sunoTitleGenerator.form.genre")}
                                </label>
                                <select
                                    id="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                >
                                    {GENRES.map((g) => (
                                        <option key={g.value} value={g.value}>
                                            {g.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Mood Select */}
                            <div>
                                <label
                                    htmlFor="mood"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("sunoTitleGenerator.form.mood")}
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
                                    {t("sunoTitleGenerator.form.language")}
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

                            {/* Turnstile Widget */}
                            {!titles.length && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.error"))}
                                />
                            )}

                            {/* Generate Button */}
                            {!titles.length && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full"
                                >
                                    {isLoading
                                        ? t("sunoTitleGenerator.form.generating")
                                        : t("sunoTitleGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {titles.length > 0 && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("sunoTitleGenerator.form.useAgain")}
                                </Button>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <p className="text-red-800 dark:text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Results Section */}
                        {titles.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-foreground">
                                        {t("sunoTitleGenerator.result.title")}
                                    </label>
                                    <Button
                                        onPress={handleCopyAll}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        {t("sunoTitleGenerator.result.copyAll")}
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {titles.map((title, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                                        >
                                            <span className="text-foreground font-medium">
                                                {index + 1}. {title}
                                            </span>
                                            <Button
                                                onPress={() => handleCopy(title)}
                                                variant="ghost"
                                                size="sm"
                                            >
                                                {t("sunoTitleGenerator.result.copy")}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("sunoTitleGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("sunoTitleGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.features.feature1.description")}
                                </p>
                            </div>

                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.features.feature2.description")}
                                </p>
                            </div>

                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.features.feature3.description")}
                                </p>
                            </div>

                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("sunoTitleGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("sunoTitleGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("sunoTitleGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.howItWorks.step1.description")}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.howItWorks.step2.description")}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("sunoTitleGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.faq.a1")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.faq.a2")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.faq.a3")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.faq.a4")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("sunoTitleGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">
                                    {t("sunoTitleGenerator.faq.a5")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("sunoTitleGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {relatedTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
                                >
                                    <span className="text-sm font-medium text-foreground hover:text-accent">
                                        {tool.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
