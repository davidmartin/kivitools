"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TwitterToolsPage() {
  const { t } = useLanguage();

  const tools = [
    {
      name: t("threadMaker.title"),
      description: t("threadMaker.description"),
      href: "/twitter/thread-maker",
      icon: "🧵",
    },
    {
      name: t("twitterBio.title"),
      description: t("twitterBio.description"),
      href: "/twitter/bio-generator",
      icon: "🐦",
    },
    {
      name: t("tweetGenerator.title"),
      description: t("tweetGenerator.description"),
      href: "/twitter/tweet-generator",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <PlatformLogo platform="twitter" size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("nav.twitter")} {t("nav.tools")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("twitter.page.description")}
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
                        <Card.Title className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
