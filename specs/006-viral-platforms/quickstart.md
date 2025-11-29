# Quickstart Guide: New Viral Platforms

**Feature**: 006-viral-platforms  
**Date**: November 28, 2025

## Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- DeepSeek API key in `.env.local`
- Appwrite project configured
- Cloudflare Turnstile site key

## Quick Setup

### 1. Ensure Development Environment

```bash
cd /Users/davidmartin/Developer/me/kivitools
git checkout 006-viral-platforms
npm install
npm run dev
```

### 2. Implementation Order (Per Platform)

For each platform (bluesky, lemon8, kick, telegram, bereal):

1. **Add platform logo** (`public/platforms/[platform].svg`)
2. **Update platform-logo.tsx** (add to type union, add needsInvert if needed)
3. **Update seo-metadata.ts** (add to Platform type, colors, names)
4. **Update tool-selector.tsx** (add to type union and PLATFORM_TOOLS)
5. **Add translations** (6 languages: en, es, pt, fr, de, it)
6. **Create API routes** (`app/api/tools/[platform]/[tool]/route.ts`)
7. **Add DeepSeek functions** (`lib/deepseek.ts`)
8. **Create tool pages** (`app/(tools)/[platform]/[tool]/page.tsx`)
9. **Create platform hub page** (`app/(tools)/[platform]/page.tsx`)
10. **Update navigation.tsx** (add platform to platforms array)
11. **Update home page** (`app/page.tsx` - add to platforms array)
12. **Add Spanish URL rewrites** (`next.config.ts`)
13. **Update RUTAS_ALIAS.md** (document new routes)
14. **Update PRD.md** (mark tools as completed)

### 3. File Templates

#### Platform Logo (SVG)

Place in `public/platforms/[platform].svg`. Ensure:

- Viewbox is square or proper aspect ratio
- No embedded raster images
- Works on white background
- If black/dark colored, mark `needsInvert: true` in platform-logo.tsx

#### API Route Template

```typescript
// app/api/tools/[platform]/[tool]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generate[Platform][Tool] } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { param1, param2, turnstileToken, language = "en" } = body;

    // 1. Verify Turnstile
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
    if (!param1 || param1.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Input too short" },
        { status: 400 }
      );
    }

    // 3. Generate content
    const result = await generate[Platform][Tool]({
      param1: param1.trim(),
      param2,
      language,
    });

    // 4. Log to Appwrite
    await saveGenerationLog({
      platform: "[platform]",
      tool: "[tool]",
      requestData: body,
      responseData: { result },
      userIp,
      language,
    });

    // 5. Return success
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("[Platform] [Tool] error:", error);
    return NextResponse.json(
      { success: false, error: "Generation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "[Platform] [Tool]" });
}
```

#### Translation File Template

```typescript
// lib/locales/en/tools/[platform]/[tool].ts
export const [tool] = {
  "[key].title": "Tool Title",
  "[key].description": "Short description for cards",

  // Form
  "[key].form.input1": "Input Label",
  "[key].form.input1Placeholder": "Placeholder text...",
  "[key].form.language": "Output Language",
  "[key].form.generate": "Generate",
  "[key].form.generating": "Generating...",
  "[key].form.useAgain": "Generate Another",
  "[key].form.error.empty": "This field is required",

  // Results
  "[key].result.title": "Your Results",
  "[key].result.copy": "Copy",
  "[key].result.copied": "Copied!",
  "[key].result.copyAll": "Copy All",
  "[key].result.copiedAll": "All copied!",

  // Features (4 cards)
  "[key].features.feature1.title": "🎯 Feature 1",
  "[key].features.feature1.description": "Description...",
  "[key].features.feature2.title": "⚡ Feature 2",
  "[key].features.feature2.description": "Description...",
  "[key].features.feature3.title": "✨ Feature 3",
  "[key].features.feature3.description": "Description...",
  "[key].features.feature4.title": "🚀 Feature 4",
  "[key].features.feature4.description": "Description...",

  // Hero
  "[key].hero.subtitle": "What is this tool?",
  "[key].hero.description": "Full explanation paragraph...",

  // How It Works (3 steps)
  "[key].howItWorks.title": "How It Works",
  "[key].howItWorks.step1.title": "Step 1",
  "[key].howItWorks.step1.description": "Description...",
  "[key].howItWorks.step2.title": "Step 2",
  "[key].howItWorks.step2.description": "Description...",
  "[key].howItWorks.step3.title": "Step 3",
  "[key].howItWorks.step3.description": "Description...",

  // FAQ (5 questions)
  "[key].faq.title": "Frequently Asked Questions",
  "[key].faq.q1": "Question 1?",
  "[key].faq.a1": "Answer 1",
  "[key].faq.q2": "Question 2?",
  "[key].faq.a2": "Answer 2",
  "[key].faq.q3": "Question 3?",
  "[key].faq.a3": "Answer 3",
  "[key].faq.q4": "Question 4?",
  "[key].faq.a4": "Answer 4",
  "[key].faq.q5": "Question 5?",
  "[key].faq.a5": "Answer 5",

  // Related Tools
  "[key].relatedTools.title": "Related Tools",
};
```

### 4. Testing Checklist (Per Tool)

```bash
# 1. Start dev server
npm run dev

# 2. Test English URL
open http://localhost:3000/[platform]/[tool]

# 3. Test Spanish URL
open http://localhost:3000/[platform]/[spanish-slug]

# 4. Test form submission
- Fill form with test data
- Verify Turnstile widget loads
- Click Generate
- Verify results display
- Test Copy button

# 5. Test language switching
- Switch UI to Spanish (🇪🇸)
- Verify all text translates
- Generate content in Spanish
- Verify output is in Spanish

# 6. Test dark mode
- Toggle dark mode
- Verify logo displays correctly
- Verify all colors work

# 7. Verify build
npm run build
```

### 5. Platform Colors Reference

| Platform | Primary Color | Tailwind Classes                     |
| -------- | ------------- | ------------------------------------ |
| Bluesky  | #0085FF       | `bg-blue-500`, `text-blue-600`       |
| Lemon8   | #3EE98E       | `bg-emerald-400`, `text-emerald-600` |
| Kick     | #53FC18       | `bg-green-400`, `text-green-500`     |
| Telegram | #0088CC       | `bg-sky-500`, `text-sky-600`         |
| BeReal   | #000000       | `bg-neutral-900`, `text-neutral-900` |

### 6. Common Issues

#### Logo not showing

- Check file exists in `/public/platforms/[platform].svg`
- Verify platform added to `platform-logo.tsx` type union
- Clear Next.js cache: `rm -rf .next`

#### Translations not working

- Verify key exists in ALL 6 language files
- Check translation key matches exactly (case-sensitive)
- Verify locale index.ts exports the new file

#### Spanish URL not working

- Check rewrite rule in `next.config.ts`
- Restart dev server after config changes
- Verify source and destination paths match

#### Turnstile failing

- Check `.env.local` has `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Check `.env.local` has `TURNSTILE_SECRET_KEY`
- Verify domain is allowed in Cloudflare dashboard
