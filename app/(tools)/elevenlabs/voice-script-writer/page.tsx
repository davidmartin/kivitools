"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES, VOICE_STYLES, VOICE_DURATIONS } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import {
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function VoiceScriptWriterPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("narration");
  const [duration, setDuration] = useState("60s");
  const [language, setLanguage] = useState(uiLanguage);
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const toolJsonLd = generateToolJsonLd({
    platform: "elevenlabs",
    toolName: "Voice Script Writer",
    title: "AI Voice Script Writer for ElevenLabs",
    description: "Create professional AI voice scripts optimized for ElevenLabs text-to-speech",
    englishSlug: "voice-script-writer",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "elevenlabs",
    toolName: "Voice Script Writer",
    englishSlug: "voice-script-writer",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("voiceScriptWriter.faq.q1"), answer: t("voiceScriptWriter.faq.a1") },
    { question: t("voiceScriptWriter.faq.q2"), answer: t("voiceScriptWriter.faq.a2") },
    { question: t("voiceScriptWriter.faq.q3"), answer: t("voiceScriptWriter.faq.a3") },
    { question: t("voiceScriptWriter.faq.q4"), answer: t("voiceScriptWriter.faq.a4") },
    { question: t("voiceScriptWriter.faq.q5"), answer: t("voiceScriptWriter.faq.a5") },
  ]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("voiceScriptWriter.form.error.emptyTopic"));
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setScript("");

    try {
      const response = await fetch("/api/tools/elevenlabs/voice-script-writer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          style,
          duration,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate voice script");
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
      alert(t("voiceScriptWriter.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setScript("");
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("videoVoiceoverScript.title"), href: "/elevenlabs/video-voiceover-script" },
    { name: t("voiceTextFormatter.title"), href: "/elevenlabs/voice-text-formatter" },
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
              {t("voiceScriptWriter.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("voiceScriptWriter.description")}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-4">
              {/* Topic Input */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("voiceScriptWriter.form.topic")}
                </label>
                <textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("voiceScriptWriter.form.topicPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Style Select */}
              <div>
                <label
                  htmlFor="style"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("voiceScriptWriter.form.style")}
                </label>
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {VOICE_STYLES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {t(s.labelKey)}
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
                  {t("voiceScriptWriter.form.duration")}
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {VOICE_DURATIONS.map((d) => (
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
                  {t("voiceScriptWriter.form.language")}
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
            {!script && (
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
            {!script && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("voiceScriptWriter.form.generating") : t("voiceScriptWriter.form.generate")}
              </Button>
            )}

            {/* Results Section */}
            {script && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("voiceScriptWriter.result.title")}
                  </h2>
                  <Button onPress={handleCopy} variant="ghost" size="sm">
                    {t("voiceScriptWriter.result.copy")}
                  </Button>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-foreground font-mono text-sm">
                    {script}
                  </pre>
                </div>

                <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                  {t("voiceScriptWriter.form.useAgain")}
                </Button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceScriptWriter.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceScriptWriter.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceScriptWriter.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceScriptWriter.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("voiceScriptWriter.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("voiceScriptWriter.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line leading-relaxed">
              {t("voiceScriptWriter.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceScriptWriter.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("voiceScriptWriter.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceScriptWriter.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.faq.q1")}
                </h3>
                <p className="text-muted">{t("voiceScriptWriter.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.faq.q2")}
                </h3>
                <p className="text-muted">{t("voiceScriptWriter.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.faq.q3")}
                </h3>
                <p className="text-muted">{t("voiceScriptWriter.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.faq.q4")}
                </h3>
                <p className="text-muted">{t("voiceScriptWriter.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("voiceScriptWriter.faq.q5")}
                </h3>
                <p className="text-muted">{t("voiceScriptWriter.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("voiceScriptWriter.relatedTools.title")}
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
