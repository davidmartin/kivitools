"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { DiscordEventResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function DiscordEventPage() {
  const { t } = useLanguage();
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!eventName.trim()) {
      setError(t("discordEvent.form.error.emptyEventName"));
      return;
    }
    if (!eventDetails.trim()) {
      setError(t("discordEvent.form.error.emptyEventDetails"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setDescription("");

    try {
      const response = await fetch("/api/tools/discord/event-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          eventName: eventName.trim(), 
          eventDetails: eventDetails.trim(),
          tone, 
          language 
        ,
          turnstileToken,
        }),
      });

      const data: DiscordEventResponse = await response.json();

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
      alert(t("discordEvent.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setDescription("");
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("discordEvent.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("discordEvent.description")}
          </p>
        </div>

        <ToolSelector platform="discord" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-foreground mb-2">
                {t("discordEvent.form.eventName")}
              </label>
              <input
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder={t("discordEvent.form.eventNamePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="eventDetails" className="block text-sm font-medium text-foreground mb-2">
                {t("discordEvent.form.eventDetails")}
              </label>
              <textarea
                id="eventDetails"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder={t("discordEvent.form.eventDetailsPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("discordEvent.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {t(tone.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("discordEvent.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-surface text-foreground"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {isLoading ? t("discordEvent.form.generating") : t("discordEvent.form.generate")}
              </Button>
              </>
            )}

            {description && (
              <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("discordEvent.form.useAgain")}
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
                  {t("discordEvent.result.title")}
                </label>
                <Button onPress={handleCopy} variant="ghost" size="sm" className="text-indigo-600">
                  {t("discordEvent.result.copy")}
                </Button>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{description}</p>
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("discordEvent.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordEvent.features.exciting.title")}
            </h3>
            <p className="text-muted">
              {t("discordEvent.features.exciting.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordEvent.features.detailed.title")}
            </h3>
            <p className="text-muted">
              {t("discordEvent.features.detailed.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordEvent.features.compelling.title")}
            </h3>
            <p className="text-muted">
              {t("discordEvent.features.compelling.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordEvent.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("discordEvent.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
