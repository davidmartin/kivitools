"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES } from "@/types";

const ART_STYLES = [
  { value: "abstract", key: "sunoCoverArtPromptGenerator.form.artStyle.abstract" },
  { value: "photorealistic", key: "sunoCoverArtPromptGenerator.form.artStyle.photorealistic" },
  { value: "minimalist", key: "sunoCoverArtPromptGenerator.form.artStyle.minimalist" },
  { value: "retro", key: "sunoCoverArtPromptGenerator.form.artStyle.retro" },
  { value: "cyberpunk", key: "sunoCoverArtPromptGenerator.form.artStyle.cyberpunk" },
  { value: "watercolor", key: "sunoCoverArtPromptGenerator.form.artStyle.watercolor" },
  { value: "3d", key: "sunoCoverArtPromptGenerator.form.artStyle.3d" },
  { value: "anime", key: "sunoCoverArtPromptGenerator.form.artStyle.anime" },
];

const TARGET_PLATFORMS = [
  { value: "suno", key: "sunoCoverArtPromptGenerator.form.targetPlatform.suno" },
  { value: "spotify", key: "sunoCoverArtPromptGenerator.form.targetPlatform.spotify" },
  { value: "soundcloud", key: "sunoCoverArtPromptGenerator.form.targetPlatform.soundcloud" },
  { value: "youtube", key: "sunoCoverArtPromptGenerator.form.targetPlatform.youtube" },
];

export default function SunoCoverArtPromptGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [songTitle, setSongTitle] = useState("");
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [artStyle, setArtStyle] = useState("abstract");
  const [targetPlatform, setTargetPlatform] = useState("suno");
  const [language, setLanguage] = useState(uiLanguage);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!songTitle.trim()) {
      setError(t("sunoCoverArtPromptGenerator.form.error.empty"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/suno/cover-art-prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songTitle: songTitle.trim(),
          mood: mood.trim(),
          genre: genre.trim(),
          artStyle,
          targetPlatform,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate");
      }

      setResults(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allResults = results.map((item, i) => `${i + 1}. ${item}`).join("\n\n");
      await navigator.clipboard.writeText(allResults);
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResults([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("sunoLyricGenerator.title"), href: "/suno/lyric-generator" },
    { name: t("sunoPromptGenerator.title"), href: "/suno/prompt-generator" },
    { name: t("sunoDescriptionGenerator.title"), href: "/suno/description-generator" },
    { name: t("sunoSongTitleGenerator.title"), href: "/suno/song-title-generator" },
    { name: t("sunoSongTagGenerator.title"), href: "/suno/song-tag-generator" },
    { name: t("sunoAlbumNameGenerator.title"), href: "/suno/album-name-generator" },
    { name: t("sunoRemixIdeaGenerator.title"), href: "/suno/remix-idea-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
            {t("sunoCoverArtPromptGenerator.badge")}
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("sunoCoverArtPromptGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("sunoCoverArtPromptGenerator.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="suno" />

        {/* Form Section */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
          <div className="space-y-6">
            {/* Song Title */}
            <div>
              <label
                htmlFor="songTitle"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoCoverArtPromptGenerator.form.songTitle")}
              </label>
              <input
                id="songTitle"
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder={t("sunoCoverArtPromptGenerator.form.songTitlePlaceholder")}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
              />
            </div>

            {/* Mood */}
            <div>
              <label
                htmlFor="mood"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoCoverArtPromptGenerator.form.mood")}
              </label>
              <input
                id="mood"
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder={t("sunoCoverArtPromptGenerator.form.moodPlaceholder")}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
              />
            </div>

            {/* Genre */}
            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoCoverArtPromptGenerator.form.genre")}
              </label>
              <input
                id="genre"
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder={t("sunoCoverArtPromptGenerator.form.genrePlaceholder")}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
              />
            </div>

            {/* Art Style and Target Platform Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Art Style */}
              <div>
                <label
                  htmlFor="artStyle"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoCoverArtPromptGenerator.form.artStyle")}
                </label>
                <select
                  id="artStyle"
                  value={artStyle}
                  onChange={(e) => setArtStyle(e.target.value)}
                  disabled={isLoading || results.length > 0}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
                >
                  {ART_STYLES.map((style) => (
                    <option key={style.value} value={style.value}>
                      {t(style.key)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Platform */}
              <div>
                <label
                  htmlFor="targetPlatform"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoCoverArtPromptGenerator.form.targetPlatform")}
                </label>
                <select
                  id="targetPlatform"
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  disabled={isLoading || results.length > 0}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
                >
                  {TARGET_PLATFORMS.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {t(platform.key)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoCoverArtPromptGenerator.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(l.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Turnstile Widget */}
            {!results.length && (
              <TurnstileWidget
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setError(t("turnstile.failed"))}
              />
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            {!results.length && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading
                  ? t("sunoCoverArtPromptGenerator.form.generating")
                  : t("sunoCoverArtPromptGenerator.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {results.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold py-3 rounded-lg transition-colors"
              >
                {t("sunoCoverArtPromptGenerator.form.useAgain")}
              </Button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t("sunoCoverArtPromptGenerator.result.title")}
              </h2>
              <Button
                onPress={handleCopyAll}
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {copiedIndex === -1
                  ? t("sunoCoverArtPromptGenerator.result.copiedAll")
                  : t("sunoCoverArtPromptGenerator.result.copyAll")}
              </Button>
            </div>

            <p className="text-sm text-muted mb-4">
              {t("sunoCoverArtPromptGenerator.result.tip")}
            </p>

            <div className="space-y-4">
              {results.map((prompt, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                        #{index + 1}
                      </span>
                      <p className="text-foreground whitespace-pre-wrap text-sm">
                        {prompt}
                      </p>
                    </div>
                    <Button
                      onPress={() => handleCopy(prompt, index)}
                      variant="ghost"
                      className="shrink-0 text-muted hover:text-purple-600"
                    >
                      {copiedIndex === index
                        ? t("sunoCoverArtPromptGenerator.result.copied")
                        : t("sunoCoverArtPromptGenerator.result.copy")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoCoverArtPromptGenerator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.features.feature1.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.features.feature1.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.features.feature2.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.features.feature2.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.features.feature3.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.features.feature3.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.features.feature4.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.features.feature4.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("sunoCoverArtPromptGenerator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("sunoCoverArtPromptGenerator.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoCoverArtPromptGenerator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("sunoCoverArtPromptGenerator.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoCoverArtPromptGenerator.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.faq.q1")}
              </h3>
              <p className="text-muted">{t("sunoCoverArtPromptGenerator.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.faq.q2")}
              </h3>
              <p className="text-muted">{t("sunoCoverArtPromptGenerator.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.faq.q3")}
              </h3>
              <p className="text-muted">{t("sunoCoverArtPromptGenerator.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.faq.q4")}
              </h3>
              <p className="text-muted">{t("sunoCoverArtPromptGenerator.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoCoverArtPromptGenerator.faq.q5")}
              </h3>
              <p className="text-muted">{t("sunoCoverArtPromptGenerator.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoCoverArtPromptGenerator.relatedTools.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-purple-600">
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
