"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { BioGeneratorResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function InstagramBioGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("friendly");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [language, setLanguage] = useState(uiLanguage);
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError(t("bioGenerator.form.error.emptyDescription"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setBio("");

    try {
      const response = await fetch("/api/tools/instagram/bio-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description.trim(),
          tone,
          includeEmojis,
          language,
          turnstileToken,
        }),
      });

      const data: BioGeneratorResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate bio");
      }

      setBio(data.bio || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bio);
      alert(t("bioGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setBio("");
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("bioGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("bioGenerator.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="instagram" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("bioGenerator.form.description")}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("bioGenerator.form.descriptionPlaceholder")}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
              <p className="text-xs text-muted mt-1">
                {description.length}/300
              </p>
            </div>

            {/* Tone Select */}
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("bioGenerator.form.tone")}
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
                {t("bioGenerator.form.language")}
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

            {/* Checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEmojis}
                  onChange={(e) => setIncludeEmojis(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm text-foreground">
                  {t("bioGenerator.form.includeEmojis")}
                </span>
              </label>
            </div>

            {/* Generate Button */}
            {!bio && (
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
                {isLoading ? t("bioGenerator.form.generating") : t("bioGenerator.form.generate")}
              </Button>
              </>
            )}

            {/* Use Again Button */}
            {bio && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("bioGenerator.form.useAgain")}
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
          {bio && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                {t("bioGenerator.result.title")}
              </label>
              <div className="bg-surface dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-lg p-6">
                <p className="text-foreground font-medium text-center text-lg whitespace-pre-line">
                  {bio}
                </p>
                <p className="text-xs text-muted text-center mt-2">
                  {bio.length} characters
                </p>
              </div>
              <Button
                onPress={handleCopy}
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {t("bioGenerator.result.copy")}
              </Button>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("bioGenerator.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("bioGenerator.features.concise.title")}
            </h3>
            <p className="text-muted">
              {t("bioGenerator.features.concise.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("bioGenerator.features.personality.title")}
            </h3>
            <p className="text-muted">
              {t("bioGenerator.features.personality.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("bioGenerator.features.professional.title")}
            </h3>
            <p className="text-muted">
              {t("bioGenerator.features.professional.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("bioGenerator.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("bioGenerator.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
