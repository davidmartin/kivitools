"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES, THREAD_LENGTHS } from "@/types";
import type { ThreadMakerResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TwitterThreadMakerPage() {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [numberOfTweets, setNumberOfTweets] = useState(5);
  const [language, setLanguage] = useState("en");
  const [tweets, setTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("threadMaker.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setTweets([]);

    try {
      const response = await fetch("/api/tools/twitter/thread-maker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          numberOfTweets,
          language,
        }),
      });

      const data: ThreadMakerResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate thread");
      }

      setTweets(data.tweets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (tweet: string) => {
    try {
      await navigator.clipboard.writeText(tweet);
      alert(t("threadMaker.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const fullThread = tweets.map((tweet, i) => `${i + 1}. ${tweet}`).join("\n\n");
      await navigator.clipboard.writeText(fullThread);
      alert(t("threadMaker.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setTweets([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("threadMaker.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("threadMaker.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="twitter" />

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
                {t("threadMaker.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("threadMaker.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("threadMaker.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {t(tone.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Tweets Select */}
            <div>
              <label
                htmlFor="numberOfTweets"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("threadMaker.form.numberOfTweets")}
              </label>
              <select
                id="numberOfTweets"
                value={numberOfTweets}
                onChange={(e) => setNumberOfTweets(Number(e.target.value))}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {THREAD_LENGTHS.map((length) => (
                  <option key={length.value} value={length.value}>
                    {length.label}
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
                {t("threadMaker.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
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
            {tweets.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading
                  ? t("threadMaker.form.generating")
                  : t("threadMaker.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {tweets.length > 0 && (
              <Button
                onClick={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("threadMaker.form.useAgain")}
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
          {tweets.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("threadMaker.result.title")}
                </label>
                <Button
                  onClick={handleCopyAll}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                >
                  {t("threadMaker.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-3">
                {tweets.map((tweet, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-semibold mb-2">
                          Tweet {index + 1}/{tweets.length}
                        </span>
                        <p className="text-foreground whitespace-pre-wrap">
                          {tweet}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(tweet)}
                        className="shrink-0 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("threadMaker.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("threadMaker.features.viral.title")}
            </h3>
            <p className="text-muted">
              {t("threadMaker.features.viral.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("threadMaker.features.numbered.title")}
            </h3>
            <p className="text-muted">
              {t("threadMaker.features.numbered.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("threadMaker.features.flexible.title")}
            </h3>
            <p className="text-muted">
              {t("threadMaker.features.flexible.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("threadMaker.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("threadMaker.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
