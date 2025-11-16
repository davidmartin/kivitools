"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import type { SnapchatLensIdeasResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function SnapchatLensIdeasPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("snapchatLensIdeas.form.error.emptyTopic"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setIdeas([]);

    try {
      const response = await fetch("/api/tools/snapchat/lens-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
          turnstileToken,
        }),
      });

      const data: SnapchatLensIdeasResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate lens ideas");
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
      alert(t("snapchatLensIdeas.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allIdeas = ideas.map((idea, i) => `${i + 1}. ${idea}`).join("\n\n");
      await navigator.clipboard.writeText(allIdeas);
      alert(t("snapchatLensIdeas.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setIdeas([]);
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("snapchatLensIdeas.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("snapchatLensIdeas.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="snapchat" />

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
                {t("snapchatLensIdeas.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("snapchatLensIdeas.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Language Select */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("snapchatLensIdeas.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-surface text-foreground"
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
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500"
              >
                {isLoading
                  ? t("snapchatLensIdeas.form.generating")
                  : t("snapchatLensIdeas.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {ideas.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("snapchatLensIdeas.form.useAgain")}
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
          {ideas.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("snapchatLensIdeas.result.title")}
                </label>
                <Button
                  onClick={handleCopyAll}
                  variant="ghost"
                  size="sm"
                  className="text-yellow-600"
                >
                  {t("snapchatLensIdeas.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-4">
                {ideas.map((idea, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-lg p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded text-xs font-semibold mb-3">
                          {t("snapchatLensIdeas.result.lens")} {index + 1}
                        </span>
                        <p className="text-foreground leading-relaxed">
                          {idea}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(idea)}
                        className="shrink-0 px-3 py-1 text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("snapchatLensIdeas.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatLensIdeas.features.innovative.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatLensIdeas.features.innovative.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatLensIdeas.features.detailed.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatLensIdeas.features.detailed.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatLensIdeas.features.trendy.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatLensIdeas.features.trendy.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatLensIdeas.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatLensIdeas.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
