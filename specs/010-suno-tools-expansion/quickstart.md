# Quickstart: Suno Tools Expansion

**Feature**: 010-suno-tools-expansion  
**Date**: November 30, 2025

## Prerequisites

- Node.js 18+
- npm/pnpm
- Access to DeepSeek API (DEEPSEEK_API_KEY in .env.local)
- Access to Appwrite (credentials in .env.local)
- Cloudflare Turnstile site key (in .env.local)

## Quick Setup

```bash
# 1. Checkout feature branch
git checkout 010-suno-tools-expansion

# 2. Install dependencies (if needed)
npm install

# 3. Start development server
npm run dev

# 4. Open browser to test existing Suno tools
open http://localhost:3000/suno
```

## Implementation Order

Follow this sequence for each tool (implements one user story at a time):

### Phase 1: P1 Tools (Song Title + Song Tag Generators)

1. **Song Title Generator** (User Story 1)

   - Create API route: `app/api/tools/suno/song-title-generator/route.ts`
   - Create DeepSeek function: `generateSunoSongTitles()` in `lib/deepseek.ts`
   - Create page: `app/(tools)/suno/song-title-generator/page.tsx`
   - Add translations (ES/EN)
   - Add Spanish URL rewrite
   - Test manually

2. **Song Tag Generator** (User Story 2)
   - Same pattern as above with tag-specific logic

### Phase 2: P2 Tools (Album Name + Cover Art Prompt Generators)

3. **Album Name Generator** (User Story 3)
4. **Cover Art Prompt Generator** (User Story 4)

### Phase 3: P3 Tool (Remix Idea Generator)

5. **Remix Idea Generator** (User Story 5)

### Phase 4: Integration

6. Update Suno hub page (`app/(tools)/suno/page.tsx`)
7. Add all Spanish URL rewrites to `next.config.ts`
8. Update navigation if needed
9. Update PRD.md

## File Templates

### API Route Template

```typescript
// app/api/tools/suno/[tool-name]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generate[ToolName] } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { /* fields */, turnstileToken } = body;

    // 1. Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Bot verification required" },
        { status: 403 }
      );
    }

    const userIp = getUserIpFromRequest(request);
    const isValid = await verifyTurnstileToken(turnstileToken, userIp);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Bot verification failed" },
        { status: 403 }
      );
    }

    // 2. Validate inputs
    // ...

    // 3. Generate content
    const result = await generate[ToolName]({ /* params */ });

    // 4. Log to Appwrite
    await saveGenerationLog({
      platform: "suno",
      tool: "[tool-name]",
      requestData: body,
      responseData: { result },
      userIp,
      language: body.language || "en",
    });

    // 5. Return success
    return NextResponse.json({ success: true, [resultField]: result });
  } catch (error) {
    console.error("[Tool] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "Suno [Tool Name]" });
}
```

### Page Component Template

Reference: `app/(tools)/suno/lyric-generator/page.tsx`

Key sections (in order):

1. Header with purple badge
2. ToolSelector component
3. Form card with inputs
4. Turnstile widget
5. Generate/Use Again buttons
6. Results display with copy buttons
7. Features grid (4 cards)
8. Hero description section
9. How It Works (3 steps)
10. FAQ section (5 Q&As)
11. Related tools grid

## Testing Checklist

For each tool, verify:

- [ ] Form validation works (empty inputs show errors)
- [ ] Turnstile widget loads and verifies
- [ ] Generate button disabled until Turnstile completes
- [ ] API returns correct data structure
- [ ] Results display correctly
- [ ] Individual copy buttons work
- [ ] Copy All button works (for multi-result tools)
- [ ] "Use Again" resets form AND Turnstile
- [ ] UI translations work (switch 🇺🇸/🇪🇸)
- [ ] Output language selector works
- [ ] English URL works: `/suno/[tool-name]`
- [ ] Spanish URL works: `/suno/[spanish-name]`
- [ ] Dark mode displays correctly
- [ ] Mobile responsive design works
- [ ] Related tools links are correct
- [ ] Appwrite logs generation (check database)
- [ ] No console errors

## Common Issues

### Turnstile not loading

- Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`
- Ensure TurnstileWidget component is imported correctly

### DeepSeek errors

- Check `DEEPSEEK_API_KEY` in `.env.local`
- Check console for API error messages
- Verify prompt format in `lib/deepseek.ts`

### Translations not showing

- Ensure keys exist in BOTH `es` and `en` sections
- Check for typos in translation key names
- Verify `useLanguage()` hook is imported and used

### Spanish URL not working

- Check rewrite in `next.config.ts`
- Restart dev server after config changes
- Verify source/destination paths are correct

## Useful Commands

```bash
# Run development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build (test production)
npm run build
```

## Reference Files

- Existing Suno tool: `app/(tools)/suno/lyric-generator/page.tsx`
- API route example: `app/api/tools/suno/lyric-generator/route.ts`
- DeepSeek functions: `lib/deepseek.ts` (search for "Suno")
- Translations pattern: `lib/translations.ts`
- Spanish rewrites: `next.config.ts`
