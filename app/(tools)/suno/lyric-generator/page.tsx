"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES, TONES } from "@/types";
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
import Link from "next/link";

const GENRES = [
  { value: "pop", label: "Pop" },
  { value: "rap", label: "Hip-Hop / Rap" },
  { value: "indie", label: "Indie" },
  { value: "rock", label: "Rock" },
  { value: "reggaeton", label: "Reggaeton" },
  { value: "electronic", label: "Electronic/EDM" },
  { value: "rnb", label: "R&B" },
  { value: "acoustic", label: "Acoustic" },
  { value: "metal", label: "Metal" },
  { value: "jazz", label: "Jazz" },
];

const MOODS = [
  { value: "uplifting", label: "Uplifting" },
  { value: "energetic", label: "Energetic" },
  { value: "sad", label: "Sad / Melancholic" },
  { value: "romantic", label: "Romantic" },
  { value: "aggressive", label: "Aggressive" },
  { value: "calm", label: "Calm / Peaceful" },
  { value: "mysterious", label: "Mysterious" },
  { value: "motivational", label: "Motivational" },
  { value: "playful", label: "Playful / Fun" },
  { value: "dark", label: "Dark" },
];

export default function SunoLyricGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [theme, setTheme] = useState("");
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("uplifting");
  const [language, setLanguage] = useState(uiLanguage);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError(t("sunoLyricGenerator.form.error.emptyTheme"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setLyrics("");

    try {
      const response = await fetch("/api/tools/suno/lyric-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: theme.trim(),
          genre,
          mood,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate lyrics");
      }

      setLyrics(data.lyrics || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lyrics);
      alert(t("sunoLyricGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setLyrics("");
    setError("");
    setTurnstileToken("");
  };

  const toolJsonLd = generateToolJsonLd({
    platform: "suno",
    toolName: "Lyric Generator",
    title: t("sunoLyricGenerator.title"),
    description: t("sunoLyricGenerator.description"),
    englishSlug: "lyric-generator",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "suno",
    toolName: "Lyric Generator",
    englishSlug: "lyric-generator",
  });

  const faqJsonLd = generateFaqJsonLd([
    {
      question: t("sunoLyricGenerator.faq.q1"),
      answer: t("sunoLyricGenerator.faq.a1"),
    },
    {
      question: t("sunoLyricGenerator.faq.q2"),
      answer: t("sunoLyricGenerator.faq.a2"),
    },
    {
      question: t("sunoLyricGenerator.faq.q3"),
      answer: t("sunoLyricGenerator.faq.a3"),
    },
    {
      question: t("sunoLyricGenerator.faq.q4"),
      answer: t("sunoLyricGenerator.faq.a4"),
    },
    {
      question: t("sunoLyricGenerator.faq.q5"),
      answer: t("sunoLyricGenerator.faq.a5"),
    },
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
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              🎵 {t("sunoLyricGenerator.header")}
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("sunoLyricGenerator.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("sunoLyricGenerator.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="suno" />

          {/* Main Card */}
          <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
            {/* Form Section */}
            <div className="space-y-4">
              {/* Theme Input */}
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoLyricGenerator.form.theme")}
                </label>
                <input
                  id="theme"
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder={t("sunoLyricGenerator.form.themePlaceholder")}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                />
              </div>

              {/* Genre Select */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoLyricGenerator.form.genre")}
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {GENRES.map((g) => (
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
                  {t("sunoLyricGenerator.form.mood")}
                </label>
                <select
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
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
                  {t("sunoLyricGenerator.form.language")}
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
              {!lyrics && (
                <TurnstileWidget
                  onSuccess={setTurnstileToken}
                  onError={() => setError(t("turnstile.error"))}
                />
              )}

              {/* Generate Button */}
              {!lyrics && (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isLoading
                    ? t("sunoLyricGenerator.form.generating")
                    : t("sunoLyricGenerator.form.generate")}
                </Button>
              )}

              {/* Use Again Button */}
              {lyrics && (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("sunoLyricGenerator.form.useAgain")}
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
            {lyrics && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  {t("sunoLyricGenerator.result.title")}
                </label>
                <textarea
                  value={lyrics}
                  readOnly
                  rows={16}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                />
                <Button
                  onPress={handleCopy}
                  variant="primary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t("sunoLyricGenerator.result.copy")}
                </Button>
                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                  {t("sunoLyricGenerator.result.success")}
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoLyricGenerator.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.features.feature1.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.features.feature2.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.features.feature3.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("sunoLyricGenerator.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("sunoLyricGenerator.hero.description")}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoLyricGenerator.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.howItWorks.step1.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.howItWorks.step2.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoLyricGenerator.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.faq.q1")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.faq.a1")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.faq.q2")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.faq.a2")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.faq.q3")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.faq.a3")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.faq.q4")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.faq.a4")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoLyricGenerator.faq.q5")}
                </h3>
                <p className="text-muted">
                  {t("sunoLyricGenerator.faq.a5")}
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoLyricGenerator.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/suno/prompt-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoPromptGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/description-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoDescriptionGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/song-title-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoSongTitleGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/song-tag-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoSongTagGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/album-name-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoAlbumNameGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/cover-art-prompt-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoCoverArtPromptGenerator.title")}
                </span>
              </Link>
              <Link
                href="/suno/remix-idea-generator"
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
                  {t("sunoRemixIdeaGenerator.title")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
