"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function PodcastNameGeneratorPage() {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("creative");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("podcastNameGenerator.form.topicPlaceholder"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/podcast/name-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          style,
          keywords: keywords.trim() || undefined,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate");
      }

      setResults(data.names);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("podcastNameGenerator.result.copied"));
  };

  const handleCopyAll = async () => {
    const allNames = results.map((name, i) => `${i + 1}. ${name}`).join("\n");
    await navigator.clipboard.writeText(allNames);
    alert(t("podcastNameGenerator.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setResults([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("podcastDescriptionGenerator.title"), href: "/podcast/description-generator" },
    { name: t("podcastEpisodeTitleGenerator.title"), href: "/podcast/episode-title-generator" },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
            🎙️ Podcast Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("podcastNameGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("podcastNameGenerator.description")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
          <div className="space-y-6">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("podcastNameGenerator.form.topic")}
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("podcastNameGenerator.form.topicPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {/* Style Select */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                {t("podcastNameGenerator.form.style")}
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              >
                <option value="professional">{t("podcastNameGenerator.form.styleOptions.professional")}</option>
                <option value="conversational">{t("podcastNameGenerator.form.styleOptions.conversational")}</option>
                <option value="creative">{t("podcastNameGenerator.form.styleOptions.creative")}</option>
                <option value="witty">{t("podcastNameGenerator.form.styleOptions.witty")}</option>
                <option value="minimalist">{t("podcastNameGenerator.form.styleOptions.minimalist")}</option>
              </select>
            </div>

            {/* Keywords Input */}
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                {t("podcastNameGenerator.form.keywords")}
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t("podcastNameGenerator.form.keywordsPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Turnstile & Buttons */}
            {!results.length && (
              <>
                <TurnstileWidget
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setError(t("turnstile.failed"))}
                />
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? t("podcastNameGenerator.form.generating") : t("podcastNameGenerator.form.generate")}
                </Button>
              </>
            )}

            {results.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("podcastNameGenerator.form.useAgain")}
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-surface rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t("podcastNameGenerator.result.title")}
              </h2>
              <Button
                onPress={handleCopyAll}
                variant="ghost"
                size="sm"
              >
                {t("podcastNameGenerator.result.copyAll")}
              </Button>
            </div>
            <div className="grid gap-3">
              {results.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                >
                  <span className="text-foreground font-medium">{name}</span>
                  <Button
                    onPress={() => handleCopy(name)}
                    variant="ghost"
                    size="sm"
                  >
                    {t("podcastNameGenerator.result.copy")}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("podcastNameGenerator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t(`podcastNameGenerator.features.feature${i}.title`)}
                </h3>
                <p className="text-muted">
                  {t(`podcastNameGenerator.features.feature${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Description */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("podcastNameGenerator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("podcastNameGenerator.hero.description")}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("podcastNameGenerator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t(`podcastNameGenerator.howItWorks.step${step}.title`)}
                </h3>
                <p className="text-muted">
                  {t(`podcastNameGenerator.howItWorks.step${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("podcastNameGenerator.faq.title")}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t(`podcastNameGenerator.faq.q${i}`)}
                </h3>
                <p className="text-muted">
                  {t(`podcastNameGenerator.faq.a${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("podcastNameGenerator.relatedTools.title")}
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
  );
}
