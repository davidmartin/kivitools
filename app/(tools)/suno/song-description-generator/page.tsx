"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

const PLATFORMS = [
  { value: "spotify", label: "Spotify" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter" },
  { value: "soundcloud", label: "SoundCloud" },
];

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
];

export default function SunoSongDescriptionGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [theme, setTheme] = useState("");
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("uplifting");
  const [platform, setPlatform] = useState("spotify");
  const [language, setLanguage] = useState(uiLanguage);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError(t("sunoSongDescription.form.error.emptyTheme"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setDescriptions([]);

    try {
      const response = await fetch(
        "/api/tools/suno/song-description-generator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            theme: theme.trim(),
            genre,
            mood,
            platform,
            language,
            turnstileToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate descriptions");
      }

      setDescriptions(data.descriptions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t("sunoSongDescription.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allDescriptions = descriptions
        .map((desc, i) => `${i + 1}. ${desc}`)
        .join("\n\n");
      await navigator.clipboard.writeText(allDescriptions);
      alert(t("sunoSongDescription.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setDescriptions([]);
    setError("");
    setTurnstileToken("");
  };

  return (
    <>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              📝 {t("sunoSongDescription.header")}
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("sunoSongDescription.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("sunoSongDescription.description")}
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
                  {t("sunoSongDescription.form.theme")}
                </label>
                <input
                  id="theme"
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder={t(
                    "sunoSongDescription.form.themePlaceholder"
                  )}
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
                  {t("sunoSongDescription.form.genre")}
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
                  {t("sunoSongDescription.form.mood")}
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

              {/* Platform Select */}
              <div>
                <label
                  htmlFor="platform"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoSongDescription.form.platform")}
                </label>
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
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
                  {t("sunoSongDescription.form.language")}
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
              {descriptions.length === 0 && (
                <TurnstileWidget
                  onSuccess={setTurnstileToken}
                  onError={() => setError(t("turnstile.error"))}
                />
              )}

              {/* Generate Button */}
              {descriptions.length === 0 && (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isLoading
                    ? t("sunoSongDescription.form.generating")
                    : t("sunoSongDescription.form.generate")}
                </Button>
              )}

              {/* Use Again Button */}
              {descriptions.length > 0 && (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("sunoSongDescription.form.useAgain")}
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
            {descriptions.length > 0 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  {t("sunoSongDescription.result.title")}
                </label>

                {descriptions.map((desc, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        {t("sunoSongDescription.result.description")} {index + 1}
                      </p>
                      <span className="text-xs text-muted">
                        {desc.length} {t("sunoSongDescription.result.chars")}
                      </span>
                    </div>
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-foreground text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                    <Button
                      onPress={() => handleCopy(desc)}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      {t("sunoSongDescription.result.copy")}
                    </Button>
                  </div>
                ))}

                <Button
                  onPress={handleCopyAll}
                  variant="primary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 mt-4"
                >
                  {t("sunoSongDescription.result.copyAll")}
                </Button>

                <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                  ✓ {descriptions.length}{" "}
                  {t("sunoSongDescription.result.generated")}
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoSongDescription.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.features.feature1.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.features.feature2.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.features.feature3.description")}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("sunoSongDescription.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("sunoSongDescription.hero.description")}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoSongDescription.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.howItWorks.step1.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.howItWorks.step2.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("sunoSongDescription.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoSongDescription.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoSongDescription.faq.q1")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.faq.a1")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoSongDescription.faq.q2")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.faq.a2")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoSongDescription.faq.q3")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.faq.a3")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoSongDescription.faq.q4")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.faq.a4")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("sunoSongDescription.faq.q5")}
                </h3>
                <p className="text-muted">
                  {t("sunoSongDescription.faq.a5")}
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("sunoSongDescription.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/suno/lyric-generator"
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-accent">
                  ✍️ Lyric Generator
                </span>
              </Link>
              <Link
                href="/suno/music-prompt-generator"
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-accent">
                  🎶 Music Prompt
                </span>
              </Link>
              <Link
                href="/suno"
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-accent">
                  🎵 All Suno Tools
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
