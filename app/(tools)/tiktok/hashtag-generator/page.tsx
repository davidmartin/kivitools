"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import type { HashtagGeneratorResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TikTokHashtagGeneratorPage() {
  const { t } = useLanguage();
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<
    Array<{ tag: string; views: string; relevance: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      setError(t("hashtagGenerator.form.error.emptyKeyword"));
      return;
    }

    setIsLoading(true);
    setError("");
    setHashtags([]);

    try {
      const response = await fetch("/api/tools/tiktok/hashtag-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: keyword.trim(),
        }),
      });

      const data: HashtagGeneratorResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate hashtags");
      }

      setHashtags(data.hashtags || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      alert(t("hashtagGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allTags = hashtags.map((h) => h.tag).join(" ");
      await navigator.clipboard.writeText(allTags);
      alert(t("hashtagGenerator.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setHashtags([]);
    setError("");
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance.toLowerCase()) {
      case "high":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      case "low":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      default:
        return "bg-surface text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("hashtagGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("hashtagGenerator.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="tiktok" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Keyword Input */}
            <div>
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("hashtagGenerator.form.keyword")}
              </label>
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t("hashtagGenerator.form.keywordPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Generate Button */}
            {hashtags.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("hashtagGenerator.form.generating") : t("hashtagGenerator.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {hashtags.length > 0 && (
              <Button
                onClick={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("hashtagGenerator.form.useAgain")}
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
          {hashtags.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("hashtagGenerator.result.title")} ({hashtags.length})
                </label>
                <Button onClick={handleCopyAll} variant="ghost" size="sm">
                  {t("hashtagGenerator.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-2">
                {hashtags.map((hashtag, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCopy(hashtag.tag)}
                        className="flex-1 flex items-center gap-3 text-left"
                      >
                        <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                          {hashtag.tag}
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted">
                          {hashtag.views}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(
                            hashtag.relevance
                          )}`}
                        >
                          {hashtag.relevance}
                        </span>
                        <button
                          onClick={() => handleCopy(hashtag.tag)}
                          className="shrink-0 text-muted hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          title="Copy hashtag"
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
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t("hashtagGenerator.result.tip")}
                </p>
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("hashtagGenerator.result.success").replace("{count}", hashtags.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hashtagGenerator.features.viewEstimates.title")}
            </h3>
            <p className="text-muted">
              {t("hashtagGenerator.features.viewEstimates.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hashtagGenerator.features.relevance.title")}
            </h3>
            <p className="text-muted">
              {t("hashtagGenerator.features.relevance.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hashtagGenerator.features.mixMatch.title")}
            </h3>
            <p className="text-muted">
              {t("hashtagGenerator.features.mixMatch.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("hashtagGenerator.features.quickCopy.title")}
            </h3>
            <p className="text-muted">
              {t("hashtagGenerator.features.quickCopy.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
