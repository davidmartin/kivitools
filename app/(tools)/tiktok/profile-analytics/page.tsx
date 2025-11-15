"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalyticsData {
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  following: number;
  likes: number;
  videos: number;
  engagementRate: number;
  avgViews: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  topHashtags: string[];
  bestPostingTime: string;
  audienceGrowth: string;
  contentCategories: { category: string; percentage: number }[];
  performanceScore: number;
}

export default function TikTokProfileAnalyticsPage() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError("Please enter a valid username");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/profile-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze profile");
      }

      setResult(data.analytics);
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

  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-green-600 dark:text-green-400" };
    if (score >= 60) return { text: "Good", color: "text-blue-600 dark:text-blue-400" };
    if (score >= 40) return { text: "Average", color: "text-yellow-600 dark:text-yellow-400" };
    return { text: "Needs Improvement", color: "text-red-600 dark:text-red-400" };
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Profile Analytics
          </h1>
          <p className="text-xl text-muted">
            Get comprehensive analytics and insights about any TikTok profile.
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
                onPress={handleAnalyze}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Analyzing Profile..." : "Analyze Profile"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Analyze Another Profile
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <img 
                  src={result.avatarUrl} 
                  alt={result.displayName}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{result.displayName}</h2>
                  <p className="text-muted">@{result.username}</p>
                </div>
              </div>

              {/* Performance Score */}
              <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                <p className="text-sm font-medium mb-2">Overall Performance Score</p>
                <p className="text-5xl font-bold">{result.performanceScore}/100</p>
                <p className={`text-sm mt-2 ${getPerformanceLevel(result.performanceScore).color} bg-white/20 inline-block px-3 py-1 rounded-full`}>
                  {getPerformanceLevel(result.performanceScore).text}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Followers</p>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.followers)}</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Total Likes</p>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.likes)}</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Engagement Rate</p>
                  <p className="text-2xl font-bold text-foreground">{result.engagementRate.toFixed(2)}%</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Videos</p>
                  <p className="text-2xl font-bold text-foreground">{result.videos}</p>
                </div>
              </div>

              {/* Average Performance */}
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Average Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted mb-1">👁️ Avg Views</p>
                    <p className="text-xl font-bold text-foreground">{formatNumber(result.avgViews)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">❤️ Avg Likes</p>
                    <p className="text-xl font-bold text-foreground">{formatNumber(result.avgLikes)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">💬 Avg Comments</p>
                    <p className="text-xl font-bold text-foreground">{formatNumber(result.avgComments)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">🔄 Avg Shares</p>
                    <p className="text-xl font-bold text-foreground">{formatNumber(result.avgShares)}</p>
                  </div>
                </div>
              </div>

              {/* Content Categories */}
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Content Categories</h3>
                <div className="space-y-3">
                  {result.contentCategories.map((cat, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{cat.category}</span>
                        <span className="text-muted">{cat.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Hashtags */}
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Top Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {result.topHashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">📅 Best Posting Time</h3>
                  <p className="text-muted">{result.bestPostingTime}</p>
                </div>
                <div className="bg-background rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">📈 Audience Growth</h3>
                  <p className="text-muted">{result.audienceGrowth}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📊 Deep Analytics
            </h3>
            <p className="text-muted">Comprehensive metrics and performance insights.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎯 Content Strategy
            </h3>
            <p className="text-muted">Discover what content works best and when to post.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📈 Growth Tracking
            </h3>
            <p className="text-muted">Monitor audience growth and engagement trends.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🏆 Performance Score
            </h3>
            <p className="text-muted">Get a comprehensive score of profile performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
