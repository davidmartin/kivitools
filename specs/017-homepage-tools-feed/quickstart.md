# Quickstart: Centralized Tools Page Implementation

**Feature**: 017-homepage-tools-feed  
**Date**: 2024-12-08

---

## Prerequisites

- Next.js 16.0.1 with App Router installed
- Node.js 18+ and npm/pnpm
- Existing `lib/tools-index.ts` with OFFICIAL_TOOLS array

---

## Installation

```bash
# Install TanStack Virtual
npm install @tanstack/react-virtual

# No other dependencies needed
```

---

## Step 1: Update Tools Data Model

**File**: `lib/tools-index.ts`

Add new fields to each tool:

```typescript
export const OFFICIAL_TOOLS: Tool[] = [
  {
    id: "tiktok-script-writer",
    name: "TikTok Script Writer",
    description: "Create scripts so good your FYP will thank you",
    platform: "tiktok",
    href: "/tiktok/script-writer",
    icon: "🎵",
    // ADD THESE:
    dateAdded: "2024-01-15",
    popularity: 95,
    featured: true,
    tags: ["script", "writing", "video"],
  },
  // ... repeat for all tools
];
```

---

## Step 2: Create Tools Page

**File**: `app/(tools)/tools/page.tsx`

```tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useLanguage } from "@/contexts/LanguageContext";
import { OFFICIAL_TOOLS } from "@/lib/tools-index";
import ToolCard from "@/app/components/tool-card";
import PlatformFilter from "@/app/components/platform-filter";

export default function ToolsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentRef = useRef<HTMLDivElement>(null);

  // Read filters from URL
  const platform = searchParams.get("platform");
  const sort = (searchParams.get("sort") || "featured") as SortOption;
  const search = searchParams.get("q") || "";

  const [displayedCount, setDisplayedCount] = useState(30);

  // Filtered tools
  const filteredTools = useMemo(() => {
    let result = OFFICIAL_TOOLS;

    if (platform) result = result.filter((t) => t.platform === platform);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

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

  const displayedTools = filteredTools.slice(0, displayedCount);

  // Virtual scroller
  const virtualizer = useVirtualizer({
    count: displayedTools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  // Infinite scroll trigger
  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
    if (
      lastItem?.index >= displayedTools.length - 1 &&
      displayedCount < filteredTools.length
    ) {
      setDisplayedCount((prev) => Math.min(prev + 20, filteredTools.length));
    }
  }, [virtualizer.getVirtualItems(), displayedCount, filteredTools.length]);

  // Reset on filter change
  useEffect(() => {
    setDisplayedCount(30);
    virtualizer.scrollToIndex(0);
  }, [platform, sort, search]);

  return (
    <div className="flex">
      <PlatformFilter
        selected={platform}
        onSelect={(p) => {
          const params = new URLSearchParams(searchParams);
          if (p) params.set("platform", p);
          else params.delete("platform");
          router.push(`/tools?${params.toString()}`);
        }}
      />

      <div ref={parentRef} className="flex-1 h-screen overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const tool = displayedTools[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <ToolCard tool={tool} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

---

## Step 3: Create Tool Card Component

**File**: `app/components/tool-card.tsx`

```tsx
import React from "react";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";

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

const ToolCard = React.memo(({ tool }: ToolCardProps) => {
  return (
    <Link href={tool.href}>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{tool.icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{tool.name}</h3>
            <p className="text-sm text-muted">{tool.description}</p>
          </div>
          <Chip size="sm">{tool.platform}</Chip>
        </div>
      </Card>
    </Link>
  );
});

export default ToolCard;
```

---

## Step 4: Create Platform Filter

**File**: `app/components/platform-filter.tsx`

```tsx
"use client";

import { PLATFORMS } from "@/lib/tools-index";

interface PlatformFilterProps {
  selected: string | null;
  onSelect: (platform: string | null) => void;
}

export default function PlatformFilter({
  selected,
  onSelect,
}: PlatformFilterProps) {
  return (
    <aside className="hidden lg:block w-64 h-screen overflow-y-auto border-r border-border sticky top-0">
      <div className="p-4">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded ${
            !selected
              ? "bg-accent text-accent-foreground"
              : "text-foreground hover:bg-surface"
          }`}
        >
          All Platforms
        </button>
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => onSelect(platform)}
            className={`w-full text-left px-3 py-2 rounded ${
              selected === platform
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-surface"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>
    </aside>
  );
}
```

---

## Step 5: Add 301 Redirects

**File**: `next.config.ts`

```typescript
async redirects() {
  const platforms = ['tiktok', 'instagram', /* all 28 */];

  return [
    ...platforms.map(platform => ({
      source: `/${platform}`,
      destination: `/tools?platform=${platform}`,
      permanent: true,
    })),
    ...platforms.map(platform => ({
      source: `/${platform}/:path*`,
      destination: `/tools?platform=${platform}`,
      permanent: true,
    })),
  ];
}
```

---

## Step 6: Update Homepage Links

**File**: `app/page.tsx`

Find platform cards and update:

```tsx
// BEFORE:
<Link href="/tiktok">

// AFTER:
<Link href="/tools?platform=tiktok">
```

---

## Step 7: Update Navigation

**File**: `app/components/navigation.tsx`

Update platform dropdown links:

```tsx
// BEFORE:
href: "/tiktok";

// AFTER:
href: "/tools?platform=tiktok";
```

---

## Step 8: Add Translations

**File**: `lib/locales/en/common.ts`

```typescript
"toolsPage.title": "All Tools",
"toolsPage.filters.allPlatforms": "All Platforms",
"toolsPage.sort.featured": "Featured",
"toolsPage.sort.newest": "Newest",
"toolsPage.sort.popular": "Popular",
"toolsPage.sort.alphabetical": "Alphabetical",
```

Repeat for `lib/locales/es/common.ts`.

---

## Testing

```bash
# Start dev server
npm run dev

# Test redirects
curl -I http://localhost:3000/tiktok
# Should return 308 redirect

# Test tools page
open http://localhost:3000/tools
open http://localhost:3000/tools?platform=tiktok
```

---

## Performance Verification

```bash
npm run build
npm run start

# Run Lighthouse
lighthouse http://localhost:3000/tools --view

# Verify:
# - LCP < 2.5s
# - FID < 100ms
# - Filter change < 300ms (Chrome DevTools Performance tab)
```

---

## Troubleshooting

**Infinite scroll not triggering**:

- Check `parentRef` is attached to scroll container
- Verify `virtualizer.getVirtualItems()` is in useEffect deps

**Filters not working**:

- Check URL params with `console.log(searchParams.toString())`
- Verify `router.push` is updating URL

**Performance issues**:

- Confirm `useMemo` wraps `filteredTools`
- Check `React.memo` wraps `ToolCard`
- Verify only ~15 items in DOM (inspect with DevTools)

---

## Next Steps

After implementation:

1. Test all filter combinations
2. Verify mobile responsive design
3. Test dark mode
4. Run Lighthouse audit
5. Update PRD.md with completion status
