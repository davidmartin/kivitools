"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@heroui/react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("terms.service.title"),
      content: t("terms.service.description"),
    },
    {
      title: t("terms.conduct.title"),
      content: t("terms.conduct.description"),
    },
    {
      title: t("terms.intellectual.title"),
      content: t("terms.intellectual.description"),
    },
    {
      title: t("terms.limitation.title"),
      content: t("terms.limitation.description"),
    },
    {
      title: t("terms.termination.title"),
      content: t("terms.termination.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            ← {t("nav.title")}
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("terms.lastUpdated")}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <Card.Content className="p-8">
            <p className="text-lg text-foreground">
              {t("terms.intro")}
            </p>
          </Card.Content>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <Card.Content className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {section.content}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/privacy-policy"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mr-6"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/contact-us"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {t("footer.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
