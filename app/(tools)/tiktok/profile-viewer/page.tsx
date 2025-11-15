"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Video {
  id: string;
  desc: string;
  playCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  coverUrl: string;
  videoUrl: string;
}

interface ProfileData {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  videos: number;
  recentVideos: Video[];
}

export default function TikTokProfileViewerPage() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleView = async () => {
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError("Please enter a valid username");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/profile-viewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setResult(data.profile);
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

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Profile Viewer
          </h1>
          <p className="text-xl text-muted">
            View any TikTok profile, stats, and videos instantly without login.
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
                onPress={handleView}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Loading Profile..." : "View Profile"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                View Another Profile
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
              <div className="flex items-start gap-6">
                <img 
                  src={result.avatarUrl} 
                  alt={result.displayName}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">{result.displayName}</h2>
                  <p className="text-muted mb-2">@{result.username}</p>
                  <p className="text-foreground">{result.bio}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.followers)}</p>
                  <p className="text-sm text-muted">Followers</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.following)}</p>
                  <p className="text-sm text-muted">Following</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.likes)}</p>
                  <p className="text-sm text-muted">Likes</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{result.videos}</p>
                  <p className="text-sm text-muted">Videos</p>
                </div>
              </div>

              {/* Recent Videos */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Recent Videos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {result.recentVideos.map((video) => (
                    <div key={video.id} className="bg-background rounded-lg overflow-hidden">
                      <img src={video.coverUrl} alt={video.desc} className="w-full aspect-9/16 object-cover" />
                      <div className="p-3">
                        <p className="text-sm text-foreground line-clamp-2 mb-2">{video.desc}</p>
                        <div className="flex justify-between text-xs text-muted">
                          <span>❤️ {formatNumber(video.likeCount)}</span>
                          <span>💬 {formatNumber(video.commentCount)}</span>
                          <span>👁️ {formatNumber(video.playCount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              👤 No Login Required
            </h3>
            <p className="text-muted">View any public TikTok profile without signing in.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📊 Complete Stats
            </h3>
            <p className="text-muted">See followers, likes, and all profile information.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎬 Recent Videos
            </h3>
            <p className="text-muted">Browse recent posts with stats and thumbnails.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Instant Access
            </h3>
            <p className="text-muted">Get profile data in seconds, completely free.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
