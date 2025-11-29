"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function TelegramWelcomeMessagePage() {
  const { t, language: uiLanguage } = useLanguage();
  const [channel, setChannel] = useState("");
  const [type, setType] = useState("community");
  const [language, setLanguage] = useState(uiLanguage);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!channel.trim()) {
      setError(t("telegramWelcomeMessage.form.error.emptyChannel"));
      return;
    }
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setMessages([]);

    try {
      const response = await fetch("/api/tools/telegram/welcome-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: channel.trim(), type, language, turnstileToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate");
      setMessages(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("telegramWelcomeMessage.result.copied"));
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(messages.join("\n\n---\n\n"));
    alert(t("telegramWelcomeMessage.result.copiedAll"));
  };

  const handleUseAgain = () => {
    setMessages([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("telegramAnnouncementGenerator.title"), href: "/telegram/announcement-generator" },
    { name: t("telegramChannelDescription.title"), href: "/telegram/channel-description" },
  ];

  const types = ["community", "news", "support", "fan-group", "discussion"];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-semibold mb-4">
            ✈️ Telegram Tool
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("telegramWelcomeMessage.title")}</h1>
          <p className="text-xl text-muted">{t("telegramWelcomeMessage.description")}</p>
        </div>

        <ToolSelector platform="telegram" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="channel" className="block text-sm font-medium text-foreground mb-2">{t("telegramWelcomeMessage.form.channel")}</label>
              <input id="channel" type="text" value={channel} onChange={(e) => setChannel(e.target.value)} placeholder={t("telegramWelcomeMessage.form.channelPlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">{t("telegramWelcomeMessage.form.type")}</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("telegramWelcomeMessage.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!messages.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("telegramWelcomeMessage.form.generating") : t("telegramWelcomeMessage.form.generate")}
                </Button>
              </>
            )}

            {messages.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("telegramWelcomeMessage.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {messages.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-foreground">{t("telegramWelcomeMessage.result.title")}</label>
                <Button onPress={handleCopyAll} variant="ghost" size="sm">{t("telegramWelcomeMessage.result.copyAll")}</Button>
              </div>
              {messages.map((message, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground mb-3 whitespace-pre-wrap">{message}</p>
                  <div className="flex justify-end">
                    <Button onPress={() => handleCopy(message)} variant="ghost" size="sm">{t("telegramWelcomeMessage.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("telegramWelcomeMessage.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["welcoming", "informative", "customizable", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`telegramWelcomeMessage.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`telegramWelcomeMessage.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("telegramWelcomeMessage.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("telegramWelcomeMessage.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("telegramWelcomeMessage.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`telegramWelcomeMessage.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`telegramWelcomeMessage.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("telegramWelcomeMessage.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`telegramWelcomeMessage.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`telegramWelcomeMessage.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("telegramWelcomeMessage.relatedTools.title")}</h2>
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
