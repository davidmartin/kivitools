"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TikTokShopNameGeneratorPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("modern");
  const [shopNames, setShopNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleGenerate = async () => {
    if (!category.trim()) {
      setError(t("shopNameGenerator.form.error.emptyCategory"));
      return;
    }

    
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    setIsLoading(true);
    setError("");
    setShopNames([]);

    try {
      const response = await fetch("/api/tools/tiktok/shop-name-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          category: category.trim(), 
          keywords: keywords.trim(),
          style 
        ,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate shop names");
      }

      setShopNames(data.names || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      alert(t("shopNameGenerator.result.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("shopNameGenerator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("shopNameGenerator.description")}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                {t("shopNameGenerator.form.category")}
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t("shopNameGenerator.form.categoryPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                {t("shopNameGenerator.form.keywords")}
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t("shopNameGenerator.form.keywordsPlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                {t("shopNameGenerator.form.style")}
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              >
                <option value="modern">{t("shopNameGenerator.form.style.modern")}</option>
                <option value="elegant">{t("shopNameGenerator.form.style.elegant")}</option>
                <option value="fun">{t("shopNameGenerator.form.style.fun")}</option>
                <option value="professional">{t("shopNameGenerator.form.style.professional")}</option>
              </select>
            </div>

            {!shopNames.length && (
              <Button
                onPress={handleGenerate}
                isDisabled={isLoading || !turnstileToken}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("shopNameGenerator.form.generating") : t("shopNameGenerator.form.generate")}
              </Button>
            )}

            {shopNames.length > 0 && (
              <Button
                onPress={() => setShopNames([])}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("shopNameGenerator.form.useAgain")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {shopNames.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                {t("shopNameGenerator.result.title")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shopNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-4"
                  >
                    <span className="font-semibold text-foreground">{name}</span>
                    <Button
                      onPress={() => handleCopy(name)}
                      variant="ghost"
                      size="sm"
                    >
                      {t("shopNameGenerator.result.copy")}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                {t("shopNameGenerator.result.success").replace("{count}", shopNames.length.toString())}
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("shopNameGenerator.features.brandable.title")}
            </h3>
            <p className="text-muted">{t("shopNameGenerator.features.brandable.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("shopNameGenerator.features.memorable.title")}
            </h3>
            <p className="text-muted">{t("shopNameGenerator.features.memorable.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("shopNameGenerator.features.versatile.title")}
            </h3>
            <p className="text-muted">{t("shopNameGenerator.features.versatile.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("shopNameGenerator.features.creative.title")}
            </h3>
            <p className="text-muted">{t("shopNameGenerator.features.creative.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
