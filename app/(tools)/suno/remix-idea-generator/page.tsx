"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES } from "@/types";

interface RemixIdea {
  concept: string;
  genre: string;
  tempo: string;
  elements: string[];
}

const REMIX_STYLES = [
  { value: "electronic", key: "sunoRemixIdeaGenerator.form.remixStyle.electronic" },
  { value: "lofi", key: "sunoRemixIdeaGenerator.form.remixStyle.lofi" },
  { value: "trap", key: "sunoRemixIdeaGenerator.form.remixStyle.trap" },
  { value: "rock", key: "sunoRemixIdeaGenerator.form.remixStyle.rock" },
  { value: "acoustic", key: "sunoRemixIdeaGenerator.form.remixStyle.acoustic" },
  { value: "orchestral", key: "sunoRemixIdeaGenerator.form.remixStyle.orchestral" },
  { value: "reggaeton", key: "sunoRemixIdeaGenerator.form.remixStyle.reggaeton" },
  { value: "jazz", key: "sunoRemixIdeaGenerator.form.remixStyle.jazz" },
];

export default function SunoRemixIdeaGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [originalSong, setOriginalSong] = useState("");
  const [originalGenre, setOriginalGenre] = useState("");
  const [remixStyle, setRemixStyle] = useState("electronic");
  const [language, setLanguage] = useState(uiLanguage);
  const [results, setResults] = useState<RemixIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!originalSong.trim()) {
      setError(t("sunoRemixIdeaGenerator.form.error.empty"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/suno/remix-idea-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalSong: originalSong.trim(),
          originalGenre: originalGenre.trim(),
          remixStyle,
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

  const formatRemixIdea = (idea: RemixIdea): string => {
    return `${idea.concept}\n\nGenre: ${idea.genre}\nTempo: ${idea.tempo}\nKey Elements: ${idea.elements.join(", ")}`;
  };

  const handleCopy = async (idea: RemixIdea, index: number) => {
    try {
      await navigator.clipboard.writeText(formatRemixIdea(idea));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allResults = results.map((idea, i) => `${i + 1}. ${formatRemixIdea(idea)}`).join("\n\n---\n\n");
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
    { name: t("sunoCoverArtPromptGenerator.title"), href: "/suno/cover-art-prompt-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
            {t("sunoRemixIdeaGenerator.badge")}
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("sunoRemixIdeaGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("sunoRemixIdeaGenerator.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="suno" />

        {/* Form Section */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
          <div className="space-y-6">
            {/* Original Song Description */}
            <div>
              <label
                htmlFor="originalSong"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoRemixIdeaGenerator.form.originalSong")}
              </label>
              <textarea
                id="originalSong"
                value={originalSong}
                onChange={(e) => setOriginalSong(e.target.value)}
                placeholder={t("sunoRemixIdeaGenerator.form.originalSongPlaceholder")}
                rows={4}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none disabled:opacity-50"
              />
            </div>

            {/* Original Genre */}
            <div>
              <label
                htmlFor="originalGenre"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("sunoRemixIdeaGenerator.form.originalGenre")}
              </label>
              <input
                id="originalGenre"
                type="text"
                value={originalGenre}
                onChange={(e) => setOriginalGenre(e.target.value)}
                placeholder={t("sunoRemixIdeaGenerator.form.originalGenrePlaceholder")}
                disabled={isLoading || results.length > 0}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
              />
            </div>

            {/* Remix Style and Language Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Remix Style */}
              <div>
                <label
                  htmlFor="remixStyle"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoRemixIdeaGenerator.form.remixStyle")}
                </label>
                <select
                  id="remixStyle"
                  value={remixStyle}
                  onChange={(e) => setRemixStyle(e.target.value)}
                  disabled={isLoading || results.length > 0}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground disabled:opacity-50"
                >
                  {REMIX_STYLES.map((style) => (
                    <option key={style.value} value={style.value}>
                      {t(style.key)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Selector */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("sunoRemixIdeaGenerator.form.language")}
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
                  ? t("sunoRemixIdeaGenerator.form.generating")
                  : t("sunoRemixIdeaGenerator.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {results.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold py-3 rounded-lg transition-colors"
              >
                {t("sunoRemixIdeaGenerator.form.useAgain")}
              </Button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t("sunoRemixIdeaGenerator.result.title")}
              </h2>
              <Button
                onPress={handleCopyAll}
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {copiedIndex === -1
                  ? t("sunoRemixIdeaGenerator.result.copiedAll")
                  : t("sunoRemixIdeaGenerator.result.copyAll")}
              </Button>
            </div>

            <div className="space-y-6">
              {results.map((idea, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-lg p-6 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <Button
                      onPress={() => handleCopy(idea, index)}
                      variant="ghost"
                      className="shrink-0 text-muted hover:text-purple-600"
                    >
                      {copiedIndex === index
                        ? t("sunoRemixIdeaGenerator.result.copied")
                        : t("sunoRemixIdeaGenerator.result.copy")}
                    </Button>
                  </div>

                  {/* Concept */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted mb-1">
                      {t("sunoRemixIdeaGenerator.result.concept")}
                    </h4>
                    <p className="text-foreground">{idea.concept}</p>
                  </div>

                  {/* Genre and Tempo */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted mb-1">
                        {t("sunoRemixIdeaGenerator.result.genre")}
                      </h4>
                      <p className="text-foreground">{idea.genre}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted mb-1">
                        {t("sunoRemixIdeaGenerator.result.tempo")}
                      </h4>
                      <p className="text-foreground">{idea.tempo}</p>
                    </div>
                  </div>

                  {/* Elements */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted mb-2">
                      {t("sunoRemixIdeaGenerator.result.elements")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {idea.elements.map((element, i) => (
                        <span
                          key={i}
                          className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm px-3 py-1 rounded-full"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoRemixIdeaGenerator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.features.feature1.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.features.feature1.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.features.feature2.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.features.feature2.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.features.feature3.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.features.feature3.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.features.feature4.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.features.feature4.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("sunoRemixIdeaGenerator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("sunoRemixIdeaGenerator.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoRemixIdeaGenerator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("sunoRemixIdeaGenerator.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoRemixIdeaGenerator.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.faq.q1")}
              </h3>
              <p className="text-muted">{t("sunoRemixIdeaGenerator.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.faq.q2")}
              </h3>
              <p className="text-muted">{t("sunoRemixIdeaGenerator.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.faq.q3")}
              </h3>
              <p className="text-muted">{t("sunoRemixIdeaGenerator.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.faq.q4")}
              </h3>
              <p className="text-muted">{t("sunoRemixIdeaGenerator.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("sunoRemixIdeaGenerator.faq.q5")}
              </h3>
              <p className="text-muted">{t("sunoRemixIdeaGenerator.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("sunoRemixIdeaGenerator.relatedTools.title")}
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
