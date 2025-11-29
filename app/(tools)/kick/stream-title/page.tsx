"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function KickStreamTitlePage() {
  const { t, language: uiLanguage } = useLanguage();
  const [game, setGame] = useState("");
  const [style, setStyle] = useState("hype");
  const [language, setLanguage] = useState(uiLanguage);
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!game.trim()) {
      setError(t("kickStreamTitle.form.error.emptyGame"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setTitles([]);

    try {
      const response = await fetch("/api/tools/kick/stream-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: game.trim(), style, language, turnstileToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate");
      setTitles(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("kickStreamTitle.result.copied"));
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(titles.join("\n\n"));
    alert(t("kickStreamTitle.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setTitles([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("kickBioGenerator.title"), href: "/kick/bio-generator" },
    { name: t("kickChatRules.title"), href: "/kick/chat-rules" },
  ];

  const styles = ["hype", "chill", "competitive", "funny", "mysterious"];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 rounded-full text-sm font-semibold mb-4">
            🎮 Kick Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("kickStreamTitle.title")}</h1>
          <p className="text-xl text-muted">{t("kickStreamTitle.description")}</p>
        </div>

        <ToolSelector platform="kick" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="game" className="block text-sm font-medium text-foreground mb-2">{t("kickStreamTitle.form.game")}</label>
              <input id="game" type="text" value={game} onChange={(e) => setGame(e.target.value)} placeholder={t("kickStreamTitle.form.gamePlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">{t("kickStreamTitle.form.style")}</label>
              <select id="style" value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {styles.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("kickStreamTitle.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!titles.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("kickStreamTitle.form.generating") : t("kickStreamTitle.form.generate")}
                </Button>
              </>
            )}

            {titles.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("kickStreamTitle.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {titles.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("kickStreamTitle.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("kickStreamTitle.result.copyAll")}</Button>
              </div>
              {titles.map((title, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground mb-3">{title}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{title.length} chars</span>
                    <Button onPress={() => handleCopy(title)} variant="ghost" size="sm">{t("kickStreamTitle.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickStreamTitle.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["catchy", "limit", "style", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`kickStreamTitle.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`kickStreamTitle.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("kickStreamTitle.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("kickStreamTitle.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickStreamTitle.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`kickStreamTitle.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`kickStreamTitle.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickStreamTitle.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`kickStreamTitle.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`kickStreamTitle.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickStreamTitle.relatedTools.title")}</h2>
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
