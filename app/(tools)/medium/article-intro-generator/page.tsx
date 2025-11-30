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

export default function MediumArticleIntroGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [topic, setTopic] = useState("");
    const [keyPoints, setKeyPoints] = useState("");
    const [tone, setTone] = useState("professional");
    const [language, setLanguage] = useState(uiLanguage);
    const [intro, setIntro] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(t("mediumArticleIntro.form.error.emptyTopic"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setIntro("");

        try {
            const response = await fetch("/api/tools/medium/article-intro-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: topic.trim(),
                    keyPoints: keyPoints.trim() || undefined,
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate intro");
            }

            setIntro(data.intro || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(intro);
            alert(t("mediumArticleIntro.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setIntro("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold mb-4">
                        ✍️ Medium Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("mediumArticleIntro.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("mediumArticleIntro.description")}
                    </p>
                </div>

                <ToolSelector platform="medium" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumArticleIntro.form.topic")}
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t("mediumArticleIntro.form.topicPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumArticleIntro.form.keyPoints")}
                            </label>
                            <textarea
                                value={keyPoints}
                                onChange={(e) => setKeyPoints(e.target.value)}
                                placeholder={t("mediumArticleIntro.form.keyPointsPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumArticleIntro.form.tone")}
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

                        {!intro && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!intro && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                {isLoading ? t("mediumArticleIntro.form.generating") : t("mediumArticleIntro.form.generate")}
                            </Button>
                        )}

                        {intro && (
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

                    {intro && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("mediumArticleIntro.result.title")}
                            </label>
                            <textarea
                                value={intro}
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
                                {t("mediumArticleIntro.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
