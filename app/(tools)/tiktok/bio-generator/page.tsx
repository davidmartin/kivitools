"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import {
    generateToolJsonLd,
    generateBreadcrumbJsonLd,
    generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function TikTokBioGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [description, setDescription] = useState("");
    const [tone, setTone] = useState("creative");
    const [includeEmojis, setIncludeEmojis] = useState(true);
    const [language, setLanguage] = useState(uiLanguage);
    const [bios, setBios] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError(t("tiktokBioGenerator.form.error.emptyDescription"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setBios([]);

        try {
            const response = await fetch("/api/tools/tiktok/bio-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: description.trim(),
                    tone,
                    includeEmojis,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate bios");
            }

            setBios(data.bios || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(t("tiktokBioGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setBios([]);
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "tiktok",
        toolName: "Bio Generator",
        title: t("tiktokBioGenerator.title"),
        description: t("tiktokBioGenerator.description"),
        englishSlug: "bio-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "tiktok",
        toolName: "Bio Generator",
        englishSlug: "bio-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("tiktokBioGenerator.faq.q1"), answer: t("tiktokBioGenerator.faq.a1") },
        { question: t("tiktokBioGenerator.faq.q2"), answer: t("tiktokBioGenerator.faq.a2") },
        { question: t("tiktokBioGenerator.faq.q3"), answer: t("tiktokBioGenerator.faq.a3") },
        { question: t("tiktokBioGenerator.faq.q4"), answer: t("tiktokBioGenerator.faq.a4") },
        { question: t("tiktokBioGenerator.faq.q5"), answer: t("tiktokBioGenerator.faq.a5") },
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
                            {t("tiktokBioGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("tiktokBioGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="tiktok" />

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
                                    {t("tiktokBioGenerator.form.description")}
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={t("tiktokBioGenerator.form.descriptionPlaceholder")}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Tone Select */}
                                <div>
                                    <label
                                        htmlFor="tone"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("tiktokBioGenerator.form.tone")}
                                    </label>
                                    <select
                                        id="tone"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {TONES.map((tone) => (
                                            <option key={tone.value} value={tone.value}>
                                                {t(tone.labelKey)}
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
                                        {t("tiktokBioGenerator.form.language")}
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

                            {/* Include Emojis Checkbox */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="includeEmojis"
                                    checked={includeEmojis}
                                    onChange={(e) => setIncludeEmojis(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                    disabled={isLoading}
                                />
                                <label htmlFor="includeEmojis" className="text-sm font-medium text-foreground">
                                    {t("tiktokBioGenerator.form.includeEmojis")}
                                </label>
                            </div>

                            {/* Turnstile Widget */}
                            {bios.length === 0 && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {bios.length === 0 && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full"
                                >
                                    {isLoading ? t("tiktokBioGenerator.form.generating") : t("tiktokBioGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {bios.length > 0 && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("tiktokBioGenerator.form.useAgain")}
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
                        {bios.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("tiktokBioGenerator.result.title")}
                                </h3>
                                <div className="grid gap-4">
                                    {bios.map((bio, index) => (
                                        <div key={index} className="bg-background border border-border rounded-lg p-4 flex items-center justify-between">
                                            <p className="text-foreground font-medium">{bio}</p>
                                            <Button
                                                onPress={() => handleCopy(bio)}
                                                variant="ghost"
                                                size="sm"
                                                className="ml-4"
                                            >
                                                {t("tiktokBioGenerator.result.copy")}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("tiktokBioGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokBioGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("tiktokBioGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("tiktokBioGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokBioGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokBioGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokBioGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("tiktokBioGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("tiktokBioGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("tiktokBioGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("tiktokBioGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokBioGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("tiktokBioGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokBioGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/tiktok/username-generator"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("usernameGenerator.title")}
                                </span>
                            </Link>
                            <Link
                                href="/tiktok/profile-analytics"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("profileAnalytics.title")}
                                </span>
                            </Link>
                            <Link
                                href="/tiktok/profile-viewer"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("profileViewer.title")}
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
