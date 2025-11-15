"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceData {
  text: string;
  voiceType: string;
  audioUrl: string;
  duration: string;
}

const VOICE_TYPES = [
  { id: "female-young", name: "Female Young", emoji: "👩" },
  { id: "female-mature", name: "Female Mature", emoji: "👩‍🦳" },
  { id: "male-young", name: "Male Young", emoji: "👨" },
  { id: "male-mature", name: "Male Mature", emoji: "👨‍🦳" },
  { id: "robot", name: "Robot Voice", emoji: "🤖" },
  { id: "narrator", name: "Narrator", emoji: "🎙️" }
];

export default function TikTokVoiceGeneratorPage() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [voiceType, setVoiceType] = useState("female-young");
  const [result, setResult] = useState<VoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const cleanText = text.trim();
    
    if (!cleanText) {
      setError("Please enter some text to convert to speech");
      return;
    }

    if (cleanText.length > 500) {
      setError("Text is too long. Maximum 500 characters allowed");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/voice-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText, voiceType }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate voice");
      }

      setResult(data.voice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getVoiceName = (type: string) => {
    return VOICE_TYPES.find(v => v.id === type)?.name || type;
  };

  const getVoiceEmoji = (type: string) => {
    return VOICE_TYPES.find(v => v.id === type)?.emoji || "🎤";
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Voice Generator
          </h1>
          <p className="text-xl text-muted">
            Generate TikTok-style text-to-speech audio for your videos.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-foreground mb-2">
                Text to Convert (Max 500 characters)
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to TikTok voice..."
                disabled={isLoading}
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground resize-none"
              />
              <p className="text-sm text-muted mt-1">{text.length}/500 characters</p>
            </div>

            <div>
              <label htmlFor="voiceType" className="block text-sm font-medium text-foreground mb-2">
                Voice Type
              </label>
              <select
                id="voiceType"
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              >
                {VOICE_TYPES.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.emoji} {voice.name}
                  </option>
                ))}
              </select>
            </div>

            {!result && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !text.trim()}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Generating Voice..." : "Generate Voice"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Generate Another Voice
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
              {/* Voice Preview */}
              <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
                <div className="text-6xl mb-4">{getVoiceEmoji(result.voiceType)}</div>
                <h3 className="text-2xl font-bold mb-2">Voice Generated!</h3>
                <p className="text-white/90">{getVoiceName(result.voiceType)} • {result.duration}</p>
              </div>

              {/* Audio Player */}
              <div className="bg-background rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-center">
                  <audio controls className="w-full">
                    <source src={result.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-muted mb-2">Generated Text:</p>
                  <p className="text-foreground">{result.text}</p>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={result.audioUrl}
                download="tiktok-voice.mp3"
                className="block w-full px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                🎧 Download Voice Audio
              </a>

              <p className="text-sm text-muted text-center">
                Download the audio file and add it to your TikTok videos.
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎤 Multiple Voices
            </h3>
            <p className="text-muted">Choose from various TikTok-style voice options.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🔊 High Quality
            </h3>
            <p className="text-muted">Generate clear, professional-sounding audio.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ⚡ Instant Generation
            </h3>
            <p className="text-muted">Get your voice audio in seconds.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              💾 Easy Download
            </h3>
            <p className="text-muted">Download and use immediately in your videos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
