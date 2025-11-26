"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "@/app/components/platform-logo";

export default function SpotifyPage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("spotifyPlaylistName.title"),
      description: t("spotifyPlaylistName.description"),
      icon: "🎵",
      href: "/spotify/playlist-name",
    },
    {
      title: t("spotifyPlaylistDescription.title"),
      description: t("spotifyPlaylistDescription.description"),
      icon: "📝",
      href: "/spotify/playlist-description",
    },
    {
      title: t("spotifyArtistBio.title"),
      description: t("spotifyArtistBio.description"),
      icon: "🎤",
      href: "/spotify/artist-bio",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 mx-auto flex items-center justify-center">
              <PlatformLogo platform="spotify" size="xl" />
            </div>
            <div className="absolute inset-0 bg-green-500 blur-xl opacity-30 animate-pulse-glow rounded-full" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            {t("nav.spotify")} <span className="text-green-500">{t("nav.tools")}</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("spotify.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full p-6 bg-surface border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                <Card.Header className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                  </div>
                  <Card.Title className="text-2xl font-bold text-foreground group-hover:text-green-500 transition-colors mt-4">
                    {tool.title}
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-muted">
                    {tool.description}
                  </p>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

        {/* Platform Info */}
        <div className="mt-16 bg-surface rounded-2xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("spotify.info.title")}
          </h2>
          <p className="text-muted whitespace-pre-line">
            {t("spotify.info.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
