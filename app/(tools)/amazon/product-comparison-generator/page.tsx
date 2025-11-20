"use client";

import { useState } from "react";
import { Button, Card, Input, TextArea } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { LANGUAGES, TONES } from "@/types";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

export default function ProductComparisonGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("objective");
  const [language, setLanguage] = useState(uiLanguage);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!product1 || !product2) {
      setError(t("common.required"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/amazon/product-comparison-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product1,
          product2,
          features,
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || t("common.error"));
      }
    } catch (err) {
      setError(t("common.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert(t("productComparisonGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResult("");
    setError("");
    setTurnstileToken("");
  };

  const toolJsonLd = generateToolJsonLd({
    platform: "amazon",
    toolName: "Product Comparison Generator",
    title: t("productComparisonGenerator.title"),
    description: t("productComparisonGenerator.description"),
    englishSlug: "product-comparison-generator",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "amazon",
    toolName: "Product Comparison Generator",
    englishSlug: "product-comparison-generator",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("productComparisonGenerator.faq.q1"), answer: t("productComparisonGenerator.faq.a1") },
    { question: t("productComparisonGenerator.faq.q2"), answer: t("productComparisonGenerator.faq.a2") },
    { question: t("productComparisonGenerator.faq.q3"), answer: t("productComparisonGenerator.faq.a3") },
    { question: t("productComparisonGenerator.faq.q4"), answer: t("productComparisonGenerator.faq.a4") },
    { question: t("productComparisonGenerator.faq.q5"), answer: t("productComparisonGenerator.faq.a5") },
  ]);

  const relatedTools = [
    { name: t("productDescriptionGenerator.title"), href: "/amazon/product-description-generator" },
    { name: t("productReviewGenerator.title"), href: "/amazon/product-review-generator" },
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

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
              📦 Amazon Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("productComparisonGenerator.title")}
            </h1>
            <p className="text-xl text-muted">{t("productComparisonGenerator.description")}</p>
          </div>

          {/* Main Card */}
          <Card className="bg-surface/50 backdrop-blur-xl border-white/10 shadow-2xl">
            <Card.Content className="p-8">
              {!result ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("productComparisonGenerator.form.product1")}
                      </label>
                      <Input
                        value={product1}
                        onChange={(e) => setProduct1(e.target.value)}
                        placeholder={t("productComparisonGenerator.form.product1Placeholder")}
                        disabled={isLoading}
                        className="bg-surface"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("productComparisonGenerator.form.product2")}
                      </label>
                      <Input
                        value={product2}
                        onChange={(e) => setProduct2(e.target.value)}
                        placeholder={t("productComparisonGenerator.form.product2Placeholder")}
                        disabled={isLoading}
                        className="bg-surface"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("productComparisonGenerator.form.features")}
                    </label>
                    <TextArea
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      placeholder={t("productComparisonGenerator.form.featuresPlaceholder")}
                      rows={3}
                      disabled={isLoading}
                      className="bg-surface"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("productComparisonGenerator.form.tone")}
                      </label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                      >
                        {TONES.map((tOption) => (
                          <option key={tOption.value} value={tOption.value}>
                            {t(tOption.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("productComparisonGenerator.form.language")}
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                      >
                        {LANGUAGES.map((l) => (
                          <option key={l.value} value={l.value}>
                            {t(l.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <TurnstileWidget
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setError(t("turnstile.failed"))}
                  />

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-red-800 dark:text-red-200">{error}</p>
                    </div>
                  )}

                  <Button
                    onPress={handleGenerate}
                    isDisabled={isLoading || !turnstileToken}
                    className="w-full bg-linear-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    size="lg"
                  >
                    {isLoading ? t("productComparisonGenerator.form.generating") : t("productComparisonGenerator.form.generate")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {t("productComparisonGenerator.result.title")}
                    </h3>
                    <Button
                      onPress={handleCopy}
                      variant="ghost"
                      size="sm"
                      className="text-muted hover:text-foreground"
                    >
                      {t("productComparisonGenerator.result.copy")}
                    </Button>
                  </div>

                  <div className="bg-surface rounded-xl p-6 border border-border whitespace-pre-wrap">
                    {result}
                  </div>

                  <Button
                    onPress={handleUseAgain}
                    variant="ghost"
                    className="w-full"
                  >
                    {t("productComparisonGenerator.form.useAgain")}
                  </Button>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("productComparisonGenerator.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-surface/50 border-white/5 hover:bg-surface/80 transition-colors">
                  <Card.Content className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(`productComparisonGenerator.features.feature${i}.title`)}
                    </h3>
                    <p className="text-muted">
                      {t(`productComparisonGenerator.features.feature${i}.description`)}
                    </p>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("productComparisonGenerator.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("productComparisonGenerator.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("productComparisonGenerator.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {i}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`productComparisonGenerator.howItWorks.step${i}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`productComparisonGenerator.howItWorks.step${i}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("productComparisonGenerator.faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`productComparisonGenerator.faq.q${i}`)}
                  </h3>
                  <p className="text-muted">{t(`productComparisonGenerator.faq.a${i}`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("productComparisonGenerator.relatedTools.title")}
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
