"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { SnapchatCaptionResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function SnapchatCaptionGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("playful");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [language, setLanguage] = useState(uiLanguage);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("snapchatCaption.form.error.emptyTopic"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setCaption("");

    try {
      const response = await fetch("/api/tools/snapchat/caption-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          includeEmojis,
          language,
          turnstileToken,
        }),
      });

      const data: SnapchatCaptionResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate caption");
      }

      setCaption(data.caption || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      alert(t("snapchatCaption.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setCaption("");
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("snapchatCaption.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("snapchatCaption.description")}
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
                {t("snapchatCaption.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("snapchatCaption.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("snapchatCaption.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-surface text-foreground"
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
                {t("snapchatCaption.form.language")}
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

            {/* Include Emojis Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="includeEmojis"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                disabled={isLoading}
              />
              <label
                htmlFor="includeEmojis"
                className="text-sm font-medium text-foreground"
              >
                {t("snapchatCaption.form.includeEmojis")}
              </label>
            </div>

            {/* Generate Button */}
            {!caption && (
              <>
              <TurnstileWidget
                onSuccess={setTurnstileToken}
                onError={() => setError(t("turnstile.error"))}
              />
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500"
              >
                {isLoading
                  ? t("snapchatCaption.form.generating")
                  : t("snapchatCaption.form.generate")}
              </Button>
              </>
            )}

            {/* Use Again Button */}
            {caption && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("snapchatCaption.form.useAgain")}
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
          {caption && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("snapchatCaption.result.title")}
                </label>
                <Button
                  onPress={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-yellow-600"
                >
                  {t("snapchatCaption.result.copy")}
                </Button>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap text-lg">
                  {caption}
                </p>
                <p className="text-xs text-muted mt-2">
                  {t("snapchatCaption.result.charCount")}: {caption.length}/100
                </p>
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("snapchatCaption.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatCaption.features.short.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatCaption.features.short.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatCaption.features.playful.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatCaption.features.playful.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatCaption.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatCaption.features.engaging.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("snapchatCaption.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("snapchatCaption.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
