import Image from "next/image";

interface PlatformBadgeProps {
  platform: string;
  text?: string;
  className?: string;
}

const platformConfig: Record<string, { bg: string; text: string; name: string }> = {
  tiktok: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    name: "TikTok",
  },
  instagram: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
    name: "Instagram",
  },
  twitter: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "Twitter",
  },
  snapchat: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400",
    name: "Snapchat",
  },
  youtube: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    name: "YouTube",
  },
  reddit: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    name: "Reddit",
  },
  discord: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-600 dark:text-indigo-400",
    name: "Discord",
  },
  twitch: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    name: "Twitch",
  },
  suno: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    name: "Suno",
  },
  "ai-art": {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
    name: "AI Art",
  },
  career: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
    name: "Career",
  },
  content: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-600 dark:text-cyan-400",
    name: "Content",
  },
  email: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "Email",
  },
  marketing: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-600 dark:text-rose-400",
    name: "Marketing",
  },
  presentation: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    name: "Presentation",
  },
  seo: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    name: "SEO",
  },
  voice: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    name: "Voice",
  },
  linkedin: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "LinkedIn",
  },
  facebook: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "Facebook",
  },
  whatsapp: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    name: "WhatsApp",
  },
  telegram: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-600 dark:text-sky-400",
    name: "Telegram",
  },
  pinterest: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    name: "Pinterest",
  },
  spotify: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    name: "Spotify",
  },
  medium: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-600 dark:text-gray-400",
    name: "Medium",
  },
  wordpress: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "WordPress",
  },
  shopify: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    name: "Shopify",
  },
  etsy: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    name: "Etsy",
  },
  amazon: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    name: "Amazon",
  },
  elevenlabs: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-600 dark:text-indigo-400",
    name: "ElevenLabs",
  },
  threads: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-600 dark:text-gray-400",
    name: "Threads",
  },
  bluesky: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-600 dark:text-sky-400",
    name: "Bluesky",
  },
  mastodon: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    name: "Mastodon",
  },
  kick: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    name: "Kick",
  },
  vimeo: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "Vimeo",
  },
  patreon: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    name: "Patreon",
  },
  onlyfans: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-600 dark:text-sky-400",
    name: "OnlyFans",
  },
  bereal: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-600 dark:text-gray-400",
    name: "BeReal",
  },
  dating: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
    name: "Dating",
  },
  podcast: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    name: "Podcast",
  },
  forocoches: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    name: "Forocoches",
  },
};

// Default config for unknown platforms
const defaultConfig = {
  bg: "bg-gray-100 dark:bg-gray-900/30",
  text: "text-gray-600 dark:text-gray-400",
  name: "Tool",
};

export default function PlatformBadge({ platform, text, className = "" }: PlatformBadgeProps) {
  const config = platformConfig[platform] || defaultConfig;
  const needsInvert = platform === "twitter" || platform === "suno" || platform === "threads" || platform === "medium";
  const displayText = text || `${config.name} Tool`;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 ${config.bg} ${config.text} rounded-full text-sm font-semibold ${className}`}
    >
      <div className="w-4 h-4 rounded flex items-center justify-center bg-white dark:bg-gray-800 p-0.5">
        <Image
          src={`/platforms/${platform}.svg`}
          alt={`${config.name} logo`}
          width={12}
          height={12}
          className={`object-contain ${needsInvert ? "dark:invert" : ""}`}
        />
      </div>
      <span>{displayText}</span>
    </div>
  );
}
