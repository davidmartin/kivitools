"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function BeRealCaptionGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [context, setContext] = useState("");
  const [mood, setMood] = useState("casual");
  const [language, setLanguage] = useState(uiLanguage);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!context.trim()) {
      setError(t("berealCaptionGenerator.form.error.emptyContext"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setCaptions([]);

    try {
      const response = await fetch("/api/tools/bereal/caption-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moment: context.trim(), mood, language, turnstileToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate");
      setCaptions(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("berealCaptionGenerator.result.copied"));
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(captions.join("\n\n"));
    alert(t("berealCaptionGenerator.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setCaptions([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("berealBioGenerator.title"), href: "/bereal/bio-generator" },
    { name: t("berealRealmojiIdeas.title"), href: "/bereal/realmoji-ideas" },
  ];

  const moods = ["casual", "funny", "wholesome", "sarcastic", "random"];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-zinc-100 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-semibold mb-4">
            📷 BeReal Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("berealCaptionGenerator.title")}</h1>
          <p className="text-xl text-muted">{t("berealCaptionGenerator.description")}</p>
        </div>

        <ToolSelector platform="bereal" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="context" className="block text-sm font-medium text-foreground mb-2">{t("berealCaptionGenerator.form.context")}</label>
              <textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} placeholder={t("berealCaptionGenerator.form.contextPlaceholder")} rows={3} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground resize-none" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="mood" className="block text-sm font-medium text-foreground mb-2">{t("berealCaptionGenerator.form.mood")}</label>
              <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {moods.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("berealCaptionGenerator.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!captions.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("berealCaptionGenerator.form.generating") : t("berealCaptionGenerator.form.generate")}
                </Button>
              </>
            )}

            {captions.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("berealCaptionGenerator.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {captions.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("berealCaptionGenerator.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("berealCaptionGenerator.result.copyAll")}</Button>
              </div>
              {captions.map((caption, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground mb-3">{caption}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{caption.length} chars</span>
                    <Button onPress={() => handleCopy(caption)} variant="ghost" size="sm">{t("berealCaptionGenerator.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealCaptionGenerator.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["authentic", "short", "mood", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`berealCaptionGenerator.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`berealCaptionGenerator.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("berealCaptionGenerator.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("berealCaptionGenerator.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealCaptionGenerator.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-zinc-100 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-300 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`berealCaptionGenerator.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`berealCaptionGenerator.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealCaptionGenerator.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`berealCaptionGenerator.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`berealCaptionGenerator.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealCaptionGenerator.relatedTools.title")}</h2>
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
