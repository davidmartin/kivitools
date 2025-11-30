"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "@/app/components/platform-logo";
import CustomToolsList from "@/app/components/custom-tools-list";

export default function EmailPage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("emailSubjectGenerator.title"),
      description: t("emailSubjectGenerator.description"),
      icon: "✉️",
      href: "/email/subject-generator",
    },
    {
      title: t("emailNewsletterGenerator.title"),
      description: t("emailNewsletterGenerator.description"),
      icon: "📰",
      href: "/email/newsletter-generator",
    },
    {
      title: t("emailSignatureGenerator.title"),
      description: t("emailSignatureGenerator.description"),
      icon: "✍️",
      href: "/email/signature-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
            <PlatformLogo platform="email" size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("email.page.title")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("email.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="h-full glass-card border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <Card.Header className="flex flex-row items-center gap-4 pt-6 px-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <Card.Title className="text-xl font-bold group-hover:text-cyan-500 transition-colors">
                    {tool.title}
                  </Card.Title>
                </Card.Header>
                <Card.Content className="px-6 pb-6">
                  <Card.Description className="text-muted text-base">
                    {tool.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

        {/* Custom Tools Section */}
        <CustomToolsList platform="email" />

        {/* Platform Info Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("email.info.title")}
          </h2>
          <div className="text-muted whitespace-pre-line leading-relaxed">
            {t("email.info.description")}
          </div>
        </div>
      </div>
    </div>
  );
}
