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
    { value: "Educational", label: "Educational" },
    { value: "Storytelling", label: "Storytelling" },
    { value: "Inspirational", label: "Inspirational" },
    { value: "Humorous", label: "Humorous" },
    { value: "Promotional", label: "Promotional" },
];

const SLIDE_COUNTS = [
    { value: "3", label: "3 Slides" },
    { value: "5", label: "5 Slides" },
    { value: "7", label: "7 Slides" },
    { value: "10", label: "10 Slides" },
];

interface Slide {
    slideNumber: number;
    title: string;
    content: string;
    visualCue: string;
}

export default function InstagramCarouselGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [topic, setTopic] = useState("");
    const [slideCount, setSlideCount] = useState("5");
    const [tone, setTone] = useState("Educational");
    const [language, setLanguage] = useState(uiLanguage);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(t("instagramCarouselGenerator.form.error.emptyTopic"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setSlides([]);

        try {
            const response = await fetch("/api/tools/instagram/carousel-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic.trim(),
                    slideCount,
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate carousel");
            }

            setSlides(data.slides || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (slide: Slide) => {
        const text = `Slide ${slide.slideNumber}: ${slide.title}\n\n${slide.content}\n\nVisual: ${slide.visualCue}`;
        try {
            await navigator.clipboard.writeText(text);
            alert(t("instagramCarouselGenerator.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setSlides([]);
        setError("");
        setTurnstileToken("");
    };

    const toolJsonLd = generateToolJsonLd({
        platform: "instagram",
        toolName: "Carousel Generator",
        title: t("instagramCarouselGenerator.title"),
        description: t("instagramCarouselGenerator.description"),
        englishSlug: "carousel-generator",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd({
        platform: "instagram",
        toolName: "Carousel Generator",
        englishSlug: "carousel-generator",
    });

    const faqJsonLd = generateFaqJsonLd([
        { question: t("instagramCarouselGenerator.faq.q1"), answer: t("instagramCarouselGenerator.faq.a1") },
        { question: t("instagramCarouselGenerator.faq.q2"), answer: t("instagramCarouselGenerator.faq.a2") },
        { question: t("instagramCarouselGenerator.faq.q3"), answer: t("instagramCarouselGenerator.faq.a3") },
        { question: t("instagramCarouselGenerator.faq.q4"), answer: t("instagramCarouselGenerator.faq.a4") },
        { question: t("instagramCarouselGenerator.faq.q5"), answer: t("instagramCarouselGenerator.faq.a5") },
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
                            {t("instagramCarouselGenerator.title")}
                        </h1>
                        <p className="text-xl text-muted">
                            {t("instagramCarouselGenerator.description")}
                        </p>
                    </div>

                    {/* Tool Selector */}
                    <ToolSelector platform="instagram" />

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
                                    {t("instagramCarouselGenerator.form.topic")}
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder={t("instagramCarouselGenerator.form.topicPlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Slide Count Select */}
                                <div>
                                    <label
                                        htmlFor="slideCount"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {t("instagramCarouselGenerator.form.slideCount")}
                                    </label>
                                    <select
                                        id="slideCount"
                                        value={slideCount}
                                        onChange={(e) => setSlideCount(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                                        disabled={isLoading}
                                    >
                                        {SLIDE_COUNTS.map((c) => (
                                            <option key={c.value} value={c.value}>
                                                {c.label}
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
                                        {t("instagramCarouselGenerator.form.tone")}
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
                                        {t("instagramCarouselGenerator.form.language")}
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
                            {slides.length === 0 && (
                                <TurnstileWidget
                                    onSuccess={setTurnstileToken}
                                    onError={() => setError(t("turnstile.failed"))}
                                />
                            )}

                            {/* Generate Button */}
                            {slides.length === 0 && (
                                <Button
                                    onPress={handleGenerate}
                                    isDisabled={isLoading || !turnstileToken}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    {isLoading ? t("instagramCarouselGenerator.form.generating") : t("instagramCarouselGenerator.form.generate")}
                                </Button>
                            )}

                            {/* Use Again Button */}
                            {slides.length > 0 && (
                                <Button
                                    onPress={handleUseAgain}
                                    variant="ghost"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t("instagramCarouselGenerator.form.useAgain")}
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
                        {slides.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("instagramCarouselGenerator.result.title")}
                                </h3>
                                <div className="grid gap-6">
                                    {slides.map((slide, index) => (
                                        <div key={index} className="bg-background border border-border rounded-lg p-6 relative">
                                            <div className="absolute top-4 right-4 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                                {slide.slideNumber}
                                            </div>
                                            <div className="pr-12">
                                                <h4 className="text-xl font-bold text-foreground mb-3">
                                                    {slide.title}
                                                </h4>
                                                <p className="text-foreground mb-4 whitespace-pre-wrap">
                                                    {slide.content}
                                                </p>
                                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-4">
                                                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                                        {t("instagramCarouselGenerator.result.visualCue")}:
                                                    </span>
                                                    <span className="text-sm text-foreground ml-2">
                                                        {slide.visualCue}
                                                    </span>
                                                </div>
                                                <Button
                                                    onPress={() => handleCopy(slide)}
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    {t("instagramCarouselGenerator.result.copy")}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                    {t("instagramCarouselGenerator.result.success")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramCarouselGenerator.topFeatures.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.features.feature1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.features.feature1.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.features.feature2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.features.feature2.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.features.feature3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.features.feature3.description")}
                                </p>
                            </div>
                            <div className="bg-surface rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.features.feature4.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.features.feature4.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Description Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("instagramCarouselGenerator.hero.subtitle")}
                        </h2>
                        <div className="text-muted whitespace-pre-line">
                            {t("instagramCarouselGenerator.hero.description")}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramCarouselGenerator.howItWorks.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.howItWorks.step1.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.howItWorks.step1.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.howItWorks.step2.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.howItWorks.step2.description")}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.howItWorks.step3.title")}
                                </h3>
                                <p className="text-muted">
                                    {t("instagramCarouselGenerator.howItWorks.step3.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramCarouselGenerator.faq.title")}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.faq.q1")}
                                </h3>
                                <p className="text-muted">{t("instagramCarouselGenerator.faq.a1")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.faq.q2")}
                                </h3>
                                <p className="text-muted">{t("instagramCarouselGenerator.faq.a2")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.faq.q3")}
                                </h3>
                                <p className="text-muted">{t("instagramCarouselGenerator.faq.a3")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.faq.q4")}
                                </h3>
                                <p className="text-muted">{t("instagramCarouselGenerator.faq.a4")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {t("instagramCarouselGenerator.faq.q5")}
                                </h3>
                                <p className="text-muted">{t("instagramCarouselGenerator.faq.a5")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            {t("instagramCarouselGenerator.relatedTools.title")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href="/instagram/ad-copy-generator"
                                className="bg-surface hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-border rounded-lg p-4 text-center transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground hover:text-pink-600">
                                    {t("instagramAdCopyGenerator.title")}
                                </span>
                            </Link>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
