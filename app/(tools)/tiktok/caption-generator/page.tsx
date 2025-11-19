"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { Metadata } from "next";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function TikTokCaptionGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState(uiLanguage);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("tiktokCaptionGenerator.form.error.emptyTopic"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setCaption("");

    try {
      const response = await fetch("/api/tools/tiktok/caption-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate caption");
      }

      setCaption(data.caption || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      alert(t("tiktokCaptionGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setCaption("");
    setError("");
    setTurnstileToken("");
  };

  const toolJsonLd = generateToolJsonLd({
    platform: "tiktok",
    toolName: "Caption Generator",
    title: t("tiktokCaptionGenerator.title"),
    description: t("tiktokCaptionGenerator.description"),
    englishSlug: "caption-generator",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "tiktok",
    toolName: "Caption Generator",
    englishSlug: "caption-generator",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("tiktokCaptionGenerator.faq.q1"), answer: t("tiktokCaptionGenerator.faq.a1") },
    { question: t("tiktokCaptionGenerator.faq.q2"), answer: t("tiktokCaptionGenerator.faq.a2") },
    { question: t("tiktokCaptionGenerator.faq.q3"), answer: t("tiktokCaptionGenerator.faq.a3") },
    { question: t("tiktokCaptionGenerator.faq.q4"), answer: t("tiktokCaptionGenerator.faq.a4") },
    { question: t("tiktokCaptionGenerator.faq.q5"), answer: t("tiktokCaptionGenerator.faq.a5") },
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
              {t("tiktokCaptionGenerator.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("tiktokCaptionGenerator.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="tiktok" />

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
                  {t("tiktokCaptionGenerator.form.topic")}
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("tiktokCaptionGenerator.form.topicPlaceholder")}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                />
              </div>

              {/* Tone Select */}
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("tiktokCaptionGenerator.form.tone")}
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
                  {t("tiktokCaptionGenerator.form.language")}
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
              {!caption && (
                <TurnstileWidget
                  onSuccess={setTurnstileToken}
                  onError={() => setError(t("turnstile.failed"))}
                />
              )}

              {/* Generate Button */}
              {!caption && (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? t("tiktokCaptionGenerator.form.generating") : t("tiktokCaptionGenerator.form.generate")}
                </Button>
              )}

              {/* Use Again Button */}
              {caption && (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("tiktokCaptionGenerator.form.useAgain")}
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
            {caption && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  {t("tiktokCaptionGenerator.result.title")}
                </label>
                <textarea
                  value={caption}
                  readOnly
                  rows={8}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                />
                <Button
                  onPress={handleCopy}
                  variant="primary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t("tiktokCaptionGenerator.result.copy")}
                </Button>
                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                  {t("tiktokCaptionGenerator.result.success")}
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("tiktokCaptionGenerator.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("tiktokCaptionGenerator.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("tiktokCaptionGenerator.hero.description")}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("tiktokCaptionGenerator.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("tiktokCaptionGenerator.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("tiktokCaptionGenerator.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.faq.q1")}
                </h3>
                <p className="text-muted">{t("tiktokCaptionGenerator.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.faq.q2")}
                </h3>
                <p className="text-muted">{t("tiktokCaptionGenerator.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.faq.q3")}
                </h3>
                <p className="text-muted">{t("tiktokCaptionGenerator.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.faq.q4")}
                </h3>
                <p className="text-muted">{t("tiktokCaptionGenerator.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("tiktokCaptionGenerator.faq.q5")}
                </h3>
                <p className="text-muted">{t("tiktokCaptionGenerator.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("tiktokCaptionGenerator.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/tiktok/script-writer"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("scriptWriter.title")}
                </span>
              </Link>
              <Link
                href="/tiktok/video-ideas"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("videoIdeas.title")}
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
                href="/tiktok/hashtag-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("hashtagGenerator.title")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
