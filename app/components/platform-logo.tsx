import Image from "next/image";
import type { Platform } from "@/types";

interface PlatformLogoProps {
  platform: Platform;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeConfig = {
  sm: { container: "w-5 h-5", image: 14, padding: "p-1" },
  md: { container: "w-6 h-6", image: 16, padding: "p-1" },
  lg: { container: "w-20 h-20", image: 48, padding: "p-4" },
  xl: { container: "w-24 h-24", image: 56, padding: "p-5" },
};

export default function PlatformLogo({ platform, size = "md", className = "" }: PlatformLogoProps) {
  const config = sizeConfig[size];
  const needsInvert = platform === "twitter" || platform === "suno" || platform === "elevenlabs" || platform === "amazon" || platform === "threads" || platform === "kick" || platform === "bereal" || platform === "podcast" || platform === "email" || platform === "medium" || platform === "onlyfans" || platform === "dating" || platform === "ai-art" || platform === "career" || platform === "seo" || platform === "marketing" || platform === "content" || platform === "presentation" || platform === "voice";

  return (
    <div
      className={`${config.container} rounded${size === "lg" || size === "xl" ? "-2xl" : ""} bg-white dark:bg-gray-900 ${config.padding} flex items-center justify-center ${size === "lg" || size === "xl" ? "shadow-lg" : ""} ${className}`}
    >
      <Image
        src={`/platforms/${platform}.svg`}
        alt={`${platform} logo`}
        width={config.image}
        height={config.image}
        className={`object-contain ${needsInvert ? "dark:invert" : ""}`}
      />
    </div>
  );
}
