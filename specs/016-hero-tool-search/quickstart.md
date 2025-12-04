# Quickstart: Hero Tool Search with Auto-Create

**Feature**: 016-hero-tool-search  
**Date**: 2024-12-04

## Overview

This feature adds a search bar to the homepage hero that allows users to find tools across official and community catalogs. If no matching tool exists, users can auto-create a new community tool based on their search query.

## Prerequisites

- Existing KiviTools development environment
- Appwrite "tools" collection configured
- DeepSeek/OpenRouter API access

## Key Files to Create/Modify

### New Files

| File                                    | Purpose                            |
| --------------------------------------- | ---------------------------------- |
| `lib/tools-index.ts`                    | Static index of all official tools |
| `app/components/hero-search.tsx`        | Main search component              |
| `app/components/search-result-item.tsx` | Individual result display          |
| `app/components/create-tool-cta.tsx`    | "Create this tool" button          |
| `app/api/search/route.ts`               | Community tools search API         |
| `app/api/tools/auto-create/route.ts`    | AI tool config generation          |
| `types/search.ts`                       | TypeScript interfaces              |

### Modified Files

| File                       | Changes                              |
| -------------------------- | ------------------------------------ |
| `app/page.tsx`             | Add HeroSearch to hero section       |
| `lib/deepseek.ts`          | Add `generateToolFromQuery` function |
| `lib/locales/en/common.ts` | Add search-related translations      |
| `lib/locales/es/common.ts` | Add search-related translations      |

## Implementation Order

### Phase 1: Foundation (P1 - Search)

1. **Create tools index** (`lib/tools-index.ts`)

   - Extract tool definitions from all platform pages
   - Create searchable static array

2. **Create search API** (`app/api/search/route.ts`)

   - Query Appwrite for community tools
   - Handle visibility rules (approved + user's pending)

3. **Build HeroSearch component**

   - Input with debounce
   - Dropdown with results
   - Keyboard navigation

4. **Integrate into homepage**
   - Add component to hero section
   - Style to match existing design

### Phase 2: Auto-Create (P2)

5. **Create auto-create API** (`app/api/tools/auto-create/route.ts`)

   - AI-generated tool configuration
   - Return name, description, prompt template

6. **Build CreateToolCTA component**

   - Prominent when <3 results
   - Subtle when 3+ results

7. **Handle auth flow**

   - Preserve query in URL params
   - Resume after login

8. **Pre-populate builder**
   - Read query params
   - Call auto-create API
   - Fill form fields

### Phase 3: Polish (P3)

9. **Add keyboard navigation**

   - Arrow keys, Enter, Escape

10. **Add loading states**

    - Skeleton while searching
    - Spinner on auto-create

11. **Mobile optimization**
    - Full-width dropdown
    - Touch-friendly targets

## Quick Test

After implementation, verify:

```bash
# Start dev server
npm run dev

# Test searches
1. Search "tiktok script" → Should show TikTok Script Writer
2. Search "bio" → Should show multiple bio generators
3. Search "xyznotexist" → Should show "Create this tool" prominently
4. Click result → Should navigate to tool page
5. Click "Create tool" (logged in) → Should open builder pre-filled
6. Click "Create tool" (logged out) → Should redirect to login, then resume
```

## Translation Keys to Add

```typescript
// lib/locales/*/common.ts

"search.placeholder": "Search tools...",
"search.noResults": "No tools found",
"search.createTool": "Create this tool",
"search.createToolPrompt": "Couldn't find what you need?",
"search.loading": "Searching...",
"search.official": "Official",
"search.community": "Community",
"search.by": "by",
"search.viewMore": "View more results",
```

## Environment Variables

No new environment variables required. Uses existing:

- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `DEEPSEEK_API_KEY` or `OPENROUTER_API_KEY`
