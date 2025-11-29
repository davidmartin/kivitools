"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function BlueskyThreadComposerPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");
  const [postCount, setPostCount] = useState("5");
  const [language, setLanguage] = useState(uiLanguage);
  const [thread, setThread] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) { setError(t("blueskyThreadComposer.form.error.emptyTopic")); return; }
    const count = parseInt(postCount);
    if (count < 3 || count > 10) { setError(t("blueskyThreadComposer.form.error.invalidCount")); return; }
    if (!turnstileToken) { setError(t("turnstile.failed")); return; }

    setIsLoading(true);
    setError("");
    setThread([]);

    try {
      const response = await fetch("/api/tools/bluesky/thread-composer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), tone, postCount: count, language, turnstileToken }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate thread");
      setThread(data.thread || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("blueskyThreadComposer.result.copied"));
  };

  const handleCopyAll = async () => {
    const fullThread = thread.map((p, i) => `${i + 1}/${thread.length}\n${p}`).join("\n\n");
    await navigator.clipboard.writeText(fullThread);
    alert(t("blueskyThreadComposer.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setThread([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("blueskyPostGenerator.title"), href: "/bluesky/post-generator" },
    { name: t("blueskyBioGenerator.title"), href: "/bluesky/bio-generator" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-semibold mb-4">🦋 Bluesky Tool</div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("blueskyThreadComposer.title")}</h1>
          <p className="text-xl text-muted">{t("blueskyThreadComposer.description")}</p>
        </div>

        <ToolSelector platform="bluesky" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">{t("blueskyThreadComposer.form.topic")}</label>
              <textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t("blueskyThreadComposer.form.topicPlaceholder")} rows={3} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground resize-none" disabled={isLoading} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">{t("blueskyThreadComposer.form.tone")}</label>
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                  {TONES.map((t) => <option key={t.value} value={t.value}>{t.value}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="postCount" className="block text-sm font-medium text-foreground mb-2">{t("blueskyThreadComposer.form.postCount")}</label>
                <select id="postCount" value={postCount} onChange={(e) => setPostCount(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n} posts</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("blueskyThreadComposer.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!thread.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("blueskyThreadComposer.form.generating") : t("blueskyThreadComposer.form.generate")}
                </Button>
              </>
            )}

            {thread.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("blueskyThreadComposer.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {thread.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("blueskyThreadComposer.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("blueskyThreadComposer.result.copyAll")}</Button>
              </div>
              {thread.map((post, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold px-2 py-1 rounded">{t("blueskyThreadComposer.result.postNumber")} {i + 1}/{thread.length}</span>
                  </div>
                  <p className="text-foreground mb-3">{post}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{post.length} {t("blueskyThreadComposer.result.charCount")}</span>
                    <Button onPress={() => handleCopy(post)} variant="ghost" size="sm">{t("blueskyThreadComposer.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyThreadComposer.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["flow", "hooks", "limit", "engagement"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`blueskyThreadComposer.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`blueskyThreadComposer.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("blueskyThreadComposer.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("blueskyThreadComposer.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyThreadComposer.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`blueskyThreadComposer.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`blueskyThreadComposer.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyThreadComposer.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`blueskyThreadComposer.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`blueskyThreadComposer.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyThreadComposer.relatedTools.title")}</h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors">
                <span className="text-sm font-medium text-foreground hover:text-accent">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
