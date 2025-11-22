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

const QUANTITIES = [
    { value: "10", label: "10 Hashtags" },
    { value: "20", label: "20 Hashtags" },
    { value: "30", label: "30 Hashtags (Max)" },
];

export default function InstagramHashtagGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [description, setDescription] = useState("");
    const [niche, setNiche] = useState("");
    const [quantity, setQuantity] = useState("30");
    const [language, setLanguage] = useState(uiLanguage);
    const [hashtags, setHashtags] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError(t("instagramHashtagGenerator.form.error.emptyDescription"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setHashtags("");

        try {
            const response = await fetch("/api/tools/instagram/hashtag-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: description.trim(),
                    niche: niche.trim(),
                    quantity,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate hashtags");
            }

            setHashtags(data.hashtags || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(hashtags);
            alert(t("instagramHashtagGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setHashtags("");
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "instagram",
        toolName: "Hashtag Generator",
        title: t("instagramHashtagGenerator.title"),
        description: t("instagramHashtagGenerator.description"),
        englishSlug: "hashtag-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "instagram",
        toolName: "Hashtag Generator",
        englishSlug: "hashtag-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("instagramHashtagGenerator.faq.q1"), answer: t("instagramHashtagGenerator.faq.a1") },
        { question: t("instagramHashtagGenerator.faq.q2"), answer: t("instagramHashtagGenerator.faq.a2") },
        { question: t("instagramHashtagGenerator.faq.q3"), answer: t("instagramHashtagGenerator.faq.a3") },
        { question: t("instagramHashtagGenerator.faq.q4"), answer: t("instagramHashtagGenerator.faq.a4") },
        { question: t("instagramHashtagGenerator.faq.q5"), answer: t("instagramHashtagGenerator.faq.a5") },
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
                            {t("instagramHashtagGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("instagramHashtagGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="instagram" />

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
                                    {t("instagramHashtagGenerator.form.description")}
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={t("instagramHashtagGenerator.form.descriptionPlaceholder")}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Niche Input */}
                            <div>
                                <label
                                    htmlFor="niche"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("instagramHashtagGenerator.form.niche")}
                                </label>
                                <input
                                    id="niche"
                                    type="text"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder={t("instagramHashtagGenerator.form.nichePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Quantity Select */}
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("instagramHashtagGenerator.form.quantity")}
                                    </label>
                                    <select
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {QUANTITIES.map((q) => (
                                            <option key={q.value} value={q.value}>
                                                {q.label}
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
                                        {t("instagramHashtagGenerator.form.language")}
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
                            {!hashtags && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {!hashtags && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    {isLoading ? t("instagramHashtagGenerator.form.generating") : t("instagramHashtagGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {hashtags && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("instagramHashtagGenerator.form.useAgain")}
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
                        {hashtags && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground">
                                    {t("instagramHashtagGenerator.result.title")}
                                </label>
                                <textarea
                                    value={hashtags}
                                    readOnly
                                    rows={6}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                                />
                                <Button
                                    onPress={handleCopy}
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    {t("instagramHashtagGenerator.result.copy")}
                                </Button>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("instagramHashtagGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramHashtagGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("instagramHashtagGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("instagramHashtagGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramHashtagGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramHashtagGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramHashtagGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("instagramHashtagGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("instagramHashtagGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("instagramHashtagGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("instagramHashtagGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramHashtagGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("instagramHashtagGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramHashtagGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            <Link
                                href="/instagram/reel-script"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramReelScript.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
