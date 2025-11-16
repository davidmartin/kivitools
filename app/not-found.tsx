"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  const popularTools = [
    { name: "TikTok Script Writer", href: "/tiktok/script-writer" },
    { name: "Instagram Caption Generator", href: "/instagram/caption-generator" },
    { name: "Twitter Thread Maker", href: "/twitter/thread-maker" },
    { name: "YouTube Title Generator", href: "/youtube/title-generator" },
  ];

  const platforms = [
    { name: "TikTok", href: "/tiktok", icon: "🎵" },
    { name: "Instagram", href: "/instagram", icon: "📸" },
    { name: "Twitter", href: "/twitter", icon: "🐦" },
    { name: "YouTube", href: "/youtube", icon: "🎥" },
    { name: "Snapchat", href: "/snapchat", icon: "👻" },
    { name: "Reddit", href: "/reddit", icon: "🔴" },
    { name: "Discord", href: "/discord", icon: "💬" },
    { name: "Twitch", href: "/twitch", icon: "🎮" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-muted mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link href="/">
            <Button variant="secondary" size="lg">
              🏠 Go to Homepage
            </Button>
          </Link>
          <Link href="/tiktok/script-writer">
            <Button variant="primary" size="lg">
              🚀 Try Our Most Popular Tool
            </Button>
          </Link>
        </div>

        {/* Popular Tools */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            🔥 Most Popular Tools
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-left transition-colors group"
              >
                <span className="text-lg font-medium text-foreground group-hover:text-accent">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse by Platform */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            🌐 Browse by Platform
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Link
                key={platform.href}
                href={platform.href}
                className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-6 text-center transition-colors group"
              >
                <div className="text-4xl mb-2">{platform.icon}</div>
                <span className="text-sm font-medium text-foreground group-hover:text-accent">
                  {platform.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-16 p-6 bg-surface rounded-lg border border-border">
          <p className="text-muted">
            💡 <strong>Tip:</strong> If you were looking for a specific tool,
            try searching from our{" "}
            <Link href="/" className="text-accent hover:underline">
              homepage
            </Link>{" "}
            or browse by platform above.
          </p>
        </div>
      </div>
    </div>
  );
}
