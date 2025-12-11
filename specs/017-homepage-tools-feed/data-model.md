# Data Model: Centralized Tools Page

**Feature**: 017-homepage-tools-feed  
**Date**: 2024-12-08  
**Status**: Draft

---

## Overview

This document defines the data structures for the centralized `/tools` page with platform filtering and infinite scroll using TanStack Virtual.

---

## Core Entities

### 1. Tool

**Description**: Represents a single AI-powered tool (existing in `lib/tools-index.ts`)

**TypeScript Interface**:

```typescript
interface Tool {
  id: string; // Unique ID: "tiktok-script-writer"
  name: string; // Display name: "TikTok Script Writer"
  description: string; // Card description (10-150 chars)
  platform: Platform; // Platform enum
  href: string; // Tool URL: "/tiktok/script-writer"
  icon: string; // Emoji: "🎵"
  category?: string; // Optional category
  dateAdded?: string; // ISO date for "Newest" sort
  popularity?: number; // Score 0-100 for "Popular" sort
  featured?: boolean; // True if in "Featured" list
  tags?: string[]; // Searchable keywords
}
```

### 2. Platform

**TypeScript Type**:

```typescript
type Platform =
  | "tiktok"
  | "instagram"
  | "twitter"
  | "snapchat"
  | "youtube"
  | "reddit"
  | "discord"
  | "twitch"
  | "elevenlabs"
  | "pinterest"
  | "spotify"
  | "facebook"
  | "bluesky"
  | "medium"
  | "etsy"
  | "onlyfans"
  | "patreon"
  | "suno"
  | "amazon"
  | "bereal"
  | "dating"
  | "email"
  | "forocoches"
  | "kick"
  | "linkedin"
  | "podcast"
  | "telegram"
  | "threads";
```

### 3. FilterState

**Description**: URL-based filter state

**TypeScript Interface**:

```typescript
interface FilterState {
  platform: Platform | null; // Selected platform (null = all)
  sort: SortOption; // Current sort order
  search: string; // Search query
}

type SortOption = "featured" | "newest" | "popular" | "alphabetical";
```

**URL Mapping**:

```
/tools?platform=tiktok&sort=newest&q=script

FilterState {
  platform: "tiktok",
  sort: "newest",
  search: "script"
}
```

### 4. PaginationState

**Description**: Infinite scroll state (TanStack Virtual)

**TypeScript Interface**:

```typescript
interface PaginationState {
  displayedCount: number; // Items currently loaded (30, 50, 70...)
  batchSize: number; // Items per batch (20)
  hasMore: boolean; // More items available
  isLoading: boolean; // Loading next batch
}
```

---

## State Management

### URL State (Primary)

**Read from URL**:

```typescript
const searchParams = useSearchParams();
const platform = searchParams.get("platform") as Platform | null;
const sort = (searchParams.get("sort") as SortOption) || "featured";
const search = searchParams.get("q") || "";
```

**Update URL**:

```typescript
const updateFilter = (key: keyof FilterState, value: any) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key === "search" ? "q" : key, value);
  } else {
    params.delete(key === "search" ? "q" : key);
  }
  router.push(`/tools?${params.toString()}`);
};
```

### Component State (Pagination)

```typescript
const [displayedCount, setDisplayedCount] = useState(30);
const [isLoading, setIsLoading] = useState(false);
```

### Derived State (Memoized)

```typescript
const filteredTools = useMemo(() => {
  let result = OFFICIAL_TOOLS;

  // Platform filter
  if (platform) result = result.filter((t) => t.platform === platform);

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.includes(q))
    );
  }

  // Sort
  switch (sort) {
    case "featured":
      return [
        ...result.filter((t) => t.featured),
        ...result.filter((t) => !t.featured),
      ];
    case "newest":
      return result.sort((a, b) =>
        (b.dateAdded || "").localeCompare(a.dateAdded || "")
      );
    case "popular":
      return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    case "alphabetical":
      return result.sort((a, b) => a.name.localeCompare(b.name));
  }
}, [platform, search, sort]);
```

---

## Data Flow

### Page Load

1. Read URL params → FilterState
2. Load OFFICIAL_TOOLS from lib/tools-index.ts
3. Apply filters → filteredTools (memoized)
4. TanStack Virtual renders visible items only

### Filter Change

1. User selects platform
2. updateFilter() → URL updated
3. filteredTools recomputed
4. displayedCount reset to 30
5. virtualizer.scrollToIndex(0)
6. Render updated results

### Infinite Scroll

1. User scrolls to bottom threshold
2. IntersectionObserver triggers
3. setDisplayedCount(prev => prev + 20)
4. TanStack Virtual renders new visible items

---

## Performance Optimizations

1. **useMemo** for filteredTools (expensive filtering/sorting)
2. **React.memo** for ToolCard component
3. **Debounce** search input (300ms)
4. **TanStack Virtual** for rendering (~15 visible items only)

---

## Data Validation

```typescript
// Build-time validation
function validateTool(tool: Tool): boolean {
  if (!tool.id || !/^[a-z0-9-]+$/.test(tool.id)) return false;
  if (!tool.platform || !PLATFORMS.includes(tool.platform)) return false;
  if (!tool.href.startsWith(`/${tool.platform}/`)) return false;
  return true;
}
```

---

## Migration Requirements

Update `lib/tools-index.ts` to add:

- `dateAdded`: ISO date string
- `popularity`: number 0-100
- `featured`: boolean (top 20 tools)
- `tags`: string[] for search

**Population Strategy**:

1. **dateAdded**: Use git commit date of tool creation OR set to "2024-01-01" for legacy tools
2. **popularity**: Initial values based on platform:
   - TikTok/Instagram tools: 85-95 (high demand)
   - Niche platforms: 60-75
   - New/experimental: 50-60
3. **featured**: Mark top 20 most-used tools as `true` (prioritize TikTok, Instagram, Twitter generators)
4. **tags**: Extract from tool name/description (e.g., "script writer" → ["script", "writing", "video"])

**Automation**: Create migration script `scripts/populate-tool-metadata.mjs` to bulk-update all tools using above rules.

Example:

```typescript
{
  id: "tiktok-script-writer",
  name: "TikTok Script Writer",
  description: "Create scripts...",
  platform: "tiktok",
  href: "/tiktok/script-writer",
  icon: "🎵",
  dateAdded: "2024-01-15",
  popularity: 95,
  featured: true,
  tags: ["script", "writing", "video"]
}
```
