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

const FREQUENCIES = [
    { value: "Daily", label: "Daily" },
    { value: "3 times a week", label: "3 times a week" },
    { value: "Weekly", label: "Weekly" },
    { value: "Bi-weekly", label: "Bi-weekly" },
];

const DURATIONS = [
    { value: "1 week", label: "1 Week" },
    { value: "2 weeks", label: "2 Weeks" },
    { value: "1 month", label: "1 Month" },
];

export default function TikTokContentCalendarGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [niche, setNiche] = useState("");
    const [frequency, setFrequency] = useState("Daily");
    const [duration, setDuration] = useState("1 week");
    const [language, setLanguage] = useState(uiLanguage);
    const [calendar, setCalendar] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setError(t("tiktokContentCalendarGenerator.form.error.emptyNiche"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setCalendar("");

        try {
            const response = await fetch("/api/tools/tiktok/content-calendar-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    niche: niche.trim(),
                    frequency,
                    duration,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate calendar");
            }

            setCalendar(data.calendar || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(calendar);
            alert(t("tiktokContentCalendarGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setCalendar("");
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "tiktok",
        toolName: "Content Calendar Generator",
        title: t("tiktokContentCalendarGenerator.title"),
        description: t("tiktokContentCalendarGenerator.description"),
        englishSlug: "content-calendar-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "tiktok",
        toolName: "Content Calendar Generator",
        englishSlug: "content-calendar-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("tiktokContentCalendarGenerator.faq.q1"), answer: t("tiktokContentCalendarGenerator.faq.a1") },
        { question: t("tiktokContentCalendarGenerator.faq.q2"), answer: t("tiktokContentCalendarGenerator.faq.a2") },
        { question: t("tiktokContentCalendarGenerator.faq.q3"), answer: t("tiktokContentCalendarGenerator.faq.a3") },
        { question: t("tiktokContentCalendarGenerator.faq.q4"), answer: t("tiktokContentCalendarGenerator.faq.a4") },
        { question: t("tiktokContentCalendarGenerator.faq.q5"), answer: t("tiktokContentCalendarGenerator.faq.a5") },
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
                            {t("tiktokContentCalendarGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("tiktokContentCalendarGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="tiktok" />

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
                                    {t("tiktokContentCalendarGenerator.form.niche")}
                                </label>
                                <input
                                    id="niche"
                                    type="text"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder={t("tiktokContentCalendarGenerator.form.nichePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Frequency Select */}
                                <div>
                                    <label
                                        htmlFor="frequency"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("tiktokContentCalendarGenerator.form.frequency")}
                                    </label>
                                    <select
                                        id="frequency"
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {FREQUENCIES.map((f) => (
                                            <option key={f.value} value={f.value}>
                                                {f.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Duration Select */}
                                <div>
                                    <label
                                        htmlFor="duration"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("tiktokContentCalendarGenerator.form.duration")}
                                    </label>
                                    <select
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {DURATIONS.map((d) => (
                                            <option key={d.value} value={d.value}>
                                                {d.label}
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
                                        {t("tiktokContentCalendarGenerator.form.language")}
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
                            {!calendar && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {!calendar && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full"
                                >
                                    {isLoading ? t("tiktokContentCalendarGenerator.form.generating") : t("tiktokContentCalendarGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {calendar && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("tiktokContentCalendarGenerator.form.useAgain")}
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
                        {calendar && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground">
                                    {t("tiktokContentCalendarGenerator.result.title")}
                                </label>
                                <textarea
                                    value={calendar}
                                    readOnly
                                    rows={15}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                                />
                                <Button
                                    onPress={handleCopy}
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    {t("tiktokContentCalendarGenerator.result.copy")}
                                </Button>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("tiktokContentCalendarGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokContentCalendarGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("tiktokContentCalendarGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("tiktokContentCalendarGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokContentCalendarGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("tiktokContentCalendarGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokContentCalendarGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("tiktokContentCalendarGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("tiktokContentCalendarGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("tiktokContentCalendarGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("tiktokContentCalendarGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("tiktokContentCalendarGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("tiktokContentCalendarGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("tiktokContentCalendarGenerator.relatedTools.title")}
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
                                href="/tiktok/hashtag-generator"
                                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                                    {t("hashtagGenerator.title")}
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
