"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TikTokToolsPage() {
  const { t } = useLanguage();

  const tools = [
    {
      name: t("scriptWriter.title"),
      description: t("scriptWriter.description"),
      href: "/tiktok/script-writer",
      icon: "📝",
    },
    {
      name: t("videoIdeas.title"),
      description: t("videoIdeas.description"),
      href: "/tiktok/video-ideas",
      icon: "💡",
    },
    {
      name: t("hookGenerator.title"),
      description: t("hookGenerator.description"),
      href: "/tiktok/hook-generator",
      icon: "🎣",
    },
    {
      name: t("hashtagGenerator.title"),
      description: t("hashtagGenerator.description"),
      href: "/tiktok/hashtag-generator",
      icon: "#️⃣",
    },
    {
      name: t("usernameGenerator.title"),
      description: t("usernameGenerator.description"),
      href: "/tiktok/username-generator",
      icon: "👤",
    },
    {
      name: t("usernameChecker.title"),
      description: t("usernameChecker.description"),
      href: "/tiktok/username-checker",
      icon: "✅",
    },
    {
      name: t("shopNameGenerator.title"),
      description: t("shopNameGenerator.description"),
      href: "/tiktok/shop-name-generator",
      icon: "🏪",
    },
    {
      name: t("moneyCalculator.title"),
      description: t("moneyCalculator.description"),
      href: "/tiktok/money-calculator",
      icon: "💰",
    },
    {
      name: t("coinsCalculator.title"),
      description: t("coinsCalculator.description"),
      href: "/tiktok/coins-calculator",
      icon: "🪙",
    },
    {
      name: t("engagementCalculator.title"),
      description: t("engagementCalculator.description"),
      href: "/tiktok/engagement-calculator",
      icon: "📊",
    },
    {
      name: t("videoDownloader.title"),
      description: t("videoDownloader.description"),
      href: "/tiktok/video-downloader",
      icon: "⬇️",
    },
    {
      name: t("transcriptGenerator.title"),
      description: t("transcriptGenerator.description"),
      href: "/tiktok/transcript-generator",
      icon: "📝",
    },
    {
      name: t("profileViewer.title"),
      description: t("profileViewer.description"),
      href: "/tiktok/profile-viewer",
      icon: "👁️",
    },
    {
      name: t("profileAnalytics.title"),
      description: t("profileAnalytics.description"),
      href: "/tiktok/profile-analytics",
      icon: "📈",
    },
    {
      name: t("mp3Downloader.title"),
      description: t("mp3Downloader.description"),
      href: "/tiktok/mp3-downloader",
      icon: "🎵",
    },
    {
      name: t("thumbnailDownloader.title"),
      description: t("thumbnailDownloader.description"),
      href: "/tiktok/thumbnail-downloader",
      icon: "🖼️",
    },
    {
      name: t("voiceGenerator.title"),
      description: t("voiceGenerator.description"),
      href: "/tiktok/voice-generator",
      icon: "🎤",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("nav.tiktok")} {t("nav.tools")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("tiktok.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <Card.Header>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{tool.icon}</span>
                      <div>
                        <Card.Title className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {tool.name}
                        </Card.Title>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Content>
                  <Card.Description>{tool.description}</Card.Description>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
