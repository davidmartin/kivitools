"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tool {
  name: string;
  href: string;
}

interface ToolSelectorProps {
  platform: "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs" | "forocoches" | "linkedin";
}

const PLATFORM_TOOLS: Record<string, Tool[]> = {
  linkedin: [
    { name: "linkedinPost.title", href: "/linkedin/post-generator" },
    { name: "linkedinHeadline.title", href: "/linkedin/headline-generator" },
    { name: "linkedinAbout.title", href: "/linkedin/about-generator" },
  ],
  tiktok: [
    { name: "scriptWriter.title", href: "/tiktok/script-writer" },
    { name: "videoIdeas.title", href: "/tiktok/video-ideas" },
    { name: "hookGenerator.title", href: "/tiktok/hook-generator" },
    { name: "hashtagGenerator.title", href: "/tiktok/hashtag-generator" },
  ],
  instagram: [
    { name: "captionGenerator.title", href: "/instagram/caption-generator" },
    { name: "bioGenerator.title", href: "/instagram/bio-generator" },
    { name: "reelScript.title", href: "/instagram/reel-script" },
  ],
  twitter: [
    { name: "threadMaker.title", href: "/twitter/thread-maker" },
    { name: "twitterBio.title", href: "/twitter/bio-generator" },
    { name: "tweetGenerator.title", href: "/twitter/tweet-generator" },
  ],
  snapchat: [
    { name: "snapchatCaption.title", href: "/snapchat/caption-generator" },
    { name: "snapchatStoryIdeas.title", href: "/snapchat/story-ideas" },
    { name: "snapchatLensIdeas.title", href: "/snapchat/lens-ideas" },
  ],
  youtube: [
    { name: "youtubeScript.title", href: "/youtube/script-generator" },
    { name: "youtubeTitle.title", href: "/youtube/title-generator" },
    { name: "youtubeDescription.title", href: "/youtube/description-generator" },
  ],
  reddit: [
    { name: "redditPost.title", href: "/reddit/post-generator" },
    { name: "redditComment.title", href: "/reddit/comment-generator" },
    { name: "redditAMA.title", href: "/reddit/ama-questions" },
  ],
  discord: [
    { name: "discordAnnouncement.title", href: "/discord/announcement-generator" },
    { name: "discordWelcome.title", href: "/discord/welcome-message" },
    { name: "discordEvent.title", href: "/discord/event-description" },
  ],
  twitch: [
    { name: "twitchStreamTitle.title", href: "/twitch/stream-title" },
    { name: "twitchCommand.title", href: "/twitch/chat-command" },
    { name: "twitchPanel.title", href: "/twitch/panel-description" },
  ],
  suno: [
    { name: "sunoLyricGenerator.title", href: "/suno/lyric-generator" },
    { name: "sunoMusicPrompt.title", href: "/suno/music-prompt-generator" },
    { name: "sunoSongDescription.title", href: "/suno/song-description-generator" },
  ],
  elevenlabs: [
    { name: "voiceScriptWriter.title", href: "/elevenlabs/voice-script-writer" },
    { name: "videoVoiceoverScript.title", href: "/elevenlabs/video-voiceover-script" },
    { name: "voiceTextFormatter.title", href: "/elevenlabs/voice-text-formatter" },
  ],
  forocoches: [
    { name: "forocochesThread.title", href: "/forocoches/thread-generator" },
    { name: "forocochesPole.title", href: "/forocoches/pole-generator" },
    { name: "forocochesTroll.title", href: "/forocoches/troll-response" },
  ],
};

export default function ToolSelector({ platform }: ToolSelectorProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const tools = PLATFORM_TOOLS[platform];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tools.map((tool) => {
        const isActive = pathname === tool.href;
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-accent text-accent-foreground"
              : "bg-surface text-foreground hover:bg-accent/10 border border-border"
              }`}
          >
            {t(tool.name)}
          </Link>
        );
      })}
    </div>
  );
}
