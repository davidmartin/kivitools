"use client";

/**
 * CreateToolCTA Component
 * Feature: 016-hero-tool-search
 *
 * Call-to-action component that appears when search returns few/no results.
 * Links to the tool builder with the search query pre-filled.
 */

import { CreateToolCTAProps } from "@/types/search";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@heroui/react";

export default function CreateToolCTA({
  query,
  isProminent,
  onClick,
}: CreateToolCTAProps) {
  const { t } = useLanguage();

  // Prominent CTA when <3 results
  if (isProminent) {
    return (
      <div className="px-4 py-4 border-t border-border bg-accent/5">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted">
            {t("search.createToolCtaFew")
              .replace("{count}", "few")
              .replace("{query}", query)}
          </p>
          <Button
            onPress={onClick}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            <span className="mr-2">🚀</span>
            {t("search.createTool")}
          </Button>
        </div>
      </div>
    );
  }

  // Subtle CTA at end of results list
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full px-4 py-3 text-left
        border-t border-border
        hover:bg-surface transition-colors
        flex items-center gap-3
      "
    >
      <span className="text-xl" aria-hidden="true">
        ✨
      </span>
      <div className="flex-1">
        <span className="text-sm font-medium text-accent">
          {t("search.createTool")}
        </span>
        <p className="text-xs text-muted">
          {t("search.createToolPrompt")}
        </p>
      </div>
    </button>
  );
}
