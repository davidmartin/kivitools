# Quickstart: OnlyFans Creator AI Tools

**Feature**: 013-onlyfans-creator-tools  
**Date**: November 30, 2025  
**Estimated Time**: 4-6 hours

## Prerequisites

- Node.js 18+ installed
- Access to KiviTools repository
- DeepSeek API key configured in `.env.local`
- Appwrite project configured

## Implementation Order

### Phase 1: Platform Setup (1 hour)

1. **Verify/Create Platform Hub Page**

   ```
   app/(tools)/onlyfans/page.tsx
   ```

   - Check if exists, update if needed
   - Follow existing platform hub pattern

2. **Add Platform Logo**

   ```
   public/platforms/onlyfans.svg
   ```

   - Download or create simple SVG logo
   - Update `app/components/platform-logo.tsx`

3. **Update Navigation**

   ```
   app/components/navigation.tsx
   ```

   - Add OnlyFans to platforms array
   - Add tool links

4. **Update Tool Selector**
   ```
   app/components/tool-selector.tsx
   ```
   - Add OnlyFans to Platform type
   - Add tools to PLATFORM_TOOLS

### Phase 2: P1 Tools (2 hours)

5. **Bio Generator**

   - API: `app/api/tools/onlyfans/bio-generator/route.ts`
   - Page: `app/(tools)/onlyfans/bio-generator/page.tsx`
   - DeepSeek: Add `generateOnlyFansBio` function

6. **Caption Generator**
   - API: `app/api/tools/onlyfans/caption-generator/route.ts`
   - Page: `app/(tools)/onlyfans/caption-generator/page.tsx`
   - DeepSeek: Add `generateOnlyFansCaption` function

### Phase 3: P2 Tools (1.5 hours)

7. **PPV Message Generator**

   - API: `app/api/tools/onlyfans/ppv-message-generator/route.ts`
   - Page: `app/(tools)/onlyfans/ppv-message-generator/page.tsx`
   - DeepSeek: Add `generateOnlyFansPPVMessage` function

8. **Welcome Message Generator**
   - API: `app/api/tools/onlyfans/welcome-message-generator/route.ts`
   - Page: `app/(tools)/onlyfans/welcome-message-generator/page.tsx`
   - DeepSeek: Add `generateOnlyFansWelcomeMessage` function

### Phase 4: Integration (1 hour)

9. **Translations**

   - Add to `lib/locales/en/common.ts`
   - Add to `lib/locales/es/common.ts`
   - Include: nav, tool names, form labels, features, FAQs

10. **SEO & Routing**

    - Update `lib/seo-metadata.ts` with OnlyFans platform
    - Add Spanish URL rewrites to `next.config.ts`
    - Update `docs/RUTAS_ALIAS.md`

11. **Home Page & PRD**
    - Add OnlyFans to `app/page.tsx` platforms array
    - Update `PRD.md` with tool status

### Phase 5: Testing (30 min)

12. **Manual Testing Checklist**
    - [ ] Navigate to each tool page (EN + ES URLs)
    - [ ] Fill forms and generate content
    - [ ] Verify Turnstile loads and works
    - [ ] Test copy functionality
    - [ ] Test "Use Again" button
    - [ ] Switch languages (🇺🇸/🇪🇸)
    - [ ] Test dark mode
    - [ ] Test mobile responsive
    - [ ] Verify Appwrite logging

## Key Code Patterns

### DeepSeek Function Pattern

```typescript
export async function generateOnlyFansBio(params: {
  niche: string;
  personality?: string;
  unique?: string;
  tone: string;
  language: string;
}): Promise<string[]> {
  const languageInstruction =
    params.language === "es" ? "Respond in Spanish." : "Respond in English.";

  const prompt = `You are a professional marketing assistant for content creators.
Generate engaging, professional bios that focus on personality and value proposition.
IMPORTANT: Do NOT generate explicit, sexual, or adult content.
Keep all language professional and platform-appropriate.

Generate 5 unique bio options for an OnlyFans creator.
Niche: ${params.niche}
${params.personality ? `Personality: ${params.personality}` : ""}
${params.unique ? `Unique traits: ${params.unique}` : ""}
Tone: ${params.tone}

${languageInstruction}
Keep each bio under 150 characters.
Return ONLY the 5 bios, one per line, numbered 1-5.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 1000,
  });

  const content = completion.choices[0]?.message?.content || "";
  return content
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 0)
    .slice(0, 5);
}
```

### API Route Pattern

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { niche, tone, turnstileToken, language } = body;

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

    // 2. Validate
    if (!niche?.trim()) {
      return NextResponse.json(
        { success: false, error: "Niche is required" },
        { status: 400 }
      );
    }

    // 3. Generate
    const result = await generateOnlyFansBio({
      niche: niche.trim(),
      tone: tone || "friendly",
      language: language || "en",
    });

    // 4. Log
    await saveGenerationLog({
      platform: "onlyfans",
      tool: "bio-generator",
      requestData: { niche, tone, language },
      responseData: { result },
      userIp,
      language: language || "en",
    });

    // 5. Return
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate. Please try again." },
      { status: 500 }
    );
  }
}
```

## Common Pitfalls

1. **Forgetting content moderation prompt** - Always include guardrails
2. **Missing Spanish translations** - Check both EN and ES files
3. **Not resetting Turnstile on "Use Again"** - Call `setTurnstileToken("")`
4. **Wrong color scheme** - Use pink for OnlyFans
5. **Missing platform integration point** - Check all 10 points

## Verification Commands

```bash
# Check for TypeScript errors
npm run build

# Start dev server
npm run dev

# Test URLs
open http://localhost:3000/onlyfans
open http://localhost:3000/onlyfans/bio-generator
open http://localhost:3000/onlyfans/generador-bio  # Spanish
```
