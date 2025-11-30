"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function EtsyProductDescriptionGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [product, setProduct] = useState("");
    const [materials, setMaterials] = useState("");
    const [features, setFeatures] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!product.trim()) {
            setError(t("etsyProductDescription.form.error.emptyProduct"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setDescription("");

        try {
            const response = await fetch("/api/tools/etsy/product-description-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product: product.trim(),
                    materials: materials.trim() || undefined,
                    features: features.trim() || undefined,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate description");
            }

            setDescription(data.description || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(description);
            alert(t("etsyProductDescription.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setDescription("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
                        📝 Etsy Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("etsyProductDescription.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("etsyProductDescription.description")}
                    </p>
                </div>

                <ToolSelector platform="etsy" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductDescription.form.product")}
                            </label>
                            <textarea
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                placeholder={t("etsyProductDescription.form.productPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductDescription.form.materials")}
                            </label>
                            <input
                                type="text"
                                value={materials}
                                onChange={(e) => setMaterials(e.target.value)}
                                placeholder={t("etsyProductDescription.form.materialsPlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyProductDescription.form.features")}
                            </label>
                            <input
                                type="text"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                placeholder={t("etsyProductDescription.form.featuresPlaceholder")}
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

                        {!description && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!description && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {isLoading ? t("etsyProductDescription.form.generating") : t("etsyProductDescription.form.generate")}
                            </Button>
                        )}

                        {description && (
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

                    {description && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("etsyProductDescription.result.title")}
                            </label>
                            <textarea
                                value={description}
                                readOnly
                                rows={12}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground whitespace-pre-wrap"
                            />
                            <Button
                                onPress={handleCopy}
                                variant="primary"
                                size="lg"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t("etsyProductDescription.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
