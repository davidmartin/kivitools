"use client";

import Link from "next/link";
import { Card, Accordion } from "@heroui/react";
import LatestTools from "./components/latest-tools";
import AdSlot from "./components/ad-slot";
import PlatformLogo from "./components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { generateHomeJsonLd, generateSoftwareAppJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  // SEO Data
  const homeJsonLd = generateHomeJsonLd();
  const softwareAppJsonLd = generateSoftwareAppJsonLd();
  
  const faqs = [
    { q: "home.faq.q1", a: "home.faq.a1" },
    { q: "home.faq.q2", a: "home.faq.a2" },
    { q: "home.faq.q3", a: "home.faq.a3" },
    { q: "home.faq.q4", a: "home.faq.a4" },
    { q: "home.faq.q5", a: "home.faq.a5" },
  ];

  const faqJsonLd = generateFaqJsonLd(
    faqs.map(item => ({
      question: t(item.q),
      answer: t(item.a)
    }))
  );

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
    {
      name: "Forocoches",
      description: t("forocoches.page.description"),
      href: "/forocoches",
      icon: "🚗",
      color: "green",
    },
    {
      name: "Amazon",
      description: t("amazon.page.description"),
      href: "/amazon",
      icon: "🛒",
      color: "orange",
    },
    {
      name: "LinkedIn",
      description: t("linkedin.page.description"),
      href: "/linkedin",
      icon: "💼",
      color: "blue",
    },
  ];

  // Popular Tools
  const popularTools = [
    {
      name: t("scriptWriter.title"),
      description: t("scriptWriter.description"),
      href: "/tiktok/script-writer",
      icon: "🎵",
      iconClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
      name: t("bioGenerator.title"),
      description: t("bioGenerator.description"),
      href: "/instagram/bio-generator",
      icon: "📸",
      iconClass: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    },
    {
      name: t("youtubeTitle.title"),
      description: t("youtubeTitle.description"),
      href: "/youtube/title-generator",
      icon: "🎥",
      iconClass: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    },
    {
      name: t("moneyCalculator.title"),
      description: t("moneyCalculator.description"),
      href: "/tiktok/money-calculator",
      icon: "💰",
      iconClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
      name: t("captionGenerator.title"),
      description: t("captionGenerator.description"),
      href: "/instagram/caption-generator",
      icon: "📝",
      iconClass: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    },
    {
      name: t("videoIdeas.title"),
      description: t("videoIdeas.description"),
      href: "/tiktok/video-ideas",
      icon: "💡",
      iconClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-6 md:pt-12">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[100px] animate-float-slow opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[120px] animate-float-slow opacity-60" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[80px] animate-pulse-strong opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center z-10 mt-12 md:mt-0">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-border/50 bg-surface/50 backdrop-blur-md text-sm font-medium text-foreground animate-fade-in hover:bg-surface/80 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              {t("home.hero.trusted")}
            </div>

            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground mb-8 animate-slide-up leading-[0.9]">
              {t("home.hero.mainTitle.part1")}
              <span className="block text-gradient">{t("home.hero.mainTitle.part2")}</span>
              {t("home.hero.mainTitle.part3")}
            </h1>

            <p className="text-xl md:text-2xl text-muted max-w-xl mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
              {t("home.hero.description")}
            </p>

            <div className="flex flex-wrap gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link
                href="/tiktok/script-writer"
                className="group relative px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold text-lg transition-all hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("home.hero.cta")}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
              </Link>
              <button
                onClick={() => router.push(user ? "/builder" : "/login")}
                className="px-8 py-4 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground rounded-full font-bold text-lg backdrop-blur-sm transition-all hover:scale-105"
              >
                {t("home.hero.create")}
              </button>
            </div>
          </div>

          {/* Visual Hook - Floating Glass Card */}
          <div className="hidden lg:block relative animate-float" style={{ animationDelay: "0.5s" }}>
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-30 animate-pulse-glow" />
            <Card className="relative glass-card border-border/50 bg-surface/40 backdrop-blur-xl p-6 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
              <Card.Header className="pb-4 border-b border-border/10">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs font-mono text-muted">{t("home.hero.card.title")}</div>
                </div>
              </Card.Header>
              <Card.Content className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-foreground/10 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
                </div>
                <div className="p-4 rounded-lg bg-surface/50 border border-border/10">
                  <p className="text-sm text-muted font-mono">
                    <span className="text-accent">&gt;</span> {t("home.hero.card.generating")}
                    <br />
                    <span className="text-primary">{t("home.hero.card.result")}</span>
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-24 bg-primary/20 rounded-md border border-primary/30" />
                  <div className="h-8 w-24 bg-foreground/5 rounded-md border border-foreground/10" />
                </div>
              </Card.Content>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-12 -right-12 p-4 glass rounded-2xl animate-float-slow" style={{ animationDelay: "2s" }}>
              <span className="text-4xl">🚀</span>
            </div>
            <div className="absolute -bottom-8 -left-8 p-4 glass rounded-2xl animate-float-slow" style={{ animationDelay: "3s" }}>
              <span className="text-4xl">✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space - Top */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <AdSlot slotId="top-banner" format="horizontal" className="text-center" />
      </div>

      {/* Latest Tools Section */}
      <LatestTools />

      {/* Popular Tools Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("home.popularTools.title")}
            </h2>
            <p className="text-xl text-muted">
              {t("home.popularTools.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="group block h-full"
              >
                <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  <Card.Header className="flex flex-row items-center gap-4 pt-6 px-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${tool.iconClass}`}>
                      {tool.icon}
                    </div>
                    <Card.Title className="text-xl font-bold group-hover:text-primary transition-colors">
                      {tool.name}
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
        </div>
      </section>

      {/* Create Tool CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-surface to-secondary/10 border border-border/50 p-8 md:p-12 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-surface/30 backdrop-blur-sm z-0" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: "2s" }} />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {t("home.cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
                {t("home.cta.description")}
              </p>
              <button
                onClick={() => router.push(user ? "/builder" : "/login")}
                className="px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("home.cta.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

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
                <Card className="glass-card h-full border-white/10 bg-white/5">
                  <Card.Header className="text-center pt-8">
                    <div className="w-full">
                      <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        <PlatformLogo
                          platform={platform.name.toLowerCase() as any}
                          size="lg"
                        />
                      </div>
                      <Card.Title className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {platform.name}
                      </Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <Card.Description className="text-center text-muted text-base pb-4">
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
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface/30 backdrop-blur-sm -z-10" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20">
            {t("home.features.title")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-6 animate-float">🚀</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("home.features.free.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.free.description")}
              </p>
            </div>

            <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-6 animate-float" style={{ animationDelay: "0.5s" }}>⚡</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("home.features.noSignup.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.noSignup.description")}
              </p>
            </div>

            <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-6 animate-float" style={{ animationDelay: "1s" }}>🤖</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("home.features.aiPowered.title")}
              </h3>
              <p className="text-muted">
                {t("home.features.aiPowered.description")}
              </p>
            </div>

            <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-6 animate-float" style={{ animationDelay: "1.5s" }}>🌍</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
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
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-5xl font-black text-gradient mb-2">50K+</div>
              <p className="text-muted font-medium">{t("stats.creators")}</p>
            </div>
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-5xl font-black text-gradient mb-2">1M+</div>
              <p className="text-muted font-medium">{t("stats.content")}</p>
            </div>
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-5xl font-black text-gradient mb-2">100K+</div>
              <p className="text-muted font-medium">{t("stats.time")}</p>
            </div>
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-5xl font-black text-gradient mb-2">9</div>
              <p className="text-muted font-medium">{t("stats.platforms")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-surface/30 backdrop-blur-sm -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-muted text-lg">{t("testimonials.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-card border-white/10 bg-white/5">
                <Card.Content className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-1">
                      <div className="font-bold text-foreground text-lg">
                        {t(`testimonials.t${i}.name`)}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {t(`testimonials.t${i}.role`)}
                      </div>
                    </div>
                    <div className="text-xl">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-muted italic leading-relaxed">&quot;{t(`testimonials.t${i}.text`)}&quot;</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("home.faq.title")}
            </h2>
            <p className="text-muted text-lg">
              {t("home.faq.subtitle")}
            </p>
          </div>
          
          <Accordion className="w-full" variant="surface">
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} className="group mb-2 rounded-xl border border-white/5 bg-white/5 px-2 data-[open=true]:bg-white/10 transition-colors">
                <Accordion.Heading>
                  <Accordion.Trigger className="py-4 text-lg font-medium text-foreground">
                    {t(faq.q)}
                    <Accordion.Indicator className="text-muted group-data-[open=true]:rotate-180 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pb-4 text-muted leading-relaxed">
                    {t(faq.a)}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SEO Footer Section */}
      <section className="py-12 px-4 border-t border-border/10 bg-surface/5">
        <div className="max-w-5xl mx-auto text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {t("home.seoFooter.title")}
          </h2>
          <div className="text-muted leading-relaxed space-y-4 text-xs md:text-sm">
            <p>{t("home.seoFooter.text")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
