"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { TwitchCommandResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";

export default function TwitchCommandPage() {
  const { t } = useLanguage();
  const [commandName, setCommandName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!commandName.trim()) {
      setError(t("twitchCommand.form.error.emptyCommandName"));
      return;
    }
    if (!purpose.trim()) {
      setError(t("twitchCommand.form.error.emptyPurpose"));
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/tools/twitch/chat-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commandName: commandName.trim(), purpose: purpose.trim(), tone, language }),
      });

      const data: TwitchCommandResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate response");
      }

      setResponse(data.response || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      alert(t("twitchCommand.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResponse("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("twitchCommand.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("twitchCommand.description")}
          </p>
        </div>

        <ToolSelector platform="twitch" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="commandName" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchCommand.form.commandName")}
              </label>
              <input
                id="commandName"
                type="text"
                value={commandName}
                onChange={(e) => setCommandName(e.target.value)}
                placeholder={t("twitchCommand.form.commandNamePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchCommand.form.purpose")}
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder={t("twitchCommand.form.purposePlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchCommand.form.tone")}
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

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("twitchCommand.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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

            {!response && (
              <Button
                onClick={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("twitchCommand.form.generating") : t("twitchCommand.form.generate")}
              </Button>
            )}

            {response && (
              <Button onClick={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("twitchCommand.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {response && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("twitchCommand.result.title")}
                </label>
                <Button onClick={handleCopy} variant="ghost" size="sm" className="text-purple-600">
                  {t("twitchCommand.result.copy")}
                </Button>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{response}</p>
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("twitchCommand.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchCommand.features.concise.title")}
            </h3>
            <p className="text-muted">
              {t("twitchCommand.features.concise.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchCommand.features.informative.title")}
            </h3>
            <p className="text-muted">
              {t("twitchCommand.features.informative.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchCommand.features.onBrand.title")}
            </h3>
            <p className="text-muted">
              {t("twitchCommand.features.onBrand.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchCommand.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("twitchCommand.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
