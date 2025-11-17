"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { LANGUAGES } from "@/types";
import {
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function AdScriptPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [product, setProduct] = useState("");
  const [duration, setDuration] = useState("30s");
  const [style, setStyle] = useState("informative");
  const [cta, setCta] = useState("");
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const toolJsonLd = generateToolJsonLd({
    platform: "elevenlabs",
    toolName: "Ad/Commercial Script Generator",
    title: "AI Ad Script Generator for ElevenLabs",
    description: "Generate persuasive ad scripts optimized for ElevenLabs AI voices",
    englishSlug: "ad-script",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "elevenlabs",
    toolName: "Ad/Commercial Script Generator",
    englishSlug: "ad-script",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("adScript.faq.q1"), answer: t("adScript.faq.a1") },
    { question: t("adScript.faq.q2"), answer: t("adScript.faq.a2") },
    { question: t("adScript.faq.q3"), answer: t("adScript.faq.a3") },
    { question: t("adScript.faq.q4"), answer: t("adScript.faq.a4") },
    { question: t("adScript.faq.q5"), answer: t("adScript.faq.a5") },
  ]);

  const handleGenerate = async () => {
    if (!product.trim()) {
      setError(t("adScript.form.error.emptyProduct"));
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
      const response = await fetch("/api/tools/elevenlabs/ad-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product.trim(),
          duration,
          style,
          cta: cta.trim(),
          audience: audience.trim(),
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate ad script");
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
      alert(t("adScript.result.copied"));
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
    { name: t("videoVoiceoverScript.title"), href: "/elevenlabs/video-voiceover-script" },
    { name: t("podcastScript.title"), href: "/elevenlabs/podcast-script" },
    { name: t("audiobookOptimizer.title"), href: "/elevenlabs/audiobook-optimizer" },
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
              {t("adScript.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("adScript.description")}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-4">
              {/* Product Input */}
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.product")}
                </label>
                <input
                  id="product"
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={t("adScript.form.productPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Duration Select */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.duration")}
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                >
                  <option value="15s">{t("adScript.form.duration.15s")}</option>
                  <option value="30s">{t("adScript.form.duration.30s")}</option>
                  <option value="60s">{t("adScript.form.duration.60s")}</option>
                </select>
              </div>

              {/* Style Select */}
              <div>
                <label
                  htmlFor="style"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.style")}
                </label>
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                >
                  <option value="informative">{t("adScript.form.style.informative")}</option>
                  <option value="emotional">{t("adScript.form.style.emotional")}</option>
                  <option value="urgent">{t("adScript.form.style.urgent")}</option>
                  <option value="fun">{t("adScript.form.style.fun")}</option>
                </select>
              </div>

              {/* CTA Input */}
              <div>
                <label
                  htmlFor="cta"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.cta")}
                </label>
                <input
                  id="cta"
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  placeholder={t("adScript.form.ctaPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Audience Input */}
              <div>
                <label
                  htmlFor="audience"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.audience")}
                </label>
                <input
                  id="audience"
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder={t("adScript.form.audiencePlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Language Select */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("adScript.form.language")}
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Generate/Use Again Button */}
            {!script && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("adScript.form.generating") : t("adScript.form.generate")}
              </Button>
            )}

            {script && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("adScript.form.useAgain")}
              </Button>
            )}
          </div>

          {/* Results Section */}
          {script && (
            <div className="mt-8 bg-surface rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {t("adScript.result.title")}
                </h2>
                <Button onPress={handleCopy} variant="tertiary" size="sm">
                  {t("adScript.result.copy")}
                </Button>
              </div>
              <div className="bg-background rounded-lg p-6 whitespace-pre-wrap text-foreground font-mono text-sm">
                {script}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("adScript.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.features.feature1.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.features.feature1.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.features.feature2.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.features.feature2.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.features.feature3.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.features.feature3.description")}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.features.feature4.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("adScript.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("adScript.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("adScript.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.howItWorks.step1.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.howItWorks.step2.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.howItWorks.step2.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("adScript.howItWorks.step3.title")}
                </h3>
                <p className="text-muted">
                  {t("adScript.howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("adScript.faq.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("adScript.faq.q1")}
                </h3>
                <p className="text-muted">{t("adScript.faq.a1")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("adScript.faq.q2")}
                </h3>
                <p className="text-muted">{t("adScript.faq.a2")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("adScript.faq.q3")}
                </h3>
                <p className="text-muted">{t("adScript.faq.a3")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("adScript.faq.q4")}
                </h3>
                <p className="text-muted">{t("adScript.faq.a4")}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("adScript.faq.q5")}
                </h3>
                <p className="text-muted">{t("adScript.faq.a5")}</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("adScript.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
