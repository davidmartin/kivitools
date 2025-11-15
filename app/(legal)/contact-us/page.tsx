"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card, Button } from "@heroui/react";
import Link from "next/link";

export default function ContactUsPage() {
  const { t } = useLanguage();

  const contactSections = [
    {
      title: t("contact.email.title"),
      description: t("contact.email.description"),
      content: t("contact.email.address"),
      icon: "📧",
    },
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
    <div className="min-h-screen bg-background dark:from-gray-900 dark:via-pink-900/20 dark:to-gray-900 py-20 px-4">
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
          <p className="text-xl text-muted">
            {t("contact.intro")}
          </p>
        </div>

        {/* Email Highlight */}
        <Card className="mb-8 bg-surface dark:from-purple-900/30 dark:to-pink-900/30">
          <Card.Content className="p-8 text-center">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("contact.email.title")}
            </h2>
            <p className="text-foreground mb-4">
              {t("contact.email.description")}
            </p>
            <Button
              variant="primary"
              size="lg"
              onPress={() => window.location.href = `mailto:${t("contact.email.address")}`}
            >
              {t("contact.email.address")}
            </Button>
          </Card.Content>
        </Card>

        {/* Contact Information Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {contactSections.slice(1).map((section, index) => (
            <Card key={index}>
              <Card.Content className="p-6">
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-foreground">
                  {section.description}
                </p>
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
