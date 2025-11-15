"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoData {
  videoUrl: string;
  downloadUrl: string;
  coverUrl: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export default function TikTokVideoDownloaderPage() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const cleanUrl = url.trim();
    
    if (!cleanUrl || !cleanUrl.includes('tiktok.com')) {
      setError("Please enter a valid TikTok video URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/video-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to download video");
      }

      setResult(data.video);
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Video Downloader
          </h1>
          <p className="text-xl text-muted">
            Download TikTok videos without watermark in HD quality.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
                TikTok Video URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@username/video/1234567890"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {!result && (
              <Button
                onPress={handleDownload}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Processing Video..." : "Download Video"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Download Another Video
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
              {/* Video Preview */}
              <div className="bg-background rounded-lg overflow-hidden">
                <img 
                  src={result.coverUrl} 
                  alt={result.title}
                  className="w-full aspect-video object-cover"
                />
              </div>

              {/* Video Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted mb-1">Video Title</p>
                  <p className="text-lg font-semibold text-foreground">{result.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Author</p>
                  <p className="text-foreground">@{result.author}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.views)}</p>
                  <p className="text-sm text-muted">Views</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.likes)}</p>
                  <p className="text-sm text-muted">Likes</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.comments)}</p>
                  <p className="text-sm text-muted">Comments</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{formatNumber(result.shares)}</p>
                  <p className="text-sm text-muted">Shares</p>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={result.downloadUrl}
                download
                className="block w-full px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                ⬇️ Download Video (No Watermark)
              </a>

              <p className="text-sm text-muted text-center">
                Click the button above to download your video in HD quality without watermark.
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🚫 No Watermark
            </h3>
            <p className="text-muted">Download videos without the TikTok watermark.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎬 HD Quality
            </h3>
            <p className="text-muted">Get videos in the best available quality.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Fast Processing
            </h3>
            <p className="text-muted">Download videos instantly, no waiting required.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🆓 100% Free
            </h3>
            <p className="text-muted">No registration, no limits, completely free.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
