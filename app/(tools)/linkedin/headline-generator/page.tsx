"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function LinkedInHeadlineGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [role, setRole] = useState("");
    const [industry, setIndustry] = useState("");
    const [keywords, setKeywords] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [headlines, setHeadlines] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!role.trim() || !industry.trim()) {
            setError("Please fill in all required fields");
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setHeadlines([]);

        try {
            const response = await fetch("/api/tools/linkedin/headline", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role.trim(),
                    industry: industry.trim(),
                    keywords: keywords.trim(),
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate headlines");
            }

            setHeadlines(data.result || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(t("linkedinPost.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setHeadlines([]);
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("linkedinHeadline.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("linkedinHeadline.description")}
                    </p>
                </div>

                <ToolSelector platform="linkedin" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {t("linkedinHeadline.form.role")}
                                </label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder={t("linkedinHeadline.form.rolePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {t("linkedinHeadline.form.industry")}
                                </label>
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder={t("linkedinHeadline.form.industryPlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("linkedinHeadline.form.keywords")}
                            </label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder={t("linkedinHeadline.form.keywordsPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
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

                        {headlines.length === 0 && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {headlines.length === 0 && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isLoading ? t("linkedinHeadline.form.generating") : t("linkedinHeadline.form.generate")}
                            </Button>
                        )}

                        {headlines.length > 0 && (
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

                    {headlines.length > 0 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-foreground">
                                {t("linkedinHeadline.result.title")}
                            </label>
                            <div className="space-y-3">
                                {headlines.map((headline, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
                                        <span className="text-muted font-mono">{index + 1}.</span>
                                        <p className="flex-1 text-foreground">{headline}</p>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onPress={() => handleCopy(headline)}
                                        >
                                            {t("linkedinPost.result.copy")}
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
