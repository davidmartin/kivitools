"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function BeRealRealmojiIdeasPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [situation, setSituation] = useState("");
  const [personality, setPersonality] = useState("expressive");
  const [language, setLanguage] = useState(uiLanguage);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!situation.trim()) {
      setError(t("berealRealmojiIdeas.form.error.emptySituation"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setIdeas([]);

    try {
      const response = await fetch("/api/tools/bereal/realmoji-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: situation.trim(), personality, language, turnstileToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate");
      setIdeas(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("berealRealmojiIdeas.result.copied"));
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(ideas.join("\n\n"));
    alert(t("berealRealmojiIdeas.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setIdeas([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("berealCaptionGenerator.title"), href: "/bereal/caption-generator" },
    { name: t("berealBioGenerator.title"), href: "/bereal/bio-generator" },
  ];

  const personalities = ["expressive", "subtle", "dramatic", "funny", "chaotic"];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-zinc-100 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-semibold mb-4">
            📷 BeReal Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("berealRealmojiIdeas.title")}</h1>
          <p className="text-xl text-muted">{t("berealRealmojiIdeas.description")}</p>
        </div>

        <ToolSelector platform="bereal" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="situation" className="block text-sm font-medium text-foreground mb-2">{t("berealRealmojiIdeas.form.situation")}</label>
              <textarea id="situation" value={situation} onChange={(e) => setSituation(e.target.value)} placeholder={t("berealRealmojiIdeas.form.situationPlaceholder")} rows={3} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground resize-none" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="personality" className="block text-sm font-medium text-foreground mb-2">{t("berealRealmojiIdeas.form.personality")}</label>
              <select id="personality" value={personality} onChange={(e) => setPersonality(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {personalities.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("berealRealmojiIdeas.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!ideas.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("berealRealmojiIdeas.form.generating") : t("berealRealmojiIdeas.form.generate")}
                </Button>
              </>
            )}

            {ideas.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("berealRealmojiIdeas.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {ideas.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("berealRealmojiIdeas.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("berealRealmojiIdeas.result.copyAll")}</Button>
              </div>
              {ideas.map((idea, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground mb-3">{idea}</p>
                  <div className="flex justify-end">
                    <Button onPress={() => handleCopy(idea)} variant="ghost" size="sm">{t("berealRealmojiIdeas.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealRealmojiIdeas.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["creative", "situational", "personality", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`berealRealmojiIdeas.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`berealRealmojiIdeas.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("berealRealmojiIdeas.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("berealRealmojiIdeas.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealRealmojiIdeas.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-zinc-100 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-300 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`berealRealmojiIdeas.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`berealRealmojiIdeas.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealRealmojiIdeas.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`berealRealmojiIdeas.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`berealRealmojiIdeas.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("berealRealmojiIdeas.relatedTools.title")}</h2>
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
