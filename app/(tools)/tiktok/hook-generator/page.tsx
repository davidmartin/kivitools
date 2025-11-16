"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { HookGeneratorResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function TikTokHookGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState(uiLanguage);
  const [hooks, setHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("hookGenerator.form.error.emptyTopic"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setHooks([]);

    try {
      const response = await fetch("/api/tools/tiktok/hook-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          language,
          turnstileToken,
        }),
      });

      const data: HookGeneratorResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate hooks");
      }

      setHooks(data.hooks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (hook: string) => {
    try {
      await navigator.clipboard.writeText(hook);
      alert(t("hookGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allHooks = hooks.join("\n\n");
      await navigator.clipboard.writeText(allHooks);
      alert(t("hookGenerator.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setHooks([]);
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("hookGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("hookGenerator.description")}
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
                {t("hookGenerator.form.topic")}
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("hookGenerator.form.topicPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("hookGenerator.form.tone")}
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

            {/* Language Select */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("hookGenerator.form.language")}
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
            {hooks.length === 0 && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("hookGenerator.form.generating") : t("hookGenerator.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {hooks.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("hookGenerator.form.useAgain")}
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
          {hooks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("hookGenerator.result.title")} ({hooks.length})
                </label>
                <Button
                  onClick={handleCopyAll}
                  variant="ghost"
                  size="sm"
                >
                  {t("hookGenerator.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-3">
                {hooks.map((hook, index) => (
                  <div
                    key={index}
                    className="bg-surface dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-foreground font-medium">
                        {hook}
                      </p>
                      <button
                        onClick={() => handleCopy(hook)}
                        className="shrink-0 text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                        title="Copy hook"
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
                {t("hookGenerator.result.success").replace("{count}", hooks.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hookGenerator.features.stopScroll.title")}
            </h3>
            <p className="text-muted">
              {t("hookGenerator.features.stopScroll.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hookGenerator.features.multipleStyles.title")}
            </h3>
            <p className="text-muted">
              {t("hookGenerator.features.multipleStyles.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hookGenerator.features.proven.title")}
            </h3>
            <p className="text-muted">
              {t("hookGenerator.features.proven.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hookGenerator.features.copyTest.title")}
            </h3>
            <p className="text-muted">
              {t("hookGenerator.features.copyTest.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
