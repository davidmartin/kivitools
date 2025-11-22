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

const POST_TYPES = [
    { value: "update", labelKey: "youtubeCommunityPostGenerator.form.types.update" },
    { value: "poll", labelKey: "youtubeCommunityPostGenerator.form.types.poll" },
    { value: "question", labelKey: "youtubeCommunityPostGenerator.form.types.question" },
    { value: "behindTheScenes", labelKey: "youtubeCommunityPostGenerator.form.types.behindTheScenes" },
    { value: "promotion", labelKey: "youtubeCommunityPostGenerator.form.types.promotion" },
];

const TONES = [
    { value: "engaging", labelKey: "youtubeCommunityPostGenerator.form.tones.engaging" },
    { value: "excited", labelKey: "youtubeCommunityPostGenerator.form.tones.excited" },
    { value: "professional", labelKey: "youtubeCommunityPostGenerator.form.tones.professional" },
    { value: "casual", labelKey: "youtubeCommunityPostGenerator.form.tones.casual" },
    { value: "humorous", labelKey: "youtubeCommunityPostGenerator.form.tones.humorous" },
];

export default function YouTubeCommunityPostGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("update");
    const [tone, setTone] = useState("engaging");
    const [language, setLanguage] = useState(uiLanguage);
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(t("youtubeCommunityPostGenerator.form.error.emptyTopic"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setPost("");

        try {
            const response = await fetch("/api/tools/youtube/community-post-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic.trim(),
                    type,
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate post");
            }

            setPost(data.post || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(post);
            alert(t("youtubeCommunityPostGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setPost("");
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "youtube",
        toolName: "Community Post Generator",
        title: t("youtubeCommunityPostGenerator.title"),
        description: t("youtubeCommunityPostGenerator.description"),
        englishSlug: "community-post-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "youtube",
        toolName: "Community Post Generator",
        englishSlug: "community-post-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("youtubeCommunityPostGenerator.faq.q1"), answer: t("youtubeCommunityPostGenerator.faq.a1") },
        { question: t("youtubeCommunityPostGenerator.faq.q2"), answer: t("youtubeCommunityPostGenerator.faq.a2") },
        { question: t("youtubeCommunityPostGenerator.faq.q3"), answer: t("youtubeCommunityPostGenerator.faq.a3") },
        { question: t("youtubeCommunityPostGenerator.faq.q4"), answer: t("youtubeCommunityPostGenerator.faq.a4") },
        { question: t("youtubeCommunityPostGenerator.faq.q5"), answer: t("youtubeCommunityPostGenerator.faq.a5") },
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
                        <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
                            📺 YouTube Tool
                        </div>
                        <h1 className="text-5xl font-bold text-foreground mb-4">
                            {t("youtubeCommunityPostGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("youtubeCommunityPostGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="youtube" />

                    {/* Main Card */}
                    <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Form Section */}
                        <div className="space-y-4">
                            {/* Topic Input */}
                            <div>
                                <label
                                    htmlFor="topic"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("youtubeCommunityPostGenerator.form.topic")}
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder={t("youtubeCommunityPostGenerator.form.topicPlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Type Select */}
                                <div>
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("youtubeCommunityPostGenerator.form.type")}
                                    </label>
                                    <select
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {POST_TYPES.map((pt) => (
                                            <option key={pt.value} value={pt.value}>
                                                {t(pt.labelKey)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tone Select */}
                                <div>
                                    <label
                                        htmlFor="tone"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("youtubeCommunityPostGenerator.form.tone")}
                                    </label>
                                    <select
                                        id="tone"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {TONES.map((tOption) => (
                                            <option key={tOption.value} value={tOption.value}>
                                                {t(tOption.labelKey)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Language Select */}
                            <div>
                                <label
                                    htmlFor="language"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("youtubeCommunityPostGenerator.form.language")}
                                </label>
                                <select
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as any)}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
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
                            {!post && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {!post && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {isLoading ? t("youtubeCommunityPostGenerator.form.generating") : t("youtubeCommunityPostGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {post && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("youtubeCommunityPostGenerator.form.useAgain")}
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
                        {post && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground">
                                    {t("youtubeCommunityPostGenerator.result.title")}
                                </label>
                                <div className="bg-background border border-border rounded-lg p-4">
                                    <p className="text-foreground whitespace-pre-wrap">
                                        {post}
                                    </p>
                                </div>
                                <Button
                                    onPress={handleCopy}
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    {t("youtubeCommunityPostGenerator.result.copy")}
                                </Button>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("youtubeCommunityPostGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeCommunityPostGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("youtubeCommunityPostGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("youtubeCommunityPostGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeCommunityPostGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeCommunityPostGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeCommunityPostGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("youtubeCommunityPostGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("youtubeCommunityPostGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("youtubeCommunityPostGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("youtubeCommunityPostGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeCommunityPostGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("youtubeCommunityPostGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeCommunityPostGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/youtube/video-ideas"
                                className="bg-surface hover:bg-red-50 dark:hover:bg-red-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-red-600">
                                    {t("youtubeVideoIdeas.title")}
                                </span>
                            </Link>
                            <Link
                                href="/youtube/tag-generator"
                                className="bg-surface hover:bg-red-50 dark:hover:bg-red-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-red-600">
                                    {t("youtubeTagGenerator.title")}
                                </span>
                            </Link>
                            <Link
                                href="/youtube/title-generator"
                                className="bg-surface hover:bg-red-50 dark:hover:bg-red-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-red-600">
                                    {t("youtubeTitle.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
