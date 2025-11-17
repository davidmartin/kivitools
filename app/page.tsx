"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import AdSlot from "./components/ad-slot";
import PlatformLogo from "./components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // Plataformas disponibles
  const platforms = [
    {
      name: "TikTok",
      description: t("tiktok.page.description"),
      href: "/tiktok",
      icon: "🎵",
      color: "purple",
    },
    {
      name: "Instagram",
      description: t("instagram.page.description"),
      href: "/instagram",
      icon: "📸",
      color: "pink",
    },
    {
      name: "Twitter",
      description: t("twitter.page.description"),
      href: "/twitter",
      icon: "🐦",
      color: "blue",
    },
    {
      name: "Snapchat",
      description: t("snapchat.page.description"),
      href: "/snapchat",
      icon: "👻",
      color: "yellow",
    },
    {
      name: "YouTube",
      description: t("youtube.page.description"),
      href: "/youtube",
      icon: "🎥",
      color: "red",
    },
    {
      name: "Reddit",
      description: t("reddit.page.description"),
      href: "/reddit",
      icon: "🔴",
      color: "orange",
    },
    {
      name: "Discord",
      description: t("discord.page.description"),
      href: "/discord",
      icon: "💬",
      color: "indigo",
    },
    {
      name: "Twitch",
      description: t("twitch.page.description"),
      href: "/twitch",
      icon: "🎮",
      color: "purple",
    },
    {
      name: "Suno",
      description: t("suno.page.description"),
      href: "/suno",
      icon: "🎵",
      color: "purple",
    },
    {
      name: "ElevenLabs",
      description: t("elevenlabs.page.description"),
      href: "/elevenlabs",
      icon: "🎙️",
      color: "purple",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t("home.hero.title")}
            <span className="block text-accent">
              {t("home.hero.subtitle")}
            </span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
            {t("home.hero.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tiktok/script-writer"
              className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent-hover rounded-lg font-semibold transition-colors"
            >
              {t("home.hero.cta")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Space - Top */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <AdSlot slotId="top-banner" format="horizontal" className="text-center" />
      </div>

      {/* Platforms Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("home.platformsSection.title")}
            </h2>
            <p className="text-xl text-muted">
              {t("home.platformsSection.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Link
                key={index}
                href={platform.href}
                className="group block h-full"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Card.Header className="text-center">
                    <div className="w-full">
                      <div className="flex justify-center mb-4">
                        <PlatformLogo 
                          platform={platform.name.toLowerCase() as any}
                          size="lg"
                        />
                      </div>
                      <Card.Title className="text-2xl group-hover:text-accent transition-colors">
                        {platform.name}
                      </Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <Card.Description className="text-center">
                      {platform.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space - Bottom */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AdSlot slotId="bottom-banner" format="horizontal" className="text-center" />
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {t("home.features.title")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("home.features.free.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.free.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("home.features.noSignup.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.noSignup.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("home.features.aiPowered.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.aiPowered.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("home.features.multiLanguage.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.multiLanguage.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {t("stats.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">50K+</div>
              <p className="text-muted">{t("stats.creators")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">1M+</div>
              <p className="text-muted">{t("stats.content")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">100K+</div>
              <p className="text-muted">{t("stats.time")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">9</div>
              <p className="text-muted">{t("stats.platforms")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-muted">{t("testimonials.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t1.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t1.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t1.text")}&quot;</p>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t2.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t2.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t2.text")}&quot;</p>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t3.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t3.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t3.text")}&quot;</p>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t4.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t4.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t4.text")}&quot;</p>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t5.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t5.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t5.text")}&quot;</p>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {t("testimonials.t6.name")}
                    </div>
                    <div className="text-sm text-muted">
                      {t("testimonials.t6.role")}
                    </div>
                  </div>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted">&quot;{t("testimonials.t6.text")}&quot;</p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
