"use client";

/**
 * ToolCard Component
 * Features: 016-hero-tool-search, 017-homepage-tools-feed
 *
 * Displays a single tool as a clickable card using HeroUI Card component.
 * Uses glass-card style consistent with the project's design system.
 *
 * Performance: Exported with React.memo for virtualized lists.
 */

import React from "react";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "./platform-logo";
import { PLATFORM_METADATA } from "@/lib/tools-index";
import { platformColors } from "@/lib/seo-metadata";
import type { OfficialTool } from "@/types/search";

interface ToolCardProps {
  tool: OfficialTool;
  showActionButton?: boolean; // Show "Use Tool →" button (default: true for homepage feed)
}

function ToolCardComponent({
  tool,
  showActionButton = true,
}: ToolCardProps) {
  const { t } = useLanguage();
  const platform = PLATFORM_METADATA[tool.platform];
  
  // Get platform color with fallback
  const platformColor = platformColors[tool.platform as keyof typeof platformColors] || "#6B7280";
  
  // Helper to check if color is dark (using luminance calculation)
  const isColorDark = (hexColor: string): boolean => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.3; // Only very dark colors like #000000
  };
  
  const isDarkColor = isColorDark(platformColor);

  return (
    <Link href={tool.href} className="block group h-full">
      <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
        <Card.Content className="p-3">
          <div className="flex items-center gap-3">
            {/* Platform Icon - Compact */}
            <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-300">
              <PlatformLogo
                platform={
                  tool.platform as
                    | "tiktok"
                    | "instagram"
                    | "twitter"
                    | "youtube"
                    | "reddit"
                    | "discord"
                    | "snapchat"
                    | "suno"
                    | "elevenlabs"
                    | "linkedin"
                    | "twitch"
                    | "kick"
                    | "spotify"
                    | "facebook"
                    | "pinterest"
                    | "bluesky"
                    | "telegram"
                    | "bereal"
                    | "medium"
                    | "etsy"
                    | "onlyfans"
                    | "patreon"
                    | "dating"
                    | "amazon"
                    | "forocoches"
                    | "podcast"
                    | "threads"
                    | "email"
                    | "ai-art"
                    | "whatsapp"
                    | "career"
                    | "seo"
                    | "marketing"
                }
                size="md"
              />
            </div>

            {/* Content - Compact hierarchy */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base leading-tight truncate">
                  {t(tool.nameKey) !== tool.nameKey ? t(tool.nameKey) : tool.name}
                </h3>
                
                {/* Featured Badge - subtle, only on hover */}
                {tool.featured && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Star className="w-3.5 h-3.5 text-primary fill-current" />
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted line-clamp-1 leading-snug mt-0.5">
                {t(tool.descriptionKey) !== tool.descriptionKey ? t(tool.descriptionKey) : tool.description}
              </p>
            </div>

            {/* Action Arrow - only visible on hover */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg 
                className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}

/**
 * Default export for direct usage (backward compatible)
 */
export default ToolCardComponent;

/**
 * Memoized export for virtualized lists (feature 017)
 */
export const ToolCard = React.memo(ToolCardComponent);

