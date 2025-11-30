"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tool {
  name: string;
  href: string;
}

interface ToolSelectorProps {
  platform: "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs" | "forocoches" | "linkedin" | "amazon" | "pinterest" | "spotify" | "facebook" | "threads" | "bluesky" | "lemon8" | "kick" | "telegram" | "bereal" | "podcast" | "email" | "dating" | "medium" | "etsy" | "onlyfans" | "patreon";
}

const PLATFORM_TOOLS: Record<string, Tool[]> = {
  amazon: [
    { name: "productDescriptionGenerator.title", href: "/amazon/product-description-generator" },
    { name: "productReviewGenerator.title", href: "/amazon/product-review-generator" },
    { name: "productComparisonGenerator.title", href: "/amazon/product-comparison-generator" },
  ],
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
    { name: "instagramEngagementCalculator.title", href: "/instagram/engagement-calculator" },
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
    { name: "youtubeTagGenerator.title", href: "/youtube/tag-generator" },
    { name: "youtubeVideoIdeas.title", href: "/youtube/video-ideas" },
    { name: "youtubeCommunityPost.title", href: "/youtube/community-post-generator" },
    { name: "youtubeChannelNameGenerator.title", href: "/youtube/channel-name-generator" },
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
    { name: "sunoPromptGenerator.title", href: "/suno/prompt-generator" },
    { name: "sunoDescriptionGenerator.title", href: "/suno/description-generator" },
    { name: "sunoSongTitleGenerator.title", href: "/suno/song-title-generator" },
    { name: "sunoSongTagGenerator.title", href: "/suno/song-tag-generator" },
    { name: "sunoAlbumNameGenerator.title", href: "/suno/album-name-generator" },
    { name: "sunoCoverArtPromptGenerator.title", href: "/suno/cover-art-prompt-generator" },
    { name: "sunoRemixIdeaGenerator.title", href: "/suno/remix-idea-generator" },
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
  pinterest: [
    { name: "pinterestPinDescription.title", href: "/pinterest/pin-description" },
    { name: "pinterestBoardName.title", href: "/pinterest/board-name" },
    { name: "pinterestProfileBio.title", href: "/pinterest/profile-bio" },
  ],
  spotify: [
    { name: "spotifyPlaylistName.title", href: "/spotify/playlist-name" },
    { name: "spotifyPlaylistDescription.title", href: "/spotify/playlist-description" },
    { name: "spotifyArtistBio.title", href: "/spotify/artist-bio" },
  ],
  facebook: [
    { name: "facebookPost.title", href: "/facebook/post-generator" },
    { name: "facebookPageBio.title", href: "/facebook/page-bio" },
    { name: "facebookAdCopy.title", href: "/facebook/ad-copy" },
  ],
  threads: [],
  bluesky: [
    { name: "blueskyPostGenerator.title", href: "/bluesky/post-generator" },
    { name: "blueskyBioGenerator.title", href: "/bluesky/bio-generator" },
    { name: "blueskyThreadComposer.title", href: "/bluesky/thread-composer" },
  ],
  lemon8: [
    { name: "lemon8CaptionGenerator.title", href: "/lemon8/caption-generator" },
    { name: "lemon8ContentIdeas.title", href: "/lemon8/content-ideas" },
    { name: "lemon8BioGenerator.title", href: "/lemon8/bio-generator" },
  ],
  kick: [
    { name: "kickStreamTitle.title", href: "/kick/stream-title" },
    { name: "kickBioGenerator.title", href: "/kick/bio-generator" },
    { name: "kickChatRules.title", href: "/kick/chat-rules" },
  ],
  telegram: [
    { name: "telegramAnnouncement.title", href: "/telegram/announcement-generator" },
    { name: "telegramChannelDescription.title", href: "/telegram/channel-description" },
    { name: "telegramWelcomeMessage.title", href: "/telegram/welcome-message" },
  ],
  bereal: [
    { name: "berealCaptionGenerator.title", href: "/bereal/caption-generator" },
    { name: "berealBioGenerator.title", href: "/bereal/bio-generator" },
    { name: "berealRealmojiIdeas.title", href: "/bereal/realmoji-ideas" },
  ],
  podcast: [
    { name: "podcastNameGenerator.title", href: "/podcast/name-generator" },
    { name: "podcastDescriptionGenerator.title", href: "/podcast/description-generator" },
    { name: "podcastEpisodeTitleGenerator.title", href: "/podcast/episode-title-generator" },
  ],
  email: [
    { name: "emailSubjectGenerator.title", href: "/email/subject-generator" },
    { name: "emailNewsletterGenerator.title", href: "/email/newsletter-generator" },
    { name: "emailSignatureGenerator.title", href: "/email/signature-generator" },
  ],
  dating: [
    { name: "datingBioGenerator.title", href: "/dating/bio-generator" },
    { name: "datingOpenerGenerator.title", href: "/dating/opener-generator" },
    { name: "datingProfileReview.title", href: "/dating/profile-review" },
  ],
  medium: [
    { name: "mediumArticleTitle.title", href: "/medium/article-title-generator" },
    { name: "mediumArticleIntro.title", href: "/medium/article-intro-generator" },
    { name: "mediumBio.title", href: "/medium/bio-generator" },
  ],
  etsy: [
    { name: "etsyProductTitle.title", href: "/etsy/product-title-generator" },
    { name: "etsyProductDescription.title", href: "/etsy/product-description-generator" },
    { name: "etsyShopAnnouncement.title", href: "/etsy/shop-announcement-generator" },
  ],
  onlyfans: [
    { name: "onlyfansBio.title", href: "/onlyfans/bio-generator" },
    { name: "onlyfansPostCaption.title", href: "/onlyfans/post-caption-generator" },
    { name: "onlyfansPromo.title", href: "/onlyfans/promo-generator" },
  ],
  patreon: [
    { name: "patreonTierDescription.title", href: "/patreon/tier-description-generator" },
    { name: "patreonAboutPage.title", href: "/patreon/about-page-generator" },
    { name: "patreonPost.title", href: "/patreon/post-generator" },
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
