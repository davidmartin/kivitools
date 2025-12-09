# Component Contracts: Tools Page

**Feature**: 017-homepage-tools-feed  
**Date**: 2024-12-08

---

## Overview

This feature has no HTTP API contracts (client-side only). This document defines React component prop interfaces and contracts.

---

## Component Interfaces

### 1. ToolsPage Component

**File**: `app/(tools)/tools/page.tsx`

**Props**: None (page component)

**URL Params** (consumed):

```typescript
{
  platform?: Platform;     // Query param: ?platform=tiktok
  sort?: SortOption;       // Query param: ?sort=newest
  q?: string;              // Query param: ?q=search+term
}
```

**Exports**:

```typescript
export default function ToolsPage(): JSX.Element;
export const metadata: Metadata; // SEO metadata
```

---

### 2. ToolCard Component

**File**: `app/components/tool-card.tsx`

**Props**:

```typescript
interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    platform: string;
    href: string;
    icon: string;
  };
}
```

**Usage**:

```tsx
<ToolCard tool={tool} />
```

**Contract**:

- MUST be wrapped in `React.memo` for performance
- MUST render as entire clickable card (Next.js `<Link>` wrapping HeroUI `<Card>`)
- MUST display: icon, name, description, platform badge
- MUST use HeroUI `<Card>` component (no separate action button - entire card is clickable)
- MUST apply hover state (shadow transition)
- MUST NOT include separate "Use Tool" button (card itself is the interactive element)

---

### 3. PlatformFilter Component

**File**: `app/components/platform-filter.tsx`

**Props**:

```typescript
interface PlatformFilterProps {
  selected: Platform | null;
  onSelect: (platform: Platform | null) => void;
}
```

**Usage**:

```tsx
<PlatformFilter
  selected={platform}
  onSelect={(p) => updateFilter("platform", p)}
/>
```

**Contract**:

- MUST render "All Platforms" option (clears filter)
- MUST highlight selected platform
- MUST be hidden on mobile (`hidden lg:block`)
- MUST use semantic color classes (`text-foreground`, `bg-surface`)
- MUST show platform list from `PLATFORMS` constant

---

### 4. PlatformChips Component (Mobile)

**File**: `app/components/platform-chips.tsx`

**Props**:

```typescript
interface PlatformChipsProps {
  selected: Platform | null;
  onSelect: (platform: Platform | null) => void;
}
```

**Usage**:

```tsx
<PlatformChips
  selected={platform}
  onSelect={(p) => updateFilter("platform", p)}
/>
```

**Contract**:

- MUST render as horizontal scrolling container
- MUST use HeroUI `<Chip>` components
- MUST be visible only on mobile (`lg:hidden`)
- MUST support touch scrolling
- MUST highlight selected chip

---

### 5. SortSelector Component

**File**: `app/components/sort-selector.tsx`

**Props**:

```typescript
interface SortSelectorProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

type SortOption = "featured" | "newest" | "popular" | "alphabetical";
```

**Usage**:

```tsx
<SortSelector value={sort} onChange={(s) => updateFilter("sort", s)} />
```

**Contract**:

- MUST render all 4 sort options
- MUST use translation keys (t("toolsPage.sort.featured"))
- MUST highlight active sort option
- MUST use HeroUI `<Button>` or `<Tabs>` component

---

## Custom Hooks

### 1. useInfiniteScroll

**File**: `lib/hooks/use-infinite-scroll.ts`

**Signature**:

```typescript
function useInfiniteScroll(options: {
  items: any[];
  batchSize?: number;
  initialCount?: number;
}): {
  displayedItems: any[];
  loadMore: () => void;
  hasMore: boolean;
  reset: () => void;
};
```

**Usage**:

```tsx
const { displayedItems, hasMore, reset } = useInfiniteScroll({
  items: filteredTools,
  batchSize: 20,
  initialCount: 30,
});
```

**Contract**:

- MUST start with `initialCount` items
- MUST load `batchSize` more on `loadMore()` call
- MUST return `hasMore: false` when all items displayed
- MUST provide `reset()` to return to initial count

---

### 2. useDebounce

**File**: `lib/hooks/use-debounce.ts` (existing)

**Signature**:

```typescript
function useDebounce<T>(value: T, delay: number): T;
```

**Usage**:

```tsx
const [searchInput, setSearchInput] = useState("");
const debouncedSearch = useDebounce(searchInput, 300);

useEffect(() => {
  updateFilter("search", debouncedSearch);
}, [debouncedSearch]);
```

---

## Type Definitions

**File**: `types/index.ts` (update existing)

```typescript
export type Platform =
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

export type SortOption = "featured" | "newest" | "popular" | "alphabetical";

export interface Tool {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  href: string;
  icon: string;
  dateAdded?: string;
  popularity?: number;
  featured?: boolean;
  tags?: string[];
}

export interface FilterState {
  platform: Platform | null;
  sort: SortOption;
  search: string;
}
```

---

## URL Contract

**Base URL**: `/tools`

**Query Parameters**:

| Param      | Type   | Values                                                | Default    | Example            |
| ---------- | ------ | ----------------------------------------------------- | ---------- | ------------------ |
| `platform` | string | Platform enum                                         | null (all) | `?platform=tiktok` |
| `sort`     | string | "featured" \| "newest" \| "popular" \| "alphabetical" | "featured" | `?sort=newest`     |
| `q`        | string | Any search query                                      | ""         | `?q=script`        |

**Examples**:

- `/tools` - All tools, featured sort
- `/tools?platform=tiktok` - TikTok tools only
- `/tools?platform=tiktok&sort=newest` - TikTok tools, newest first
- `/tools?q=bio` - Search for "bio" across all platforms
- `/tools?platform=instagram&q=caption&sort=popular` - Instagram caption tools, popular first

---

## Accessibility Contract

All components MUST follow ARIA Feed Pattern:

**Feed Container**:

```tsx
<div role="feed" aria-label="Tools Feed" aria-busy={isLoading}>
```

**Article Items**:

```tsx
<article
  role="article"
  aria-labelledby={`tool-${tool.id}-title`}
  aria-posinset={index + 1}
  aria-setsize={totalTools}
  tabIndex={0}
>
```

**Keyboard Navigation**:

- `PageDown`: Next article
- `PageUp`: Previous article
- `Ctrl+End`: Last article
- `Ctrl+Home`: First article
- `Tab`: Focus next interactive element

**Screen Reader Announcements**:

```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {newItemsLoaded && `Loaded ${count} more tools`}
</div>
```

---

## Performance Contract

All components MUST meet:

- **Initial render**: < 100ms
- **Filter change**: < 300ms
- **Infinite scroll batch**: < 500ms
- **Re-render on scroll**: < 16ms (60fps)

**Required Optimizations**:

- `React.memo` on ToolCard
- `useMemo` on filteredTools
- `useCallback` on event handlers
- TanStack Virtual for DOM virtualization

---

## Testing Contract

Each component MUST have:

1. **Manual testing**: Verified in browser (mobile + desktop)
2. **Dark mode**: Works in both light and dark themes
3. **Accessibility**: Keyboard navigation functional
4. **Performance**: Meets performance targets (Chrome DevTools)

**No automated tests required** (per constitution - manual testing protocol only).

---

## Summary

**Components**: 5 (ToolsPage, ToolCard, PlatformFilter, PlatformChips, SortSelector)  
**Hooks**: 2 (useInfiniteScroll, useDebounce)  
**URL Contract**: 3 query params (platform, sort, q)  
**Accessibility**: ARIA feed pattern required  
**Performance**: Memoization + virtualization required
