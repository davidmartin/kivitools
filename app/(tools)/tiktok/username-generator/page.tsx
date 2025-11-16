"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function TikTokUsernameGeneratorPage() {
  const { t } = useLanguage();
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("creative");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      setError(t("usernameGenerator.form.error.emptyKeywords"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setUsernames([]);

    try {
      const response = await fetch("/api/tools/tiktok/username-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: keywords.trim(), style ,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate usernames");
      }

      setUsernames(data.usernames || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      alert(t("usernameGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Related tools for TikTok
  const relatedTools = [
    { name: "Profile Analytics", href: "/tiktok/profile-analytics" },
    { name: "Coins Calculator", href: "/tiktok/coins-calculator" },
    { name: "Profile Viewer", href: "/tiktok/profile-viewer" },
    { name: "Thumbnail Download", href: "/tiktok/thumbnail-downloader" },
    { name: "Username Checker", href: "/tiktok/username-checker" },
    { name: "Shop Name Generator", href: "/tiktok/shop-name-generator" },
    { name: "Download MP3", href: "/tiktok/mp3-downloader" },
    { name: "Engagement Rate Calculator", href: "/tiktok/engagement-calculator" },
    { name: "Voice Generator", href: "/tiktok/voice-generator" },
    { name: "Transcript Generator", href: "/tiktok/transcript-generator" },
    { name: "Money Calculator", href: "/tiktok/money-calculator" },
    { name: "Download video", href: "/tiktok/video-downloader" },
    { name: "Video Ideas Generator", href: "/tiktok/video-ideas" },
    { name: "Script Writer", href: "/tiktok/script-writer" },
    { name: "Hashtag Generator", href: "/tiktok/hashtag-generator" },
    { name: "Hook Generator", href: "/tiktok/hook-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
            🎵 TikTok Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("usernameGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("usernameGenerator.description")}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                {t("usernameGenerator.form.keywords")}
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t("usernameGenerator.form.keywordsPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                {t("usernameGenerator.form.style")}
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              >
                <option value="creative">{t("usernameGenerator.form.style.creative")}</option>
                <option value="professional">{t("usernameGenerator.form.style.professional")}</option>
                <option value="fun">{t("usernameGenerator.form.style.fun")}</option>
                <option value="short">{t("usernameGenerator.form.style.short")}</option>
              </select>
            </div>

            {!usernames.length && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("usernameGenerator.form.generating") : t("usernameGenerator.form.generate")}
              </Button>
            )}

            {usernames.length > 0 && (
              <Button
                onPress={() => setUsernames([])}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("usernameGenerator.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {usernames.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                {t("usernameGenerator.result.title")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {usernames.map((username, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-4"
                  >
                    <span className="font-mono text-foreground">@{username}</span>
                    <Button
                      onPress={() => handleCopy(username)}
                      variant="ghost"
                      size="sm"
                    >
                      {t("usernameGenerator.result.copy")}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("usernameGenerator.result.success").replace("{count}", usernames.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("usernameGenerator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.features.unique.title")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.features.unique.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.features.available.title")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.features.available.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.features.styles.title")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.features.styles.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.features.instant.title")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.features.instant.description")}</p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("usernameGenerator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("usernameGenerator.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("usernameGenerator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("usernameGenerator.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("usernameGenerator.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("usernameGenerator.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("usernameGenerator.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("usernameGenerator.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("usernameGenerator.faq.q1")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("usernameGenerator.faq.q2")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("usernameGenerator.faq.q3")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("usernameGenerator.faq.q4")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("usernameGenerator.faq.q5")}
              </h3>
              <p className="text-muted">{t("usernameGenerator.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("usernameGenerator.relatedTools.title")}
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
  );
}
