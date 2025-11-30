# Quickstart Guide: Creator & Commerce Platforms

**Feature**: 008-creator-platforms  
**Date**: November 30, 2025

## Implementation Order

Follow this sequence for each platform to ensure all integration points are covered:

### Phase 1: Foundation (Per Platform)

1. **Create Platform Logo** (`/public/platforms/[platform].svg`)
2. **Register Logo** (`app/components/platform-logo.tsx`)
3. **Add SEO Metadata Types** (`lib/seo-metadata.ts`)
4. **Add Navigation Entry** (`app/components/navigation.tsx`)
5. **Add Tool Selector Entry** (`app/components/tool-selector.tsx`)
6. **Add Home Page Platform** (`app/page.tsx`)

### Phase 2: Tools (Per Tool)

1. **Add DeepSeek Function** (`lib/deepseek.ts`)
2. **Create API Route** (`app/api/tools/[platform]/[tool]/route.ts`)
3. **Create Tool Page** (`app/(tools)/[platform]/[tool]/page.tsx`)
4. **Add Translations** (`lib/translations.ts` - 6 languages)

### Phase 3: Platform Hub

1. **Create Hub Page** (`app/(tools)/[platform]/page.tsx`)

### Phase 4: Finalization

1. **Add Spanish URL Rewrites** (`next.config.ts`)
2. **Document Routes** (`docs/RUTAS_ALIAS.md`)
3. **Update PRD** (`PRD.md`)
4. **Test All Tools**

---

## Code Patterns

### 1. Platform Logo (SVG)

Create `/public/platforms/[platform].svg` with:

- 24x24 viewBox recommended
- Single color for dark mode invert support
- No embedded styles

### 2. Register Logo

In `app/components/platform-logo.tsx`:

```typescript
// Add to Platform union type
type Platform = "..." | "medium" | "etsy" | "onlyfans" | "patreon";

// Add to needsInvert check if logo needs dark mode inversion
const needsInvert = ["medium", "threads", "bereal", "onlyfans"].includes(
  platform
);
```

### 3. SEO Metadata Types

In `lib/seo-metadata.ts`:

```typescript
// Add to Platform type
type Platform = "..." | "medium" | "etsy" | "onlyfans" | "patreon";

// Add to platformColors
const platformColors: Record<Platform, string> = {
  // ... existing
  medium: "#000000",
  etsy: "#F56400",
  onlyfans: "#00AFF0",
  patreon: "#FF424D",
};

// Add to platformNames
const platformNames: Record<Platform, string> = {
  // ... existing
  medium: "Medium",
  etsy: "Etsy",
  onlyfans: "OnlyFans",
  patreon: "Patreon",
};
```

### 4. Navigation Entry

In `app/components/navigation.tsx`:

```typescript
{
  id: "medium",
  name: t("nav.medium"),
  emoji: "📝",
  tools: [
    { name: t("mediumArticleTitle.title"), href: "/medium/article-title-generator" },
    { name: t("mediumArticleIntro.title"), href: "/medium/article-intro-generator" },
    { name: t("mediumBio.title"), href: "/medium/bio-generator" },
  ],
},
```

### 5. Tool Selector Entry

In `app/components/tool-selector.tsx`:

```typescript
// Add to Platform union type
type Platform = "..." | "medium" | "etsy" | "onlyfans" | "patreon";

// Add to PLATFORM_TOOLS
const PLATFORM_TOOLS: Record<Platform, ToolOption[]> = {
  // ... existing
  medium: [
    { value: "article-title-generator", labelKey: "mediumArticleTitle.title" },
    { value: "article-intro-generator", labelKey: "mediumArticleIntro.title" },
    { value: "bio-generator", labelKey: "mediumBio.title" },
  ],
  // ... etc
};
```

### 6. Home Page Platform

In `app/page.tsx` platforms array:

```typescript
{
  name: "Medium",
  description: t("medium.page.description"),
  href: "/medium",
  icon: "📝",
  color: "black",
},
```

**IMPORTANT: Also update the stats section**

The stats section currently shows hardcoded "9" for platforms. Update this to reflect the actual count or make it dynamic:

```tsx
// In the Stats Section, find the platforms stat and update:
<div className="text-5xl font-black text-gradient mb-2">28</div>  // Update count
<p className="text-muted font-medium">{t("stats.platforms")}</p>
```

Current count after adding Medium, Etsy, OnlyFans, Patreon: **28 platforms** (24 existing + 4 new)

### 7. DeepSeek Function

In `lib/deepseek.ts`:

```typescript
export async function generateMediumArticleTitles(params: {
  topic: string;
  tone: string;
  language: string;
}): Promise<string[]> {
  const prompt = `You are an expert Medium writer and editor.
Generate 5 compelling article headlines for Medium.

Topic: ${params.topic}
Tone: ${params.tone}
Language: ${params.language}

Requirements:
- Each headline should be 60-70 characters for optimal display
- Use power words that drive clicks
- Match the specified tone
- Format: Return only the 5 headlines, one per line, numbered 1-5

Generate in ${
    params.language === "es"
      ? "Spanish"
      : params.language === "pt"
      ? "Portuguese"
      : params.language === "fr"
      ? "French"
      : params.language === "de"
      ? "German"
      : params.language === "it"
      ? "Italian"
      : "English"
  }.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 500,
  });

  const content = completion.choices[0]?.message?.content || "";
  return content
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .slice(0, 5);
}
```

### 8. API Route

```typescript
// app/api/tools/medium/article-title-generator/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateMediumArticleTitles } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, tone, language = "en", turnstileToken } = body;

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
    if (!topic || topic.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Topic must be at least 10 characters" },
        { status: 400 }
      );
    }

    // 3. Generate content
    const result = await generateMediumArticleTitles({
      topic: topic.trim(),
      tone: tone || "insightful",
      language,
    });

    // 4. Log to Appwrite
    await saveGenerationLog({
      platform: "medium",
      tool: "article-title-generator",
      requestData: { topic, tone, language },
      responseData: { result },
      userIp,
      language,
    });

    // 5. Return success
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Medium Article Title Generator",
  });
}
```

### 9. Tool Page Structure

Follow the 8-section template from copilot-instructions.md:

1. Header Section (badge, title, description)
2. Form Section (inputs)
3. Results Section (generated content)
4. Features Section (4 cards)
5. Hero Description Section
6. How It Works Section (3 steps)
7. FAQ Section (5 questions)
8. Related Tools Section

Include:

- `TurnstileWidget` component
- Language selector (if tool generates content)
- JSON-LD schemas (tool, breadcrumb, FAQ)
- Metadata export

### 10. Translations Structure

For each tool, add these keys to both ES and EN (and other languages):

```typescript
// Tool keys pattern
"[toolName].title": "Tool Title",
"[toolName].description": "Short description",
"[toolName].form.field1": "Field Label",
"[toolName].form.field1Placeholder": "Placeholder text",
"[toolName].form.generate": "Generate",
"[toolName].form.generating": "Generating...",
"[toolName].result.title": "Results",
"[toolName].result.copy": "Copy",
"[toolName].result.copied": "Copied!",
"[toolName].topFeatures.title": "Top Features",
"[toolName].features.feature1.title": "Feature 1",
"[toolName].features.feature1.description": "Description",
// ... features 2-4
"[toolName].hero.subtitle": "What is this tool?",
"[toolName].hero.description": "Full explanation...",
"[toolName].howItWorks.title": "How It Works",
"[toolName].howItWorks.step1.title": "Step 1",
"[toolName].howItWorks.step1.description": "Description",
// ... steps 2-3
"[toolName].faq.title": "FAQ",
"[toolName].faq.q1": "Question 1?",
"[toolName].faq.a1": "Answer 1",
// ... q2-q5
"[toolName].relatedTools.title": "Related Tools",

// Platform hub keys
"[platform].page.title": "Platform Tools",
"[platform].page.description": "Description for home page",
"[platform].info.title": "About Platform",
"[platform].info.description": "Platform info text",

// Navigation key
"nav.[platform]": "Platform Name",
```

### 11. Spanish URL Rewrites

In `next.config.ts`:

```typescript
async rewrites() {
  return [
    // ... existing rewrites

    // Medium
    { source: "/medium/generador-titulos-articulos", destination: "/medium/article-title-generator" },
    { source: "/medium/generador-introduccion-articulos", destination: "/medium/article-intro-generator" },
    { source: "/medium/generador-bio", destination: "/medium/bio-generator" },

    // Etsy
    { source: "/etsy/generador-titulos-productos", destination: "/etsy/product-title-generator" },
    { source: "/etsy/generador-descripcion-productos", destination: "/etsy/product-description-generator" },
    { source: "/etsy/generador-anuncio-tienda", destination: "/etsy/shop-announcement-generator" },

    // OnlyFans
    { source: "/onlyfans/generador-bio", destination: "/onlyfans/bio-generator" },
    { source: "/onlyfans/generador-subtitulos", destination: "/onlyfans/post-caption-generator" },
    { source: "/onlyfans/generador-promociones", destination: "/onlyfans/promo-generator" },

    // Patreon
    { source: "/patreon/generador-descripcion-niveles", destination: "/patreon/tier-description-generator" },
    { source: "/patreon/generador-pagina-sobre-mi", destination: "/patreon/about-page-generator" },
    { source: "/patreon/generador-publicaciones", destination: "/patreon/post-generator" },
  ];
}
```

---

## Testing Checklist (Per Tool)

Before marking a tool complete:

- [ ] API route returns correct data
- [ ] Turnstile widget loads and verifies
- [ ] Generate button disabled until Turnstile completes
- [ ] Form validation works (empty inputs show errors)
- [ ] Results display correctly
- [ ] Copy button works
- [ ] "Use again" resets form and Turnstile token
- [ ] All UI translations work (switch 🇺🇸/🇪🇸)
- [ ] Output language selector works (if applicable)
- [ ] Generated content is in selected language
- [ ] English URL works (`/platform/tool-name`)
- [ ] Spanish URL works (`/platform/nombre-español`)
- [ ] Dark mode looks correct
- [ ] Mobile responsive design works
- [ ] Related tools links work
- [ ] SEO metadata appears in page source
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Appwrite logs generation

---

## Platform-Specific Notes

### Medium

- Focus on SEO-optimized headlines
- Hook paragraphs should reduce bounce rate
- Bio must be ≤160 chars

### Etsy

- Front-load keywords in titles
- Include materials, dimensions, care instructions in descriptions
- SEO is critical for discoverability

### OnlyFans

- ALL content must be SFW
- Focus on personality, exclusivity, value proposition
- No explicit language in any output

### Patreon

- Use platform vocabulary: "patrons", "tiers", "benefits"
- Tier value should escalate clearly
- About pages should tell a story
