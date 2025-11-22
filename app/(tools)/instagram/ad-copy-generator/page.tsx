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

const TONES = [
    { value: "Persuasive", label: "Persuasive" },
    { value: "Urgent", label: "Urgent (FOMO)" },
    { value: "Friendly", label: "Friendly" },
    { value: "Professional", label: "Professional" },
    { value: "Humorous", label: "Humorous" },
    { value: "Storytelling", label: "Storytelling" },
];

export default function InstagramAdCopyGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [tone, setTone] = useState("Persuasive");
    const [language, setLanguage] = useState(uiLanguage);
    const [adCopy, setAdCopy] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!productName.trim()) {
            setError(t("instagramAdCopyGenerator.form.error.emptyProductName"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setAdCopy("");

        try {
            const response = await fetch("/api/tools/instagram/ad-copy-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productName: productName.trim(),
                    productDescription: productDescription.trim(),
                    targetAudience: targetAudience.trim(),
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate ad copy");
            }

            setAdCopy(data.adCopy || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(adCopy);
            alert(t("instagramAdCopyGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setAdCopy("");
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "instagram",
        toolName: "Ad Copy Generator",
        title: t("instagramAdCopyGenerator.title"),
        description: t("instagramAdCopyGenerator.description"),
        englishSlug: "ad-copy-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "instagram",
        toolName: "Ad Copy Generator",
        englishSlug: "ad-copy-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("instagramAdCopyGenerator.faq.q1"), answer: t("instagramAdCopyGenerator.faq.a1") },
        { question: t("instagramAdCopyGenerator.faq.q2"), answer: t("instagramAdCopyGenerator.faq.a2") },
        { question: t("instagramAdCopyGenerator.faq.q3"), answer: t("instagramAdCopyGenerator.faq.a3") },
        { question: t("instagramAdCopyGenerator.faq.q4"), answer: t("instagramAdCopyGenerator.faq.a4") },
        { question: t("instagramAdCopyGenerator.faq.q5"), answer: t("instagramAdCopyGenerator.faq.a5") },
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
                            {t("instagramAdCopyGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("instagramAdCopyGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="instagram" />

                    {/* Main Card */}
                    <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Form Section */}
                        <div className="space-y-4">
                            {/* Product Name Input */}
                            <div>
                                <label
                                    htmlFor="productName"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("instagramAdCopyGenerator.form.productName")}
                                </label>
                                <input
                                    id="productName"
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder={t("instagramAdCopyGenerator.form.productNamePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Product Description Input */}
                            <div>
                                <label
                                    htmlFor="productDescription"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("instagramAdCopyGenerator.form.productDescription")}
                                </label>
                                <textarea
                                    id="productDescription"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder={t("instagramAdCopyGenerator.form.productDescriptionPlaceholder")}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Target Audience Input */}
                            <div>
                                <label
                                    htmlFor="targetAudience"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t("instagramAdCopyGenerator.form.targetAudience")}
                                </label>
                                <input
                                    id="targetAudience"
                                    type="text"
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                    placeholder={t("instagramAdCopyGenerator.form.targetAudiencePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
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
                                        {t("instagramAdCopyGenerator.form.tone")}
                                    </label>
                                    <select
                                        id="tone"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {TONES.map((t) => (
                                            <option key={t.value} value={t.value}>
                                                {t.label}
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
                                        {t("instagramAdCopyGenerator.form.language")}
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
                            {!adCopy && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {!adCopy && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    {isLoading ? t("instagramAdCopyGenerator.form.generating") : t("instagramAdCopyGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {adCopy && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("instagramAdCopyGenerator.form.useAgain")}
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
                        {adCopy && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-foreground">
                                    {t("instagramAdCopyGenerator.result.title")}
                                </label>
                                <textarea
                                    value={adCopy}
                                    readOnly
                                    rows={10}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                                />
                                <Button
                                    onPress={handleCopy}
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    {t("instagramAdCopyGenerator.result.copy")}
                                </Button>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("instagramAdCopyGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramAdCopyGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("instagramAdCopyGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("instagramAdCopyGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramAdCopyGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramAdCopyGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramAdCopyGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("instagramAdCopyGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("instagramAdCopyGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("instagramAdCopyGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("instagramAdCopyGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramAdCopyGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("instagramAdCopyGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramAdCopyGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/instagram/content-calendar"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramContentCalendar.title")}
                                </span>
                            </Link>
                            <Link
                                href="/instagram/story-ideas"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramStoryIdeas.title")}
                                </span>
                            </Link>
                            <Link
                                href="/instagram/hashtag-generator"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramHashtagGenerator.title")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
