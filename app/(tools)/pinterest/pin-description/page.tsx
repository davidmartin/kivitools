"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function PinterestPinDescriptionPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState(uiLanguage);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("pinterestPinDescription.form.error.emptyTopic"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setDescription("");

    try {
      const response = await fetch("/api/tools/pinterest/pin-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          keywords: keywords.trim() || undefined,
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate description");
      }

      setDescription(data.description || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      alert(t("pinterestPinDescription.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setDescription("");
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("pinterestBoardName.title"), href: "/pinterest/board-name" },
    { name: t("pinterestProfileBio.title"), href: "/pinterest/profile-bio" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
            📌 Pinterest Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("pinterestPinDescription.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("pinterestPinDescription.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="pinterest" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestPinDescription.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("pinterestPinDescription.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Keywords Input */}
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestPinDescription.form.keywords")}
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t("pinterestPinDescription.form.keywordsPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Tone Select */}
            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestPinDescription.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {TONES.map((toneOption) => (
                  <option key={toneOption.value} value={toneOption.value}>
                    {t(toneOption.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Select */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestPinDescription.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((langOption) => (
                  <option key={langOption.value} value={langOption.value}>
                    {t(langOption.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            {!description && (
              <>
                <TurnstileWidget
                  onSuccess={setTurnstileToken}
                  onError={() => setError(t("turnstile.error"))}
                />
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? t("pinterestPinDescription.form.generating") : t("pinterestPinDescription.form.generate")}
                </Button>
              </>
            )}

            {/* Use Again Button */}
            {description && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("pinterestPinDescription.form.useAgain")}
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
          {description && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                {t("pinterestPinDescription.result.title")}
              </label>
              <textarea
                value={description}
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
                {t("pinterestPinDescription.result.copy")}
              </Button>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("pinterestPinDescription.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestPinDescription.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.features.seo.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.features.seo.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.features.engagement.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.features.engagement.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.features.hashtags.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.features.hashtags.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.features.multilang.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.features.multilang.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("pinterestPinDescription.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("pinterestPinDescription.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestPinDescription.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestPinDescription.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestPinDescription.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestPinDescription.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestPinDescription.faq.q1")}
              </h3>
              <p className="text-muted">{t("pinterestPinDescription.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestPinDescription.faq.q2")}
              </h3>
              <p className="text-muted">{t("pinterestPinDescription.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestPinDescription.faq.q3")}
              </h3>
              <p className="text-muted">{t("pinterestPinDescription.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestPinDescription.faq.q4")}
              </h3>
              <p className="text-muted">{t("pinterestPinDescription.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestPinDescription.faq.q5")}
              </h3>
              <p className="text-muted">{t("pinterestPinDescription.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestPinDescription.relatedTools.title")}
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
  );
}
