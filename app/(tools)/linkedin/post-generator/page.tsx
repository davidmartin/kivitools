"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { TONES, LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function LinkedInPostGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("professional");
    const [language, setLanguage] = useState(uiLanguage);
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(t("linkedinPost.form.error.emptyTopic") || "Please enter a topic");
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setPost("");

        try {
            const response = await fetch("/api/tools/linkedin/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic.trim(),
                    tone,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate post");
            }

            setPost(data.result || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(post);
            alert(t("linkedinPost.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setPost("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("linkedinPost.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("linkedinPost.description")}
                    </p>
                </div>

                <ToolSelector platform="linkedin" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("linkedinPost.form.topic")}
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t("linkedinPost.form.topicPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("linkedinPost.form.tone")}
                            </label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {TONES.map((tone) => (
                                    <option key={tone.value} value={tone.value}>
                                        {t(tone.labelKey)}
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
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            >
                                {LANGUAGES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {t(l.labelKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!post && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!post && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isLoading ? t("linkedinPost.form.generating") : t("linkedinPost.form.generate")}
                            </Button>
                        )}

                        {post && (
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

                    {post && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("linkedinPost.result.title")}
                            </label>
                            <textarea
                                value={post}
                                readOnly
                                rows={12}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("linkedinPost.result.copy")}
                            </Button>
                            <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                {t("linkedinPost.result.copied")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
