"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button, Popover } from "@heroui/react";
import ThemeToggle from "./theme-toggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const platforms = [
    {
      id: "tiktok",
      name: t("nav.tiktok"),
      emoji: "🎵",
      tools: [
        { name: t("scriptWriter.title"), href: "/tiktok/script-writer" },
        { name: t("videoIdeas.title"), href: "/tiktok/video-ideas" },
        { name: t("hookGenerator.title"), href: "/tiktok/hook-generator" },
        { name: t("hashtagGenerator.title"), href: "/tiktok/hashtag-generator" },
      ],
    },
    {
      id: "instagram",
      name: t("nav.instagram"),
      emoji: "📸",
      tools: [
        { name: t("captionGenerator.title"), href: "/instagram/caption-generator" },
        { name: t("bioGenerator.title"), href: "/instagram/bio-generator" },
        { name: t("reelScript.title"), href: "/instagram/reel-script" },
      ],
    },
    {
      id: "twitter",
      name: t("nav.twitter"),
      emoji: "🐦",
      tools: [
        { name: t("threadMaker.title"), href: "/twitter/thread-maker" },
        { name: t("twitterBio.title"), href: "/twitter/bio-generator" },
        { name: t("tweetGenerator.title"), href: "/twitter/tweet-generator" },
      ],
    },
    {
      id: "snapchat",
      name: t("nav.snapchat"),
      emoji: "👻",
      tools: [
        { name: t("snapchatCaption.title"), href: "/snapchat/caption-generator" },
        { name: t("snapchatStoryIdeas.title"), href: "/snapchat/story-ideas" },
        { name: t("snapchatLensIdeas.title"), href: "/snapchat/lens-ideas" },
      ],
    },
    {
      id: "youtube",
      name: t("nav.youtube"),
      emoji: "🎥",
      tools: [
        { name: t("youtubeScript.title"), href: "/youtube/script-generator" },
        { name: t("youtubeTitle.title"), href: "/youtube/title-generator" },
        { name: t("youtubeDescription.title"), href: "/youtube/description-generator" },
      ],
    },
    {
      id: "reddit",
      name: t("nav.reddit"),
      emoji: "🔴",
      tools: [
        { name: t("redditPost.title"), href: "/reddit/post-generator" },
        { name: t("redditComment.title"), href: "/reddit/comment-generator" },
        { name: t("redditAMA.title"), href: "/reddit/ama-questions" },
      ],
    },
    {
      id: "discord",
      name: t("nav.discord"),
      emoji: "💬",
      tools: [
        { name: t("discordAnnouncement.title"), href: "/discord/announcement-generator" },
        { name: t("discordWelcome.title"), href: "/discord/welcome-message" },
        { name: t("discordEvent.title"), href: "/discord/event-description" },
      ],
    },
    {
      id: "twitch",
      name: t("nav.twitch"),
      emoji: "🎮",
      tools: [
        { name: t("twitchStreamTitle.title"), href: "/twitch/stream-title" },
        { name: t("twitchCommand.title"), href: "/twitch/chat-command" },
        { name: t("twitchPanel.title"), href: "/twitch/panel-description" },
      ],
    },
  ];

  return (
    <nav className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-title.png"
              alt="KiviTools - Free AI Social Media Tools"
              width={200}
              height={60}
              priority
              className="h-10 w-auto object-contain dark:invert"
              style={{ background: 'transparent' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Blog Link */}
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              📚 Blog
            </Link>

            {/* Platforms Dropdown */}
            <Popover>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>🌐</span>
                <span>{t("nav.platforms")}</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              <Popover.Content className="w-64" placement="bottom">
                <Popover.Dialog className="p-2">
                  <div className="space-y-1">
                    {platforms.map((platform) => (
                      <Link
                        key={platform.id}
                        href={`/${platform.id}`}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                      >
                        <span className="text-xl">{platform.emoji}</span>
                        <span>{platform.name}</span>
                      </Link>
                    ))}
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>

            {/* Language Selector */}
            <Button
              variant="tertiary"
              size="sm"
              className="ml-2"
              onPress={() => setLanguage(language === "en" ? "es" : "en")}
              aria-label={language === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              {language === "en" ? "ES" : "EN"}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Selector Mobile */}
            <Button
              variant="tertiary"
              size="sm"
              isIconOnly
              onPress={() => setLanguage(language === "en" ? "es" : "en")}
              aria-label={language === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              {language === "en" ? "ES" : "EN"}
            </Button>

            {/* Theme Toggle Mobile */}
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Blog Link Mobile */}
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              📚 Blog
            </Link>
            
            {platforms.map((platform) => (
              <div key={platform.id}>
                <div className="px-4 py-2 text-sm font-semibold text-muted flex items-center gap-2">
                  <span>{platform.emoji}</span>
                  <span>{platform.name}</span>
                </div>
                {platform.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block pl-10 pr-4 py-2 text-sm text-foreground hover:bg-surface rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
