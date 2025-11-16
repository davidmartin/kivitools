"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, Button, Input, TextArea, Alert } from "@heroui/react";
import Link from "next/link";

export default function SuggestToolPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platform: "",
    toolName: "",
    toolPurpose: "",
    additionalInfo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.platform || !formData.toolName || !formData.toolPurpose) {
      setError(t("suggestTool.form.requiredFields"));
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError(t("suggestTool.form.invalidEmail"));
      return;
    }

    // Validate minimum length
    if (formData.toolPurpose.length < 20) {
      setError(t("suggestTool.form.purposeTooShort"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/suggest-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to send suggestion");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        platform: "",
        toolName: "",
        toolPurpose: "",
        additionalInfo: "",
      });
    } catch (err) {
      setError(t("suggestTool.form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { value: "tiktok", label: "TikTok" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "snapchat", label: "Snapchat" },
    { value: "youtube", label: "YouTube" },
    { value: "reddit", label: "Reddit" },
    { value: "discord", label: "Discord" },
    { value: "twitch", label: "Twitch" },
    { value: "suno", label: "Suno" },
    { value: "spotify", label: "Spotify" },
    { value: "other", label: t("suggestTool.form.platformOther") },
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-6 text-accent hover:text-accent-hover transition-colors"
          >
            ← {t("nav.title")}
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("suggestTool.title")}
          </h1>
          <p className="text-xl text-muted">{t("suggestTool.intro")}</p>
        </div>

        {/* Suggestion Form */}
        <Card className="mb-12">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("suggestTool.form.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("suggestTool.form.name")} <span className="text-danger">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("suggestTool.form.namePlaceholder")}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("suggestTool.form.email")} <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("suggestTool.form.emailPlaceholder")}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("suggestTool.form.platform")} <span className="text-danger">*</span>
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {t("suggestTool.form.platformPlaceholder")}
                  </option>
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("suggestTool.form.toolName")} <span className="text-danger">*</span>
                </label>
                <Input
                  value={formData.toolName}
                  onChange={(e) =>
                    setFormData({ ...formData, toolName: e.target.value })
                  }
                  placeholder={t("suggestTool.form.toolNamePlaceholder")}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("suggestTool.form.toolPurpose")} <span className="text-danger">*</span>
                </label>
                <TextArea
                  value={formData.toolPurpose}
                  onChange={(e) =>
                    setFormData({ ...formData, toolPurpose: e.target.value })
                  }
                  placeholder={t("suggestTool.form.toolPurposePlaceholder")}
                  rows={4}
                  disabled={isLoading}
                  className="w-full"
                />
                <p className="text-sm text-muted mt-1">
                  {t("suggestTool.form.purposeHelper")}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("suggestTool.form.additionalInfo")}
                </label>
                <TextArea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalInfo: e.target.value })
                  }
                  placeholder={t("suggestTool.form.additionalInfoPlaceholder")}
                  rows={3}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              {error && (
                <Alert status="danger">
                  <Alert.Content>{error}</Alert.Content>
                </Alert>
              )}

              {success && (
                <Alert status="success">
                  <Alert.Content>{t("suggestTool.form.success")}</Alert.Content>
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isPending={isLoading}
                className="w-full"
              >
                {isLoading ? t("suggestTool.form.sending") : t("suggestTool.form.submit")}
              </Button>
            </form>
          </Card.Content>
        </Card>

        {/* Information Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-surface">
            <Card.Content className="p-6 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("suggestTool.info.review.title")}
              </h3>
              <p className="text-muted text-sm">{t("suggestTool.info.review.description")}</p>
            </Card.Content>
          </Card>
          <Card className="bg-surface">
            <Card.Content className="p-6 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("suggestTool.info.implementation.title")}
              </h3>
              <p className="text-muted text-sm">{t("suggestTool.info.implementation.description")}</p>
            </Card.Content>
          </Card>
          <Card className="bg-surface">
            <Card.Content className="p-6 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("suggestTool.info.credit.title")}
              </h3>
              <p className="text-muted text-sm">{t("suggestTool.info.credit.description")}</p>
            </Card.Content>
          </Card>
        </div>

        {/* Examples Section */}
        <Card className="bg-surface">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("suggestTool.examples.title")}
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-bold text-foreground mb-1">
                  {t("suggestTool.examples.example1.platform")}
                </h3>
                <p className="text-sm text-muted mb-1">
                  <strong>{t("suggestTool.examples.example1.toolName")}</strong>
                </p>
                <p className="text-sm text-muted">
                  {t("suggestTool.examples.example1.purpose")}
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-bold text-foreground mb-1">
                  {t("suggestTool.examples.example2.platform")}
                </h3>
                <p className="text-sm text-muted mb-1">
                  <strong>{t("suggestTool.examples.example2.toolName")}</strong>
                </p>
                <p className="text-sm text-muted">
                  {t("suggestTool.examples.example2.purpose")}
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-bold text-foreground mb-1">
                  {t("suggestTool.examples.example3.platform")}
                </h3>
                <p className="text-sm text-muted mb-1">
                  <strong>{t("suggestTool.examples.example3.toolName")}</strong>
                </p>
                <p className="text-sm text-muted">
                  {t("suggestTool.examples.example3.purpose")}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
