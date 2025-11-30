"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function OnlyFansPostCaptionGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [content, setContent] = useState("");
    const [tone, setTone] = useState("playful");
    const [language, setLanguage] = useState(uiLanguage);
    const [captions, setCaptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!content.trim()) {
            setError(t("onlyfansPostCaption.form.error.emptyContent"));
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
            const response = await fetch("/api/tools/onlyfans/post-caption-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content.trim(),
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate captions");
            }

            setCaptions(data.captions || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (caption: string) => {
        try {
            await navigator.clipboard.writeText(caption);
            alert(t("onlyfansPostCaption.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleCopyAll = async () => {
        try {
            await navigator.clipboard.writeText(captions.join("\n\n---\n\n"));
            alert(t("onlyfansPostCaption.result.copiedAll"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setCaptions([]);
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold mb-4">
                        ✨ OnlyFans Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("onlyfansPostCaption.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("onlyfansPostCaption.description")}
                    </p>
                </div>

                <ToolSelector platform="onlyfans" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("onlyfansPostCaption.form.content")}
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={t("onlyfansPostCaption.form.contentPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("onlyfansPostCaption.form.tone")}
                            </label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                <option value="playful">{t("onlyfansPostCaption.form.tones.playful")}</option>
                                <option value="seductive">{t("onlyfansPostCaption.form.tones.seductive")}</option>
                                <option value="mysterious">{t("onlyfansPostCaption.form.tones.mysterious")}</option>
                                <option value="confident">{t("onlyfansPostCaption.form.tones.confident")}</option>
                                <option value="casual">{t("onlyfansPostCaption.form.tones.casual")}</option>
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

                        {captions.length === 0 && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {captions.length === 0 && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                                {isLoading ? t("onlyfansPostCaption.form.generating") : t("onlyfansPostCaption.form.generate")}
                            </Button>
                        )}

                        {captions.length > 0 && (
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

                    {captions.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-foreground">
                                    {t("onlyfansPostCaption.result.title")}
                                </label>
                                <Button
                                    onPress={handleCopyAll}
                                    variant="ghost"
                                    size="sm"
                                >
                                    {t("onlyfansPostCaption.result.copyAll")}
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {captions.map((caption, index) => (
                                    <div key={index} className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
                                        <p className="text-foreground whitespace-pre-wrap mb-3">{caption}</p>
                                        <Button
                                            onPress={() => handleCopy(caption)}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            {t("onlyfansPostCaption.result.copy")}
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
