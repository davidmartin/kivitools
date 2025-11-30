"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function MediumBioGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [expertise, setExpertise] = useState("");
    const [personality, setPersonality] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [bios, setBios] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!expertise.trim()) {
            setError(t("mediumBio.form.error.emptyExpertise"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setBios([]);

        try {
            const response = await fetch("/api/tools/medium/bio-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    expertise: expertise.trim(),
                    personality: personality.trim() || undefined,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate bios");
            }

            setBios(data.bios || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (bio: string) => {
        try {
            await navigator.clipboard.writeText(bio);
            alert(t("mediumBio.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setBios([]);
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold mb-4">
                        👤 Medium Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("mediumBio.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("mediumBio.description")}
                    </p>
                </div>

                <ToolSelector platform="medium" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumBio.form.expertise")}
                            </label>
                            <input
                                type="text"
                                value={expertise}
                                onChange={(e) => setExpertise(e.target.value)}
                                placeholder={t("mediumBio.form.expertisePlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("mediumBio.form.personality")}
                            </label>
                            <input
                                type="text"
                                value={personality}
                                onChange={(e) => setPersonality(e.target.value)}
                                placeholder={t("mediumBio.form.personalityPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-surface text-foreground"
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

                        {!bios.length && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!bios.length && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                {isLoading ? t("mediumBio.form.generating") : t("mediumBio.form.generate")}
                            </Button>
                        )}

                        {bios.length > 0 && (
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

                    {bios.length > 0 && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("mediumBio.result.title")}
                            </label>
                            <p className="text-sm text-muted">{t("mediumBio.result.charLimit")}</p>
                            <div className="space-y-2">
                                {bios.map((bio, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-border">
                                        <p className="text-foreground mb-2">{bio}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted">{bio.length}/160 chars</span>
                                            <Button
                                                onPress={() => handleCopy(bio)}
                                                variant="ghost"
                                                size="sm"
                                            >
                                                {t("mediumBio.result.copy")}
                                            </Button>
                                        </div>
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
