"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { OFFICIAL_TOOLS, PLATFORM_METADATA, getAllPlatforms, getToolsByPlatform } from "@/lib/tools-index";
import { useFilterState, type SortOption } from "@/app/hooks/use-filter-state";
import ToolCard from "./tool-card";
import PlatformFilter from "./platform-filter";
import PlatformLogo from "./platform-logo";

// Featured tools order - top tools to show first when "Featured" sort is selected
const FEATURED_ORDER = [
  "tiktok-script-writer",
  "instagram-bio-generator",
  "youtube-title-generator",
  "tiktok-money-calculator",
  "instagram-caption-generator",
  "tiktok-video-ideas",
  "twitter-thread-maker",
  "youtube-description-generator",
  "tiktok-hook-generator",
  "instagram-hashtag-generator",
  "youtube-tags-generator",
  "tiktok-username-generator",
  "linkedin-post-generator",
  "discord-server-description",
  "reddit-post-generator",
];

export default function ToolsFeed() {
  const { t } = useLanguage();
  const { filterState, setFilter } = useFilterState();
  const platforms = getAllPlatforms();
  
  // Local search state for debouncing
  const [localSearch, setLocalSearch] = useState(filterState.search);
  
  // Sync local search with URL param
  useEffect(() => {
    setLocalSearch(filterState.search);
  }, [filterState.search]);
  
  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filterState.search) {
        setFilter({ search: localSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, filterState.search, setFilter]);

  const filteredTools = useMemo(() => {
    let result = [...OFFICIAL_TOOLS];

    // Platform filter
    if (filterState.platform) {
      result = result.filter((tool) => tool.platform === filterState.platform);
    }

    // Search filter
    if (filterState.search.trim()) {
      const query = filterState.search.toLowerCase();
      result = result.filter((tool) => {
        const name = t(tool.nameKey).toLowerCase();
        const desc = t(tool.descriptionKey).toLowerCase();
        return name.includes(query) || desc.includes(query);
      });
    }

    // Sort
    switch (filterState.sort) {
      case "featured":
        result.sort((a, b) => {
          const aIdx = FEATURED_ORDER.indexOf(a.id);
          const bIdx = FEATURED_ORDER.indexOf(b.id);
          if (aIdx === -1 && bIdx === -1) return 0;
          if (aIdx === -1) return 1;
          if (bIdx === -1) return -1;
          return aIdx - bIdx;
        });
        break;
      case "new":
        // Reverse order (newest = last added to array)
        result.reverse();
        break;
      case "popular":
        // Use featured order as popularity proxy for now
        result.sort((a, b) => {
          const aIdx = FEATURED_ORDER.indexOf(a.id);
          const bIdx = FEATURED_ORDER.indexOf(b.id);
          if (aIdx === -1 && bIdx === -1) return 0;
          if (aIdx === -1) return 1;
          if (bIdx === -1) return -1;
          return aIdx - bIdx;
        });
        break;
      default:
        // "all" = Alphabetical by translated name
        result.sort((a, b) => t(a.nameKey).localeCompare(t(b.nameKey)));
    }

    return result;
  }, [filterState, t]);

  const handlePlatformChange = useCallback((p: string | null) => {
    setFilter({ platform: p });
  }, [setFilter]);

  const handleSortChange = useCallback((s: SortOption) => {
    setFilter({ sort: s });
  }, [setFilter]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Simple Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {t("home.feed.title")}
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">{t("home.feed.description")}</p>
      </div>

      <div className="lg:flex lg:gap-8">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-4">
            <h2 className="font-semibold text-foreground mb-4">
              {t("home.feed.platforms.title")}
            </h2>
            <nav className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <button
                onClick={() => handlePlatformChange(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  filterState.platform === null
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-surface text-foreground"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center text-sm">🌐</span>
                <span className="flex-1 truncate">{t("home.feed.platforms.all")}</span>
                <span className="text-muted text-sm">({OFFICIAL_TOOLS.length})</span>
              </button>
              {platforms.map((p) => {
                const meta = PLATFORM_METADATA[p];
                const count = getToolsByPlatform(p).length;
                const isPlatformLogoSupported = ["tiktok", "instagram", "twitter", "snapchat", "youtube", "reddit", "discord", "twitch", "suno", "elevenlabs", "linkedin", "forocoches", "amazon", "pinterest", "spotify", "facebook", "threads", "bluesky", "kick", "telegram", "bereal", "podcast", "email", "dating", "medium", "etsy", "onlyfans", "patreon"].includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => handlePlatformChange(p)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      filterState.platform === p
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-surface text-foreground"
                    }`}
                  >
                    {isPlatformLogoSupported ? (
                      <PlatformLogo platform={p as "tiktok" | "instagram" | "twitter" | "youtube" | "reddit" | "discord" | "snapchat" | "suno" | "elevenlabs" | "linkedin" | "twitch" | "kick" | "spotify" | "facebook" | "pinterest" | "bluesky" | "telegram" | "bereal" | "medium" | "etsy" | "onlyfans" | "patreon" | "dating" | "amazon" | "forocoches" | "podcast" | "threads" | "email"} size="sm" />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-sm">{meta?.icon}</span>
                    )}
                    <span className="flex-1 truncate">{meta?.name}</span>
                    <span className="text-muted text-sm">({count})</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <PlatformFilter
            platform={filterState.platform}
            sort={filterState.sort}
            onPlatformChange={handlePlatformChange}
            onSortChange={handleSortChange}
          />

          {/* Tools Count */}
          <p className="text-sm text-muted my-4">
            {t("home.feed.count").replace("{count}", String(filteredTools.length))}
          </p>

          {/* Tools List */}
          {filteredTools.length > 0 ? (
            <div className="space-y-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium text-foreground mb-2">
                {t("home.feed.empty.title")}
              </p>
              <p className="text-muted max-w-md mx-auto">
                {t("home.feed.empty.description")}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
