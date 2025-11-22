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

interface VideoIdea {
    title: string;
    thumbnailIdea: string;
    description: string;
}

export default function YouTubeVideoIdeasPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [niche, setNiche] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [ideas, setIdeas] = useState<VideoIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError(t("youtubeVideoIdeas.form.error.emptyNiche"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setIdeas([]);

        try {
            const response = await fetch("/api/tools/youtube/video-ideas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    niche: niche.trim(),
                    targetAudience: targetAudience.trim(),
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate ideas");
            }

            setIdeas(data.ideas || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (idea: VideoIdea) => {
        const text = `${idea.title}\n\nConcept: ${idea.description}\n\nThumbnail: ${idea.thumbnailIdea}`;
        try {
            await navigator.clipboard.writeText(text);
            alert(t("youtubeVideoIdeas.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setIdeas([]);
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "youtube",
        toolName: "Video Ideas",
        title: t("youtubeVideoIdeas.title"),
        description: t("youtubeVideoIdeas.description"),
        englishSlug: "video-ideas",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "youtube",
        toolName: "Video Ideas",
        englishSlug: "video-ideas",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("youtubeVideoIdeas.faq.q1"), answer: t("youtubeVideoIdeas.faq.a1") },
        { question: t("youtubeVideoIdeas.faq.q2"), answer: t("youtubeVideoIdeas.faq.a2") },
        { question: t("youtubeVideoIdeas.faq.q3"), answer: t("youtubeVideoIdeas.faq.a3") },
        { question: t("youtubeVideoIdeas.faq.q4"), answer: t("youtubeVideoIdeas.faq.a4") },
        { question: t("youtubeVideoIdeas.faq.q5"), answer: t("youtubeVideoIdeas.faq.a5") },
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
                            {t("youtubeVideoIdeas.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("youtubeVideoIdeas.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="youtube" />

                    {/* Main Card */}
                    <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Form Section */}
                        <div className="space-y-4">
                            {/* Niche Input */}
                            <div>
                                <label
                                    htmlFor="niche"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("youtubeVideoIdeas.form.niche")}
                                </label>
                                <input
                                    id="niche"
                                    type="text"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder={t("youtubeVideoIdeas.form.nichePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Target Audience Input */}
                            <div>
                                <label
                                    htmlFor="targetAudience"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("youtubeVideoIdeas.form.targetAudience")}
                                </label>
                                <input
                                    id="targetAudience"
                                    type="text"
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                    placeholder={t("youtubeVideoIdeas.form.targetAudiencePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Language Select */}
                            <div>
                                <label
                                    htmlFor="language"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("youtubeVideoIdeas.form.language")}
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
                            {ideas.length === 0 && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {ideas.length === 0 && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {isLoading ? t("youtubeVideoIdeas.form.generating") : t("youtubeVideoIdeas.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {ideas.length > 0 && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("youtubeVideoIdeas.form.useAgain")}
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
                        {ideas.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("youtubeVideoIdeas.result.title")}
                                </h3>
                                <div className="grid gap-6">
                                    {ideas.map((idea, index) => (
                                        <div key={index} className="bg-background border border-border rounded-lg p-6 relative">
                                            <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="pr-12">
                                                <h4 className="text-xl font-bold text-foreground mb-3">
                                                    {idea.title}
                                                </h4>
                                                <p className="text-foreground mb-4">
                                                    {idea.description}
                                                </p>
                                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-4">
                                                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                                        {t("youtubeVideoIdeas.result.thumbnail")}:
                                                    </span>
                                                    <span className="text-sm text-foreground ml-2">
                                                        {idea.thumbnailIdea}
                                                    </span>
                                                </div>
                                                <Button
                                                    onPress={() => handleCopy(idea)}
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    {t("youtubeVideoIdeas.result.copy")}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("youtubeVideoIdeas.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeVideoIdeas.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("youtubeVideoIdeas.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("youtubeVideoIdeas.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeVideoIdeas.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("youtubeVideoIdeas.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeVideoIdeas.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("youtubeVideoIdeas.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("youtubeVideoIdeas.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("youtubeVideoIdeas.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("youtubeVideoIdeas.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("youtubeVideoIdeas.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("youtubeVideoIdeas.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("youtubeVideoIdeas.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            <Link
                                href="/youtube/script-generator"
                                className="bg-surface hover:bg-red-50 dark:hover:bg-red-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-red-600">
                                    {t("youtubeScript.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
