"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { TwitchStreamTitleResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TwitchStreamTitlePage() {
  const { t } = useLanguage();
  const [game, setGame] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!game.trim()) {
      setError(t("twitchStreamTitle.form.error.emptyGame"));
      return;
    }

    setIsLoading(true);
    setError("");
    setTitles([]);

    try {
      const response = await fetch("/api/tools/twitch/stream-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: game.trim(), tone, language }),
      });

      const data: TwitchStreamTitleResponse = await response.json();

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
      alert(t("twitchStreamTitle.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allTitles = titles.map((title, i) => `${i + 1}. ${title}`).join("\n");
      await navigator.clipboard.writeText(allTitles);
      alert(t("twitchStreamTitle.result.copiedAll"));
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
            {t("twitchStreamTitle.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("twitchStreamTitle.description")}
          </p>
        </div>

        <ToolSelector platform="twitch" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="game" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchStreamTitle.form.game")}
              </label>
              <input
                id="game"
                type="text"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                placeholder={t("twitchStreamTitle.form.gamePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchStreamTitle.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {t(tone.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchStreamTitle.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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

            {titles.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("twitchStreamTitle.form.generating") : t("twitchStreamTitle.form.generate")}
              </Button>
            )}

            {titles.length > 0 && (
              <Button onClick={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("twitchStreamTitle.form.useAgain")}
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
                  {t("twitchStreamTitle.result.title")}
                </label>
                <Button onClick={handleCopyAll} variant="ghost" size="sm" className="text-purple-600">
                  {t("twitchStreamTitle.result.copyAll")}
                </Button>
              </div>
              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div key={index} className="bg-surface rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs font-semibold mb-2">
                          {t("twitchStreamTitle.result.option")} {index + 1}
                        </span>
                        <p className="text-foreground">{title}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(title)}
                        className="shrink-0 px-3 py-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("twitchStreamTitle.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamTitle.features.clickworthy.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamTitle.features.clickworthy.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamTitle.features.variety.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamTitle.features.variety.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamTitle.features.trending.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamTitle.features.trending.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamTitle.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamTitle.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
