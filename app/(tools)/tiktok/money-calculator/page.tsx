"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileData {
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  likes: number;
  videos: number;
  minEarnings: number;
  maxEarnings: number;
}

export default function TikTokMoneyCalculatorPage() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError(t("moneyCalculator.form.error.invalidFollowers"));
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/money-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch profile data");
      }

      setResult(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("moneyCalculator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("moneyCalculator.description")}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                {t("moneyCalculator.form.followers")}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("moneyCalculator.form.followersPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {!result && (
              <Button
                onPress={handleCalculate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("moneyCalculator.form.calculating") : t("moneyCalculator.form.calculate")}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("moneyCalculator.form.calculateAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Profile Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <img 
                  src={result.avatarUrl} 
                  alt={result.displayName}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{result.displayName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">@{result.username}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.followers)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.likes)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{result.videos}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-purple-100 mb-2">{t("moneyCalculator.result.title")}</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {formatCurrency(result.minEarnings)} - {formatCurrency(result.maxEarnings)}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-purple-100 mt-1">{t("moneyCalculator.result.perPost")}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 dark:text-blue-100">
                  💡 {t("moneyCalculator.result.disclaimer")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("moneyCalculator.features.realistic.title")}
            </h3>
            <p className="text-muted">{t("moneyCalculator.features.realistic.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("moneyCalculator.features.detailed.title")}
            </h3>
            <p className="text-muted">{t("moneyCalculator.features.detailed.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("moneyCalculator.features.engagement.title")}
            </h3>
            <p className="text-muted">{t("moneyCalculator.features.engagement.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("moneyCalculator.features.free.title")}
            </h3>
            <p className="text-muted">{t("moneyCalculator.features.free.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
