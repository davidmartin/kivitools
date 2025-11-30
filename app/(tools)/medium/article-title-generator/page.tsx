"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

const MEDIUM_TONES = [
    { value: "professional", labelKey: "tones.professional" },
    { value: "conversational", labelKey: "tones.friendly" },
    { value: "provocative", labelKey: "tones.bold" },
    { value: "inspirational", labelKey: "tones.empathetic" },
    { value: "educational", labelKey: "tones.academic" },
];

export default function MediumArticleTitleGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("professional");
    const [language, setLanguage] = useState(uiLanguage);
    const [titles, setTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(t("mediumArticleTitle.form.error.emptyTopic"));
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
            const response = await fetch("/api/tools/medium/article-title-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: topic.trim(),
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate titles");
            }

            setTitles(data.titles || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (title: string) => {
        try {
            await navigator.clipboard.writeText(title);
            alert(t("mediumArticleTitle.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setTitles([]);
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold mb-4">
                        📝 Medium Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("mediumArticleTitle.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("mediumArticleTitle.description")}
                    </p>
                </div>

                <ToolSelector platform="medium" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumArticleTitle.form.topic")}
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t("mediumArticleTitle.form.topicPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumArticleTitle.form.tone")}
                            </label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {MEDIUM_TONES.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("scriptWriter.form.language")}
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {LANGUAGES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {t(l.labelKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!titles.length && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!titles.length && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                {isLoading ? t("mediumArticleTitle.form.generating") : t("mediumArticleTitle.form.generate")}
                            </Button>
                        )}

                        {titles.length > 0 && (
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

                    {titles.length > 0 && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("mediumArticleTitle.result.title")}
                            </label>
                            <div className="space-y-2">
                                {titles.map((title, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-border">
                                        <span className="text-foreground">{title}</span>
                                        <Button
                                            onPress={() => handleCopy(title)}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            {t("mediumArticleTitle.result.copy")}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
