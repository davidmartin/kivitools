"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { DiscordWelcomeResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function DiscordWelcomePage() {
  const { t } = useLanguage();
  const [serverName, setServerName] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!serverName.trim()) {
      setError(t("discordWelcome.form.error.emptyServerName"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/tools/discord/welcome-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serverName: serverName.trim(), tone, language ,
          turnstileToken,
        }),
      });

      const data: DiscordWelcomeResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate message");
      }

      setMessage(data.message || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      alert(t("discordWelcome.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setMessage("");
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("discordWelcome.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("discordWelcome.description")}
          </p>
        </div>

        <ToolSelector platform="discord" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="serverName" className="block text-sm font-medium text-foreground mb-2">
                {t("discordWelcome.form.serverName")}
              </label>
              <input
                id="serverName"
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder={t("discordWelcome.form.serverNamePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("discordWelcome.form.tone")}
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
                {t("discordWelcome.form.language")}
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

            {!message && (
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
                {isLoading ? t("discordWelcome.form.generating") : t("discordWelcome.form.generate")}
              </Button>
              </>
            )}

            {message && (
              <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("discordWelcome.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {message && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("discordWelcome.result.title")}
                </label>
                <Button onPress={handleCopy} variant="ghost" size="sm" className="text-indigo-600">
                  {t("discordWelcome.result.copy")}
                </Button>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{message}</p>
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("discordWelcome.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordWelcome.features.welcoming.title")}
            </h3>
            <p className="text-muted">
              {t("discordWelcome.features.welcoming.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordWelcome.features.informative.title")}
            </h3>
            <p className="text-muted">
              {t("discordWelcome.features.informative.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordWelcome.features.customizable.title")}
            </h3>
            <p className="text-muted">
              {t("discordWelcome.features.customizable.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("discordWelcome.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("discordWelcome.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
