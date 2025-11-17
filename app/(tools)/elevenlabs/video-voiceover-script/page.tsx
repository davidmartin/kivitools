"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES, VIDEO_TYPES, VOICE_DURATIONS, TONES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import {
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function VideoVoiceoverScriptPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [videoType, setVideoType] = useState("youtube");
  const [duration, setDuration] = useState("60s");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState(uiLanguage);
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const toolJsonLd = generateToolJsonLd({
    platform: "elevenlabs",
    toolName: "Video Voiceover Script Generator",
    title: "AI Video Voiceover Script Generator for ElevenLabs",
    description: "Generate professional video voiceover scripts optimized for ElevenLabs AI voices",
    englishSlug: "video-voiceover-script",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "elevenlabs",
    toolName: "Video Voiceover Script Generator",
    englishSlug: "video-voiceover-script",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("videoVoiceoverScript.faq.q1"), answer: t("videoVoiceoverScript.faq.a1") },
    { question: t("videoVoiceoverScript.faq.q2"), answer: t("videoVoiceoverScript.faq.a2") },
    { question: t("videoVoiceoverScript.faq.q3"), answer: t("videoVoiceoverScript.faq.a3") },
    { question: t("videoVoiceoverScript.faq.q4"), answer: t("videoVoiceoverScript.faq.a4") },
    { question: t("videoVoiceoverScript.faq.q5"), answer: t("videoVoiceoverScript.faq.a5") },
  ]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("videoVoiceoverScript.form.error.emptyTopic"));
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
      const response = await fetch("/api/tools/elevenlabs/video-voiceover-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          videoType,
          duration,
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate video voiceover script");
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
      alert(t("videoVoiceoverScript.result.copied"));
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
    { name: t("voiceScriptWriter.title"), href: "/elevenlabs/voice-script-writer" },
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
              {t("videoVoiceoverScript.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("videoVoiceoverScript.description")}
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
                  {t("videoVoiceoverScript.form.topic")}
                </label>
                <textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("videoVoiceoverScript.form.topicPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Video Type Select */}
              <div>
                <label
                  htmlFor="videoType"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("videoVoiceoverScript.form.videoType")}
                </label>
                <select
                  id="videoType"
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {VIDEO_TYPES.map((v) => (
                    <option key={v.value} value={v.value}>
                      {t(v.labelKey)}
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
                  {t("videoVoiceoverScript.form.duration")}
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

              {/* Tone Select */}
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("videoVoiceoverScript.form.tone")}
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                  disabled={isLoading}
                >
                  {TONES.map((toneOption) => (
                    <option key={toneOption.value} value={toneOption.value}>
                      {t(toneOption.labelKey)}
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
                  {t("videoVoiceoverScript.form.language")}
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
                {isLoading ? t("videoVoiceoverScript.form.generating") : t("videoVoiceoverScript.form.generate")}
              </Button>
            )}

            {/* Results Section */}
            {script && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("videoVoiceoverScript.result.title")}
                  </h2>
                  <Button onPress={handleCopy} variant="ghost" size="sm">
                    {t("videoVoiceoverScript.result.copy")}
                  </Button>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-foreground font-mono text-sm">
                    {script}
                  </pre>
                </div>

                <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                  {t("videoVoiceoverScript.form.useAgain")}
                </Button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoVoiceoverScript.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("videoVoiceoverScript.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("videoVoiceoverScript.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("videoVoiceoverScript.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t("videoVoiceoverScript.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("videoVoiceoverScript.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line leading-relaxed">
              {t("videoVoiceoverScript.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoVoiceoverScript.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("videoVoiceoverScript.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoVoiceoverScript.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.faq.q1")}
                </h3>
                <p className="text-muted">{t("videoVoiceoverScript.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.faq.q2")}
                </h3>
                <p className="text-muted">{t("videoVoiceoverScript.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.faq.q3")}
                </h3>
                <p className="text-muted">{t("videoVoiceoverScript.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.faq.q4")}
                </h3>
                <p className="text-muted">{t("videoVoiceoverScript.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("videoVoiceoverScript.faq.q5")}
                </h3>
                <p className="text-muted">{t("videoVoiceoverScript.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoVoiceoverScript.relatedTools.title")}
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
