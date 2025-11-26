"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function PinterestBoardNamePage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("creative");
  const [language, setLanguage] = useState(uiLanguage);
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("pinterestBoardName.form.error.emptyTopic"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setNames([]);

    try {
      const response = await fetch("/api/tools/pinterest/board-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          style,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate board names");
      }

      setNames(data.names || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t("pinterestBoardName.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allNames = names.map((name, i) => `${i + 1}. ${name}`).join("\n");
      await navigator.clipboard.writeText(allNames);
      alert(t("pinterestBoardName.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setNames([]);
    setError("");
    setTurnstileToken("");
  };

  const styles = [
    { value: "creative", labelKey: "pinterestBoardName.styles.creative" },
    { value: "minimal", labelKey: "pinterestBoardName.styles.minimal" },
    { value: "descriptive", labelKey: "pinterestBoardName.styles.descriptive" },
    { value: "aesthetic", labelKey: "pinterestBoardName.styles.aesthetic" },
    { value: "professional", labelKey: "pinterestBoardName.styles.professional" },
  ];

  const relatedTools = [
    { name: t("pinterestPinDescription.title"), href: "/pinterest/pin-description" },
    { name: t("pinterestProfileBio.title"), href: "/pinterest/profile-bio" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
            📌 Pinterest Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("pinterestBoardName.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("pinterestBoardName.description")}
          </p>
        </div>

        {/* Tool Selector */}
        <ToolSelector platform="pinterest" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestBoardName.form.topic")}
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("pinterestBoardName.form.topicPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Style Select */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestBoardName.form.style")}
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value}>
                    {t(s.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Select */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("pinterestBoardName.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((langOption) => (
                  <option key={langOption.value} value={langOption.value}>
                    {t(langOption.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            {names.length === 0 && (
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
                  {isLoading ? t("pinterestBoardName.form.generating") : t("pinterestBoardName.form.generate")}
                </Button>
              </>
            )}

            {/* Use Again Button */}
            {names.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("pinterestBoardName.form.useAgain")}
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
          {names.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">
                  {t("pinterestBoardName.result.title")}
                </label>
                <Button
                  onPress={handleCopyAll}
                  variant="ghost"
                  size="sm"
                >
                  {t("pinterestBoardName.result.copyAll")}
                </Button>
              </div>
              <div className="space-y-3">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
                  >
                    <span className="text-foreground font-medium">{name}</span>
                    <Button
                      onPress={() => handleCopy(name)}
                      variant="ghost"
                      size="sm"
                    >
                      {t("pinterestBoardName.result.copy")}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("pinterestBoardName.result.success").replace("{count}", names.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestBoardName.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.features.creative.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.features.creative.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.features.styles.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.features.styles.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.features.seo.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.features.seo.description")}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.features.multilang.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.features.multilang.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("pinterestBoardName.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("pinterestBoardName.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestBoardName.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("pinterestBoardName.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("pinterestBoardName.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestBoardName.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestBoardName.faq.q1")}
              </h3>
              <p className="text-muted">{t("pinterestBoardName.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestBoardName.faq.q2")}
              </h3>
              <p className="text-muted">{t("pinterestBoardName.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestBoardName.faq.q3")}
              </h3>
              <p className="text-muted">{t("pinterestBoardName.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestBoardName.faq.q4")}
              </h3>
              <p className="text-muted">{t("pinterestBoardName.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pinterestBoardName.faq.q5")}
              </h3>
              <p className="text-muted">{t("pinterestBoardName.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("pinterestBoardName.relatedTools.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-sm font-medium text-foreground hover:text-accent">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
