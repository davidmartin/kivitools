"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import {
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function VoiceTextFormatterPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [formattedText, setFormattedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const toolJsonLd = generateToolJsonLd({
    platform: "elevenlabs",
    toolName: "Voice Text Formatter",
    title: "AI Voice Text Formatter for ElevenLabs",
    description: "Format and optimize text for ElevenLabs AI voices with pauses and emphasis",
    englishSlug: "voice-text-formatter",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "elevenlabs",
    toolName: "Voice Text Formatter",
    englishSlug: "voice-text-formatter",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("voiceTextFormatter.faq.q1"), answer: t("voiceTextFormatter.faq.a1") },
    { question: t("voiceTextFormatter.faq.q2"), answer: t("voiceTextFormatter.faq.a2") },
    { question: t("voiceTextFormatter.faq.q3"), answer: t("voiceTextFormatter.faq.a3") },
    { question: t("voiceTextFormatter.faq.q4"), answer: t("voiceTextFormatter.faq.a4") },
    { question: t("voiceTextFormatter.faq.q5"), answer: t("voiceTextFormatter.faq.a5") },
  ]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError(t("voiceTextFormatter.form.error.emptyText"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setFormattedText("");

    try {
      const response = await fetch("/api/tools/elevenlabs/voice-text-formatter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to format text");
      }

      setFormattedText(data.formattedText || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      alert(t("voiceTextFormatter.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setFormattedText("");
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("voiceScriptWriter.title"), href: "/elevenlabs/voice-script-writer" },
    { name: t("videoVoiceoverScript.title"), href: "/elevenlabs/video-voiceover-script" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              🎙️ ElevenLabs Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("voiceTextFormatter.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("voiceTextFormatter.description")}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("voiceTextFormatter.form.text")}
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t("voiceTextFormatter.form.textPlaceholder")}
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Language Select */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("voiceTextFormatter.form.language")}
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
            </div>

            {/* Turnstile Widget */}
            {!formattedText && (
              <TurnstileWidget
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setError(t("turnstile.failed"))}
              />
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            {!formattedText && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("voiceTextFormatter.form.formatting") : t("voiceTextFormatter.form.format")}
              </Button>
            )}

            {/* Results Section */}
            {formattedText && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("voiceTextFormatter.result.title")}
                  </h2>
                  <Button onPress={handleCopy} variant="ghost" size="sm">
                    {t("voiceTextFormatter.result.copy")}
                  </Button>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-foreground font-mono text-sm">
                    {formattedText}
                  </pre>
                </div>

                <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                  {t("voiceTextFormatter.form.useAgain")}
                </Button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceTextFormatter.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceTextFormatter.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceTextFormatter.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceTextFormatter.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceTextFormatter.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("voiceTextFormatter.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line leading-relaxed">
              {t("voiceTextFormatter.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceTextFormatter.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceTextFormatter.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceTextFormatter.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.faq.q1")}
                </h3>
                <p className="text-muted">{t("voiceTextFormatter.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.faq.q2")}
                </h3>
                <p className="text-muted">{t("voiceTextFormatter.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.faq.q3")}
                </h3>
                <p className="text-muted">{t("voiceTextFormatter.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.faq.q4")}
                </h3>
                <p className="text-muted">{t("voiceTextFormatter.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceTextFormatter.faq.q5")}
                </h3>
                <p className="text-muted">{t("voiceTextFormatter.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceTextFormatter.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
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
    </>
  );
}
