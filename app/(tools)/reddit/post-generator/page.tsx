"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import type { RedditPostResponse } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function RedditPostGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState(uiLanguage);
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t("redditPost.form.error.emptyTopic"));
      return;
    }
    if (!subreddit.trim()) {
      setError(t("redditPost.form.error.emptySubreddit"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setPost(null);

    try {
      const response = await fetch("/api/tools/reddit/post-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: topic.trim(), 
          subreddit: subreddit.trim(),
          tone, 
          language 
        ,
          turnstileToken,
        }),
      });

      const data: RedditPostResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate post");
      }

      setPost({ title: data.title || "", content: data.content || "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t("redditPost.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    if (!post) return;
    try {
      const fullPost = `${post.title}\n\n${post.content}`;
      await navigator.clipboard.writeText(fullPost);
      alert(t("redditPost.result.copiedAll"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUseAgain = () => {
    setPost(null);
    setError("");
      setTurnstileToken("");
  };

  return (
    <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("redditPost.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("redditPost.description")}
          </p>
        </div>

        <ToolSelector platform="reddit" />

        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
                {t("redditPost.form.topic")}
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("redditPost.form.topicPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="subreddit" className="block text-sm font-medium text-foreground mb-2">
                {t("redditPost.form.subreddit")}
              </label>
              <input
                id="subreddit"
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder={t("redditPost.form.subredditPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
                {t("redditPost.form.tone")}
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {t(tone.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                {t("redditPost.form.language")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "es")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                disabled={isLoading}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(l.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {!post && (
              <>
              <TurnstileWidget
                onSuccess={setTurnstileToken}
                onError={() => setError(t("turnstile.error"))}
              />
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? t("redditPost.form.generating") : t("redditPost.form.generate")}
              </Button>
              </>
            )}

            {post && (
              <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">
                {t("redditPost.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {post && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  {t("redditPost.result.title")}
                </label>
                <Button onClick={handleCopyAll} variant="ghost" size="sm" className="text-orange-600">
                  {t("redditPost.result.copyAll")}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="bg-surface rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded text-xs font-semibold mb-2">
                        {t("redditPost.result.postTitle")}
                      </span>
                      <p className="text-foreground font-semibold">{post.title}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(post.title)}
                      className="shrink-0 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded text-xs font-semibold mb-2">
                        {t("redditPost.result.postContent")}
                      </span>
                      <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(post.content)}
                      className="shrink-0 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("redditPost.result.success")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditPost.features.engaging.title")}
            </h3>
            <p className="text-muted">
              {t("redditPost.features.engaging.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditPost.features.subredditOptimized.title")}
            </h3>
            <p className="text-muted">
              {t("redditPost.features.subredditOptimized.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditPost.features.formatted.title")}
            </h3>
            <p className="text-muted">
              {t("redditPost.features.formatted.description")}
            </p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("redditPost.features.instant.title")}
            </h3>
            <p className="text-muted">
              {t("redditPost.features.instant.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
