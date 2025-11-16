"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { CaptionGeneratorResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function InstagramCaptionGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState(uiLanguage);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("captionGenerator.form.error.emptyTopic"));
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
      const response = await fetch("/api/tools/instagram/caption-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          includeEmojis,
          includeHashtags,
          language,
          turnstileToken,
        }),
      });

      const data: CaptionGeneratorResponse = await response.json();

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
      alert(t("captionGenerator.result.copied"));
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
            {t("captionGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("captionGenerator.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="instagram" />

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
                {t("captionGenerator.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("captionGenerator.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("captionGenerator.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
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
                {t("captionGenerator.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(l.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEmojis}
                  onChange={(e) => setIncludeEmojis(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm text-foreground">
                  {t("captionGenerator.form.includeEmojis")}
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHashtags}
                  onChange={(e) => setIncludeHashtags(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm text-foreground">
                  {t("captionGenerator.form.includeHashtags")}
                </span>
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
                className="w-full"
              >
                {isLoading ? t("captionGenerator.form.generating") : t("captionGenerator.form.generate")}
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
                {t("captionGenerator.form.useAgain")}
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
              <label className="block text-sm font-medium text-foreground">
                {t("captionGenerator.result.title")}
              </label>
              <textarea
                value={caption}
                readOnly
                rows={10}
                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
              />
              <Button
                onPress={handleCopy}
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {t("captionGenerator.result.copy")}
              </Button>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("captionGenerator.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("captionGenerator.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("captionGenerator.features.engaging.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("captionGenerator.features.customizable.title")}
            </h3>
            <p className="text-muted">
              {t("captionGenerator.features.customizable.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("captionGenerator.features.hashtagReady.title")}
            </h3>
            <p className="text-muted">
              {t("captionGenerator.features.hashtagReady.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("captionGenerator.features.multiLanguage.title")}
            </h3>
            <p className="text-muted">
              {t("captionGenerator.features.multiLanguage.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
