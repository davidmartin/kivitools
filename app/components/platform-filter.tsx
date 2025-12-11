"use client";

import { Chip, Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PLATFORM_METADATA, getToolsByPlatform, getAllPlatforms } from "@/lib/tools-index";
import type { SortOption } from "@/app/hooks/use-filter-state";

interface PlatformFilterProps {
  platform: string | null;
  sort: SortOption;
  onPlatformChange: (platform: string | null) => void;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: SortOption[] = ["featured", "popular", "new", "all"];

export default function PlatformFilter({
  platform,
  sort,
  onPlatformChange,
  onSortChange,
}: PlatformFilterProps) {
  const { t } = useLanguage();
  const platforms = getAllPlatforms();

  return (
    <div className="space-y-4">
      {/* Sort Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {SORT_OPTIONS.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={sort === option ? "secondary" : "ghost"}
            onPress={() => onSortChange(option)}
            className="shrink-0"
          >
            {t(`home.feed.filter.${option}`)}
          </Button>
        ))}
      </div>

      {/* Platform Chips (mobile only - sidebar on desktop) */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Chip
          variant={platform === null ? "primary" : "soft"}
          className="cursor-pointer shrink-0"
          onClick={() => onPlatformChange(null)}
        >
          {t("home.feed.platforms.all")}
        </Chip>
        {platforms.map((p) => {
          const meta = PLATFORM_METADATA[p];
          const count = getToolsByPlatform(p).length;
          return (
            <Chip
              key={p}
              variant={platform === p ? "primary" : "soft"}
              className="cursor-pointer shrink-0"
              onClick={() => onPlatformChange(p)}
            >
              {meta?.icon} {meta?.name} ({count})
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
