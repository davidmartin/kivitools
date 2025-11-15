"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { TwitterBioResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TwitterBioGeneratorPage() {
  const { t } = useLanguage();
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("friendly");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [language, setLanguage] = useState("en");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError(t("twitterBio.form.error.emptyDescription"));
      return;
    }

    setIsLoading(true);
    setError("");
    setBio("");

    try {
      const response = await fetch("/api/tools/twitter/bio-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description.trim(),
          tone,
          includeEmojis,
          language,
        }),
      });

      const data: TwitterBioResponse = await response.json();

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
      alert(t("twitterBio.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setBio("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("twitterBio.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("twitterBio.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="twitter" />

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
                {t("twitterBio.form.description")}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("twitterBio.form.descriptionPlaceholder")}
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
                {t("twitterBio.form.tone")}
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

            {/* Language Select */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("twitterBio.form.language")}
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

            {/* Include Emojis Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="includeEmojis"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={isLoading}
              />
              <label
                htmlFor="includeEmojis"
                className="text-sm font-medium text-foreground"
              >
                {t("twitterBio.form.includeEmojis")}
              </label>
            </div>

            {/* Generate Button */}
            {!bio && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading
                  ? t("twitterBio.form.generating")
                  : t("twitterBio.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {bio && (
              <Button
                onClick={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("twitterBio.form.useAgain")}
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
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("twitterBio.result.title")}
                </label>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                >
                  {t("twitterBio.result.copy")}
                </Button>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">
                  {bio}
                </p>
                <p className="text-xs text-muted mt-2">
                  {t("twitterBio.result.charCount")}: {bio.length}/160
                </p>
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("twitterBio.result.success")}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitterBio.features.professional.title")}
            </h3>
            <p className="text-muted">
              {t("twitterBio.features.professional.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitterBio.features.optimized.title")}
            </h3>
            <p className="text-muted">
              {t("twitterBio.features.optimized.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitterBio.features.memorable.title")}
            </h3>
            <p className="text-muted">
              {t("twitterBio.features.memorable.description")}
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitterBio.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("twitterBio.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
