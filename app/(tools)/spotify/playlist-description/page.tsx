"use client";

import { useState } from "react";
import { Button, Select, Label, ListBox, TextField, Input } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES } from "@/types";
import { generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export default function SpotifyPlaylistDescriptionPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [playlistName, setPlaylistName] = useState("");
  const [mood, setMood] = useState("");
  const [genres, setGenres] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // SEO Data
  const toolJsonLd = generateToolJsonLd({
    platform: "spotify",
    toolName: "Playlist Description Generator",
    title: "Spotify Playlist Description Generator",
    description: "Create engaging descriptions that make people save and share your playlist",
    englishSlug: "playlist-description",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "spotify",
    toolName: "Playlist Description Generator",
    englishSlug: "playlist-description",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("spotifyPlaylistDescription.faq.q1"), answer: t("spotifyPlaylistDescription.faq.a1") },
    { question: t("spotifyPlaylistDescription.faq.q2"), answer: t("spotifyPlaylistDescription.faq.a2") },
    { question: t("spotifyPlaylistDescription.faq.q3"), answer: t("spotifyPlaylistDescription.faq.a3") },
    { question: t("spotifyPlaylistDescription.faq.q4"), answer: t("spotifyPlaylistDescription.faq.a4") },
    { question: t("spotifyPlaylistDescription.faq.q5"), answer: t("spotifyPlaylistDescription.faq.a5") },
  ]);

  const relatedTools = [
    { name: t("spotifyPlaylistName.title"), href: "/spotify/playlist-name" },
    { name: t("spotifyArtistBio.title"), href: "/spotify/artist-bio" },
  ];

  const handleGenerate = async () => {
    if (!playlistName.trim()) {
      setError(t("spotifyPlaylistDescription.form.error.emptyName"));
      return;
    }
    if (!mood.trim()) {
      setError(t("spotifyPlaylistDescription.form.error.emptyMood"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/spotify/playlist-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlistName: playlistName.trim(),
          mood: mood.trim(),
          genres: genres.trim() || undefined,
          targetAudience: targetAudience.trim() || undefined,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate description");
      }

      setResult(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert(t("spotifyPlaylistDescription.result.copied"));
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
              🎧 Spotify Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("spotifyPlaylistDescription.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("spotifyPlaylistDescription.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="spotify" />

          {/* Form Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="space-y-6">
              {/* Playlist Name */}
              <TextField className="w-full" name="playlistName" type="text" isDisabled={isLoading}>
                <Label>{t("spotifyPlaylistDescription.form.playlistName")}</Label>
                <Input
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder={t("spotifyPlaylistDescription.form.playlistNamePlaceholder")}
                />
              </TextField>

              {/* Mood */}
              <TextField className="w-full" name="mood" type="text" isDisabled={isLoading}>
                <Label>{t("spotifyPlaylistDescription.form.mood")}</Label>
                <Input
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder={t("spotifyPlaylistDescription.form.moodPlaceholder")}
                />
              </TextField>

              {/* Genres */}
              <TextField className="w-full" name="genres" type="text" isDisabled={isLoading}>
                <Label>{t("spotifyPlaylistDescription.form.genres")}</Label>
                <Input
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  placeholder={t("spotifyPlaylistDescription.form.genresPlaceholder")}
                />
              </TextField>

              {/* Target Audience (optional) */}
              <TextField className="w-full" name="targetAudience" type="text" isDisabled={isLoading}>
                <Label>{t("spotifyPlaylistDescription.form.targetAudience")}</Label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder={t("spotifyPlaylistDescription.form.targetAudiencePlaceholder")}
                />
              </TextField>

              {/* Language */}
              <div>
                <Label>{t("spotifyPlaylistDescription.form.language")}</Label>
                <Select
                  selectedKey={language}
                  onSelectionChange={(key) => setLanguage(key as "en" | "es")}
                  isDisabled={isLoading}
                  className="w-full"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {LANGUAGES.map((l) => (
                        <ListBox.Item key={l.value} id={l.value} textValue={t(l.labelKey)}>
                          {t(l.labelKey)}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
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
                  {isLoading ? t("spotifyPlaylistDescription.form.generating") : t("spotifyPlaylistDescription.form.generate")}
                </Button>
              ) : (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("spotifyPlaylistDescription.form.useAgain")}
                </Button>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {t("spotifyPlaylistDescription.result.title")}
                  </h3>
                  <Button
                    onPress={handleCopy}
                    variant="ghost"
                    size="sm"
                  >
                    {t("spotifyPlaylistDescription.result.copy")}
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
              {t("spotifyPlaylistDescription.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["discovery", "engagement", "sharing", "multilang"].map((feature) => (
                <div
                  key={feature}
                  className="bg-surface rounded-xl p-6 border border-border"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistDescription.features.${feature}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistDescription.features.${feature}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("spotifyPlaylistDescription.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("spotifyPlaylistDescription.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistDescription.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistDescription.howItWorks.step${step}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistDescription.howItWorks.step${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistDescription.faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`spotifyPlaylistDescription.faq.q${num}`)}
                  </h3>
                  <p className="text-muted">
                    {t(`spotifyPlaylistDescription.faq.a${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("spotifyPlaylistDescription.relatedTools.title")}
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
