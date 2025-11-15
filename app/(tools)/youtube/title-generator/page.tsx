"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import type { YouTubeTitleResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function YouTubeTitleGeneratorPage() {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("en");
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("youtubeTitle.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setTitles([]);

    try {
      const response = await fetch("/api/tools/youtube/title-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), language }),
      });

      const data: YouTubeTitleResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate titles");
      }

      setTitles(data.titles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (title: string) => {
    try {
      await navigator.clipboard.writeText(title);
      alert(t("youtubeTitle.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allTitles = titles.map((title, i) => `${i + 1}. ${title}`).join("\n");
      await navigator.clipboard.writeText(allTitles);
      alert(t("youtubeTitle.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setTitles([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("youtubeTitle.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("youtubeTitle.description")}
          </p>
        </div>

        <ToolSelector platform="youtube" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("youtubeTitle.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("youtubeTitle.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("youtubeTitle.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(l.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {titles.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? t("youtubeTitle.form.generating") : t("youtubeTitle.form.generate")}
              </Button>
            )}

            {titles.length > 0 && (
              <Button onClick={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("youtubeTitle.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {titles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("youtubeTitle.result.title")}
                </label>
                <Button onClick={handleCopyAll} variant="ghost" size="sm" className="text-red-600">
                  {t("youtubeTitle.result.copyAll")}
                </Button>
              </div>
              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div key={index} className="bg-surface rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-semibold mb-2">
                          {t("youtubeTitle.result.option")} {index + 1}
                        </span>
                        <p className="text-foreground">{title}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(title)}
                        className="shrink-0 px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("youtubeTitle.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("youtubeTitle.features.clickworthy.title")}
            </h3>
            <p className="text-muted">
              {t("youtubeTitle.features.clickworthy.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("youtubeTitle.features.variety.title")}
            </h3>
            <p className="text-muted">
              {t("youtubeTitle.features.variety.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("youtubeTitle.features.keywords.title")}
            </h3>
            <p className="text-muted">
              {t("youtubeTitle.features.keywords.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("youtubeTitle.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("youtubeTitle.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
