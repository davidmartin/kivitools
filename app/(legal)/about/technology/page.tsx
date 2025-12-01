"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card, Button } from "@heroui/react";
import Link from "next/link";
import Script from "next/script";

export default function TechnologyPage() {
  const { t } = useLanguage();

  // Schema.org SoftwareApplication JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KiviTools",
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    description:
      "100+ free AI-powered content creation tools for social media creators, powered by DeepSeek AI.",
    url: "https://kivitools.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "KiviTools",
      url: "https://kivitools.com",
    },
    softwareHelp: {
      "@type": "CreativeWork",
      name: "DeepSeek AI",
      description: "Advanced AI model powering KiviTools content generation",
    },
  };

  const features = [
    {
      title: t("technology.feature1Title"),
      description: t("technology.feature1Text"),
      icon: "⚡",
    },
    {
      title: t("technology.feature2Title"),
      description: t("technology.feature2Text"),
      icon: "🎯",
    },
    {
      title: t("technology.feature3Title"),
      description: t("technology.feature3Text"),
      icon: "🛠️",
    },
    {
      title: t("technology.feature4Title"),
      description: t("technology.feature4Text"),
      icon: "💸",
    },
  ];

  return (
    <>
      <Script
        id="technology-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background py-20 px-4">
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
              {t("technology.title")}
            </h1>
          </div>

          {/* Hero Section with DeepSeek Logo */}
          <Card className="mb-8 overflow-hidden">
            <Card.Content className="p-8 text-center">
              {/* DeepSeek Logo */}
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 dark:bg-blue-950/40 p-6 rounded-2xl">
                  <svg
                    className="w-20 h-20 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 122 122"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="61"
                      cy="61"
                      r="55"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <circle
                      cx="61"
                      cy="61"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="5"
                    />
                    <circle cx="61" cy="61" r="22" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("technology.heroTitle")}
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                {t("technology.heroSubtitle")}
              </p>
            </Card.Content>
          </Card>

          {/* Why DeepSeek Section */}
          <Card className="mb-8">
            <Card.Content className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("technology.whyDeepseek")}
              </h2>
              <p className="text-foreground leading-relaxed">
                {t("technology.whyDeepseekText")}
              </p>
            </Card.Content>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <Card.Content className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted">{feature.description}</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900">
            <Card.Content className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("technology.cta")}
              </h2>
              <p className="text-muted mb-6">{t("technology.ctaSubtext")}</p>
              <Link href="/">
                <Button variant="primary" size="lg">
                  {t("technology.cta")}
                </Button>
              </Link>
            </Card.Content>
          </Card>

          {/* Footer Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/privacy-policy"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mr-6"
            >
              {t("footer.privacy")}
            </Link>
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
    </>
  );
}
