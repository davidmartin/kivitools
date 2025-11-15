"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TranscriptData {
  videoUrl: string;
  transcript: string;
  language: string;
  wordCount: number;
  author: string;
  title: string;
}

export default function TikTokTranscriptGeneratorPage() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<TranscriptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    const cleanUrl = url.trim();
    
    if (!cleanUrl || !cleanUrl.includes('tiktok.com')) {
      setError("Please enter a valid TikTok video URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/transcript-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate transcript");
      }

      setResult(data.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Transcript Generator
          </h1>
          <p className="text-xl text-muted">
            Get text transcription of any TikTok video automatically.
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
                onPress={handleGenerate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Generating Transcript..." : "Generate Transcript"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Transcribe Another Video
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
              {/* Video Info */}
              <div className="bg-background rounded-lg p-6 space-y-3">
                <div>
                  <p className="text-sm text-muted mb-1">Video Title</p>
                  <p className="font-semibold text-foreground">{result.title}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted mb-1">Author</p>
                    <p className="text-foreground">@{result.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Language</p>
                    <p className="text-foreground">{result.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Word Count</p>
                    <p className="text-foreground">{result.wordCount} words</p>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="bg-background rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">Transcript</h3>
                  <Button
                    onPress={handleCopy}
                    variant="ghost"
                    size="sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy"}
                  </Button>
                </div>
                <div className="bg-surface rounded-lg p-4 max-h-96 overflow-y-auto">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {result.transcript}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(result.transcript)}`}
                download={`${result.author}-transcript.txt`}
                className="block w-full px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                💾 Download Transcript
              </a>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎙️ Automatic Transcription
            </h3>
            <p className="text-muted">AI-powered speech-to-text transcription.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🌍 Multi-Language
            </h3>
            <p className="text-muted">Supports transcription in multiple languages.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📝 Downloadable
            </h3>
            <p className="text-muted">Save transcripts as text files for later use.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Fast Processing
            </h3>
            <p className="text-muted">Get your transcript in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
