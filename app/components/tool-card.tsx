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

  return (
    <Link href={tool.href} className="block group h-full">
      <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
        <Card.Content className="p-5">
          <div className="flex items-start gap-4">
            {/* Platform Icon */}
            <div className="shrink-0 transform group-hover:scale-110 transition-transform duration-300">
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
                }
                size="md"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-bold text-foreground group-hover:text-primary truncate transition-colors text-lg">
                  {t(tool.nameKey)}
                </h3>
                
                {/* Featured Badge */}
                {tool.featured && (
                  <Chip
                    size="sm"
                    variant="soft"
                    className="shrink-0 bg-primary/10 text-primary border-primary/20"
                  >
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {t("common.featured")}
                  </Chip>
                )}
              </div>
              
              {/* Platform Chip */}
              <div className="mb-2">
                <Chip size="sm" variant="soft" className="bg-white/10 text-muted border-white/10">
                  {platform?.name || tool.platform}
                </Chip>
              </div>
              
              <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                {t(tool.descriptionKey)}
              </p>
            </div>

            {/* Action - optional, hidden on mobile */}
            {showActionButton && (
              <div className="shrink-0 hidden sm:flex items-center">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted group-hover:text-primary group-hover:bg-primary/10 transition-all"
                >
                  {t("home.feed.card.useTool")}
                  <svg 
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}
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

