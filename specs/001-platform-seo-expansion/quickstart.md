# Quickstart: Platform SEO Expansion

**Feature**: 001-platform-seo-expansion  
**Date**: 2025-11-25  
**Estimated Time**: 3-4 days

## Prerequisites

- Node.js 18+ installed
- Access to DeepSeek API key (in `.env.local`)
- Familiarity with Next.js App Router
- Understanding of HeroUI v3 components

## Quick Setup

```bash
# 1. Ensure you're on the feature branch
git checkout 001-platform-seo-expansion

# 2. Install dependencies (if not already)
npm install

# 3. Start development server
npm run dev
```

## Implementation Order

### Day 1: Platform Infrastructure

1. **Add platform logos** (30 min)

   - Download/create SVG logos for Pinterest, Spotify, Facebook, Threads
   - Place in `/public/platforms/`
   - Update `platform-logo.tsx` with new platforms

2. **Update shared components** (1 hour)

   - Add platforms to `seo-metadata.ts` (Platform type, colors, names)
   - Add platforms to `tool-selector.tsx` (PLATFORM_TOOLS)
   - Add platforms to `navigation.tsx` (platforms array)

3. **Add translations** (2 hours)
   - Add all nav keys: `nav.pinterest`, `nav.spotify`, `nav.facebook`, `nav.threads`
   - Add platform page descriptions
   - Add all tool translations (title, description, form fields, results, FAQ)

### Day 2: Pinterest + Spotify Platforms

4. **Pinterest platform** (3 hours)

   - Create hub page: `app/(tools)/pinterest/page.tsx`
   - Create 3 tools: pin-description, board-name, profile-bio
   - Create 3 API routes
   - Add DeepSeek functions

5. **Spotify platform** (3 hours)
   - Create hub page: `app/(tools)/spotify/page.tsx`
   - Create 3 tools: playlist-name, playlist-description, artist-bio
   - Create 3 API routes
   - Add DeepSeek functions

### Day 3: Facebook + Threads + Expansion

6. **Facebook platform** (3 hours)

   - Create hub page + 3 tools + 3 API routes

7. **Threads platform** (2 hours)

   - Create hub page + 2 tools + 2 API routes

8. **TikTok expansion** (1.5 hours)

   - Add 2 tools: comment-reply, duet-ideas
   - Add 2 API routes

9. **Instagram expansion** (45 min)
   - Add 1 tool: carousel-script (story-ideas already exists)
   - Add 1 API route

### Day 4: Integration + Testing

10. **Update home page** (30 min)

    - Add 4 new platforms to platforms array

11. **Spanish URL rewrites** (30 min)

    - Add all new routes to `next.config.ts`
    - Update `RUTAS_ALIAS.md`

12. **Testing** (3 hours)

    - Test each tool on English URL
    - Test each tool on Spanish URL
    - Test dark mode
    - Test mobile responsive
    - Verify Lighthouse scores

13. **Documentation** (1 hour)
    - Update PRD.md with new platforms/tools
    - Verify all FAQ sections have 5 Q&As

## File Creation Checklist

### Platform Hub Pages

- [ ] `app/(tools)/pinterest/page.tsx`
- [ ] `app/(tools)/spotify/page.tsx`
- [ ] `app/(tools)/facebook/page.tsx`
- [ ] `app/(tools)/threads/page.tsx`

### Pinterest Tools (3)

- [ ] `app/(tools)/pinterest/pin-description/page.tsx`
- [ ] `app/(tools)/pinterest/board-name/page.tsx`
- [ ] `app/(tools)/pinterest/profile-bio/page.tsx`
- [ ] `app/api/tools/pinterest/pin-description/route.ts`
- [ ] `app/api/tools/pinterest/board-name/route.ts`
- [ ] `app/api/tools/pinterest/profile-bio/route.ts`

### Spotify Tools (3)

- [ ] `app/(tools)/spotify/playlist-name/page.tsx`
- [ ] `app/(tools)/spotify/playlist-description/page.tsx`
- [ ] `app/(tools)/spotify/artist-bio/page.tsx`
- [ ] `app/api/tools/spotify/playlist-name/route.ts`
- [ ] `app/api/tools/spotify/playlist-description/route.ts`
- [ ] `app/api/tools/spotify/artist-bio/route.ts`

### Facebook Tools (3)

- [ ] `app/(tools)/facebook/post-generator/page.tsx`
- [ ] `app/(tools)/facebook/page-bio/page.tsx`
- [ ] `app/(tools)/facebook/ad-copy/page.tsx`
- [ ] `app/api/tools/facebook/post-generator/route.ts`
- [ ] `app/api/tools/facebook/page-bio/route.ts`
- [ ] `app/api/tools/facebook/ad-copy/route.ts`

### Threads Tools (2)

- [ ] `app/(tools)/threads/post-generator/page.tsx`
- [ ] `app/(tools)/threads/bio-generator/page.tsx`
- [ ] `app/api/tools/threads/post-generator/route.ts`
- [ ] `app/api/tools/threads/bio-generator/route.ts`

### TikTok Expansion (2)

- [ ] `app/(tools)/tiktok/comment-reply/page.tsx`
- [ ] `app/(tools)/tiktok/duet-ideas/page.tsx`
- [ ] `app/api/tools/tiktok/comment-reply/route.ts`
- [ ] `app/api/tools/tiktok/duet-ideas/route.ts`

### Instagram Expansion (1)

- [ ] `app/(tools)/instagram/carousel-script/page.tsx`
- [ ] `app/api/tools/instagram/carousel-script/route.ts`

### Assets

- [ ] `public/platforms/pinterest.svg`
- [ ] `public/platforms/spotify.svg`
- [ ] `public/platforms/facebook.svg`
- [ ] `public/platforms/threads.svg`

### Shared Updates

- [ ] `lib/seo-metadata.ts` - Add 4 platforms
- [ ] `lib/deepseek.ts` - Add 14 functions
- [ ] `lib/translations.ts` - Add all translations
- [ ] `app/components/navigation.tsx` - Add 4 platforms
- [ ] `app/components/platform-logo.tsx` - Add 4 platforms
- [ ] `app/components/tool-selector.tsx` - Add 4 platforms
- [ ] `app/page.tsx` - Add 4 platforms to home
- [ ] `next.config.ts` - Add Spanish rewrites
- [ ] `docs/RUTAS_ALIAS.md` - Document routes
- [ ] `PRD.md` - Update tool status

## Code Patterns

### Platform Hub Page Pattern

```tsx
// Copy from app/(tools)/instagram/page.tsx
// Change: platform name, colors, tools array, logo
```

### Tool Page Pattern

```tsx
// Copy from app/(tools)/instagram/caption-generator/page.tsx
// Change: platform, inputs, API endpoint, translations
```

### API Route Pattern

```tsx
// Copy from app/api/tools/instagram/caption-generator/route.ts
// Change: validation, DeepSeek function, response shape
```

### DeepSeek Function Pattern

```typescript
// Copy from lib/deepseek.ts (generateInstagramCaption)
// Change: prompt content, parameters, output parsing
```

## Testing Commands

```bash
# Start dev server
npm run dev

# Test specific URL
open http://localhost:3000/pinterest
open http://localhost:3000/pinterest/descripcion-pin  # Spanish

# Check for TypeScript errors
npm run build

# Check Lighthouse (after build)
npm run start
# Then use Chrome DevTools Lighthouse
```

## Common Issues

1. **Missing translation key**: Check console for `Missing translation: xxx`
2. **Turnstile fails**: Ensure `turnstileToken` is passed and validated
3. **Dark mode broken**: Check for hardcoded colors, use HeroUI semantic classes
4. **Spanish URL 404**: Check rewrite rule in `next.config.ts`
5. **Platform logo not showing**: Verify SVG exists and path is correct
