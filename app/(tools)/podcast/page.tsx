"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "@/app/components/platform-logo";
import CustomToolsList from "@/app/components/custom-tools-list";

export default function PodcastPage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("podcastNameGenerator.title"),
      description: t("podcastNameGenerator.description"),
      icon: "🎙️",
      href: "/podcast/name-generator",
    },
    {
      title: t("podcastDescriptionGenerator.title"),
      description: t("podcastDescriptionGenerator.description"),
      icon: "📝",
      href: "/podcast/description-generator",
    },
    {
      title: t("podcastEpisodeTitleGenerator.title"),
      description: t("podcastEpisodeTitleGenerator.description"),
      icon: "🎯",
      href: "/podcast/episode-title-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
            <PlatformLogo platform="podcast" size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("podcast.page.title")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("podcast.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="h-full glass-card border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <Card.Header className="flex flex-row items-center gap-4 pt-6 px-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <Card.Title className="text-xl font-bold group-hover:text-orange-500 transition-colors">
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
        <CustomToolsList platform="podcast" />

        {/* Platform Info Section */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("podcast.info.title")}
          </h2>
          <div className="text-muted whitespace-pre-line leading-relaxed">
            {t("podcast.info.description")}
          </div>
        </div>
      </div>
    </div>
  );
}
