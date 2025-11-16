"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, Button, Input, TextArea, Alert } from "@heroui/react";
import Link from "next/link";

export default function ContactUsPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      setError(t("contact.form.requiredFields"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(t("contact.form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const contactSections = [
    {
      title: t("contact.support.title"),
      description: t("contact.support.description"),
      icon: "🛠️",
    },
    {
      title: t("contact.feedback.title"),
      description: t("contact.feedback.description"),
      icon: "💡",
    },
    {
      title: t("contact.response.title"),
      description: t("contact.response.description"),
      icon: "⏱️",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-6 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
          >
            ← {t("nav.title")}
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted">{t("contact.intro")}</p>
        </div>

        {/* Contact Form */}
        <Card className="mb-8">
          <Card.Content className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("contact.form.namePlaceholder")}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("contact.form.emailPlaceholder")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.form.subject")}
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder={t("contact.form.subjectPlaceholder")}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.form.message")} *
                </label>
                <TextArea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={6}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert status="danger">
                  <Alert.Content>{error}</Alert.Content>
                </Alert>
              )}

              {success && (
                <Alert status="success">
                  <Alert.Content>{t("contact.form.success")}</Alert.Content>
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isPending={isLoading}
                className="w-full"
              >
                {isLoading ? t("contact.form.sending") : t("contact.form.submit")}
              </Button>
            </form>
          </Card.Content>
        </Card>

        {/* Alternative Contact */}
        <Card className="mb-8 bg-surface">
          <Card.Content className="p-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {t("contact.email.title")}
            </h3>
            <p className="text-muted mb-3">{t("contact.email.description")}</p>
            <Button
              variant="secondary"
              onPress={() =>
                (window.location.href = `mailto:${t("contact.email.address")}`)
              }
            >
              {t("contact.email.address")}
            </Button>
          </Card.Content>
        </Card>

        {/* Contact Information Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactSections.map((section, index) => (
            <Card key={index}>
              <Card.Content className="p-6 text-center">
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-muted text-sm">{section.description}</p>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/privacy-policy"
            className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors mr-6"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </div>
  );
}
