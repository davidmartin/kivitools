import Image from "next/image";

interface PlatformBadgeProps {
  platform: "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" | "reddit" | "discord" | "twitch" | "suno";
  text?: string;
  className?: string;
}

const platformConfig = {
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
};

export default function PlatformBadge({ platform, text, className = "" }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const needsInvert = platform === "twitter" || platform === "suno";
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
