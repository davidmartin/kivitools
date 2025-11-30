"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformBadge from "@/app/components/platform-badge";
import Link from "next/link";

export default function InstagramEngagementCalculatorPage() {
  const { t } = useLanguage();
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateEngagement = () => {
    const f = parseInt(followers) || 0;
    const l = parseInt(likes) || 0;
    const c = parseInt(comments) || 0;

    if (f === 0) {
      setError(t("instagramEngagementCalculator.form.error.followers"));
      return;
    }

    setError("");
    const rate = ((l + c) / f) * 100;
    setResult(Math.round(rate * 100) / 100);
  };

  const handleReset = () => {
    setFollowers("");
    setLikes("");
    setComments("");
    setResult(null);
    setError("");
  };

  const getEngagementLevel = (rate: number) => {
    if (rate >= 6) return { text: t("calculator.excellent"), color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" };
    if (rate >= 3) return { text: t("calculator.good"), color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" };
    if (rate >= 1) return { text: t("calculator.average"), color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" };
    return { text: t("calculator.low"), color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" };
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Related tools for Instagram
  const relatedTools = [
    { name: t("captionGenerator.title"), href: "/instagram/caption-generator" },
    { name: t("bioGenerator.title"), href: "/instagram/bio-generator" },
    { name: t("reelScript.title"), href: "/instagram/reel-script" },
    { name: t("hashtagGenerator.title"), href: "/instagram/hashtag-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <PlatformBadge platform="instagram" className="mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("instagramEngagementCalculator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("instagramEngagementCalculator.description")}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="followers" className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.followers")}
              </label>
              <input
                id="followers"
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>
            <div>
              <label htmlFor="likes" className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.likes")}
              </label>
              <input
                id="likes"
                type="number"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.comments")}
              </label>
              <input
                id="comments"
                type="number"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {!result ? (
            <Button
              onPress={calculateEngagement}
              variant="secondary"
              size="lg"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              {t("instagramEngagementCalculator.form.calculate")}
            </Button>
          ) : (
            <Button
              onPress={handleReset}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              {t("instagramEngagementCalculator.form.useAgain")}
            </Button>
          )}

          {/* Result */}
          {result !== null && (
            <div className="mt-6 space-y-4">
              <div className={`p-8 rounded-xl text-center ${getEngagementLevel(result).bg}`}>
                <p className="text-sm text-muted mb-2">
                  {t("instagramEngagementCalculator.result.label")}
                </p>
                <p className={`text-6xl font-bold ${getEngagementLevel(result).color}`}>
                  {result}%
                </p>
                <p className={`text-xl font-semibold mt-2 ${getEngagementLevel(result).color}`}>
                  {getEngagementLevel(result).text}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">{t("instagramEngagementCalculator.stats.followers")}</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(parseInt(followers) || 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">{t("instagramEngagementCalculator.stats.likes")}</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(parseInt(likes) || 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">{t("instagramEngagementCalculator.stats.comments")}</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(parseInt(comments) || 0)}</p>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                <p className="text-sm text-pink-800 dark:text-pink-200">
                  💡 {t("instagramEngagementCalculator.result.formula")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("instagramEngagementCalculator.topFeatures.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.features.feature1.title")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.features.feature1.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.features.feature2.title")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.features.feature2.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.features.feature3.title")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.features.feature3.description")}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.features.feature4.title")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.features.feature4.description")}</p>
            </div>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("instagramEngagementCalculator.hero.subtitle")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("instagramEngagementCalculator.hero.description")}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("instagramEngagementCalculator.howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.howItWorks.step1.title")}
              </h3>
              <p className="text-muted">
                {t("instagramEngagementCalculator.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.howItWorks.step2.title")}
              </h3>
              <p className="text-muted">
                {t("instagramEngagementCalculator.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.howItWorks.step3.title")}
              </h3>
              <p className="text-muted">
                {t("instagramEngagementCalculator.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Benchmarks Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("instagramEngagementCalculator.benchmarks.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">&gt;6%</p>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">{t("calculator.excellent")}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3-6%</p>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t("calculator.good")}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">1-3%</p>
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{t("calculator.average")}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">&lt;1%</p>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">{t("calculator.low")}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("instagramEngagementCalculator.faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.faq.q1")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.faq.q2")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.faq.q3")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.faq.q4")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.faq.a4")}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("instagramEngagementCalculator.faq.q5")}
              </h3>
              <p className="text-muted">{t("instagramEngagementCalculator.faq.a5")}</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("instagramEngagementCalculator.relatedTools.title")}
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
