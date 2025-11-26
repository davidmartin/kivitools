"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES } from "@/types";
import { generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export default function SpotifyArtistBioPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [style, setStyle] = useState("");
  const [achievements, setAchievements] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // SEO Data
  const toolJsonLd = generateToolJsonLd({
    platform: "spotify",
    toolName: "Artist Bio Generator",
    title: "Spotify Artist Bio Generator",
    description: "Create a professional bio that tells your story and connects with your fans",
    englishSlug: "artist-bio",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "spotify",
    toolName: "Artist Bio Generator",
    englishSlug: "artist-bio",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("spotifyArtistBio.faq.q1"), answer: t("spotifyArtistBio.faq.a1") },
    { question: t("spotifyArtistBio.faq.q2"), answer: t("spotifyArtistBio.faq.a2") },
    { question: t("spotifyArtistBio.faq.q3"), answer: t("spotifyArtistBio.faq.a3") },
    { question: t("spotifyArtistBio.faq.q4"), answer: t("spotifyArtistBio.faq.a4") },
    { question: t("spotifyArtistBio.faq.q5"), answer: t("spotifyArtistBio.faq.a5") },
  ]);

  const relatedTools = [
    { name: t("spotifyPlaylistName.title"), href: "/spotify/playlist-name" },
    { name: t("spotifyPlaylistDescription.title"), href: "/spotify/playlist-description" },
  ];

  const handleGenerate = async () => {
    if (!artistName.trim()) {
      setError(t("spotifyArtistBio.form.error.emptyName"));
      return;
    }
    if (!genre.trim()) {
      setError(t("spotifyArtistBio.form.error.emptyGenre"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/spotify/artist-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistName: artistName.trim(),
          genre: genre.trim(),
          style: style.trim() || undefined,
          achievements: achievements.trim() || undefined,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate bio");
      }

      setResult(data.bio);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert(t("spotifyArtistBio.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResult("");
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
              🎤 Spotify Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("spotifyArtistBio.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("spotifyArtistBio.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="spotify" />

          {/* Form Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="space-y-6">
              {/* Artist Name */}
              <div>
                <label htmlFor="artistName" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyArtistBio.form.artistName")}
                </label>
                <input
                  id="artistName"
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder={t("spotifyArtistBio.form.artistNamePlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyArtistBio.form.genre")}
                </label>
                <input
                  id="genre"
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder={t("spotifyArtistBio.form.genrePlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Style */}
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyArtistBio.form.style")}
                </label>
                <input
                  id="style"
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder={t("spotifyArtistBio.form.stylePlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Achievements (optional) */}
              <div>
                <label htmlFor="achievements" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyArtistBio.form.achievements")}
                </label>
                <textarea
                  id="achievements"
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder={t("spotifyArtistBio.form.achievementsPlaceholder")}
                  rows={2}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground resize-none"
                />
              </div>

              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                  {t("spotifyArtistBio.form.language")}
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
              {!result ? (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? t("spotifyArtistBio.form.generating") : t("spotifyArtistBio.form.generate")}
                </Button>
              ) : (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("spotifyArtistBio.form.useAgain")}
                </Button>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {t("spotifyArtistBio.result.title")}
                  </h3>
                  <Button
                    onPress={handleCopy}
                    variant="ghost"
                    size="sm"
                  >
                    {t("spotifyArtistBio.result.copy")}
                  </Button>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-foreground whitespace-pre-line">{result}</p>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyArtistBio.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["storytelling", "credibility", "discovery", "multilang"].map((feature) => (
                <div
                  key={feature}
                  className="bg-surface rounded-xl p-6 border border-border"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyArtistBio.features.${feature}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyArtistBio.features.${feature}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("spotifyArtistBio.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("spotifyArtistBio.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyArtistBio.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyArtistBio.howItWorks.step${step}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyArtistBio.howItWorks.step${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyArtistBio.faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`spotifyArtistBio.faq.q${num}`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyArtistBio.faq.a${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyArtistBio.relatedTools.title")}
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
