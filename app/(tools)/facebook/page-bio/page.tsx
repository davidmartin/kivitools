"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import ToolSelector from "@/app/components/tool-selector";
import { LANGUAGES, TONES } from "@/types";
import { generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export default function FacebookPageBioPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState(uiLanguage);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // SEO Data
  const toolJsonLd = generateToolJsonLd({
    platform: "facebook",
    toolName: "Page Bio Generator",
    title: "Facebook Page Bio Generator",
    description: "Create a professional bio that converts visitors into followers",
    englishSlug: "page-bio",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "facebook",
    toolName: "Page Bio Generator",
    englishSlug: "page-bio",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("facebookPageBio.faq.q1"), answer: t("facebookPageBio.faq.a1") },
    { question: t("facebookPageBio.faq.q2"), answer: t("facebookPageBio.faq.a2") },
    { question: t("facebookPageBio.faq.q3"), answer: t("facebookPageBio.faq.a3") },
    { question: t("facebookPageBio.faq.q4"), answer: t("facebookPageBio.faq.a4") },
    { question: t("facebookPageBio.faq.q5"), answer: t("facebookPageBio.faq.a5") },
  ]);

  const relatedTools = [
    { name: t("facebookPost.title"), href: "/facebook/post-generator" },
    { name: t("facebookAdCopy.title"), href: "/facebook/ad-copy" },
  ];

  const handleGenerate = async () => {
    if (!businessName.trim()) {
      setError(t("facebookPageBio.form.error.emptyName"));
      return;
    }
    if (!industry.trim()) {
      setError(t("facebookPageBio.form.error.emptyIndustry"));
      return;
    }
    if (!description.trim()) {
      setError(t("facebookPageBio.form.error.emptyDescription"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/facebook/page-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          industry: industry.trim(),
          description: description.trim(),
          tone,
          language,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate bio");
      }

      setResult(data.bio);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert(t("facebookPageBio.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setResult("");
    setError("");
    setTurnstileToken("");
  };

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
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              📄 Facebook Tool
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t("facebookPageBio.title")}
            </h1>
            <p className="text-xl text-muted">
              {t("facebookPageBio.description")}
            </p>
          </div>

          {/* Tool Selector */}
          <ToolSelector platform="facebook" />

          {/* Form Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
                  {t("facebookPageBio.form.businessName")}
                </label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t("facebookPageBio.form.businessNamePlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                  {t("facebookPageBio.form.industry")}
                </label>
                <input
                  id="industry"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder={t("facebookPageBio.form.industryPlaceholder")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  {t("facebookPageBio.form.description")}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("facebookPageBio.form.descriptionPlaceholder")}
                  rows={3}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground resize-none"
                />
              </div>

              {/* Tone */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                  {t("facebookPageBio.form.tone")}
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                >
                  {TONES.map((t_) => (
                    <option key={t_.value} value={t_.value}>
                      {t(t_.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                  {t("facebookPageBio.form.language")}
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {t(l.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Turnstile */}
              <TurnstileWidget
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setError(t("turnstile.failed"))}
              />

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Generate/Use Again Button */}
              {!result ? (
                <Button
                  onPress={handleGenerate}
                  isDisabled={isLoading || !turnstileToken}
                  variant="secondary"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? t("facebookPageBio.form.generating") : t("facebookPageBio.form.generate")}
                </Button>
              ) : (
                <Button
                  onPress={handleUseAgain}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  {t("facebookPageBio.form.useAgain")}
                </Button>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {t("facebookPageBio.result.title")}
                  </h3>
                  <Button
                    onPress={handleCopy}
                    variant="ghost"
                    size="sm"
                  >
                    {t("facebookPageBio.result.copy")}
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-foreground whitespace-pre-line">{result}</p>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("facebookPageBio.topFeatures.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["clarity", "trust", "cta", "seo"].map((feature) => (
                <div
                  key={feature}
                  className="bg-surface rounded-xl p-6 border border-border"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`facebookPageBio.features.${feature}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`facebookPageBio.features.${feature}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Description */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("facebookPageBio.hero.subtitle")}
            </h2>
            <div className="text-muted whitespace-pre-line">
              {t("facebookPageBio.hero.description")}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("facebookPageBio.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`facebookPageBio.howItWorks.step${step}.title`)}
                  </h3>
                  <p className="text-muted">
                    {t(`facebookPageBio.howItWorks.step${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("facebookPageBio.faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`facebookPageBio.faq.q${num}`)}
                  </h3>
                  <p className="text-muted">
                    {t(`facebookPageBio.faq.a${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("facebookPageBio.relatedTools.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
