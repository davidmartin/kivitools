"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function YouTubeToolsPage() {
  const { t } = useLanguage();

  const tools = [
    {
      name: t("youtubeScript.title"),
      description: t("youtubeScript.description"),
      href: "/youtube/script-generator",
      icon: "📝",
    },
    {
      name: t("youtubeTitle.title"),
      description: t("youtubeTitle.description"),
      href: "/youtube/title-generator",
      icon: "📌",
    },
    {
      name: t("youtubeDescription.title"),
      description: t("youtubeDescription.description"),
      href: "/youtube/description-generator",
      icon: "📄",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎥</div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("nav.youtube")} {t("nav.tools")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("youtube.page.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <Card.Header>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{tool.icon}</span>
                      <div>
                        <Card.Title className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
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
