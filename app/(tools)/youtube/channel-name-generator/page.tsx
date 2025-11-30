"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformBadge from "@/app/components/platform-badge";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function YouTubeChannelNameGeneratorPage() {
  const { t } = useLanguage();
  const [niche, setNiche] = useState("");
  const [style, setStyle] = useState("creative");
  const [keywords, setKeywords] = useState("");
  const [channelNames, setChannelNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!niche.trim()) {
      setError("Please enter your channel niche");
      return;
    }

    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setChannelNames([]);

    try {
      const response = await fetch("/api/tools/youtube/channel-name-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: niche.trim(),
          style,
          keywords: keywords.trim() || undefined,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate channel names");
      }

      setChannelNames(data.channelNames || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      alert(t("youtubeChannelNameGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allNames = channelNames.join("\n");
      await navigator.clipboard.writeText(allNames);
      alert(t("youtubeChannelNameGenerator.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setChannelNames([]);
    setError("");
    setTurnstileToken("");
  };

  // Related tools for YouTube
  const relatedTools = [
    { name: t("youtubeTitle.title"), href: "/youtube/title-generator" },
    { name: t("youtubeDescription.title"), href: "/youtube/description-generator" },
    { name: t("youtubeScript.title"), href: "/youtube/script-generator" },
    { name: t("youtubeTagGenerator.title"), href: "/youtube/tag-generator" },
    { name: t("youtubeVideoIdeas.title"), href: "/youtube/video-ideas" },
    { name: t("youtubeCommunityPost.title"), href: "/youtube/community-post-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <PlatformBadge platform="youtube" className="mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("youtubeChannelNameGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("youtubeChannelNameGenerator.description")}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            {/* Niche Input */}
            <div>
              <label htmlFor="niche" className="block text-sm font-medium text-foreground mb-2">
                {t("youtubeChannelNameGenerator.form.niche")}
              </label>
              <input
                id="niche"
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder={t("youtubeChannelNameGenerator.form.nichePlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {/* Style Select */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                {t("youtubeChannelNameGenerator.form.style")}
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
              >
                <option value="creative">{t("youtubeChannelNameGenerator.form.styleOptions.creative")}</option>
                <option value="professional">{t("youtubeChannelNameGenerator.form.styleOptions.professional")}</option>
                <option value="fun">{t("youtubeChannelNameGenerator.form.styleOptions.fun")}</option>
                <option value="minimalist">{t("youtubeChannelNameGenerator.form.styleOptions.minimalist")}</option>
                <option value="brandable">{t("youtubeChannelNameGenerator.form.styleOptions.brandable")}</option>
              </select>
            </div>

            {/* Keywords Input (Optional) */}
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                {t("youtubeChannelNameGenerator.form.keywords")}
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t("youtubeChannelNameGenerator.form.keywordsPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {/* Turnstile Widget */}
            {channelNames.length === 0 && (
              <TurnstileWidget
                onSuccess={setTurnstileToken}
                onError={() => setError(t("turnstile.error"))}
              />
            )}

            {/* Generate Button */}
            {channelNames.length === 0 && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading
                  ? t("youtubeChannelNameGenerator.form.generating")
                  : t("youtubeChannelNameGenerator.form.generate")}
              </Button>
            )}

            {/* Use Again Button */}
            {channelNames.length > 0 && (
              <Button
                onPress={handleUseAgain}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("youtubeChannelNameGenerator.form.regenerate")}
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Results */}
          {channelNames.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                {t("youtubeChannelNameGenerator.result.title")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {channelNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-4"
                  >
                    <span className="font-medium text-foreground">{name}</span>
                    <Button
                      onPress={() => handleCopy(name)}
                      variant="ghost"
                      size="sm"
                    >
                      {t("youtubeChannelNameGenerator.result.copy")}
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                onPress={handleCopyAll}
                variant="primary"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {t("youtubeChannelNameGenerator.result.copyAll")}
              </Button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("youtubeChannelNameGenerator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.features.feature1.title")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.features.feature1.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.features.feature2.title")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.features.feature2.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.features.feature3.title")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.features.feature3.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.features.feature4.title")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.features.feature4.description")}</p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("youtubeChannelNameGenerator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("youtubeChannelNameGenerator.hero.description")}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("youtubeChannelNameGenerator.tips.title")}
          </h2>
          <div className="bg-surface rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">💡</span>
                <span className="text-muted">{t("youtubeChannelNameGenerator.tips.tip1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">💡</span>
                <span className="text-muted">{t("youtubeChannelNameGenerator.tips.tip2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">💡</span>
                <span className="text-muted">{t("youtubeChannelNameGenerator.tips.tip3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">💡</span>
                <span className="text-muted">{t("youtubeChannelNameGenerator.tips.tip4")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">💡</span>
                <span className="text-muted">{t("youtubeChannelNameGenerator.tips.tip5")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("youtubeChannelNameGenerator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("youtubeChannelNameGenerator.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("youtubeChannelNameGenerator.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("youtubeChannelNameGenerator.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("youtubeChannelNameGenerator.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.faq.q1")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.faq.q2")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.faq.q3")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.faq.q4")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("youtubeChannelNameGenerator.faq.q5")}
              </h3>
              <p className="text-muted">{t("youtubeChannelNameGenerator.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("youtubeChannelNameGenerator.relatedTools.title")}
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
