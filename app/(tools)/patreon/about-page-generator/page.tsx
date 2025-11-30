"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function PatreonAboutPageGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [creatorType, setCreatorType] = useState("");
    const [content, setContent] = useState("");
    const [goals, setGoals] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [aboutPage, setAboutPage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!creatorType.trim()) {
            setError(t("patreonAboutPage.form.error.emptyCreatorType"));
            return;
        }
        if (!content.trim()) {
            setError(t("patreonAboutPage.form.error.emptyContent"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setAboutPage("");

        try {
            const response = await fetch("/api/tools/patreon/about-page-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    creatorType: creatorType.trim(),
                    content: content.trim(),
                    goals: goals.trim() || undefined,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate about page");
            }

            setAboutPage(data.aboutPage || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(aboutPage);
            alert(t("patreonAboutPage.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setAboutPage("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
                        📄 Patreon Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("patreonAboutPage.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("patreonAboutPage.description")}
                    </p>
                </div>

                <ToolSelector platform="patreon" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("patreonAboutPage.form.creatorType")}
                            </label>
                            <input
                                type="text"
                                value={creatorType}
                                onChange={(e) => setCreatorType(e.target.value)}
                                placeholder={t("patreonAboutPage.form.creatorTypePlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("patreonAboutPage.form.content")}
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={t("patreonAboutPage.form.contentPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("patreonAboutPage.form.goals")}
                            </label>
                            <textarea
                                value={goals}
                                onChange={(e) => setGoals(e.target.value)}
                                placeholder={t("patreonAboutPage.form.goalsPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("scriptWriter.form.language")}
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {LANGUAGES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {t(l.labelKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!aboutPage && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!aboutPage && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-red-600 hover:bg-red-700 text-white"
                            >
                                {isLoading ? t("patreonAboutPage.form.generating") : t("patreonAboutPage.form.generate")}
                            </Button>
                        )}

                        {aboutPage && (
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

                    {aboutPage && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("patreonAboutPage.result.title")}
                            </label>
                            <textarea
                                value={aboutPage}
                                readOnly
                                rows={15}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("patreonAboutPage.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
