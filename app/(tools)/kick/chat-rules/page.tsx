"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function KickChatRulesPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [channelName, setChannelName] = useState("");
  const [strictness, setStrictness] = useState("moderate");
  const [language, setLanguage] = useState(uiLanguage);
  const [rules, setRules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!channelName.trim()) {
      setError(t("kickChatRules.form.error.emptyChannel"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setRules([]);

    try {
      const response = await fetch("/api/tools/kick/chat-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelName: channelName.trim(), strictness, language, turnstileToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate");
      setRules(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("kickChatRules.result.copied"));
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(rules.map((r, i) => `${i + 1}. ${r}`).join("\n"));
    alert(t("kickChatRules.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setRules([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("kickStreamTitle.title"), href: "/kick/stream-title" },
    { name: t("kickBioGenerator.title"), href: "/kick/bio-generator" },
  ];

  const strictnessLevels = ["relaxed", "moderate", "strict", "family-friendly"];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 rounded-full text-sm font-semibold mb-4">
            🎮 Kick Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("kickChatRules.title")}</h1>
          <p className="text-xl text-muted">{t("kickChatRules.description")}</p>
        </div>

        <ToolSelector platform="kick" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="channelName" className="block text-sm font-medium text-foreground mb-2">{t("kickChatRules.form.channelName")}</label>
              <input id="channelName" type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder={t("kickChatRules.form.channelNamePlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="strictness" className="block text-sm font-medium text-foreground mb-2">{t("kickChatRules.form.strictness")}</label>
              <select id="strictness" value={strictness} onChange={(e) => setStrictness(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {strictnessLevels.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("kickChatRules.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!rules.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("kickChatRules.form.generating") : t("kickChatRules.form.generate")}
                </Button>
              </>
            )}

            {rules.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("kickChatRules.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {rules.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("kickChatRules.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("kickChatRules.result.copyAll")}</Button>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <ol className="list-decimal list-inside space-y-2">
                  {rules.map((rule, i) => (
                    <li key={i} className="text-foreground flex items-start gap-2">
                      <span className="flex-1">{rule}</span>
                      <Button onPress={() => handleCopy(rule)} variant="ghost" size="sm">{t("kickChatRules.result.copy")}</Button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickChatRules.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["customizable", "clear", "community", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`kickChatRules.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`kickChatRules.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("kickChatRules.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("kickChatRules.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickChatRules.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`kickChatRules.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`kickChatRules.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickChatRules.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`kickChatRules.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`kickChatRules.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("kickChatRules.relatedTools.title")}</h2>
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
