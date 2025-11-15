"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES, REEL_DURATIONS } from "@/types";
import type { ReelScriptResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function InstagramReelScriptPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [duration, setDuration] = useState("30s");
  const [language, setLanguage] = useState(uiLanguage);
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("reelScript.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setScript("");

    try {
      const response = await fetch("/api/tools/instagram/reel-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          duration,
          language,
        }),
      });

      const data: ReelScriptResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate script");
      }

      setScript(data.script || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      alert(t("reelScript.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setScript("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("reelScript.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("reelScript.description")}
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
                {t("reelScript.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("reelScript.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
              <p className="text-xs text-muted mt-1">
                {topic.length}/500
              </p>
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("reelScript.form.tone")}
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

            {/* Duration Select */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("reelScript.form.duration")}
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {REEL_DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {t(d.labelKey)}
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
                {t("reelScript.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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

            {/* Generate Button */}
            {!script && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("reelScript.form.generating") : t("reelScript.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {script && (
              <Button
                onClick={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("reelScript.form.useAgain")}
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
          {script && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                {t("reelScript.result.title")}
              </label>
              <textarea
                value={script}
                readOnly
                rows={12}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground resize-none whitespace-pre-wrap"
              />
              <Button
                onClick={handleCopy}
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {t("reelScript.result.copy")}
              </Button>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("reelScript.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("reelScript.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("reelScript.features.engaging.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("reelScript.features.timed.title")}
            </h3>
            <p className="text-muted">
              {t("reelScript.features.timed.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("reelScript.features.viral.title")}
            </h3>
            <p className="text-muted">
              {t("reelScript.features.viral.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("reelScript.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("reelScript.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
