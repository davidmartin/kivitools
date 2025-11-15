"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TikTokUsernameCheckerPage() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<{
    available: boolean;
    suggestions?: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!username.trim()) {
      setError(t("usernameChecker.form.error.emptyUsername"));
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/tiktok/username-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to check username");
      }

      setResult({
        available: data.available,
        suggestions: data.suggestions,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      alert(t("common.copied"));
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
            {t("usernameChecker.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("usernameChecker.description")}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                {t("usernameChecker.form.username")}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("usernameChecker.form.usernamePlaceholder")}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {!result && (
              <Button
                onPress={handleCheck}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? t("usernameChecker.form.checking") : t("usernameChecker.form.check")}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {t("usernameChecker.form.checkAnother")}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className={`text-center p-6 rounded-lg ${
                result.available 
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}>
                <div className="text-4xl mb-2">{result.available ? "✅" : "❌"}</div>
                <p className={`text-xl font-bold ${
                  result.available 
                    ? "text-green-800 dark:text-green-200" 
                    : "text-red-800 dark:text-red-200"
                }`}>
                  {result.available 
                    ? t("usernameChecker.result.available") 
                    : t("usernameChecker.result.unavailable")}
                </p>
                <p className="mt-2 font-mono text-lg">@{username}</p>
              </div>

              {!result.available && result.suggestions && result.suggestions.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    {t("usernameChecker.result.suggestions")}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-background border border-border rounded-lg p-4"
                      >
                        <span className="font-mono text-foreground">@{suggestion}</span>
                        <Button
                          onPress={() => handleCopy(suggestion)}
                          variant="ghost"
                          size="sm"
                        >
                          {t("usernameGenerator.result.copy")}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("usernameChecker.features.instant.title")}
            </h3>
            <p className="text-muted">{t("usernameChecker.features.instant.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("usernameChecker.features.suggestions.title")}
            </h3>
            <p className="text-muted">{t("usernameChecker.features.suggestions.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("usernameChecker.features.free.title")}
            </h3>
            <p className="text-muted">{t("usernameChecker.features.free.description")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("usernameChecker.features.simple.title")}
            </h3>
            <p className="text-muted">{t("usernameChecker.features.simple.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
