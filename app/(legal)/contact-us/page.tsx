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
    type: "",
    subject: "",
    message: "",
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
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      setError(t("contact.form.requiredFields"));
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError(t("contact.form.invalidEmail"));
      return;
    }

    // Validate message length
    if (formData.message.length < 10) {
      setError(t("contact.form.messageTooShort"));
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
      setFormData({ name: "", email: "", type: "", subject: "", message: "" });
    } catch (err) {
      setError(t("contact.form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const contactTypes = [
    { value: "support", label: t("contact.form.types.support") },
    { value: "feedback", label: t("contact.form.types.feedback") },
    { value: "bug", label: t("contact.form.types.bug") },
    { value: "feature", label: t("contact.form.types.feature") },
    { value: "other", label: t("contact.form.types.other") },
  ];

  const contactSections = [
    {
      title: t("contact.support.title"),
      description: t("contact.support.description"),
      icon: "",
    },
    {
      title: t("contact.feedback.title"),
      description: t("contact.feedback.description"),
      icon: "",
    },
    {
      title: t("contact.response.title"),
      description: t("contact.response.description"),
      icon: "",
    },
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
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted">{t("contact.intro")}</p>
        </div>

        {/* Contact Form */}
        <Card className="mb-12">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("contact.form.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.name")} <span className="text-danger">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("contact.form.namePlaceholder")}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.email")} <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("contact.form.emailPlaceholder")}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("contact.form.type")} <span className="text-danger">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {t("contact.form.typePlaceholder")}
                  </option>
                  {contactTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("contact.form.subject")}
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder={t("contact.form.subjectPlaceholder")}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("contact.form.message")} <span className="text-danger">*</span>
                </label>
                <TextArea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={6}
                  disabled={isLoading}
                  className="w-full"
                />
                <p className="text-sm text-muted mt-1">
                  {t("contact.form.messageHelper")}
                </p>
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

        {/* Contact Information Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactSections.map((section, index) => (
            <Card key={index} className="bg-surface">
              <Card.Content className="p-6 text-center">
                {section.icon && <div className="text-4xl mb-3">{section.icon}</div>}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-muted text-sm">{section.description}</p>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 text-center space-x-6">
          <Link
            href="/privacy-policy"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </div>
  );
}
