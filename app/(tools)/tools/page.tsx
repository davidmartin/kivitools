"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTools } from "@/contexts/ToolsContext";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { PLATFORMS, PLATFORM_METADATA } from "@/lib/tools-index";
import { ToolCard } from "@/app/components/tool-card";
import { Select, Label, ListBox } from "@heroui/react";
import type { Platform, SortOption } from "@/types";
import type { Selection } from "@react-types/shared";
import PlatformLogo from "@/app/components/platform-logo";
import { Search, X, Globe } from "lucide-react";

// Available languages for filtering
const TOOL_LANGUAGES = [
  { value: "all", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
] as const;

const INITIAL_DISPLAY_COUNT = 30;
const LOAD_MORE_COUNT = 30;

function ToolsPageContent() {
  const { t, language: uiLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get tools from Appwrite
  const { tools: appwriteTools, loading: toolsLoading } = useTools();

  // ============================================================================
  // URL State Management
  // ============================================================================

  const platformsParam = searchParams.get("platform") || "";
  const selectedPlatforms = useMemo(() => {
    if (!platformsParam || platformsParam === "all") return new Set<string>();
    return new Set(platformsParam.split(",").filter(Boolean));
  }, [platformsParam]);
  
  const sortParam = (searchParams.get("sort") as SortOption) || "newest";
  const searchQuery = searchParams.get("q") || "";
  
  // Language filter - use user's UI language by default if no param in URL
  // If user explicitly selects "all", the URL will have ?lang=all
  const langFromUrl = searchParams.get("lang");
  const languageParam = langFromUrl !== null ? langFromUrl : uiLanguage;

  // ============================================================================
  // Local State
  // ============================================================================

  const [search, setSearch] = useState(searchQuery);
  const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [platformSelection, setPlatformSelection] = useState<Selection>(selectedPlatforms);
  const [sortSelection, setSortSelection] = useState<Selection>(new Set([sortParam]));
  const [languageSelection, setLanguageSelection] = useState<Selection>(new Set([languageParam]));
  
  const debouncedSearch = useDebounce(search, 300);

  // Sync selection state with URL params
  useEffect(() => {
    setPlatformSelection(selectedPlatforms);
  }, [selectedPlatforms]);

  useEffect(() => {
    setSortSelection(new Set([sortParam]));
  }, [sortParam]);

  useEffect(() => {
    setLanguageSelection(new Set([languageParam]));
  }, [languageParam]);

  // ============================================================================
  // Convert Appwrite tools to display format
  // ============================================================================
  
  const toolsForDisplay = useMemo(() => {
    return appwriteTools.map((tool) => ({
      id: tool.$id,
      name: tool.name,
      nameKey: tool.name, // Use name as fallback for translation key
      description: tool.description,
      descriptionKey: tool.description, // Use description as fallback
      platform: tool.platform as Platform,
      href: `/${tool.platform}/${tool.slug}-${tool.$id}`,
      icon: tool.icon || "🛠️",
      dateAdded: tool.$createdAt,
      language: tool.language || "en",
      featured: false,
      popularity: 50,
      tags: [] as string[], // Empty tags for community tools
    }));
  }, [appwriteTools]);

  // ============================================================================
  // Filtering & Sorting Logic
  // ============================================================================

  const filteredTools = useMemo(() => {
    let result = [...toolsForDisplay];

    // Language filter
    if (languageParam && languageParam !== "all") {
      result = result.filter((tool) => tool.language === languageParam);
    }

    // Platform filter (multiple selection)
    if (selectedPlatforms.size > 0) {
      result = result.filter((tool) => selectedPlatforms.has(tool.platform));
    }

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortParam) {
      case "featured":
        return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "newest":
        return result.sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));
      case "popular":
        return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "a-z":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [toolsForDisplay, selectedPlatforms, debouncedSearch, sortParam, languageParam]);

  const displayedTools = filteredTools.slice(0, displayedCount);

  // ============================================================================
  // Effects
  // ============================================================================

  // Initial load - track both local and tools loading
  useEffect(() => {
    if (!toolsLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [toolsLoading]);

  // ============================================================================
  // Infinite Scroll Effect
  // ============================================================================

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        displayedCount < filteredTools.length &&
        !isLoading
      ) {
        setIsLoading(true);
        setDisplayedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredTools.length));
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedCount, filteredTools.length, isLoading]);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(INITIAL_DISPLAY_COUNT);
    window.scrollTo(0, 0);
  }, [selectedPlatforms, debouncedSearch, sortParam, languageParam]);

  // Sync search input with URL
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // PageDown: Load more tools
      if (e.key === "PageDown" && displayedCount < filteredTools.length) {
        e.preventDefault();
        setDisplayedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredTools.length));
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
      // PageUp: Scroll up
      if (e.key === "PageUp") {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      }
      // Ctrl/Cmd + Home: Scroll to top
      if ((e.ctrlKey || e.metaKey) && e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Ctrl/Cmd + End: Load all and scroll to bottom
      if ((e.ctrlKey || e.metaKey) && e.key === "End") {
        e.preventDefault();
        setDisplayedCount(filteredTools.length);
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayedCount, filteredTools.length]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", value.trim());
      router.push(`/tools?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      router.push(`/tools?${params.toString()}`);
    }
  };

  const handlePlatformChange = (selection: Selection) => {
    setPlatformSelection(selection);
    const params = new URLSearchParams(searchParams.toString());
    
    if (selection === "all" || (selection instanceof Set && selection.size === 0)) {
      params.delete("platform");
    } else if (selection instanceof Set) {
      params.set("platform", Array.from(selection).join(","));
    }
    router.push(`/tools?${params.toString()}`);
  };

  const handleSortChange = (selection: Selection) => {
    setSortSelection(selection);
    const key = selection instanceof Set ? Array.from(selection)[0] as SortOption : sortParam;
    if (key) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", key);
      router.push(`/tools?${params.toString()}`);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setPlatformSelection(new Set());
    setLanguageSelection(new Set([uiLanguage])); // Reset to user's language
    router.push(`/tools`);
  };

  const handleLanguageChange = (selection: Selection) => {
    setLanguageSelection(selection);
    const key = selection instanceof Set ? Array.from(selection)[0] as string : languageParam;
    if (key) {
      const params = new URLSearchParams(searchParams.toString());
      if (key === "all") {
        params.delete("lang");
      } else {
        params.set("lang", key);
      }
      router.push(`/tools?${params.toString()}`);
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8" aria-busy={isLoading}>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight">
                {t("toolsPage.title")}
              </h1>
              <p className="text-lg text-muted max-w-2xl">
                {t("toolsPage.description")}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="text-4xl md:text-5xl font-bold text-accent">
                {filteredTools.length}
              </div>
              <div className="text-sm text-muted">
                {filteredTools.length === 1 
                  ? t("toolsPage.toolsCountSingular").replace("{count}", "").trim()
                  : t("toolsPage.toolsCount").replace("{count}", "").trim()}
              </div>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("toolsPage.filters.searchPlaceholder")}
                className="w-full pl-12 pr-4 py-3.5 text-sm text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 placeholder:text-muted/70 transition-all input"
              />
            </div>

            {/* Filters Row: Platform Selector + Sort */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              {/* Platform Multi-Selector */}
              <div>
                <Label>{t("toolsPage.filters.platform")}</Label>
                <Select
                  selectedKey={
                    selectedPlatforms.size === 0
                      ? "all"
                      : selectedPlatforms.size === 1
                      ? Array.from(selectedPlatforms)[0]
                      : "multiple"
                  }
                  onSelectionChange={(key) => {
                    if (key === "all" || key === "multiple" || key === null) {
                      handlePlatformChange(new Set());
                    } else {
                      handlePlatformChange(new Set([key as string]));
                    }
                  }}
                  className="w-full min-w-[200px]"
                  placeholder={t("toolsPage.filters.all")}
                >
                  <Select.Trigger>
                    <Select.Value>
                      {selectedPlatforms.size === 0
                        ? t("toolsPage.filters.all")
                        : selectedPlatforms.size === 1
                        ? PLATFORM_METADATA[Array.from(selectedPlatforms)[0] as Platform]?.name
                        : `${selectedPlatforms.size} ${t("toolsPage.filters.platform").toLowerCase()}`}
                    </Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item key="all" id="all" textValue={t("toolsPage.filters.all")}>
                        <div className="flex items-center gap-2">
                          <span>{t("toolsPage.filters.all")}</span>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      {PLATFORMS.map((platformKey) => {
                        const metadata = PLATFORM_METADATA[platformKey];
                        if (!metadata) return null;
                        return (
                          <ListBox.Item key={platformKey} id={platformKey} textValue={metadata.name}>
                            <div className="flex items-center gap-2">
                              <PlatformLogo platform={platformKey} size="sm" />
                              <span>{metadata.name}</span>
                            </div>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        );
                      })}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Language Selector */}
              <div>
                <Label>{t("toolsPage.filters.language")}</Label>
                <Select
                  selectedKey={languageParam}
                  onSelectionChange={(key) => {
                    if (key) {
                      handleLanguageChange(new Set([key as string]));
                    }
                  }}
                  className="w-full min-w-[180px]"
                  placeholder={t("toolsPage.filters.allLanguages")}
                >
                  <Select.Trigger>
                    <Select.Value>
                      {TOOL_LANGUAGES.find(l => l.value === languageParam)?.label || t("toolsPage.filters.allLanguages")}
                    </Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {TOOL_LANGUAGES.map((lang) => (
                        <ListBox.Item key={lang.value} id={lang.value} textValue={lang.label}>
                          <span>{lang.label}</span>
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Sort Selector */}
              <Select placeholder={t("toolsPage.sort.label")} defaultSelectedKey="featured">
                <Label>{t("toolsPage.sort.label")}</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox
                    selectedKeys={sortSelection}
                    onSelectionChange={handleSortChange}
                  >
                    <ListBox.Item key="featured" id="featured" textValue={t("toolsPage.sort.featured")}>
                      {t("toolsPage.sort.featured")}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item key="newest" id="newest" textValue={t("toolsPage.sort.newest")}>
                      {t("toolsPage.sort.newest")}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item key="popular" id="popular" textValue={t("toolsPage.sort.popular")}>
                      {t("toolsPage.sort.popular")}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item key="a-z" id="a-z" textValue="A-Z">
                      A-Z
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {isInitialLoad || toolsLoading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 gap-4 mb-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl p-3 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted/20 rounded-full shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-muted/20 rounded w-1/3 mb-1"></div>
                    <div className="h-3 bg-muted/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTools.length > 0 ? (
          <>
            <div 
              className="grid grid-cols-1 gap-4 mb-8"
              role="feed"
              aria-label="Tools feed"
              aria-busy={isLoading}
            >
              {displayedTools.map((tool, index) => (
                <div
                  key={tool.id}
                  role="article"
                  aria-posinset={index + 1}
                  aria-setsize={filteredTools.length}
                  aria-label={`${tool.name} - ${tool.description}`}
                >
                  <ToolCard 
                    tool={tool} 
                    showActionButton={false} 
                  />
                </div>
              ))}
            </div>

            {/* Screen Reader Announcements */}
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {isLoading && t("toolsPage.loadingMore")}
              {!isLoading && displayedCount > INITIAL_DISPLAY_COUNT && 
                t("toolsPage.loadedCount").replace("{count}", String(displayedCount)).replace("{total}", String(filteredTools.length))
              }
            </div>

            {/* Load More Indicator */}
            {displayedCount < filteredTools.length && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-full">
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted">{t("toolsPage.loadingMore")}</span>
                </div>
              </div>
            )}

            {/* End of Feed */}
            {displayedCount >= filteredTools.length && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-success-soft text-success-soft-foreground rounded-2xl shadow-sm">
                  <div className="text-left">
                    <div className="font-bold">
                      {t("toolsPage.endOfFeedTitle")}
                    </div>
                    <div className="text-sm opacity-80">
                      {t("toolsPage.toolsCount").replace("{count}", String(filteredTools.length))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results State */
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold text-foreground mb-3">
              {t("toolsPage.noResults")}
            </h3>
            <p className="text-lg text-muted mb-8 max-w-md mx-auto">
              {t("toolsPage.noResultsDesc")}
            </p>
            <button
              onClick={() => router.push("/tools")}
              className="px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
            >
              {t("toolsPage.clearFilters")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolsPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-12 bg-muted/20 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-6 bg-muted/20 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-xl p-3 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/20 rounded-full shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-muted/20 rounded w-1/3 mb-1"></div>
                  <div className="h-3 bg-muted/20 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsPageLoading />}>
      <ToolsPageContent />
    </Suspense>
  );
}
