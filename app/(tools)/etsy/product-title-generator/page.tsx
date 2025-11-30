"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function EtsyProductTitleGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [product, setProduct] = useState("");
    const [keywords, setKeywords] = useState("");
    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [titles, setTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!product.trim()) {
            setError(t("etsyProductTitle.form.error.emptyProduct"));
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
            const response = await fetch("/api/tools/etsy/product-title-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product: product.trim(),
                    keywords: keywords.trim() || undefined,
                    category: category.trim() || undefined,
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
            alert(t("etsyProductTitle.result.copied"));
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
                    <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
                        🏷️ Etsy Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("etsyProductTitle.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("etsyProductTitle.description")}
                    </p>
                </div>

                <ToolSelector platform="etsy" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductTitle.form.product")}
                            </label>
                            <textarea
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                placeholder={t("etsyProductTitle.form.productPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductTitle.form.keywords")}
                            </label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder={t("etsyProductTitle.form.keywordsPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductTitle.form.category")}
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder={t("etsyProductTitle.form.categoryPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
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
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
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
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {isLoading ? t("etsyProductTitle.form.generating") : t("etsyProductTitle.form.generate")}
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
                                {t("etsyProductTitle.result.title")}
                            </label>
                            <p className="text-sm text-muted">{t("etsyProductTitle.result.charLimit")}</p>
                            <div className="space-y-2">
                                {titles.map((title, index) => (
                                    <div key={index} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                        <p className="text-foreground mb-2">{title}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted">{title.length}/140 chars</span>
                                            <Button
                                                onPress={() => handleCopy(title)}
                                                variant="ghost"
                                                size="sm"
                                            >
                                                {t("etsyProductTitle.result.copy")}
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
