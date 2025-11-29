# Quickstart Guide: SEO Tools Expansion

**Feature**: 007-seo-tools-expansion  
**Date**: November 29, 2025

## Prerequisites

- Node.js 18+
- npm installed
- Access to `.env.local` with `DEEPSEEK_API_KEY`
- Familiarity with Next.js App Router

## Getting Started

```bash
# Ensure you're on the feature branch
git checkout 007-seo-tools-expansion

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Creating a New Calculator Tool (No AI)

### Step 1: Create Page Component

```bash
mkdir -p app/\(tools\)/instagram/engagement-calculator
```

Create `page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformBadge from "@/app/components/platform-badge";
import Link from "next/link";

export default function InstagramEngagementCalculatorPage() {
  const { t } = useLanguage();
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateEngagement = () => {
    const f = parseInt(followers) || 0;
    const l = parseInt(likes) || 0;
    const c = parseInt(comments) || 0;
    
    if (f === 0) return;
    
    const rate = ((l + c) / f) * 100;
    setResult(Math.round(rate * 100) / 100);
  };

  const getEngagementLevel = (rate: number) => {
    if (rate >= 6) return { text: t("calculator.excellent"), color: "text-green-600" };
    if (rate >= 3) return { text: t("calculator.good"), color: "text-blue-600" };
    if (rate >= 1) return { text: t("calculator.average"), color: "text-yellow-600" };
    return { text: t("calculator.low"), color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <PlatformBadge platform="instagram" className="mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("instagramEngagementCalculator.title")}
          </h1>
          <p className="text-xl text-muted">
            {t("instagramEngagementCalculator.description")}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.followers")}
              </label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.likes")}
              </label>
              <input
                type="number"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("instagramEngagementCalculator.form.comments")}
              </label>
              <input
                type="number"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
              />
            </div>
          </div>

          <Button
            onPress={calculateEngagement}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            {t("instagramEngagementCalculator.form.calculate")}
          </Button>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-6 bg-surface border border-border rounded-xl text-center">
              <p className="text-sm text-muted mb-2">
                {t("instagramEngagementCalculator.result.label")}
              </p>
              <p className="text-5xl font-bold text-foreground">{result}%</p>
              <p className={`text-lg mt-2 ${getEngagementLevel(result).color}`}>
                {getEngagementLevel(result).text}
              </p>
            </div>
          )}
        </div>

        {/* Add: Features, Hero, How It Works, FAQ, Related Tools sections */}
      </div>
    </div>
  );
}
```

### Step 2: Add Translations

In `lib/locales/en/instagram.ts` and `lib/locales/es/instagram.ts`:

```typescript
// English
"instagramEngagementCalculator.title": "Instagram Engagement Rate Calculator",
"instagramEngagementCalculator.description": "Calculate your engagement rate instantly",
"instagramEngagementCalculator.form.followers": "Followers",
"instagramEngagementCalculator.form.likes": "Average Likes",
"instagramEngagementCalculator.form.comments": "Average Comments",
"instagramEngagementCalculator.form.calculate": "Calculate",
"instagramEngagementCalculator.result.label": "Your Engagement Rate",
// ... add all FAQ, features, etc.

// Spanish
"instagramEngagementCalculator.title": "Calculadora de Engagement de Instagram",
"instagramEngagementCalculator.description": "Calcula tu tasa de engagement al instante",
// ... etc.
```

### Step 3: Add Spanish URL Rewrite

In `next.config.ts`:

```typescript
{
  source: "/instagram/calculadora-engagement",
  destination: "/instagram/engagement-calculator"
}
```

### Step 4: Document Route

In `docs/RUTAS_ALIAS.md`:

```markdown
| /instagram/engagement-calculator | /instagram/calculadora-engagement |
```

## Creating a New AI Generator Tool

### Step 1: Create Page Component

Similar to calculator, but with:
- `turnstileToken` state
- `TurnstileWidget` component
- API fetch instead of client calculation

### Step 2: Create API Route

```bash
mkdir -p app/api/tools/youtube/channel-name-generator
```

Create `route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeChannelNames } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, style, language, turnstileToken } = body;

    // Verify Turnstile
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

    // Validate inputs
    if (!keywords?.trim()) {
      return NextResponse.json(
        { success: false, error: "Keywords required" },
        { status: 400 }
      );
    }

    // Generate with DeepSeek
    const names = await generateYouTubeChannelNames({
      keywords: keywords.trim(),
      style: style || "creative",
      language: language || "en",
    });

    // Log to Appwrite
    await saveGenerationLog({
      platform: "youtube",
      tool: "channel-name-generator",
      requestData: body,
      responseData: { names },
      userIp,
      language: language || "en",
    });

    return NextResponse.json({ success: true, names });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate" },
      { status: 500 }
    );
  }
}
```

### Step 3: Add DeepSeek Function

In `lib/deepseek.ts`:

```typescript
export async function generateYouTubeChannelNames(params: {
  keywords: string;
  style: string;
  language: string;
}): Promise<string[]> {
  const prompt = `You are a creative YouTube channel name generator.
Generate 10 unique and memorable channel names based on:
- Keywords: ${params.keywords}
- Style: ${params.style}
- Language: ${params.language}

Requirements:
- Names must be 3-30 characters
- Easy to spell and remember
- Mix of serious and creative options
- No special characters or spaces (YouTube username format)

Return ONLY the names, one per line, numbered 1-10.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 500,
  });

  const content = completion.choices[0]?.message?.content || "";
  
  // Parse numbered list
  const names = content
    .split("\n")
    .map(line => line.replace(/^\d+\.\s*/, "").trim())
    .filter(name => name.length > 0 && name.length <= 30);

  return names;
}
```

## Creating a New Platform

### Full Checklist

1. **Create platform directory**:
   ```bash
   mkdir -p app/\(tools\)/podcast
   ```

2. **Create hub page** (`page.tsx`):
   - List all tools for this platform
   - Platform description
   - Platform badge

3. **Create layout** (`layout.tsx`):
   - Metadata for platform
   - Breadcrumbs

4. **Update navigation** (`app/components/navigation.tsx`):
   - Add to `platforms` array

5. **Add translations**:
   - `nav.podcast` key
   - Platform page translations

6. **Update SEO** (`lib/seo-metadata.ts`):
   - Add platform to `platformColors`
   - Add platform to `platformNames`

7. **Update tool selector** (`app/components/tool-selector.tsx`)

8. **Add platform logo** (`public/platforms/podcast.svg`)

9. **Update home page** (`app/page.tsx` - platforms array)

10. **Add URL rewrites** (`next.config.ts`)

11. **Document routes** (`docs/RUTAS_ALIAS.md`)

## Testing Checklist

For each new tool:

- [ ] Page loads without errors
- [ ] Form validation works
- [ ] Generation/calculation works
- [ ] Copy button works
- [ ] English URL works
- [ ] Spanish URL works
- [ ] Dark mode looks correct
- [ ] Mobile responsive
- [ ] Lighthouse Performance >90
- [ ] Lighthouse SEO >95
- [ ] All translations present (ES/EN)

## Deployment

```bash
# Build locally to check for errors
npm run build

# If build passes, commit and push
git add .
git commit -m "feat(instagram): add engagement rate calculator"
git push origin 007-seo-tools-expansion
```

## Resources

- [copilot-instructions.md](/.github/copilot-instructions.md) - Full development guidelines
- [PRD.md](/PRD.md) - Product requirements
- [RUTAS_ALIAS.md](/docs/RUTAS_ALIAS.md) - URL routing docs
- [spec.md](./spec.md) - Feature specification
- [plan.md](./plan.md) - Implementation plan
