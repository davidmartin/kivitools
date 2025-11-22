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

const GOALS = [
    { value: "Engagement", label: "Boost Engagement" },
    { value: "Sales", label: "Drive Sales" },
    { value: "Awareness", label: "Brand Awareness" },
    { value: "Traffic", label: "Website Traffic" },
    { value: "Community", label: "Build Community" },
];

const MOODS = [
    { value: "Fun", label: "Fun & Playful" },
    { value: "Professional", label: "Professional" },
    { value: "Inspirational", label: "Inspirational" },
    { value: "Educational", label: "Educational" },
    { value: "Behind-the-scenes", label: "Behind the Scenes" },
];

interface StoryIdea {
    title: string;
    concept: string;
    engagementTactic: string;
}

export default function InstagramStoryIdeasPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [niche, setNiche] = useState("");
    const [goal, setGoal] = useState("Engagement");
    const [mood, setMood] = useState("Fun");
    const [language, setLanguage] = useState(uiLanguage);
    const [ideas, setIdeas] = useState<StoryIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError(t("instagramStoryIdeas.form.error.emptyNiche"));
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
            const response = await fetch("/api/tools/instagram/story-ideas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    niche: niche.trim(),
                    goal,
                    mood,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate story ideas");
            }

            setIdeas(data.ideas || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (idea: StoryIdea) => {
        const text = `${idea.title}\n\nConcept: ${idea.concept}\nEngagement Tactic: ${idea.engagementTactic}`;
        try {
            await navigator.clipboard.writeText(text);
            alert(t("instagramStoryIdeas.result.copied"));
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
        platform: "instagram",
        toolName: "Story Ideas",
        title: t("instagramStoryIdeas.title"),
        description: t("instagramStoryIdeas.description"),
        englishSlug: "story-ideas",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "instagram",
        toolName: "Story Ideas",
        englishSlug: "story-ideas",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("instagramStoryIdeas.faq.q1"), answer: t("instagramStoryIdeas.faq.a1") },
        { question: t("instagramStoryIdeas.faq.q2"), answer: t("instagramStoryIdeas.faq.a2") },
        { question: t("instagramStoryIdeas.faq.q3"), answer: t("instagramStoryIdeas.faq.a3") },
        { question: t("instagramStoryIdeas.faq.q4"), answer: t("instagramStoryIdeas.faq.a4") },
        { question: t("instagramStoryIdeas.faq.q5"), answer: t("instagramStoryIdeas.faq.a5") },
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
                        <div className="inline-block px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">
                            📸 Instagram Tool
                        </div>
                        <h1 className="text-5xl font-bold text-foreground mb-4">
                            {t("instagramStoryIdeas.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("instagramStoryIdeas.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="instagram" />

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
                                    {t("instagramStoryIdeas.form.niche")}
                                </label>
                                <input
                                    id="niche"
                                    type="text"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder={t("instagramStoryIdeas.form.nichePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Goal Select */}
                                <div>
                                    <label
                                        htmlFor="goal"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("instagramStoryIdeas.form.goal")}
                                    </label>
                                    <select
                                        id="goal"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {GOALS.map((g) => (
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
                                        {t("instagramStoryIdeas.form.mood")}
                                    </label>
                                    <select
                                        id="mood"
                                        value={mood}
                                        onChange={(e) => setMood(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
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
                                        {t("instagramStoryIdeas.form.language")}
                                    </label>
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value as any)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
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
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    {isLoading ? t("instagramStoryIdeas.form.generating") : t("instagramStoryIdeas.form.generate")}
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
                                    {t("instagramStoryIdeas.form.useAgain")}
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
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("instagramStoryIdeas.result.title")}
                                </h3>
                                <div className="grid gap-4">
                                    {ideas.map((idea, index) => (
                                        <div key={index} className="bg-background border border-border rounded-lg p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-xl font-bold text-pink-600 dark:text-pink-400">
                                                    {idea.title}
                                                </h4>
                                                <Button
                                                    onPress={() => handleCopy(idea)}
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    {t("instagramStoryIdeas.result.copy")}
                                                </Button>
                                            </div>
                                            <p className="text-foreground mb-4">{idea.concept}</p>
                                            <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md inline-block">
                                                <span className="text-sm font-semibold text-pink-700 dark:text-pink-300">
                                                    {t("instagramStoryIdeas.result.tactic")}:
                                                </span>
                                                <span className="text-sm text-foreground ml-2">
                                                    {idea.engagementTactic}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("instagramStoryIdeas.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramStoryIdeas.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("instagramStoryIdeas.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("instagramStoryIdeas.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramStoryIdeas.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramStoryIdeas.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramStoryIdeas.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("instagramStoryIdeas.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("instagramStoryIdeas.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("instagramStoryIdeas.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("instagramStoryIdeas.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramStoryIdeas.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("instagramStoryIdeas.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramStoryIdeas.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/instagram/hashtag-generator"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramHashtagGenerator.title")}
                                </span>
                            </Link>
                            <Link
                                href="/instagram/caption-generator"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramCaptionGenerator.title")}
                                </span>
                            </Link>
                            <Link
                                href="/instagram/bio-generator"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramBioGenerator.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
