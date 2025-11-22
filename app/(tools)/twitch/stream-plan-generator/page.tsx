"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function TwitchStreamPlanPage() {
  const { t } = useLanguage();
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("2 hours");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!activity.trim()) {
      setError(t("twitchStreamPlan.form.error.emptyActivity"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setPlan("");

    try {
      const response = await fetch("/api/tools/twitch/stream-plan-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: activity.trim(),
          duration,
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate plan");
      }

      setPlan(data.plan || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plan);
      alert(t("twitchStreamPlan.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setPlan("");
    setError("");
    setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("twitchStreamPlan.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("twitchStreamPlan.description")}
          </p>
        </div>

        <ToolSelector platform="twitch" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="activity"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("twitchStreamPlan.form.activity")}
              </label>
              <input
                id="activity"
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder={t("twitchStreamPlan.form.activityPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("twitchStreamPlan.form.duration")}
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="6+ hours">6+ hours</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("twitchStreamPlan.form.tone")}
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
              <label
                htmlFor="language"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("twitchStreamPlan.form.language")}
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

            {!plan && (
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
                  {isLoading
                    ? t("twitchStreamPlan.form.generating")
                    : t("twitchStreamPlan.form.generate")}
                </Button>
              </>
            )}

            {plan && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("twitchStreamPlan.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {plan && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("twitchStreamPlan.result.title")}
                </label>
                <Button
                  onPress={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600"
                >
                  {t("twitchStreamPlan.result.copy")}
                </Button>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{plan}</p>
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("twitchStreamPlan.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamPlan.features.structured.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamPlan.features.structured.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamPlan.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamPlan.features.engaging.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamPlan.features.flexible.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamPlan.features.flexible.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("twitchStreamPlan.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("twitchStreamPlan.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
