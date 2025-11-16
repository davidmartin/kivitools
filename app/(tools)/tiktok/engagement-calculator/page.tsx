"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EngagementResult {
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgViews: number;
  engagementRate: number;
}

export default function TikTokEngagementCalculatorPage() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<EngagementResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleCalculate = async () => {
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError("Please enter a valid username");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/engagement-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername ,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to calculate engagement");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getEngagementLevel = (rate: number) => {
    if (rate >= 10) return { text: "Excellent", color: "text-green-600 dark:text-green-400" };
    if (rate >= 5) return { text: "Good", color: "text-blue-600 dark:text-blue-400" };
    if (rate >= 2) return { text: "Average", color: "text-yellow-600 dark:text-yellow-400" };
    return { text: "Low", color: "text-red-600 dark:text-red-400" };
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Engagement Rate Calculator
          </h1>
          <p className="text-xl text-muted">
            Calculate engagement rate for any TikTok profile instantly.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                TikTok Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {!result && (
              <Button
                onPress={handleCalculate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Calculating..." : "Calculate Engagement"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Check Another Profile
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
                  <p className="text-muted">@{result.username}</p>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-8 text-center">
                <p className="text-sm text-muted mb-2">Engagement Rate</p>
                <p className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {result.engagementRate.toFixed(2)}%
                </p>
                <p className={`text-lg font-semibold ${getEngagementLevel(result.engagementRate).color}`}>
                  {getEngagementLevel(result.engagementRate).text}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">Followers</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(result.followers)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">Avg Likes</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(result.avgLikes)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">Avg Comments</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(result.avgComments)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-sm text-muted mb-1">Avg Views</p>
                  <p className="text-xl font-bold text-foreground">{formatNumber(result.avgViews)}</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 Engagement rate = (Avg Likes + Avg Comments) / Followers × 100. Higher rates indicate more active and engaged audiences.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Instant Calculation
            </h3>
            <p className="text-muted">Get engagement rate in seconds from any profile.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📊 Detailed Metrics
            </h3>
            <p className="text-muted">See likes, comments, and views breakdown.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎯 Accurate Analysis
            </h3>
            <p className="text-muted">Based on recent posts and verified data.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🆓 Completely Free
            </h3>
            <p className="text-muted">No limits, check as many profiles as you want.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
