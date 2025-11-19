"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function LinkedInAboutGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [skills, setSkills] = useState("");
    const [achievements, setAchievements] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [about, setAbout] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!role.trim() || !experience.trim() || !skills.trim()) {
            setError("Please fill in all required fields");
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setAbout("");

        try {
            const response = await fetch("/api/tools/linkedin/about", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role.trim(),
                    experience: experience.trim(),
                    skills: skills.trim(),
                    achievements: achievements.trim(),
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate about section");
            }

            setAbout(data.result || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(about);
            alert(t("linkedinAbout.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setAbout("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background dark:from-background dark:to-surface py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("linkedinAbout.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("linkedinAbout.description")}
                    </p>
                </div>

                <ToolSelector platform="linkedin" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {t("linkedinAbout.form.role")}
                                </label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder={t("linkedinAbout.form.rolePlaceholder")}
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {t("linkedinAbout.form.experience")}
                                </label>
                                <input
                                    type="number"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="5"
                                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("linkedinAbout.form.skills")}
                            </label>
                            <textarea
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder={t("linkedinAbout.form.skillsPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("linkedinAbout.form.achievements")}
                            </label>
                            <textarea
                                value={achievements}
                                onChange={(e) => setAchievements(e.target.value)}
                                placeholder={t("linkedinAbout.form.achievementsPlaceholder")}
                                rows={3}
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

                        {!about && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!about && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isLoading ? t("linkedinAbout.form.generating") : t("linkedinAbout.form.generate")}
                            </Button>
                        )}

                        {about && (
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

                    {about && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("linkedinAbout.result.title")}
                            </label>
                            <textarea
                                value={about}
                                readOnly
                                rows={15}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground font-mono text-sm whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("linkedinAbout.result.copy")}
                            </Button>
                            <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                                {t("linkedinAbout.result.copied")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
