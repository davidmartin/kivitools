"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function OnlyFansPromoGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [offer, setOffer] = useState("");
    const [audience, setAudience] = useState("");
    const [platform, setPlatform] = useState("twitter");
    const [language, setLanguage] = useState(uiLanguage);
    const [promo, setPromo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!offer.trim()) {
            setError(t("onlyfansPromo.form.error.emptyOffer"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setPromo("");

        try {
            const response = await fetch("/api/tools/onlyfans/promo-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offer: offer.trim(),
                    audience: audience.trim() || undefined,
                    platform,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate promo");
            }

            setPromo(data.promo || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promo);
            alert(t("onlyfansPromo.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setPromo("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold mb-4">
                        📣 OnlyFans Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("onlyfansPromo.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("onlyfansPromo.description")}
                    </p>
                </div>

                <ToolSelector platform="onlyfans" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("onlyfansPromo.form.offer")}
                            </label>
                            <textarea
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}
                                placeholder={t("onlyfansPromo.form.offerPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("onlyfansPromo.form.audience")}
                            </label>
                            <input
                                type="text"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                placeholder={t("onlyfansPromo.form.audiencePlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("onlyfansPromo.form.platform")}
                            </label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                <option value="twitter">{t("onlyfansPromo.form.platforms.twitter")}</option>
                                <option value="reddit">{t("onlyfansPromo.form.platforms.reddit")}</option>
                                <option value="instagram">{t("onlyfansPromo.form.platforms.instagram")}</option>
                                <option value="tiktok">{t("onlyfansPromo.form.platforms.tiktok")}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("scriptWriter.form.language")}
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {LANGUAGES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {t(l.labelKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!promo && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!promo && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                                {isLoading ? t("onlyfansPromo.form.generating") : t("onlyfansPromo.form.generate")}
                            </Button>
                        )}

                        {promo && (
                            <Button
                                onPress={handleUseAgain}
                                variant="ghost"
                                size="lg"
                                className="w-full"
                            >
                                {t("scriptWriter.form.useAgain")}
                            </Button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {promo && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("onlyfansPromo.result.title")}
                            </label>
                            <textarea
                                value={promo}
                                readOnly
                                rows={8}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("onlyfansPromo.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
