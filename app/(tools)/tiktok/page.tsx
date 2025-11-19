"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomToolsList from "@/app/components/custom-tools-list";

export default function TikTokToolsPage() {
  const { t } = useLanguage();

  // ✅ HERRAMIENTAS FUNCIONALES (AI-Powered)
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
      name: t("tiktokCaptionGenerator.title"),
      description: t("tiktokCaptionGenerator.description"),
      href: "/tiktok/caption-generator",
      icon: "📝",
    },
    {
      name: t("usernameGenerator.title"),
      description: t("usernameGenerator.description"),
      href: "/tiktok/username-generator",
      icon: "👤",
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
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-500/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-fuchsia-500 blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <PlatformLogo platform="tiktok" size="xl" className="relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.tiktok")} <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-fuchsia-500">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("tiktok.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2">
                <Card.Header className="pt-8 px-8">
                  <div className="flex items-start justify-between w-full mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 border border-white/10">
                      {tool.icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-muted group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                  <Card.Title className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-fuchsia-500 transition-all duration-300">
                    {tool.name}
                  </Card.Title>
                </Card.Header>
                <Card.Content className="px-8 pb-8">
                  <Card.Description className="text-muted text-lg leading-relaxed">
                    {tool.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

        {/* Community Tools */}
        <CustomToolsList platform="tiktok" />
      </div>
    </div>
  );
}
