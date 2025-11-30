"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LANGUAGES } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ToolSelector from "@/app/components/tool-selector";
import TurnstileWidget from "@/app/components/turnstile-widget";

export default function EtsyShopAnnouncementGeneratorPage() {
    const { t, language: uiLanguage } = useLanguage();
    const [shopName, setShopName] = useState("");
    const [products, setProducts] = useState("");
    const [news, setNews] = useState("");
    const [language, setLanguage] = useState(uiLanguage);
    const [announcement, setAnnouncement] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleGenerate = async () => {
        if (!shopName.trim()) {
            setError(t("etsyShopAnnouncement.form.error.emptyShopName"));
            return;
        }
        if (!products.trim()) {
            setError(t("etsyShopAnnouncement.form.error.emptyProducts"));
            return;
        }

        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }

        setIsLoading(true);
        setError("");
        setAnnouncement("");

        try {
            const response = await fetch("/api/tools/etsy/shop-announcement-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shopName: shopName.trim(),
                    products: products.trim(),
                    news: news.trim() || undefined,
                    language,
                    turnstileToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate announcement");
            }

            setAnnouncement(data.announcement || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(announcement);
            alert(t("etsyShopAnnouncement.result.copied"));
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleUseAgain = () => {
        setAnnouncement("");
        setError("");
        setTurnstileToken("");
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
                        📢 Etsy Tool
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {t("etsyShopAnnouncement.title")}
                    </h1>
                    <p className="text-xl text-muted">
                        {t("etsyShopAnnouncement.description")}
                    </p>
                </div>

                <ToolSelector platform="etsy" />

                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyShopAnnouncement.form.shopName")}
                            </label>
                            <input
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                placeholder={t("etsyShopAnnouncement.form.shopNamePlaceholder")}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyShopAnnouncement.form.products")}
                            </label>
                            <textarea
                                value={products}
                                onChange={(e) => setProducts(e.target.value)}
                                placeholder={t("etsyShopAnnouncement.form.productsPlaceholder")}
                                rows={3}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-surface text-foreground resize-none"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                {t("etsyShopAnnouncement.form.news")}
                            </label>
                            <input
                                type="text"
                                value={news}
                                onChange={(e) => setNews(e.target.value)}
                                placeholder={t("etsyShopAnnouncement.form.newsPlaceholder")}
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

                        {!announcement && (
                            <TurnstileWidget
                                onSuccess={setTurnstileToken}
                                onError={() => setError(t("turnstile.error"))}
                            />
                        )}

                        {!announcement && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isLoading || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {isLoading ? t("etsyShopAnnouncement.form.generating") : t("etsyShopAnnouncement.form.generate")}
                            </Button>
                        )}

                        {announcement && (
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

                    {announcement && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                {t("etsyShopAnnouncement.result.title")}
                            </label>
                            <textarea
                                value={announcement}
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
                                {t("etsyShopAnnouncement.result.copy")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
