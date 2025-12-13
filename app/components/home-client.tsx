"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import PlatformLogo from "./platform-logo";
import HeroSearch from "./hero-search";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Platform {
    id: string;
    name: string;
    descriptionKey: string;
    href: string;
    icon: string;
    color: string;
}

const PLATFORMS: Platform[] = [
    { id: "tiktok", name: "TikTok", descriptionKey: "tiktok.page.description", href: "/tools?platform=tiktok", icon: "🎵", color: "purple" },
    { id: "instagram", name: "Instagram", descriptionKey: "instagram.page.description", href: "/tools?platform=instagram", icon: "📸", color: "pink" },
    { id: "pinterest", name: "Pinterest", descriptionKey: "pinterest.page.description", href: "/tools?platform=pinterest", icon: "📌", color: "red" },
    { id: "twitter", name: "Twitter", descriptionKey: "twitter.page.description", href: "/tools?platform=twitter", icon: "🐦", color: "blue" },
    { id: "snapchat", name: "Snapchat", descriptionKey: "snapchat.page.description", href: "/tools?platform=snapchat", icon: "👻", color: "yellow" },
    { id: "youtube", name: "YouTube", descriptionKey: "youtube.page.description", href: "/tools?platform=youtube", icon: "🎥", color: "red" },
    { id: "reddit", name: "Reddit", descriptionKey: "reddit.page.description", href: "/tools?platform=reddit", icon: "🔴", color: "orange" },
    { id: "discord", name: "Discord", descriptionKey: "discord.page.description", href: "/tools?platform=discord", icon: "💬", color: "indigo" },
    { id: "twitch", name: "Twitch", descriptionKey: "twitch.page.description", href: "/tools?platform=twitch", icon: "🎮", color: "purple" },
    { id: "spotify", name: "Spotify", descriptionKey: "spotify.page.description", href: "/tools?platform=spotify", icon: "🎧", color: "green" },
    { id: "suno", name: "Suno", descriptionKey: "suno.page.description", href: "/tools?platform=suno", icon: "🎵", color: "purple" },
    { id: "elevenlabs", name: "ElevenLabs", descriptionKey: "elevenlabs.page.description", href: "/tools?platform=elevenlabs", icon: "🎙️", color: "purple" },
    { id: "forocoches", name: "Forocoches", descriptionKey: "forocoches.page.description", href: "/tools?platform=forocoches", icon: "🚗", color: "green" },
    { id: "amazon", name: "Amazon", descriptionKey: "amazon.page.description", href: "/tools?platform=amazon", icon: "🛒", color: "orange" },
    { id: "facebook", name: "Facebook", descriptionKey: "facebook.page.description", href: "/tools?platform=facebook", icon: "📘", color: "blue" },
    { id: "linkedin", name: "LinkedIn", descriptionKey: "linkedin.page.description", href: "/tools?platform=linkedin", icon: "💼", color: "blue" },
    { id: "threads", name: "Threads", descriptionKey: "threads.page.description", href: "/tools?platform=threads", icon: "🔗", color: "black" },
    { id: "bluesky", name: "Bluesky", descriptionKey: "bluesky.page.description", href: "/tools?platform=bluesky", icon: "🦋", color: "blue" },
    { id: "kick", name: "Kick", descriptionKey: "kick.page.description", href: "/tools?platform=kick", icon: "🎮", color: "green" },
    { id: "telegram", name: "Telegram", descriptionKey: "telegram.page.description", href: "/tools?platform=telegram", icon: "✈️", color: "blue" },
    { id: "bereal", name: "BeReal", descriptionKey: "bereal.page.description", href: "/tools?platform=bereal", icon: "📷", color: "black" },
    { id: "podcast", name: "Podcast", descriptionKey: "podcast.page.description", href: "/tools?platform=podcast", icon: "🎙️", color: "orange" },
    { id: "email", name: "Email", descriptionKey: "email.page.description", href: "/tools?platform=email", icon: "📧", color: "cyan" },
    { id: "dating", name: "Dating", descriptionKey: "dating.page.description", href: "/tools?platform=dating", icon: "💕", color: "pink" },
    { id: "medium", name: "Medium", descriptionKey: "medium.page.description", href: "/tools?platform=medium", icon: "📝", color: "black" },
    { id: "etsy", name: "Etsy", descriptionKey: "etsy.page.description", href: "/tools?platform=etsy", icon: "🛍️", color: "orange" },
    { id: "onlyfans", name: "OnlyFans", descriptionKey: "onlyfans.page.description", href: "/tools?platform=onlyfans", icon: "💎", color: "cyan" },
    { id: "patreon", name: "Patreon", descriptionKey: "patreon.page.description", href: "/tools?platform=patreon", icon: "❤️", color: "red" },
    { id: "ai-art", name: "AI Art", descriptionKey: "aiArt.page.description", href: "/tools?platform=ai-art", icon: "🎨", color: "purple" },
    { id: "whatsapp", name: "WhatsApp", descriptionKey: "whatsapp.page.description", href: "/tools?platform=whatsapp", icon: "💬", color: "green" },
    { id: "career", name: "Career", descriptionKey: "career.page.description", href: "/tools?platform=career", icon: "💼", color: "blue" },
    { id: "seo", name: "SEO", descriptionKey: "seo.page.description", href: "/tools?platform=seo", icon: "🔍", color: "green" },
    { id: "marketing", name: "Marketing", descriptionKey: "marketing.page.description", href: "/tools?platform=marketing", icon: "📈", color: "orange" },
    { id: "content", name: "Content", descriptionKey: "content.page.description", href: "/tools?platform=content", icon: "✍️", color: "teal" },
    { id: "presentation", name: "Presentation", descriptionKey: "presentation.page.description", href: "/tools?platform=presentation", icon: "📊", color: "amber" },
    { id: "voice", name: "Voice", descriptionKey: "voice.page.description", href: "/tools?platform=voice", icon: "🎙️", color: "violet" },
];

export default function HomeClient() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();

    return (
        <>
            {/* Hero Section - Optimized for LCP */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-6 md:pt-12">
                {/* Static Background - No heavy animations for better performance */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/15 rounded-full blur-[100px] opacity-60" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/15 rounded-full blur-[120px] opacity-60" />
                </div>

                <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center z-10 mt-12 md:mt-0">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-border/50 bg-surface/50 backdrop-blur-md text-sm font-medium text-foreground hover:bg-surface/80 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            {t("home.hero.trusted")}
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground mb-8 leading-[0.9]">
                            {t("home.hero.mainTitle.part1")}
                            <span className="block text-gradient">{t("home.hero.mainTitle.part2")}</span>
                            {t("home.hero.mainTitle.part3")}
                        </h1>

                        <p className="text-xl md:text-2xl text-muted max-w-xl mb-10 leading-relaxed">
                            {t("home.hero.description")}
                        </p>

                        {/* Hero Search Bar */}
                        <div className="mb-10">
                            <HeroSearch className="max-w-xl" />
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <Link
                                href="/tools"
                                className="group relative px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold text-lg transition-all hover:scale-105 hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {t("home.hero.cta")}
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </Link>
                            <button
                                onClick={() => router.push(user ? "/builder" : "/login")}
                                className="px-8 py-4 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground rounded-full font-bold text-lg backdrop-blur-sm transition-all hover:scale-105"
                            >
                                {t("home.hero.create")}
                            </button>
                        </div>
                    </div>

                    {/* Visual Hook - Simplified for performance */}
                    <div className="hidden lg:block relative" aria-hidden="true">
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
                                    <div className="h-2 w-3/4 bg-foreground/10 rounded" />
                                    <div className="h-2 w-1/2 bg-foreground/10 rounded" />
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
                    </div>
                </div>
            </section>

            {/* Create Tool CTA Section */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-surface border border-border/50 p-8 md:p-12 text-center">
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
                        {PLATFORMS.map((platform) => (
                            <Link
                                key={platform.id}
                                href={platform.href}
                                className="group block h-full"
                            >
                                <Card className="glass-card h-full border-white/10 bg-white/5">
                                    <Card.Header className="text-center pt-8">
                                        <div className="w-full">
                                            <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                                <PlatformLogo
                                                    platform={platform.id as any}
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
                                            {t(platform.descriptionKey)}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
