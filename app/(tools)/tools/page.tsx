"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { OFFICIAL_TOOLS, PLATFORMS, PLATFORM_METADATA } from "@/lib/tools-index";
import { ToolCard } from "@/app/components/tool-card";
import { Select, Label, ListBox, ComboBox, Input } from "@heroui/react";
import type { Platform, SortOption } from "@/types";
import type { Selection } from "@react-types/shared";
import PlatformLogo from "@/app/components/platform-logo";
import { Search, X } from "lucide-react";

const INITIAL_DISPLAY_COUNT = 30;
const LOAD_MORE_COUNT = 30;

export default function ToolsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ============================================================================
  // URL State Management
  // ============================================================================

  const platformsParam = searchParams.get("platform") || "";
  const selectedPlatforms = useMemo(() => {
    if (!platformsParam) return new Set<string>();
    return new Set(platformsParam.split(",").filter(Boolean));
  }, [platformsParam]);
  
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";
  const searchQuery = searchParams.get("q") || "";

  // ============================================================================
  // Local State
  // ============================================================================

  const [search, setSearch] = useState(searchQuery);
  const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [platformSelection, setPlatformSelection] = useState<Selection>(selectedPlatforms);
  const [sortSelection, setSortSelection] = useState<Selection>(new Set([sortParam]));
  
  const debouncedSearch = useDebounce(search, 300);

  // Sync selection state with URL params
  useEffect(() => {
    setPlatformSelection(selectedPlatforms);
  }, [selectedPlatforms]);

  useEffect(() => {
    setSortSelection(new Set([sortParam]));
  }, [sortParam]);

  // ============================================================================
  // Filtering & Sorting Logic
  // ============================================================================

  const filteredTools = useMemo(() => {
    let result = [...OFFICIAL_TOOLS];

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
          tool.description.toLowerCase().includes(q) ||
          tool.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortParam) {
      case "featured":
        return [
          ...result.filter((t) => t.featured).sort((a, b) => (b.popularity || 0) - (a.popularity || 0)),
          ...result.filter((t) => !t.featured).sort((a, b) => (b.popularity || 0) - (a.popularity || 0)),
        ];
      case "newest":
        return result.sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));
      case "popular":
        return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "a-z":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [selectedPlatforms, debouncedSearch, sortParam]);

  const displayedTools = filteredTools.slice(0, displayedCount);

  // ============================================================================
  // Effects
  // ============================================================================

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
  }, [selectedPlatforms, debouncedSearch, sortParam]);

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
    router.push("/tools");
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
                {filteredTools.length === 1 ? "herramienta disponible" : "herramientas disponibles"}
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
                placeholder="Buscar herramientas por nombre o descripción..."
                className="w-full pl-12 pr-4 py-3.5 text-sm text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 placeholder:text-muted/70 transition-all input"
              />
            </div>

            {/* Filters Row: Platform Selector + Sort */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              {/* Platform Multi-Selector */}
              <ComboBox>
                <Label>Plataforma</Label>
                <ComboBox.InputGroup>
                  <Input placeholder="Todas las plataformas" />
                  <ComboBox.Trigger />
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                  <ListBox
                    selectionMode="multiple"
                    selectedKeys={platformSelection}
                    onSelectionChange={handlePlatformChange}
                  >
                    {PLATFORMS.map((platform) => {
                      const metadata = PLATFORM_METADATA[platform];
                      if (!metadata) return null;
                      return (
                        <ListBox.Item key={platform} id={platform} textValue={metadata.name} className="flex gap-2">
                          <PlatformLogo platform={metadata.name as any} size="sm" className="relative z-10" />
                           {metadata.name}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </ComboBox.Popover>
              </ComboBox>

              {/* Sort Selector */}
              <Select placeholder="Seleccionar orden" defaultSelectedKey="featured">
                <Label>Ordenar</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox
                    selectedKeys={sortSelection}
                    onSelectionChange={handleSortChange}
                  >
                    <ListBox.Item key="featured" id="featured" textValue="Destacadas">
                      Destacadas
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item key="newest" id="newest" textValue="Más recientes">
                      Más recientes
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item key="popular" id="popular" textValue="Más populares">
                      Más populares
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

            {/* Active Filters Summary */}
            {(selectedPlatforms.size > 0 || debouncedSearch) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted">Filtros activos:</span>
                {Array.from(selectedPlatforms).map((platform) => {
                  const metadata = PLATFORM_METADATA[platform as Platform];
                  if (!metadata) return null;
                  return (
                    <div key={platform} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-soft text-accent rounded-full text-sm font-medium">
                      <span className="capitalize">
                        <PlatformLogo platform={metadata.name as any} size="sm" className="relative z-10" />
                         {metadata.name}
                      </span>
                      <button
                        onClick={() => {
                          const newPlatforms = new Set(selectedPlatforms);
                          newPlatforms.delete(platform);
                          handlePlatformChange(newPlatforms);
                        }}
                        className="hover:text-accent-hover transition-colors"
                        aria-label={`Quitar filtro de ${metadata.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
                {debouncedSearch && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-soft text-accent rounded-full text-sm font-medium">
                    <span>"{debouncedSearch}"</span>
                    <button
                      onClick={() => handleSearchChange("")}
                      className="hover:text-accent-hover transition-colors"
                      aria-label="Quitar búsqueda"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        {isInitialLoad ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted/20 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted/20 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted/20 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted/20 rounded"></div>
                  <div className="h-3 bg-muted/20 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTools.length > 0 ? (
          <>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
                    variant="minimal" 
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
              {isLoading && "Cargando más herramientas..."}
              {!isLoading && displayedCount > INITIAL_DISPLAY_COUNT && 
                `Cargadas ${displayedCount} de ${filteredTools.length} herramientas`
              }
            </div>

            {/* Load More Indicator */}
            {displayedCount < filteredTools.length && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-full">
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted">Cargando más herramientas...</span>
                </div>
              </div>
            )}

            {/* End of Feed */}
            {displayedCount >= filteredTools.length && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-success-soft text-success-soft-foreground rounded-2xl shadow-sm">
                  <div className="text-left">
                    <div className="font-bold">
                      ¡Has visto todas las herramientas!
                    </div>
                    <div className="text-sm opacity-80">
                      {filteredTools.length} herramientas en total
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
              No se encontraron herramientas
            </h3>
            <p className="text-lg text-muted mb-8 max-w-md mx-auto">
              Intenta seleccionar otra plataforma o borra los filtros activos
            </p>
            <button
              onClick={() => router.push("/tools")}
              className="px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
            >
              Ver todas las herramientas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
