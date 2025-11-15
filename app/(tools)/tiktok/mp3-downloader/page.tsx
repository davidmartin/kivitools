"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AudioData {
  videoUrl: string;
  downloadUrl: string;
  coverUrl: string;
  title: string;
  author: string;
  duration: string;
  audioFormat: string;
}

export default function TikTokMP3DownloaderPage() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AudioData | null>(null);
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
      const response = await fetch("/api/tools/tiktok/mp3-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to extract audio");
      }

      setResult(data.audio);
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
            TikTok MP3 Downloader
          </h1>
          <p className="text-xl text-muted">
            Extract and download audio from TikTok videos as MP3 files.
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
                {isLoading ? "Extracting Audio..." : "Extract MP3"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Convert Another Video
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
              {/* Audio Preview */}
              <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold mb-2">Audio Ready!</h3>
                <p className="text-white/90">Your MP3 file is ready to download</p>
              </div>

              {/* Audio Info */}
              <div className="bg-background rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={result.coverUrl} 
                    alt={result.title}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{result.title}</p>
                    <p className="text-sm text-muted">@{result.author}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{result.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Format</p>
                    <p className="font-semibold text-foreground">{result.audioFormat}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={result.downloadUrl}
                download={`${result.author}-tiktok-audio.mp3`}
                className="block w-full px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                🎧 Download MP3 Audio
              </a>

              <p className="text-sm text-muted text-center">
                Click the button above to download the audio file in MP3 format.
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎵 High Quality Audio
            </h3>
            <p className="text-muted">Extract audio in the best available quality.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📱 MP3 Format
            </h3>
            <p className="text-muted">Compatible with all devices and music players.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Fast Conversion
            </h3>
            <p className="text-muted">Convert videos to MP3 instantly.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🆓 Completely Free
            </h3>
            <p className="text-muted">No registration or payment required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
