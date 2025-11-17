"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ElevenLabsToolsPage() {
  const { t } = useLanguage();

  const tools = [
    {
      name: t("voiceScriptWriter.title"),
      description: t("voiceScriptWriter.description"),
      href: "/elevenlabs/voice-script-writer",
      icon: "📝",
    },
    {
      name: t("videoVoiceoverScript.title"),
      description: t("videoVoiceoverScript.description"),
      href: "/elevenlabs/video-voiceover-script",
      icon: "🎬",
    },
    {
      name: t("voiceTextFormatter.title"),
      description: t("voiceTextFormatter.description"),
      href: "/elevenlabs/voice-text-formatter",
      icon: "✍️",
    },
    {
      name: t("podcastScript.title"),
      description: t("podcastScript.description"),
      href: "/elevenlabs/podcast-script",
      icon: "🎙️",
    },
    {
      name: t("adScript.title"),
      description: t("adScript.description"),
      href: "/elevenlabs/ad-script",
      icon: "📢",
    },
    {
      name: t("audiobookOptimizer.title"),
      description: t("audiobookOptimizer.description"),
      href: "/elevenlabs/audiobook-optimizer",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <PlatformLogo platform="elevenlabs" size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("nav.elevenlabs")} {t("nav.tools")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("elevenlabs.page.description")}
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

        {/* Platform Info */}
        <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("elevenlabs.info.title")}
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            {t("elevenlabs.info.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
