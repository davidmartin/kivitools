"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button, Popover } from "@heroui/react";
import ThemeToggle from "./theme-toggle";
import PlatformLogo from "./platform-logo";
import AppLogo from "./app-logo";
import { UI_LANGUAGES } from "@/types";
import type { Language } from "@/lib/translations";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, isHydrated } = useLanguage();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { name: t("instagramEngagementCalculator.title"), href: "/instagram/engagement-calculator" },
      ],
    },
    {
      id: "pinterest",
      name: t("nav.pinterest"),
      emoji: "📌",
      tools: [
        { name: t("pinterestPinDescription.title"), href: "/pinterest/pin-description" },
        { name: t("pinterestBoardName.title"), href: "/pinterest/board-name" },
        { name: t("pinterestProfileBio.title"), href: "/pinterest/profile-bio" },
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
        { name: t("youtubeChannelNameGenerator.title"), href: "/youtube/channel-name-generator" },
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
    {
      id: "spotify",
      name: t("nav.spotify"),
      emoji: "🎧",
      tools: [
        { name: t("spotifyPlaylistName.title"), href: "/spotify/playlist-name" },
        { name: t("spotifyPlaylistDescription.title"), href: "/spotify/playlist-description" },
        { name: t("spotifyArtistBio.title"), href: "/spotify/artist-bio" },
      ],
    },
    {
      id: "suno",
      name: t("nav.suno"),
      emoji: "🎵",
      tools: [
        { name: t("sunoLyricGenerator.title"), href: "/suno/lyric-generator" },
        { name: t("sunoMusicPrompt.title"), href: "/suno/music-prompt-generator" },
        { name: t("sunoSongDescription.title"), href: "/suno/song-description-generator" },
      ],
    },
    {
      id: "elevenlabs",
      name: t("nav.elevenlabs"),
      emoji: "🎙️",
      tools: [
        { name: t("voiceScriptWriter.title"), href: "/elevenlabs/voice-script-writer" },
        { name: t("videoVoiceoverScript.title"), href: "/elevenlabs/video-voiceover-script" },
        { name: t("voiceTextFormatter.title"), href: "/elevenlabs/voice-text-formatter" },
        { name: t("podcastScript.title"), href: "/elevenlabs/podcast-script" },
        { name: t("adScript.title"), href: "/elevenlabs/ad-script" },
        { name: t("audiobookOptimizer.title"), href: "/elevenlabs/audiobook-optimizer" },
      ],
    },
    {
      id: "facebook",
      name: t("nav.facebook"),
      emoji: "📘",
      tools: [
        { name: t("facebookPost.title"), href: "/facebook/post-generator" },
        { name: t("facebookPageBio.title"), href: "/facebook/page-bio" },
        { name: t("facebookAdCopy.title"), href: "/facebook/ad-copy" },
      ],
    },
    {
      id: "linkedin",
      name: t("nav.linkedin"),
      emoji: "💼",
      tools: [
        { name: t("linkedinPost.title"), href: "/linkedin/post-generator" },
        { name: t("linkedinHeadline.title"), href: "/linkedin/headline-generator" },
        { name: t("linkedinAbout.title"), href: "/linkedin/about-generator" },
      ],
    },
    {
      id: "forocoches",
      name: t("nav.forocoches"),
      emoji: "🚗",
      tools: [
        { name: t("forocochesThread.title"), href: "/forocoches/thread-generator" },
        { name: t("forocochesPole.title"), href: "/forocoches/pole-generator" },
        { name: t("forocochesTroll.title"), href: "/forocoches/troll-response" },
      ],
    },
    {
      id: "amazon",
      name: t("nav.amazon"),
      emoji: "📦",
      tools: [
        { name: t("productDescriptionGenerator.title"), href: "/amazon/product-description-generator" },
      ],
    },
    {
      id: "threads",
      name: t("nav.threads"),
      emoji: "🔗",
      tools: [],
    },
    {
      id: "bluesky",
      name: t("nav.bluesky"),
      emoji: "🦋",
      tools: [
        { name: t("blueskyPostGenerator.title"), href: "/bluesky/post-generator" },
        { name: t("blueskyBioGenerator.title"), href: "/bluesky/bio-generator" },
        { name: t("blueskyThreadComposer.title"), href: "/bluesky/thread-composer" },
      ],
    },
    {
      id: "kick",
      name: t("nav.kick"),
      emoji: "🎮",
      tools: [
        { name: t("kickStreamTitle.title"), href: "/kick/stream-title" },
        { name: t("kickBioGenerator.title"), href: "/kick/bio-generator" },
        { name: t("kickChatRules.title"), href: "/kick/chat-rules" },
      ],
    },
    {
      id: "telegram",
      name: t("nav.telegram"),
      emoji: "✈️",
      tools: [
        { name: t("telegramAnnouncement.title"), href: "/telegram/announcement-generator" },
        { name: t("telegramChannelDescription.title"), href: "/telegram/channel-description" },
        { name: t("telegramWelcomeMessage.title"), href: "/telegram/welcome-message" },
      ],
    },
    {
      id: "bereal",
      name: t("nav.bereal"),
      emoji: "📷",
      tools: [
        { name: t("berealCaptionGenerator.title"), href: "/bereal/caption-generator" },
        { name: t("berealBioGenerator.title"), href: "/bereal/bio-generator" },
        { name: t("berealRealmojiIdeas.title"), href: "/bereal/realmoji-ideas" },
      ],
    },
    {
      id: "podcast",
      name: t("nav.podcast"),
      emoji: "🎙️",
      tools: [
        { name: t("podcastNameGenerator.title"), href: "/podcast/name-generator" },
        { name: t("podcastDescriptionGenerator.title"), href: "/podcast/description-generator" },
        { name: t("podcastEpisodeTitleGenerator.title"), href: "/podcast/episode-title-generator" },
      ],
    },
    {
      id: "email",
      name: t("nav.email"),
      emoji: "📧",
      tools: [
        { name: t("emailSubjectGenerator.title"), href: "/email/subject-generator" },
        { name: t("emailNewsletterGenerator.title"), href: "/email/newsletter-generator" },
        { name: t("emailSignatureGenerator.title"), href: "/email/signature-generator" },
      ],
    },
    {
      id: "dating",
      name: t("nav.dating"),
      emoji: "💕",
      tools: [
        { name: t("datingBioGenerator.title"), href: "/dating/bio-generator" },
        { name: t("datingOpenerGenerator.title"), href: "/dating/opener-generator" },
        { name: t("datingProfileReview.title"), href: "/dating/profile-review" },
      ],
    },
  ];

  return (
    <nav
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-surface/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <AppLogo />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Blog Link */}
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface/50 rounded-full transition-all duration-200"
            >
              Blog
            </Link>

            {/* Platforms Dropdown */}
            <Popover>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface/50 rounded-full transition-all duration-200 data-[hover=true]:bg-surface/50"
              >
                <span suppressHydrationWarning>{t("nav.platforms")}</span>
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-data-[open=true]:rotate-180"
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
              <Popover.Content className="w-72 p-0 bg-surface/80 backdrop-blur-xl border border-border/50 shadow-xl rounded-2xl overflow-hidden">
                <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {platforms.map((platform) => (
                    <Link
                      key={platform.id}
                      href={`/${platform.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/90 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-surface border border-border/50 group-hover:border-accent/50 transition-colors">
                        <PlatformLogo platform={platform.id as any} size="sm" />
                      </div>
                      <span className="font-medium">{platform.name}</span>
                    </Link>
                  ))}
                </div>
              </Popover.Content>
            </Popover>

            {/* Auth Buttons (Desktop) */}
            {!loading && (
              <>
                {user && user.labels?.includes("admin") && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="rounded-full font-medium text-danger hover:text-danger-600"
                    onPress={() => router.push("/admin")}
                  >
                    Admin
                  </Button>
                )}
                {user && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="rounded-full font-medium text-foreground/80 hover:text-foreground"
                    onPress={() => router.push("/dashboard")}
                  >
                    {t("nav.dashboard")}
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="primary" 
                  className="rounded-full font-medium"
                  onPress={() => router.push(user ? "/builder" : "/login")}
                >
                  {t("nav.createTool")}
                </Button>
              </>
            )}

            <div className="w-px h-6 bg-border/50 mx-2" />

            {/* Language Selector */}
            <select
              aria-label={t("nav.selectLanguage")}
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent border-none hover:bg-surface/50 rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {UI_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-surface text-foreground">
                  {lang.code.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Theme Toggle */}
            <div className="ml-1 flex items-center gap-1">
              <ThemeToggle />

              {/* Auth Icon Button */}
              {!loading && (
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  className="text-foreground/80 hover:bg-surface/50 rounded-full"
                  onPress={user ? logout : () => router.push("/login")}
                  aria-label={user ? t("nav.logout") : t("nav.login")}
                >
                  {user ? (
                    // Logout Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  ) : (
                    // Login Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <select
              aria-label={t("nav.selectLanguage")}
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent border-none hover:bg-surface/50 rounded-full px-2 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {UI_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-surface text-foreground">
                  {lang.code.toUpperCase()}
                </option>
              ))}
            </select>

            <ThemeToggle />

            {/* Auth Icon Button (Mobile) */}
            {!loading && (
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                className="text-foreground/80 hover:bg-surface/50 rounded-full"
                onPress={user ? logout : () => router.push("/login")}
                aria-label={user ? t("nav.logout") : t("nav.login")}
              >
                {user ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-foreground/80 hover:bg-surface/50 rounded-full ml-1"
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
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-border/50 shadow-xl animate-slide-up">
            <div className="max-h-[80vh] overflow-y-auto py-4 px-4 space-y-4">
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>

                {!loading && (
                  user ? (
                    <>
                      {user.labels?.includes("admin") && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-danger hover:bg-danger/10 rounded-xl transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/builder"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 rounded-xl transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("nav.createTool")}
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("nav.dashboard")}
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.login")}
                    </Link>
                  )
                )}
              </div>

              <div className="h-px bg-border/50" />

              <div className="space-y-4">
                <div className="px-2 text-xs font-bold text-muted uppercase tracking-wider">
                  {t("nav.platforms")}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => (
                    <Link
                      key={platform.id}
                      href={`/${platform.id}`}
                      className="flex flex-col items-center gap-2 p-3 text-sm text-foreground bg-surface border border-border/50 hover:border-accent/50 rounded-xl transition-all active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlatformLogo platform={platform.id as any} size="md" />
                      <span className="font-medium text-xs">{platform.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
