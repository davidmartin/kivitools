"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function ForocochesPoleGeneratorPage() {
    const { t } = useLanguage();
    const [style, setStyle] = useState("classic");
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!turnstileToken) {
            setError(t("turnstile.failed") || "Verificación fallida");
            return;
        }

        setIsLoading(true);
        setError("");
        setContent("");

        try {
            const response = await fetch("/api/tools/forocoches/pole-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    style,
                    topic: topic.trim(),
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate pole");
            }

            setContent(data.content || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            alert(t("forocochesThread.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setContent("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("forocochesPole.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("forocochesPole.description")}
                    </p>
                </div>

                {/* Tool Selector */}
                <ToolSelector platform="forocoches" />

                {/* Main Card */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Form Section */}
                    <div className="space-y-4">
                        {/* Topic Input */}
                        <div>
                            <label
                                htmlFor="topic"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                {t("forocochesPole.form.topic")}
                            </label>
                            <input
                                id="topic"
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t("forocochesPole.form.topicPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Style Select */}
                        <div>
                            <label
                                htmlFor="style"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                {t("forocochesPole.form.style")}
                            </label>
                            <select
                                id="style"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                <option value="classic">{t("forocochesPole.form.style.classic")}</option>
                                <option value="fail">{t("forocochesPole.form.style.fail")}</option>
                                <option value="creative">{t("forocochesPole.form.style.creative")}</option>
                            </select>
                        </div>

                        {/* Turnstile Widget */}
                        {!content && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error") || "Error en verificación")}
                            />
                        )}

                        {/* Generate Button */}
                        {!content && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {isLoading ? t("forocochesPole.form.generating") : t("forocochesPole.form.generate")}
                            </Button>
                        )}

                        {/* Use Again Button */}
                        {content && (
                            <Button
                                onPress={handleUseAgain}
                                variant="ghost"
                                size="lg"
                                className="w-full"
                            >
                                {t("scriptWriter.form.useAgain") || "Usar de nuevo"}
                            </Button>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {/* Result Section */}
                    {content && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("forocochesPole.result.title")}
                            </label>
                            <textarea
                                value={content}
                                readOnly
                                rows={4}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("forocochesThread.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
