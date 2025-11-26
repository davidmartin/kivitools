"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@heroui/react";
import Link from "next/link";
import { COOKIE_CATEGORIES } from "@/types/cookie-consent";

export default function CookiePolicyPage() {
  const { t } = useLanguage();

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
            🍪 {t("cookies.policy.title")}
          </h1>
          <p className="text-muted">
            {t("cookies.policy.lastUpdated")}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <Card.Content className="p-8">
            <p className="text-lg text-foreground">
              {t("cookies.policy.intro")}
            </p>
          </Card.Content>
        </Card>

        {/* What Are Cookies */}
        <Card className="mb-6">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("cookies.policy.whatAreCookies.title")}
            </h2>
            <p className="text-foreground leading-relaxed">
              {t("cookies.policy.whatAreCookies.description")}
            </p>
          </Card.Content>
        </Card>

        {/* How We Use Cookies */}
        <Card className="mb-6">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("cookies.policy.howWeUse.title")}
            </h2>
            <p className="text-foreground leading-relaxed">
              {t("cookies.policy.howWeUse.description")}
            </p>
          </Card.Content>
        </Card>

        {/* Cookie Categories Tables */}
        {COOKIE_CATEGORIES.map((category) => (
          <Card key={category.id} className="mb-6">
            <Card.Content className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t(category.titleKey)}
              </h2>
              <p className="text-muted mb-6">
                {t(category.descriptionKey)}
              </p>
              
              {/* Cookie Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t("cookies.policy.table.name")}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t("cookies.policy.table.provider")}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t("cookies.policy.table.purpose")}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t("cookies.policy.table.duration")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-border/50">
                        <td className="py-3 px-4 text-foreground font-mono text-xs">
                          {cookie.name}
                        </td>
                        <td className="py-3 px-4 text-muted">
                          {cookie.provider}
                        </td>
                        <td className="py-3 px-4 text-muted">
                          {t(cookie.purposeKey)}
                        </td>
                        <td className="py-3 px-4 text-muted">
                          {cookie.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        ))}

        {/* Your Choices */}
        <Card className="mb-6">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("cookies.policy.yourChoices.title")}
            </h2>
            <p className="text-foreground leading-relaxed">
              {t("cookies.policy.yourChoices.description")}
            </p>
          </Card.Content>
        </Card>

        {/* Contact */}
        <Card className="mb-8">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("cookies.policy.contact.title")}
            </h2>
            <p className="text-foreground leading-relaxed">
              {t("cookies.policy.contact.description")}
            </p>
          </Card.Content>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/privacy-policy"
            className="text-accent hover:text-accent-hover transition-colors mr-6"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-accent hover:text-accent-hover transition-colors mr-6"
          >
            {t("footer.terms")}
          </Link>
          <Link
            href="/contact-us"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {t("footer.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
