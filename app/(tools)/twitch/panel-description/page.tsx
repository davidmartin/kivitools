"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import type { TwitchPanelResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TwitchPanelPage() {
  const { t } = useLanguage();
  const [panelType, setPanelType] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("en");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!panelType.trim()) {
      setError(t("twitchPanel.form.error.emptyPanelType"));
      return;
    }
    if (!content.trim()) {
      setError(t("twitchPanel.form.error.emptyContent"));
      return;
    }

    setIsLoading(true);
    setError("");
    setDescription("");

    try {
      const response = await fetch("/api/tools/twitch/panel-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panelType: panelType.trim(), content: content.trim(), language }),
      });

      const data: TwitchPanelResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate description");
      }

      setDescription(data.description || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      alert(t("twitchPanel.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setDescription("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("twitchPanel.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("twitchPanel.description")}
          </p>
        </div>

        <ToolSelector platform="twitch" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="panelType" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchPanel.form.panelType")}
              </label>
              <input
                id="panelType"
                type="text"
                value={panelType}
                onChange={(e) => setPanelType(e.target.value)}
                placeholder={t("twitchPanel.form.panelTypePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchPanel.form.content")}
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t("twitchPanel.form.contentPlaceholder")}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchPanel.form.language")}
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

            {!description && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("twitchPanel.form.generating") : t("twitchPanel.form.generate")}
              </Button>
            )}

            {description && (
              <Button onClick={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("twitchPanel.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {description && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("twitchPanel.result.title")}
                </label>
                <Button onClick={handleCopy} variant="ghost" size="sm" className="text-purple-600">
                  {t("twitchPanel.result.copy")}
                </Button>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{description}</p>
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("twitchPanel.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchPanel.features.professional.title")}
            </h3>
            <p className="text-muted">
              {t("twitchPanel.features.professional.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchPanel.features.formatted.title")}
            </h3>
            <p className="text-muted">
              {t("twitchPanel.features.formatted.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchPanel.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("twitchPanel.features.engaging.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchPanel.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("twitchPanel.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
