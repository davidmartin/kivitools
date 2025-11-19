"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomToolsList from "@/app/components/custom-tools-list";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gray-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-slate-500/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-slate-500 blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <PlatformLogo platform="elevenlabs" size="xl" className="relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.elevenlabs")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-slate-500">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("elevenlabs.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group block h-full">
              <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2">
                <Card.Header className="pt-8 px-8">
                  <div className="flex items-start justify-between w-full mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-500/20 to-slate-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 border border-white/10">
                      {tool.icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-muted group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                  <Card.Title className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-500 group-hover:to-slate-500 transition-all duration-300">
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

        <CustomToolsList platform="elevenlabs" />
      </div>
    </div>
  );
}
