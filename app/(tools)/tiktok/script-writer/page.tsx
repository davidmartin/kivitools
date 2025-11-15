"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, DURATIONS, LANGUAGES } from "@/types";
import type { ScriptWriterResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TikTokScriptWriterPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [duration, setDuration] = useState("30-60s");
  const [language, setLanguage] = useState(uiLanguage);
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("scriptWriter.form.error.emptyTopic"));
      return;
    }

    setIsLoading(true);
    setError("");
    setScript("");

    try {
      const response = await fetch("/api/tools/tiktok/script-writer", {
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

      const data: ScriptWriterResponse = await response.json();

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
      // Podrías agregar un toast aquí
      alert(t("scriptWriter.result.copied"));
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
            {t("scriptWriter.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("scriptWriter.description")}
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
                {t("scriptWriter.form.topic")}
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("scriptWriter.form.topicPlaceholder")}
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
                {t("scriptWriter.form.tone")}
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

            {/* Duration Select */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("scriptWriter.form.duration")}
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {DURATIONS.map((d) => (
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
                {t("scriptWriter.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
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
            {!script && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("scriptWriter.form.generating") : t("scriptWriter.form.generate")}
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
                {t("scriptWriter.form.useAgain")}
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
                {t("scriptWriter.result.title")}
              </label>
              <textarea
                value={script}
                readOnly
                rows={12}
                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
              />
              <Button
                onClick={handleCopy}
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {t("scriptWriter.result.copy")}
              </Button>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("scriptWriter.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("scriptWriter.features.free.title")}
            </h3>
            <p className="text-muted">
              {t("scriptWriter.features.free.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("scriptWriter.features.smart.title")}
            </h3>
            <p className="text-muted">
              {t("scriptWriter.features.smart.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("scriptWriter.features.multilang.title")}
            </h3>
            <p className="text-muted">
              {t("scriptWriter.features.multilang.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("scriptWriter.features.fast.title")}
            </h3>
            <p className="text-muted">
              {t("scriptWriter.features.fast.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
