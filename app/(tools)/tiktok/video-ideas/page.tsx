"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import type { VideoIdeasResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TikTokVideoIdeasPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("videoIdeas.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setIdeas([]);

    try {
      const response = await fetch("/api/tools/tiktok/video-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
        }),
      });

      const data: VideoIdeasResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate ideas");
      }

      setIdeas(data.ideas || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (idea: string) => {
    try {
      await navigator.clipboard.writeText(idea);
      alert(t("videoIdeas.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allIdeas = ideas.map((idea, i) => `${i + 1}. ${idea}`).join("\n\n");
      await navigator.clipboard.writeText(allIdeas);
      alert(t("videoIdeas.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setIdeas([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("videoIdeas.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("videoIdeas.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="tiktok" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Topic Input */}
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("videoIdeas.form.topic")}
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("videoIdeas.form.topicPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Language Select */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("videoIdeas.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
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

            {/* Generate Button */}
            {ideas.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("videoIdeas.form.generating") : t("videoIdeas.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {ideas.length > 0 && (
              <Button
                onClick={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("videoIdeas.form.useAgain")}
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {ideas.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("videoIdeas.result.title")} ({ideas.length})
                </label>
                <Button
                  onClick={handleCopyAll}
                  variant="ghost"
                  size="sm"
                >
                  {t("videoIdeas.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-3">
                {ideas.map((idea, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-gray-800 dark:text-gray-200 pt-1">
                        {idea}
                      </p>
                      <button
                        onClick={() => handleCopy(idea)}
                        className="shrink-0 text-muted hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="Copy idea"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("videoIdeas.result.success").replace("{count}", ideas.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("videoIdeas.features.creative.title")}
            </h3>
            <p className="text-muted">
              {t("videoIdeas.features.creative.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("videoIdeas.features.trending.title")}
            </h3>
            <p className="text-muted">
              {t("videoIdeas.features.trending.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("videoIdeas.features.multilang.title")}
            </h3>
            <p className="text-muted">
              {t("videoIdeas.features.multilang.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("videoIdeas.features.easyCopy.title")}
            </h3>
            <p className="text-muted">
              {t("videoIdeas.features.easyCopy.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
