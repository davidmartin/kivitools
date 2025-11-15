"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ThumbnailData {
  videoUrl: string;
  thumbnailUrl: string;
  hdThumbnailUrl: string;
  title: string;
  author: string;
  dimensions: string;
}

export default function TikTokThumbnailDownloaderPage() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ThumbnailData | null>(null);
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
      const response = await fetch("/api/tools/tiktok/thumbnail-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to get thumbnail");
      }

      setResult(data.thumbnail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Thumbnail Downloader
          </h1>
          <p className="text-xl text-muted">
            Download TikTok video thumbnails in HD quality instantly.
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
                {isLoading ? "Getting Thumbnail..." : "Get Thumbnail"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Get Another Thumbnail
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
              {/* Thumbnail Preview */}
              <div className="bg-background rounded-lg overflow-hidden">
                <img 
                  src={result.hdThumbnailUrl} 
                  alt={result.title}
                  className="w-full aspect-video object-cover"
                />
              </div>

              {/* Video Info */}
              <div className="bg-background rounded-lg p-6 space-y-3">
                <div>
                  <p className="text-sm text-muted mb-1">Video Title</p>
                  <p className="font-semibold text-foreground">{result.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted mb-1">Author</p>
                    <p className="text-foreground">@{result.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Dimensions</p>
                    <p className="text-foreground">{result.dimensions}</p>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={result.hdThumbnailUrl}
                  download={`${result.author}-thumbnail-hd.jpg`}
                  className="block px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
                >
                  📥 Download HD (1080p)
                </a>
                <a
                  href={result.thumbnailUrl}
                  download={`${result.author}-thumbnail.jpg`}
                  className="block px-6 py-4 bg-gray-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
                >
                  📥 Download Standard (720p)
                </a>
              </div>

              <p className="text-sm text-muted text-center">
                Click the buttons above to download the thumbnail in your preferred quality.
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🖼️ HD Quality
            </h3>
            <p className="text-muted">Get thumbnails in the highest available resolution.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Instant Download
            </h3>
            <p className="text-muted">Extract thumbnails in seconds, no processing time.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📐 Multiple Sizes
            </h3>
            <p className="text-muted">Download in HD or standard quality as needed.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🆓 Free to Use
            </h3>
            <p className="text-muted">No limits, no registration, completely free.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
