"use client";

/**
 * SearchResultItem Component
 * Feature: 016-hero-tool-search
 *
 * Displays a single search result in the dropdown list.
 * Shows tool name, description, platform badge, and author (for community tools).
 */

import { SearchResultItemProps } from "@/types/search";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPlatformMetadata } from "@/lib/search-utils";

export default function SearchResultItem({
  result,
  isSelected,
  onClick,
}: SearchResultItemProps) {
  const { t } = useLanguage();
  const platformMeta = getPlatformMetadata(result.platform);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full px-4 py-3 min-h-12 text-left transition-colors
        flex items-start gap-3
        ${isSelected
          ? "bg-accent/10 border-l-2 border-accent"
          : "hover:bg-surface border-l-2 border-transparent"
        }
      `}
      role="option"
      aria-selected={isSelected}
    >
      {/* Platform Icon */}
      <span className="text-xl mt-0.5 shrink-0" aria-hidden="true">
        {result.icon || platformMeta.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Tool Name + Type Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground truncate">
            {result.name}
          </span>
          
          {/* Type Badge */}
          <span
            className={`
              inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded
              ${result.type === "official"
                ? "bg-accent/20 text-accent"
                : "bg-surface text-muted"
              }
            `}
          >
            {result.type === "official"
              ? t("search.official")
              : t("search.community")
            }
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted truncate mt-0.5">
          {result.description}
        </p>

        {/* Author (for community tools) */}
        {result.type === "community" && result.authorName && (
          <p className="text-xs text-muted/70 mt-1">
            {t("search.by")} {result.authorName}
          </p>
        )}
      </div>

      {/* Platform Badge */}
      <span
        className={`
          shrink-0 px-2 py-0.5 text-xs font-medium rounded
          bg-${platformMeta.color}-100 text-${platformMeta.color}-700
          dark:bg-${platformMeta.color}-900/30 dark:text-${platformMeta.color}-300
        `}
      >
        {platformMeta.name}
      </span>
    </button>
  );
}
