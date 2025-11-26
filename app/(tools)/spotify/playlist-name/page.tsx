"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES } from "@/types";
import { generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export default function SpotifyPlaylistNamePage() {
  const { t, language: uiLanguage } = useLanguage();
  const [mood, setMood] = useState("");
  const [genres, setGenres] = useState("");
  const [occasion, setOccasion] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // SEO Data
  const toolJsonLd = generateToolJsonLd({
    platform: "spotify",
    toolName: "Playlist Name Generator",
    title: "Spotify Playlist Name Generator - Create Creative Names",
    description: "Generate creative and memorable names for your Spotify playlists",
    englishSlug: "playlist-name",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "spotify",
    toolName: "Playlist Name Generator",
    englishSlug: "playlist-name",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("spotifyPlaylistName.faq.q1"), answer: t("spotifyPlaylistName.faq.a1") },
    { question: t("spotifyPlaylistName.faq.q2"), answer: t("spotifyPlaylistName.faq.a2") },
    { question: t("spotifyPlaylistName.faq.q3"), answer: t("spotifyPlaylistName.faq.a3") },
    { question: t("spotifyPlaylistName.faq.q4"), answer: t("spotifyPlaylistName.faq.a4") },
    { question: t("spotifyPlaylistName.faq.q5"), answer: t("spotifyPlaylistName.faq.a5") },
  ]);

  const relatedTools = [
    { name: t("spotifyPlaylistDescription.title"), href: "/spotify/playlist-description" },
    { name: t("spotifyArtistBio.title"), href: "/spotify/artist-bio" },
  ];

  const handleGenerate = async () => {
    if (!mood.trim()) {
      setError(t("spotifyPlaylistName.form.error.emptyMood"));
      return;
    }
    if (!genres.trim()) {
      setError(t("spotifyPlaylistName.form.error.emptyGenres"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/spotify/playlist-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: mood.trim(),
          genres: genres.trim(),
          occasion: occasion.trim() || undefined,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate names");
      }

      setResults(data.names);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t("spotifyPlaylistName.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allNames = results.map((name, i) => `${i + 1}. ${name}`).join("\n");
      await navigator.clipboard.writeText(allNames);
      alert(t("spotifyPlaylistName.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResults([]);
    setError("");
    setTurnstileToken("");
  };

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
            <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
              🎵 Spotify Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("spotifyPlaylistName.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("spotifyPlaylistName.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="spotify" />

          {/* Form Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="space-y-6">
              {/* Mood */}
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyPlaylistName.form.mood")}
                </label>
                <input
                  id="mood"
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder={t("spotifyPlaylistName.form.moodPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Genres */}
              <div>
                <label htmlFor="genres" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyPlaylistName.form.genres")}
                </label>
                <input
                  id="genres"
                  type="text"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  placeholder={t("spotifyPlaylistName.form.genresPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Occasion (optional) */}
              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyPlaylistName.form.occasion")}
                </label>
                <input
                  id="occasion"
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder={t("spotifyPlaylistName.form.occasionPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyPlaylistName.form.language")}
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {t(l.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Turnstile */}
              <TurnstileWidget
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setError(t("turnstile.failed"))}
              />

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Generate/Use Again Button */}
              {!results.length ? (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? t("spotifyPlaylistName.form.generating") : t("spotifyPlaylistName.form.generate")}
                </Button>
              ) : (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("spotifyPlaylistName.form.useAgain")}
                </Button>
              )}
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {t("spotifyPlaylistName.result.title")}
                  </h3>
                  <Button
                    onPress={handleCopyAll}
                    variant="ghost"
                    size="sm"
                  >
                    {t("spotifyPlaylistName.result.copyAll")}
                  </Button>
                </div>
                <div className="space-y-3">
                  {results.map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <span className="text-foreground font-medium">{name}</span>
                      <Button
                        onPress={() => handleCopy(name)}
                        variant="ghost"
                        size="sm"
                      >
                        {t("spotifyPlaylistName.result.copy")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistName.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["creative", "moods", "shareable", "multilang"].map((feature) => (
                <div
                  key={feature}
                  className="bg-surface rounded-xl p-6 border border-border"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistName.features.${feature}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistName.features.${feature}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("spotifyPlaylistName.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("spotifyPlaylistName.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistName.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistName.howItWorks.step${step}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistName.howItWorks.step${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistName.faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistName.faq.q${num}`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistName.faq.a${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistName.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
