"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";
import Link from "next/link";

export default function BlueskyBioGeneratorPage() {
  const { t, language: uiLanguage } = useLanguage();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState("");
  const [language, setLanguage] = useState(uiLanguage);
  const [bios, setBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!name.trim()) { setError(t("blueskyBioGenerator.form.error.emptyName")); return; }
    if (!profession.trim()) { setError(t("blueskyBioGenerator.form.error.emptyProfession")); return; }
    if (!turnstileToken) { setError(t("turnstile.failed")); return; }

    setIsLoading(true);
    setError("");
    setBios([]);

    try {
      const response = await fetch("/api/tools/bluesky/bio-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), profession: profession.trim(), interests: interests.trim(), personality: personality.trim(), language, turnstileToken }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to generate bios");
      setBios(data.bios || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t("blueskyBioGenerator.result.copied"));
  };

  const handleUseAgain = () => {
    setBios([]);
    setError("");
    setTurnstileToken("");
  };

  const relatedTools = [
    { name: t("blueskyPostGenerator.title"), href: "/bluesky/post-generator" },
    { name: t("blueskyThreadComposer.title"), href: "/bluesky/thread-composer" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-semibold mb-4">🦋 Bluesky Tool</div>
          <h1 className="text-5xl font-bold text-foreground mb-4">{t("blueskyBioGenerator.title")}</h1>
          <p className="text-xl text-muted">{t("blueskyBioGenerator.description")}</p>
        </div>

        <ToolSelector platform="bluesky" />

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("blueskyBioGenerator.form.name")}</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("blueskyBioGenerator.form.namePlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-foreground mb-2">{t("blueskyBioGenerator.form.profession")}</label>
              <input id="profession" type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder={t("blueskyBioGenerator.form.professionPlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-foreground mb-2">{t("blueskyBioGenerator.form.interests")}</label>
              <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder={t("blueskyBioGenerator.form.interestsPlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="personality" className="block text-sm font-medium text-foreground mb-2">{t("blueskyBioGenerator.form.personality")}</label>
              <input id="personality" type="text" value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder={t("blueskyBioGenerator.form.personalityPlaceholder")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">{t("blueskyBioGenerator.form.language")}</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as "en" | "es")} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-surface text-foreground" disabled={isLoading}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </div>

            {!bios.length && (
              <>
                <TurnstileWidget onSuccess={setTurnstileToken} onError={() => setError(t("turnstile.error"))} />
                <Button onPress={handleGenerate} isDisabled={isLoading || !turnstileToken} variant="secondary" size="lg" className="w-full">
                  {isLoading ? t("blueskyBioGenerator.form.generating") : t("blueskyBioGenerator.form.generate")}
                </Button>
              </>
            )}

            {bios.length > 0 && <Button onPress={handleUseAgain} variant="ghost" size="lg" className="w-full">{t("blueskyBioGenerator.form.useAgain")}</Button>}
          </div>

          {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><p className="text-red-800 dark:text-red-200">{error}</p></div>}

          {bios.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">{t("blueskyBioGenerator.result.title")}</label>
              {bios.map((bio, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground mb-3">{bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{bio.length} {t("blueskyBioGenerator.result.charCount")}</span>
                    <Button onPress={() => handleCopy(bio)} variant="ghost" size="sm">{t("blueskyBioGenerator.result.copy")}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyBioGenerator.topFeatures.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["personality", "community", "limit", "variety"].map((f) => (
              <div key={f} className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`blueskyBioGenerator.features.${f}.title`)}</h3>
                <p className="text-muted">{t(`blueskyBioGenerator.features.${f}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("blueskyBioGenerator.hero.subtitle")}</h2>
          <div className="text-muted whitespace-pre-line">{t("blueskyBioGenerator.hero.description")}</div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyBioGenerator.howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{n}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t(`blueskyBioGenerator.howItWorks.step${n}.title`)}</h3>
                <p className="text-muted">{t(`blueskyBioGenerator.howItWorks.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyBioGenerator.faq.title")}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`blueskyBioGenerator.faq.q${n}`)}</h3>
                <p className="text-muted">{t(`blueskyBioGenerator.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("blueskyBioGenerator.relatedTools.title")}</h2>
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
