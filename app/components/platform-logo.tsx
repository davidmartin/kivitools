import Image from "next/image";
import type { Platform } from "@/types";

interface PlatformLogoProps {
  platform: Platform;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

// Fixed sizes to prevent CLS
const sizeConfig = {
  sm: { container: "w-5 h-5", width: 14, height: 14, padding: "p-1" },
  md: { container: "w-6 h-6", width: 16, height: 16, padding: "p-1" },
  lg: { container: "w-20 h-20", width: 48, height: 48, padding: "p-4" },
  xl: { container: "w-24 h-24", width: 56, height: 56, padding: "p-5" },
};

const NEEDS_INVERT = new Set([
  "twitter", "suno", "elevenlabs", "amazon", "threads", "kick", 
  "bereal", "podcast", "email", "medium", "onlyfans", "dating", 
  "ai-art", "career", "seo", "marketing", "content", "presentation", "voice"
]);

export default function PlatformLogo({ 
  platform, 
  size = "md", 
  className = "",
  priority = false 
}: PlatformLogoProps) {
  const config = sizeConfig[size];
  const needsInvert = NEEDS_INVERT.has(platform);
  const isLarge = size === "lg" || size === "xl";

  return (
    <div
      className={`${config.container} rounded${isLarge ? "-2xl" : ""} bg-white dark:bg-gray-900 ${config.padding} flex items-center justify-center ${isLarge ? "shadow-lg" : ""} ${className}`}
      // Reserve space to prevent CLS
      style={{ minWidth: config.width + (isLarge ? 32 : 8), minHeight: config.height + (isLarge ? 32 : 8) }}
    >
      <Image
        src={`/platforms/${platform}.svg`}
        alt={`${platform} logo`}
        width={config.width}
        height={config.height}
        className={`object-contain ${needsInvert ? "dark:invert" : ""}`}
        // Priority loading for above-fold images
        priority={priority}
        // Prevent layout shift
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
