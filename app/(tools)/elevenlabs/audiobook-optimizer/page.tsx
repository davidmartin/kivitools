"use client";

import { useState, useMemo } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { LANGUAGES } from "@/types";
import {
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function AudiobookOptimizerPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [text, setText] = useState("");
  const [genre, setGenre] = useState("fiction");
  const [narrative, setNarrative] = useState("third-person");
  const [language, setLanguage] = useState(uiLanguage);
  const [optimizedText, setOptimizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const MAX_CHARS = 5000;
  const charCount = text.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;
  const isAtLimit = charCount >= MAX_CHARS;

  const toolJsonLd = generateToolJsonLd({
    platform: "elevenlabs",
    toolName: "Audiobook Chapter Optimizer",
    title: "AI Audiobook Text Optimizer for ElevenLabs",
    description: "Optimize book text for audiobook narration with ElevenLabs AI voices",
    englishSlug: "audiobook-optimizer",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "elevenlabs",
    toolName: "Audiobook Chapter Optimizer",
    englishSlug: "audiobook-optimizer",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("audiobookOptimizer.faq.q1"), answer: t("audiobookOptimizer.faq.a1") },
    { question: t("audiobookOptimizer.faq.q2"), answer: t("audiobookOptimizer.faq.a2") },
    { question: t("audiobookOptimizer.faq.q3"), answer: t("audiobookOptimizer.faq.a3") },
    { question: t("audiobookOptimizer.faq.q4"), answer: t("audiobookOptimizer.faq.a4") },
    { question: t("audiobookOptimizer.faq.q5"), answer: t("audiobookOptimizer.faq.a5") },
  ]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError(t("audiobookOptimizer.form.error.emptyText"));
      return;
    }

    if (text.length > MAX_CHARS) {
      setError(t("audiobookOptimizer.form.error.tooLong"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setOptimizedText("");

    try {
      const response = await fetch("/api/tools/elevenlabs/audiobook-optimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          genre,
          narrative,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to optimize audiobook text");
      }

      setOptimizedText(data.optimizedText || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedText);
      alert(t("audiobookOptimizer.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setOptimizedText("");
    setError("");
    setTurnstileToken("");
  };

  // Calculate stats
  const wordCount = optimizedText ? optimizedText.trim().split(/\s+/).length : 0;
  const estimatedMinutes = Math.ceil(wordCount / 150); // ~150 words per minute

  const relatedTools = [
    { name: t("voiceScriptWriter.title"), href: "/elevenlabs/voice-script-writer" },
    { name: t("videoVoiceoverScript.title"), href: "/elevenlabs/video-voiceover-script" },
    { name: t("podcastScript.title"), href: "/elevenlabs/podcast-script" },
    { name: t("voiceTextFormatter.title"), href: "/elevenlabs/voice-text-formatter" },
  ];

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

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              🎙️ ElevenLabs Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("audiobookOptimizer.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("audiobookOptimizer.description")}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-foreground"
                  >
                    {t("audiobookOptimizer.form.text")}
                  </label>
                  <span className={`text-sm ${isAtLimit ? 'text-red-600 dark:text-red-400 font-bold' : isNearLimit ? 'text-orange-600 dark:text-orange-400' : 'text-muted'}`}>
                    {t("audiobookOptimizer.form.charCount").replace("{count}", charCount.toString())}
                  </span>
                </div>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setText(e.target.value);
                    }
                  }}
                  placeholder={t("audiobookOptimizer.form.textPlaceholder")}
                  rows={12}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                />
                {isNearLimit && !isAtLimit && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                    {t("audiobookOptimizer.form.charWarning")}
                  </p>
                )}
                {isAtLimit && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-bold">
                    {t("audiobookOptimizer.form.charLimit")}
                  </p>
                )}
              </div>

              {/* Genre Select */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("audiobookOptimizer.form.genre")}
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                >
                  <option value="fiction">{t("audiobookOptimizer.form.genre.fiction")}</option>
                  <option value="nonfiction">{t("audiobookOptimizer.form.genre.nonfiction")}</option>
                  <option value="children">{t("audiobookOptimizer.form.genre.children")}</option>
                  <option value="technical">{t("audiobookOptimizer.form.genre.technical")}</option>
                  <option value="thriller">{t("audiobookOptimizer.form.genre.thriller")}</option>
                  <option value="romance">{t("audiobookOptimizer.form.genre.romance")}</option>
                </select>
              </div>

              {/* Narrative Select */}
              <div>
                <label
                  htmlFor="narrative"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("audiobookOptimizer.form.narrative")}
                </label>
                <select
                  id="narrative"
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                >
                  <option value="first-person">{t("audiobookOptimizer.form.narrative.firstPerson")}</option>
                  <option value="third-person">{t("audiobookOptimizer.form.narrative.thirdPerson")}</option>
                  <option value="omniscient">{t("audiobookOptimizer.form.narrative.omniscient")}</option>
                </select>
              </div>

              {/* Language Select */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("audiobookOptimizer.form.language")}
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
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
            {!optimizedText && (
              <TurnstileWidget
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setError(t("turnstile.failed"))}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Generate/Use Again Button */}
            {!optimizedText && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken || isAtLimit}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("audiobookOptimizer.form.optimizing") : t("audiobookOptimizer.form.optimize")}
              </Button>
            )}

            {optimizedText && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("audiobookOptimizer.form.useAgain")}
              </Button>
            )}
          </div>

          {/* Results Section */}
          {optimizedText && (
            <div className="mt-8 bg-surface rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {t("audiobookOptimizer.result.title")}
                </h2>
                <Button onPress={handleCopy} variant="tertiary" size="sm">
                  {t("audiobookOptimizer.result.copy")}
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mb-4 flex gap-4 text-sm text-muted">
                <span>{t("audiobookOptimizer.result.stats")}</span>
                <span>{t("audiobookOptimizer.result.words").replace("{count}", wordCount.toString())}</span>
                <span>{t("audiobookOptimizer.result.estimatedTime").replace("{minutes}", estimatedMinutes.toString())}</span>
              </div>

              <div className="bg-background rounded-lg p-6 whitespace-pre-wrap text-foreground font-mono text-sm">
                {optimizedText}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("audiobookOptimizer.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("audiobookOptimizer.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("audiobookOptimizer.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("audiobookOptimizer.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("audiobookOptimizer.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("audiobookOptimizer.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.faq.q1")}
                </h3>
                <p className="text-muted">{t("audiobookOptimizer.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.faq.q2")}
                </h3>
                <p className="text-muted">{t("audiobookOptimizer.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.faq.q3")}
                </h3>
                <p className="text-muted">{t("audiobookOptimizer.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.faq.q4")}
                </h3>
                <p className="text-muted">{t("audiobookOptimizer.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("audiobookOptimizer.faq.q5")}
                </h3>
                <p className="text-muted">{t("audiobookOptimizer.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("audiobookOptimizer.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </>
  );
}
