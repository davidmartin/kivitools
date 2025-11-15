"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@heroui/react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("privacy.noDataCollection.title"),
      content: t("privacy.noDataCollection.description"),
    },
    {
      title: t("privacy.usage.title"),
      content: t("privacy.usage.description"),
    },
    {
      title: t("privacy.cookies.title"),
      content: t("privacy.cookies.description"),
    },
    {
      title: t("privacy.thirdParty.title"),
      content: t("privacy.thirdParty.description"),
    },
    {
      title: t("privacy.changes.title"),
      content: t("privacy.changes.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block mb-6 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            ← {t("nav.title")}
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("privacy.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("privacy.lastUpdated")}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <Card.Content className="p-8">
            <p className="text-lg text-foreground">
              {t("privacy.intro")}
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
            href="/terms-and-conditions"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mr-6"
          >
            {t("footer.terms")}
          </Link>
          <Link
            href="/contact-us"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            {t("footer.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
