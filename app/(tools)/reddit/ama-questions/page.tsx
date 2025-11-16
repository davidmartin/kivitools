"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import type { RedditAMAResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function RedditAMAQuestionsPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("redditAMA.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await fetch("/api/tools/reddit/ama-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), language }),
      });

      const data: RedditAMAResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate questions");
      }

      setQuestions(data.questions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (question: string) => {
    try {
      await navigator.clipboard.writeText(question);
      alert(t("redditAMA.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join("\n\n");
      await navigator.clipboard.writeText(allQuestions);
      alert(t("redditAMA.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setQuestions([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("redditAMA.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("redditAMA.description")}
          </p>
        </div>

        <ToolSelector platform="reddit" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("redditAMA.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("redditAMA.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("redditAMA.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(l.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {questions.length === 0 && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? t("redditAMA.form.generating") : t("redditAMA.form.generate")}
              </Button>
            )}

            {questions.length > 0 && (
              <Button onClick={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("redditAMA.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {questions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("redditAMA.result.title")}
                </label>
                <Button onClick={handleCopyAll} variant="ghost" size="sm" className="text-orange-600">
                  {t("redditAMA.result.copyAll")}
                </Button>
              </div>
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={index} className="bg-surface rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded text-xs font-semibold mb-2">
                          {t("redditAMA.result.question")} {index + 1}
                        </span>
                        <p className="text-foreground">{question}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(question)}
                        className="shrink-0 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("redditAMA.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditAMA.features.thoughtful.title")}
            </h3>
            <p className="text-muted">
              {t("redditAMA.features.thoughtful.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditAMA.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("redditAMA.features.engaging.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditAMA.features.diverse.title")}
            </h3>
            <p className="text-muted">
              {t("redditAMA.features.diverse.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditAMA.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("redditAMA.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
