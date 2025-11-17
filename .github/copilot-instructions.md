# GitHub Copilot Instructions for KiviTools

## ⚠️ CRITICAL REMINDER: Complete Platform Integration Checklist

**When adding a NEW PLATFORM, you MUST update ALL 10 files/locations:**

1. ✅ Platform hub page (`app/(tools)/[platform]/page.tsx`)
2. ✅ Navigation header (`app/components/navigation.tsx`)
3. ✅ Translations (`lib/translations.ts`) - **MUST include `"nav.[platform]": "[Platform Name]"` in BOTH es and en**
4. ✅ SEO metadata (`lib/seo-metadata.ts`)
5. ✅ Tool selector (`app/components/tool-selector.tsx`)
6. ✅ **Platform logo** (`app/components/platform-logo.tsx` + logo file in `/public/platforms/`)
7. ✅ **Home page** (`app/page.tsx` - platforms array)
8. ✅ Spanish URL rewrites (`next.config.ts`)
9. ✅ Routes documentation (`docs/RUTAS_ALIAS.md`)
10. ✅ PRD update (`PRD.md`)

**DO NOT skip steps 3, 6 and 7** - they are easy to forget:
- Step 3: Must add `nav.[platform]` translation key
- Step 6: Platform logo component + SVG file
- Step 7: Home page platforms array

---

## Project Overview

This is a Next.js 16.0.1 application with TypeScript that provides free AI-powered tools for **any digital platform** - not just social media. The app uses:

- **Framework**: Next.js 16.0.1 with App Router
- **UI Library**: HeroUI v3 Beta (@heroui/react v3.0.0-beta.1)
- **Styling**: Tailwind CSS v4
- **AI Provider**: DeepSeek API (deepseek-chat model)
- **API Key**: Stored in `.env.local` as `DEEPSEEK_API_KEY`
- **Design Rule**: NEVER use gradients (`bg-linear-to-*` or `bg-gradient-to-*`). Use solid colors only.
- **Tone Rule**: ALL user-facing text MUST have a comedic, fun, and lighthearted tone. Be witty, sarcastic (in a friendly way), and entertaining. Never be boring or corporate.

## Platform Philosophy

KiviTools is designed to support **any digital platform**, not just social media. This includes:

- **Social Media**: TikTok, Instagram, Twitter, Snapchat, YouTube, etc.
- **Music Platforms**: Suno, Spotify, SoundCloud
- **Forums**: Reddit, Forocoches, Discord servers
- **Streaming**: Twitch, YouTube Live
- **Gaming**: Discord, Steam communities
- **Any other digital platform** that can benefit from AI-powered content tools

When creating new tools, think broadly about what platforms could benefit from them.

## Documentation Structure

**IMPORTANT**: All repository documentation Markdown files are stored in the `docs/` directory at the repository root.

**Exceptions** (stored at root):

- `PRD.md` - Product Requirements Document
- `README.md` - Main project README

**Documentation in `docs/`:**

- Technical guides and implementation docs
- Platform-specific reviews
- Setup and integration guides
- SEO and marketing documentation
- Image optimization guide (`IMAGE_OPTIMIZATION.md`)
- URL routing documentation (`RUTAS_ALIAS.md`)

**When creating new documentation**: Always place it in `docs/` unless it's the PRD or main README.

## Content Tone Guidelines

### CRITICAL: All Text Must Be Fun and Comedic

**MANDATORY**: Every piece of user-facing text (titles, descriptions, FAQs, error messages, etc.) MUST follow a comedic and entertaining tone.

**Examples of Good Tone:**

✅ "Scripts tan buenos que hasta tu abuela te pedirá el enlace (aunque no sepa qué es TikTok)"
✅ "Captions que consiguen likes más rápido que puedes decir 'aesthetic'"
✅ "Hilos tan buenos que la gente olvidará que vino a discutir"
✅ "Porque tu Snap merece algo mejor que 'Hola' con la cara de perrito"

**Examples of Bad Tone (Too Boring):**

❌ "Generate professional scripts for your TikTok videos"
❌ "Create engaging captions for Instagram posts"
❌ "Write Twitter threads that get engagement"

**Writing Style Rules:**

1. **Be Playful**: Use humor, exaggeration, and self-deprecation
2. **Be Relatable**: Reference common user frustrations and experiences
3. **Be Honest**: Acknowledge the absurdity of social media while helping users succeed
4. **Use Emojis**: Sprinkle emojis throughout (but don't overdo it)
5. **Keep It Short**: Punchy, memorable phrases work best
6. **No Corporate Speak**: Avoid buzzwords like "leverage", "synergy", "optimize" unless used ironically

**When Writing Translations:**

- Spanish: Use colloquial expressions, "tú" form, and Latin American Spanish
- English: Casual, conversational, with a touch of sarcasm
- Both: Should feel like advice from a funny friend, not a business tool

## Internationalization (i18n) System

### CRITICAL: Always Use Translations

**IMPORTANT**: This project has a complete bilingual system (Spanish/English). When creating or modifying ANY user-facing text, you MUST use the translation system.

### Translation System Architecture

1. **Translation Keys**: Located in `lib/translations.ts`

   - Uses FLAT key structure with dot notation: `"nav.title"`, `"home.hero.title"`
   - Available languages: `es` (Spanish), `en` (English)
   - All keys must exist in BOTH languages

2. **Language Context**: `contexts/LanguageContext.tsx`

   - Provides `useLanguage()` hook
   - Returns: `{ language, setLanguage, t }`
   - `t(key: string)` function for accessing translations

3. **Usage Pattern**:

   ```tsx
   "use client"; // Must be client component to use context

   import { useLanguage } from "@/contexts/LanguageContext";

   export default function MyComponent() {
     const { t, language, setLanguage } = useLanguage();

     return (
       <div>
         <h1>{t("mySection.title")}</h1>
         <p>{t("mySection.description")}</p>
       </div>
     );
   }
   ```

### When Creating New Components

1. **Convert to Client Component**: Add `"use client"` directive at the top
2. **Import useLanguage**: `import { useLanguage } from "@/contexts/LanguageContext";`
3. **Get t function**: `const { t } = useLanguage();`
4. **Replace ALL hardcoded text** with `t("key.name")`
5. **Add translation keys** to both `es` and `en` in `lib/translations.ts`

### Translation Key Naming Convention

- Use dot notation to organize keys hierarchically
- Format: `section.component.element.property`
- Examples:
  - Navigation: `"nav.title"`, `"nav.tiktokTools"`
  - Forms: `"scriptWriter.form.topic"`, `"scriptWriter.form.generate"`
  - Results: `"videoIdeas.result.title"`, `"hookGenerator.result.copy"`
  - Common: `"common.loading"`, `"common.error"`, `"common.success"`

### Existing Translation Sections

- `nav.*` - Navigation menu
- `footer.*` - Footer links and text
- `home.*` - Homepage sections (hero, features, badges)
- `scriptWriter.*` - TikTok Script Writer tool
- `videoIdeas.*` - TikTok Video Ideas Generator
- `hookGenerator.*` - TikTok Hook Generator
- `hashtagGenerator.*` - TikTok Hashtag Generator

### Example: Adding a New Feature

```tsx
// BAD - Hardcoded text ❌
<button>Generate Content</button>
<p>This tool helps you create amazing content</p>

// GOOD - Using translations ✅
const { t } = useLanguage();
<button>{t("myTool.form.generate")}</button>
<p>{t("myTool.description")}</p>
```

Then add to `lib/translations.ts`:

```typescript
export const translations = {
  es: {
    // ... existing keys
    "myTool.form.generate": "Generar Contenido",
    "myTool.description":
      "Esta herramienta te ayuda a crear contenido increíble",
  },
  en: {
    // ... existing keys
    "myTool.form.generate": "Generate Content",
    "myTool.description": "This tool helps you create amazing content",
  },
};
```

## Component Patterns

### CRITICAL: Always Use HeroUI v3 Components

**MANDATORY**: This project uses HeroUI v3 Beta (@heroui/react v3.0.0-beta.1) as the UI library. You MUST use HeroUI components for ALL UI elements instead of native HTML elements.

### HeroUI v3 Component Usage Rules

1. **Use HeroUI components, NOT native HTML**:

   - ✅ `<Button onPress={...}>` NOT ❌ `<button onClick={...}>`
   - ✅ `<Input>` NOT ❌ `<input>`
   - ✅ `<TextArea>` NOT ❌ `<textarea>`
   - ✅ `<Card>` NOT ❌ `<div className="card">`
   - ✅ `<Select>` NOT ❌ `<select>`
   - ✅ `<Popover>` for dropdowns NOT ❌ native `<div>` dropdowns

2. **Import from @heroui/react**:

   ```tsx
   import {
     Button,
     Card,
     Input,
     TextArea,
     Select,
     Popover,
   } from "@heroui/react";
   ```

3. **Use compound component pattern**:

   ```tsx
   <Card>
     <Card.Header>
       <Card.Title>Title</Card.Title>
     </Card.Header>
     <Card.Content>Content here</Card.Content>
   </Card>
   ```

4. **Button events use `onPress`, NOT `onClick`**:

   ```tsx
   <Button onPress={() => handleClick()}>Click me</Button>
   ```

5. **Common HeroUI Components Available**:

   - Button, Card, Input, TextArea, Select, Popover
   - Checkbox, CheckboxGroup, RadioGroup, Switch
   - Avatar, Chip, Badge, Tooltip, Spinner
   - Accordion, Tabs, Alert, Separator
   - Form, Label, Description, FieldError

6. **HeroUI Props Pattern**:
   - `variant`: Visual style (primary, secondary, tertiary, ghost, danger)
   - `size`: Size (sm, md, lg)
   - `isDisabled`: Disabled state
   - `isPending`: Loading state
   - `className`: Additional Tailwind classes

**BEFORE writing any component, check if there's a HeroUI component for it.**

### HeroUI v3 Theme System

**CRITICAL**: Always use HeroUI's semantic color classes for proper light/dark mode support.

#### Color Classes to Use:

**Text Colors:**

- `text-foreground` - Primary text color
- `text-muted` - Secondary/muted text
- `text-accent` - Accent color for links/highlights
- `text-success`, `text-warning`, `text-danger` - Status colors

**Background Colors:**

- `bg-background` - Main page background
- `bg-surface` - Card/section backgrounds
- `bg-overlay` - Modal/overlay backgrounds
- `bg-accent` - Accent backgrounds
- `hover:bg-accent-hover` - Accent hover states

**Borders:**

- `border-border` - Standard borders
- `border-divider` - Divider lines

**Special:**

- Use `bg-success-soft`, `bg-warning-soft`, `bg-danger-soft` for soft status backgrounds
- Use corresponding `text-success-soft-foreground` for text on soft backgrounds

#### DO NOT Use:

- ❌ `text-gray-900 dark:text-white` - Use `text-foreground` instead
- ❌ `bg-white dark:bg-gray-900` - Use `bg-surface` instead
- ❌ `text-gray-600 dark:text-gray-300` - Use `text-muted` instead
- ❌ Hard-coded color classes that don't adapt to theme

#### Theme Structure:

```tsx
// Layout must have theme attributes
<html className="light" data-theme="light">
  <body className="bg-background text-foreground">
```

#### Custom Colors (when needed):

For brand colors (purple, pink gradients), you can still use them, but combine with semantic classes:

```tsx
<div className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
  {/* Gradient is fine for brand elements */}
</div>
```

### Tool Page Structure

All tool pages must follow this **complete** structure with 7 sections:

1. **Header Section** (always include):

   ```tsx
   <div className="text-center mb-12">
     <div className="inline-block px-4 py-2 bg-[platform]-100 dark:bg-[platform]-900/30 text-[platform]-600 dark:text-[platform]-400 rounded-full text-sm font-semibold mb-4">
       [Icon] [Platform] Tool
     </div>
     <h1 className="text-5xl font-bold text-foreground mb-4">
       {t("toolName.title")}
     </h1>
     <p className="text-xl text-muted">{t("toolName.description")}</p>
   </div>
   ```

   - TikTok tools: Use purple colors (`bg-purple-100`, `text-purple-600`) with 🎵 icon
   - Instagram tools: Use pink colors (`bg-pink-100`, `text-pink-600`) with 📸 icon
   - Twitter tools: Use blue colors (`bg-blue-100`, `text-blue-600`) with 🐦 icon

2. **Form Section**: Input fields with labels and proper validation
3. **Results Section**: Display generated content with copy button

4. **Features Section** (Top Features - 4 cards in 2x2 grid):

   ```tsx
   <div className="mt-12">
     <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
       {t("toolName.topFeatures.title")}
     </h2>
     <div className="grid md:grid-cols-2 gap-6">{/* 4 feature cards */}</div>
   </div>
   ```

5. **Hero Description Section** (Full explanation of the tool):

   ```tsx
   <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
     <h2 className="text-3xl font-bold text-foreground mb-4">
       {t("toolName.hero.subtitle")}
     </h2>
     <div className="text-muted whitespace-pre-line">
       {t("toolName.hero.description")}
     </div>
   </div>
   ```

6. **How It Works Section** (3 numbered steps):

   ```tsx
   <div className="mt-16">
     <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
       {t("toolName.howItWorks.title")}
     </h2>
     <div className="grid md:grid-cols-3 gap-8">
       {/* 3 steps with numbered circles */}
       <div className="text-center">
         <div className="bg-[platform]-100 dark:bg-[platform]-900/30 text-[platform]-600 dark:text-[platform]-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
           1
         </div>
         <h3 className="text-xl font-bold text-foreground mb-2">
           {t("toolName.howItWorks.step1.title")}
         </h3>
         <p className="text-muted">
           {t("toolName.howItWorks.step1.description")}
         </p>
       </div>
       {/* Repeat for steps 2 and 3 */}
     </div>
   </div>
   ```

7. **FAQ Section** (5 common questions):

   ```tsx
   <div className="mt-16 bg-surface rounded-2xl p-8 shadow-lg">
     <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
       {t("toolName.faq.title")}
     </h2>
     <div className="space-y-6">
       {/* 5 FAQ items */}
       <div>
         <h3 className="text-lg font-bold text-foreground mb-2">
           {t("toolName.faq.q1")}
         </h3>
         <p className="text-muted">{t("toolName.faq.a1")}</p>
       </div>
       {/* Repeat for q2-q5 */}
     </div>
   </div>
   ```

8. **Related Tools Section** (Grid of links to other tools on the same platform):

   ```tsx
   <div className="mt-16">
     <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
       {t("toolName.relatedTools.title")}
     </h2>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {relatedTools.map((tool) => (
         <Link
           key={tool.href}
           href={tool.href}
           className="bg-surface hover:bg-accent-hover border border-border rounded-lg p-4 text-center transition-colors"
         >
           <span className="text-sm font-medium text-foreground hover:text-accent">
             {tool.name}
           </span>
         </Link>
       ))}
     </div>
   </div>
   ```

**Translation Keys Required for Each Tool**:

For every tool, you MUST add these translation keys in both `es` and `en`:

```typescript
// lib/translations.ts structure for each tool
{
  "toolName.title": "Tool Title",
  "toolName.description": "Short description (1 line)",
  "toolName.hero.subtitle": "Section headline",
  "toolName.hero.description": "Full explanation paragraph (can use \n for line breaks)",
  "toolName.howItWorks.title": "How It Works Section Title",
  "toolName.howItWorks.step1.title": "Step 1 Title",
  "toolName.howItWorks.step1.description": "Step 1 explanation",
  "toolName.howItWorks.step2.title": "Step 2 Title",
  "toolName.howItWorks.step2.description": "Step 2 explanation",
  "toolName.howItWorks.step3.title": "Step 3 Title",
  "toolName.howItWorks.step3.description": "Step 3 explanation",
  "toolName.topFeatures.title": "Top Features Section Title",
  "toolName.faq.title": "Frequently Asked Questions",
  "toolName.faq.q1": "Question 1",
  "toolName.faq.a1": "Answer 1",
  "toolName.faq.q2": "Question 2",
  "toolName.faq.a2": "Answer 2",
  "toolName.faq.q3": "Question 3",
  "toolName.faq.a3": "Answer 3",
  "toolName.faq.q4": "Question 4",
  "toolName.faq.a4": "Answer 4",
  "toolName.faq.q5": "Question 5",
  "toolName.faq.a5": "Answer 5",
  "toolName.relatedTools.title": "Related Tools",
  // ... plus all form/result/feature keys
}
```

**IMPORTANT**: When creating or modifying ANY tool page:

1. Include ALL 8 sections above (header → related tools)
2. Add ALL required translation keys to both `es` and `en` in `lib/translations.ts`
3. Use semantic color classes (`text-foreground`, `bg-surface`, etc.)
4. Create a `relatedTools` array with links to other tools on the same platform
5. Reference the TikTok Username Generator (`app/(tools)/tiktok/username-generator/page.tsx`) as the complete example

### HeroUI v3 Components

**CRITICAL**: Always use HeroUI v3 components instead of native HTML elements.

- Use compound component pattern: `<Card><Card.Header><Card.Title>...</Card.Title></Card.Header></Card>`
- Button events use `onPress`, NOT `onClick`
- Common props: `variant`, `size`, `color`, `isDisabled`, `className`
- Import from `@heroui/react`: `import { Button, Card, Input } from "@heroui/react";`
- Check available components: Button, Card, Input, TextArea, Select, Popover, Checkbox, RadioGroup, Switch, Avatar, Chip, Tooltip, Spinner, Accordion, Tabs, Alert, Separator

### DeepSeek API Integration

- All AI calls go through `/app/api/tools/[platform]/[tool]/route.ts`
- Use server-side processing to hide API key
- Import from `@/lib/deepseek`
- Standard pattern:
  ```typescript
  const response = await fetch("/api/tools/tiktok/script-writer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, tone, duration, language }),
  });
  ```

### Form State Management

- Use `useState` for form inputs and loading states
- Loading state pattern: `isLoading ? "Generating..." : "Generate"`
- Show results in textarea/cards after successful API response

## Styling Guidelines

### Tailwind CSS v4 Syntax

- Gradients: `bg-linear-to-br` NOT `bg-gradient-to-br`
- Flex: `shrink-0` NOT `flex-shrink-0`
- Dark mode: Use `dark:` prefix for all color variants

### Common Patterns

- Cards: `hover:shadow-xl transition-shadow duration-300`
- Buttons: `px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors`
- Sections: `py-12 px-4` or `py-20 px-4` for hero sections

## File Structure

```
app/
  (tools)/           # Tool pages (grouped route)
    tiktok/
      script-writer/
      video-ideas/
      hook-generator/
      hashtag-generator/
  api/
    tools/
      tiktok/       # API routes for TikTok tools
  components/       # Shared components
  layout.tsx        # Root layout with LanguageProvider
  page.tsx          # Homepage
contexts/
  LanguageContext.tsx  # i18n context provider
lib/
  deepseek.ts       # DeepSeek API wrapper
  translations.ts   # Translation dictionaries
types/
  index.ts          # TypeScript type definitions
```

## Important Rules

### DO:

- ✅ Always use the translation system for user-facing text
- ✅ Add new translation keys to BOTH `es` and `en` sections
- ✅ Use `"use client"` for components using `useLanguage()`
- ✅ Use HeroUI v3 components for ALL UI elements (Button, Input, Card, etc.)
- ✅ Use `onPress` for HeroUI buttons (NOT `onClick`)
- ✅ Import HeroUI components: `import { Button, Card } from "@heroui/react";`
- ✅ Keep API keys server-side only
- ✅ Use Tailwind CSS v4 syntax (`bg-linear-to-br`)
- ✅ **Update PRD.md after every significant change** (see PRD Update section below)

### DON'T:

- ❌ Never hardcode user-facing text in English or Spanish
- ❌ Don't use native HTML elements when HeroUI components exist (no `<button>`, use `<Button>`)
- ❌ Don't use `onClick` on HeroUI buttons (use `onPress`)
- ❌ Don't expose DEEPSEEK_API_KEY to client
- ❌ Don't use old Tailwind v3 syntax (`bg-gradient-to-br`)
- ❌ Don't forget to add keys to both language sections
- ❌ Don't use nested translation objects (use flat keys with dots)

## Testing Checklist

When making changes, verify:

1. [ ] All text uses translations (no hardcoded strings)
2. [ ] New translation keys exist in both `es` and `en`
3. [ ] Language switcher works (🇺🇸/🇪🇸 button in nav)
4. [ ] Component renders correctly in both languages
5. [ ] No TypeScript errors
6. [ ] Tailwind classes use v4 syntax
7. [ ] Dark mode variants are included

## Quick Reference

### Get translations in a component:

```tsx
const { t, language, setLanguage } = useLanguage();
```

### Add new translation:

```typescript
// lib/translations.ts
es: {
  "key.name": "Texto en español",
},
en: {
  "key.name": "Text in English",
}
```

### Use translation:

```tsx
{
  t("key.name");
}
```

### Toggle language:

```tsx
setLanguage(language === "en" ? "es" : "en");
```

---

## PRD.md Maintenance

### CRITICAL: Always Update PRD.md

**MANDATORY**: After implementing ANY significant feature, tool, or change, you MUST update the `PRD.md` file located at the project root.

### When to Update PRD.md

Update the PRD after:

- ✅ Creating new tools or features
- ✅ Completing development phases
- ✅ Implementing new platforms
- ✅ Adding new pages (legal, about, etc.)
- ✅ Changing tech stack or architecture
- ✅ Modifying component patterns or guidelines

### What to Update in PRD.md

1. **Feature Status**: Mark completed tools/features as ✅ in tables
2. **Platform Coverage**: Update tool counts and status
3. **Technical Stack**: Document new libraries or technologies
4. **Phase Progress**: Update development phase status
5. **Success Criteria**: Check off completed acceptance criteria
6. **Version & Date**: Update "Last Updated" date at top

### How to Update PRD.md

Keep updates **high-level** and **concise**:

- ✅ Update tool tables with status (P0/P1/P2 → ✅)
- ✅ Add completed features to relevant sections
- ✅ Update acceptance criteria checkboxes
- ✅ Note major architectural changes
- ❌ Don't add implementation details or code snippets
- ❌ Don't duplicate what's in git history
- ❌ Don't write lengthy paragraphs

### Example Update Pattern

When completing a tool:

```markdown
### 3.1 TikTok Tools

| Tool           | Status | Priority |
| -------------- | ------ | -------- |
| Script Writer  | ✅     | P0       |
| Video Ideas    | ✅     | P0       |
| Hook Generator | ✅     | P0       |
```

When completing a phase:

```markdown
### Phase 1: MVP ✅ Completed

- 10 tools implemented
- Analytics configured
- Responsive design verified
```

### Workflow Integration

**Before finishing any significant work:**

1. Implement the feature/tool
2. Test and verify it works
3. Update translations if needed
4. **Update PRD.md to reflect the change**
5. Commit everything together

**Example commit message:**

```
feat: Add Twitter Thread Maker tool

- Created API route and UI page
- Added translations for ES/EN
- Updated PRD.md tool status
```

---

**Remember**:

1. Every time you create or modify user-facing content, ask yourself: "Is this using the translation system?" If not, fix it before proceeding.
2. After completing ANY significant feature or tool, ask yourself: "Did I update PRD.md?" If not, update it before finishing.

---

## Creating a New Platform - Complete Checklist

### Step-by-Step Guide for Adding a New Platform

When creating a new platform (e.g., Suno, Spotify, Twitch, etc.), follow this checklist to ensure proper integration:

#### Platform Integration Checklist

When creating a new platform with tools:

1. **Create Platform Hub Page**

   - [ ] Create `/app/(tools)/[platform]/page.tsx`
   - [ ] Follow the TikTok/Instagram platform hub pattern
   - [ ] Create tools array with title, description, icon, href
   - [ ] Add platform info section with translations

2. **Update Navigation Header** (`app/components/navigation.tsx`)

   - [ ] Add platform object to `platforms` array with:
     - `id`: platform name (lowercase, e.g., "suno")
     - `name`: `t("nav.[platform]")` translation key
     - `emoji`: platform emoji icon
     - `tools`: array of tool objects with `name` and `href`

3. **Add Translation Keys** (`lib/translations.ts`)

   - [ ] **CRITICAL**: Add `"nav.[platform]": "[Platform Name]"` to BOTH `es` and `en` sections (navigation won't work without this!)
   - [ ] Add all tool-specific translations (see "Creating a New Tool" section below)
   - [ ] Add platform page translations: `"[platform].page.title"`, `"[platform].page.description"`, `"[platform].info.title"`, `"[platform].info.description"`

4. **Update SEO Metadata** (`lib/seo-metadata.ts`)

   - [ ] Add `"[platform]"` to `Platform` union type
   - [ ] Add platform to `platformColors` Record: `"[platform]": "[hex-color]"`
   - [ ] Add platform to `platformNames` Record: `"[platform]": "[Platform Name]"`

5. **Update Tool Selector** (`app/components/tool-selector.tsx`)

   - [ ] Add `"[platform]"` to `Platform` union type
   - [ ] Add platform tools to `PLATFORM_TOOLS` mapping

6. **Update Platform Logo Component** (`app/components/platform-logo.tsx`)

   - [ ] Add `"[platform]"` to `PlatformLogoProps` platform union type
   - [ ] If logo needs dark mode invert, add to `needsInvert` check
   - [ ] Ensure logo file exists in `/public/platforms/[platform].svg`

7. **Update Home Page** (`app/page.tsx`)

   - [ ] Add platform object to `platforms` array with:
     - `name`: "[Platform Name]"
     - `description`: `t("[platform].page.description")`
     - `href`: "/[platform]"
     - `icon`: "emoji"
     - `color`: "color-name"

8. **Create Spanish URL Aliases** (`next.config.ts`)

   - [ ] Add rewrite rule for Spanish platform URL (if needed)
   - [ ] Add rewrite rules for each tool's Spanish URL

9. **Document Routes** (`docs/RUTAS_ALIAS.md`)

   - [ ] Add platform and all tools with their English/Spanish URLs

10. **Update PRD.md**
   - [ ] Add platform to the platforms table
   - [ ] Add all tools to the platform's tool table
   - [ ] Mark initial status as ✅

**Example: Adding Suno Platform**

Files to create/modify:

```
app/(tools)/suno/page.tsx                          ← Create
app/(tools)/suno/[tool-1]/page.tsx                ← Create
app/(tools)/suno/[tool-2]/page.tsx                ← Create
app/api/tools/suno/[tool-1]/route.ts              ← Create
app/api/tools/suno/[tool-2]/route.ts              ← Create
lib/deepseek.ts                                    ← Add new functions
lib/translations.ts                                ← Add translations
app/components/navigation.tsx                      ← Add platform
app/components/tool-selector.tsx                   ← Add platform
lib/seo-metadata.ts                                ← Add platform colors/names
next.config.ts                                     ← Add URL rewrites
docs/RUTAS_ALIAS.md                               ← Document routes
PRD.md                                             ← Update status
```

**Example: Navigation Entry**

```typescript
{
  id: "suno",
  name: t("nav.suno"),
  emoji: "🎵",
  tools: [
    { name: t("sunoLyricGenerator.title"), href: "/suno/lyric-generator" },
    { name: t("sunoMusicPrompt.title"), href: "/suno/music-prompt-generator" },
    { name: t("sunoSongDescription.title"), href: "/suno/song-description-generator" },
  ],
},
```

**AFTER COMPLETING ALL STEPS:** Go to step "MANDATORY: Test All New Tools After Creation" and test every tool you just created before considering the work done.

---

## Creating a New Tool - Complete Checklist

### Step-by-Step Guide for Adding a New Tool

When creating a new tool, follow this comprehensive checklist to ensure nothing is missing:

#### 1. **Plan the Tool Structure**

- [ ] Define the platform (tiktok, instagram, twitter, etc.)
- [ ] Define the tool name (e.g., "username-generator")
- [ ] Define tool inputs (form fields needed)
- [ ] Define tool outputs (what the AI generates)
- [ ] Define the AI prompt structure

#### 2. **Create File Structure**

```
app/
  (tools)/
    [platform]/
      [tool-name]/
        page.tsx          ← Client component (UI)
  api/
    tools/
      [platform]/
        [tool-name]/
          route.ts        ← API route (server-side)
```

#### 3. **Implement API Route** (`app/api/tools/[platform]/[tool-name]/route.ts`)

**REQUIRED IMPORTS:**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generate[ToolName]Content } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";
```

**REQUIRED STRUCTURE:**

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { param1, param2, turnstileToken } = body;

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
    if (!param1 || param1.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Parameter is required" },
        { status: 400 }
      );
    }

    // 3. Generate content with DeepSeek
    const result = await generate[ToolName]Content({
      param1: param1.trim(),
      param2: param2 || "default",
    });

    // 4. Log to Appwrite
    await saveGenerationLog({
      platform: "[platform]",
      tool: "[tool-name]",
      requestData: body,
      responseData: { result },
      userIp: getUserIpFromRequest(request),
      language: "en",
    });

    // 5. Return success
    return NextResponse.json({
      success: true,
      result,
    });
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
    service: "[Platform] [Tool Name]"
  });
}
```

#### 4. **Add DeepSeek Function** (`lib/deepseek.ts`)

Add new export function:

```typescript
export async function generate[ToolName]Content(params: {
  param1: string;
  param2: string;
}): Promise<string | string[]> {
  const prompt = `You are an AI assistant...

  Generate [describe output]...

  Input: ${params.param1}
  Style: ${params.param2}

  Return ONLY the generated content, no explanations.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 1000,
  });

  const content = completion.choices[0]?.message?.content || "";

  // Parse response if needed (e.g., split by lines, JSON parse, etc.)
  return content.trim();
}
```

#### 5. **Create Page Component** (`app/(tools)/[platform]/[tool-name]/page.tsx`)

**REQUIRED IMPORTS:**

```typescript
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { LANGUAGES } from "@/types"; // If tool supports multiple output languages
```

**REQUIRED STATE:**

```typescript
const { t, language: uiLanguage } = useLanguage();
const [input1, setInput1] = useState("");
const [input2, setInput2] = useState("default");
const [language, setLanguage] = useState(uiLanguage); // Output language
const [result, setResult] = useState<string[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [turnstileToken, setTurnstileToken] = useState<string>("");
```

**REQUIRED SECTIONS (in order):**

1.  **Header Section** - Badge, title, description
2.  **Form Section** - Input fields with HeroUI components
3.  **Language Selector** - If tool supports multiple output languages
4.  **Turnstile Widget** - Bot verification (MUST be before generate button)
5.  **Generate Button** - Disabled if no Turnstile token
6.  **Results Section** - Display generated content
7.  **Features Section** - 4 cards in 2x2 grid
8.  **Hero Description** - Full explanation
9.  **How It Works** - 3 numbered steps
10. **FAQ Section** - 5 questions & answers
11. **Related Tools** - Grid of links

**Complete Template:** See `app/(tools)/snapchat/lens-ideas/page.tsx`

#### 6. **Add Translations** (`lib/translations.ts`)

Add to BOTH `es` and `en` sections:

```typescript
es: {
  // ... existing
  "toolName.title": "Título de la Herramienta",
  "toolName.description": "Descripción corta (1 línea)",
  "toolName.form.input1": "Campo 1",
  "toolName.form.input1Placeholder": "Ingresa...",
  "toolName.form.input2": "Campo 2",
  "toolName.form.language": "Idioma de salida", // If tool supports multiple languages
  "toolName.form.generate": "Generar",
  "toolName.form.generating": "Generando...",
  "toolName.form.useAgain": "Generar de nuevo",
  "toolName.form.error.empty": "Este campo es requerido",
  "toolName.result.title": "Resultados",
  "toolName.result.copy": "Copiar",
  "toolName.result.copied": "¡Copiado!",
  "toolName.result.copiedAll": "¡Todos copiados!", // For copy all button
  "toolName.result.success": "¡{count} resultados generados!",
  "toolName.topFeatures.title": "Características Principales",
  "toolName.features.feature1.title": "Título Característica 1",
  "toolName.features.feature1.description": "Descripción...",
  "toolName.features.feature2.title": "Título Característica 2",
  "toolName.features.feature2.description": "Descripción...",
  "toolName.features.feature3.title": "Título Característica 3",
  "toolName.features.feature3.description": "Descripción...",
  "toolName.features.feature4.title": "Título Característica 4",
  "toolName.features.feature4.description": "Descripción...",
  "toolName.hero.subtitle": "¿Qué es esta herramienta?",
  "toolName.hero.description": "Explicación completa en párrafos...",
  "toolName.howItWorks.title": "¿Cómo Funciona?",
  "toolName.howItWorks.step1.title": "Paso 1",
  "toolName.howItWorks.step1.description": "Descripción paso 1",
  "toolName.howItWorks.step2.title": "Paso 2",
  "toolName.howItWorks.step2.description": "Descripción paso 2",
  "toolName.howItWorks.step3.title": "Paso 3",
  "toolName.howItWorks.step3.description": "Descripción paso 3",
  "toolName.faq.title": "Preguntas Frecuentes",
  "toolName.faq.q1": "¿Pregunta 1?",
  "toolName.faq.a1": "Respuesta 1",
  "toolName.faq.q2": "¿Pregunta 2?",
  "toolName.faq.a2": "Respuesta 2",
  "toolName.faq.q3": "¿Pregunta 3?",
  "toolName.faq.a3": "Respuesta 3",
  "toolName.faq.q4": "¿Pregunta 4?",
  "toolName.faq.a4": "Respuesta 4",
  "toolName.faq.q5": "¿Pregunta 5?",
  "toolName.faq.a5": "Respuesta 5",
  "toolName.relatedTools.title": "Herramientas Relacionadas",
},
en: {
  // ... same structure in English
}
```

#### 7. **Add SEO Metadata** (in page.tsx)

**Import at top:**

```typescript
import { Metadata } from "next";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";
```

**Add metadata export:**

```typescript
export const metadata: Metadata = generateToolMetadata({
  platform: "[platform]",
  toolName: "[Tool Name]",
  title: "[Tool Title]",
  description: "[Tool description for SEO]",
  englishSlug: "[tool-name]",
  spanishSlug: "[nombre-herramienta]", // Optional
  keywords: ["keyword1", "keyword2", "keyword3"],
});
```

**Add JSON-LD script in component:**

```tsx
export default function ToolPage() {
  const toolJsonLd = generateToolJsonLd({
    platform: "[platform]",
    toolName: "[Tool Name]",
    title: "[Tool Title]",
    description: "[Description]",
    englishSlug: "[tool-name]",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "[platform]",
    toolName: "[Tool Name]",
    englishSlug: "[tool-name]",
  });

  const faqJsonLd = generateFaqJsonLd([
    { question: t("toolName.faq.q1"), answer: t("toolName.faq.a1") },
    { question: t("toolName.faq.q2"), answer: t("toolName.faq.a2") },
    { question: t("toolName.faq.q3"), answer: t("toolName.faq.a3") },
    { question: t("toolName.faq.q4"), answer: t("toolName.faq.a4") },
    { question: t("toolName.faq.q5"), answer: t("toolName.faq.a5") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Rest of component */}
    </>
  );
}
```

#### 8. **Add Spanish URL Alias** (`next.config.ts`)

Add rewrite rule for Spanish URL:

```typescript
async rewrites() {
  return [
    // ... existing rewrites
    {
      source: "/[platform]/[nombre-en-español]",
      destination: "/[platform]/[tool-name]"
    },
  ];
}
```

**Examples:**

- TikTok: `{ source: "/tiktok/generador-de-nombres", destination: "/tiktok/username-generator" }`
- Instagram: `{ source: "/instagram/generador-bio", destination: "/instagram/bio-generator" }`
- Twitter: `{ source: "/twitter/generador-tweets", destination: "/twitter/tweet-generator" }`

**Benefits:**

- ✅ SEO-friendly Spanish URLs
- ✅ Both URLs work (English + Spanish)
- ✅ No redirects (transparent rewrite)
- ✅ Better ranking in Spanish searches
- ✅ Both URLs indexed by Google

**Reference:** See `RUTAS_ALIAS.md` for complete list of existing aliases

#### 9. **Update SEO Metadata with Spanish Slug** (in page.tsx)

Update the metadata to include Spanish slug:

```typescript
export const metadata: Metadata = generateToolMetadata({
  platform: "[platform]",
  toolName: "[Tool Name]",
  title: "[Tool Title]",
  description: "[Tool description for SEO]",
  englishSlug: "[tool-name]",
  spanishSlug: "[nombre-en-español]", // ← Add this
  keywords: ["keyword1", "keyword2", "keyword3"],
});
```

This automatically adds `hreflang` alternate tags for better SEO.

#### 10. **Add to Platform Page** (`app/(tools)/[platform]/page.tsx`)

Add tool to the tools array:

```typescript
const tools = [
  // ... existing tools
  {
    title: t("toolName.title"),
    description: t("toolName.description"),
    icon: "🎯",
    href: "/[platform]/[tool-name]",
  },
];
```

#### 11. **Update Navigation** (`components/navigation.tsx`)

Add to dropdown menu if tool is important enough (optional).

#### 12. **Update RUTAS_ALIAS.md**

Add new Spanish URL to the documentation:

```markdown
| Inglés                | Español                    |
| --------------------- | -------------------------- |
| `/platform/tool-name` | `/platform/nombre-español` |
```

This helps track all available routes and maintain consistency.

#### 13. **Update PRD.md**

Mark tool as completed in the tools table:

```markdown
| Tool Name | Status | Priority |
| --------- | ------ | -------- |
| New Tool  | ✅     | P0       |
```

#### 14. **Testing Checklist**

- [ ] Form validation works (empty inputs show errors)
- [ ] **Turnstile widget loads and verifies** (check token state)
- [ ] **Generate button is disabled until Turnstile completes**
- [ ] **Turnstile token validation fails with 403** if missing/invalid
- [ ] API route returns correct data
- [ ] Results display correctly
- [ ] Copy button works
- [ ] Copy all button works (if multiple results)
- [ ] "Use again" resets form **and Turnstile token**
- [ ] All UI translations work (switch 🇺🇸/🇪🇸)
- [ ] **Output language selector works** (if tool has it)
- [ ] **Generated content is in selected language**
- [ ] **English URL works** (`/platform/tool-name`)
- [ ] **Spanish URL works** (`/platform/nombre-español`)
- [ ] Both URLs show same content (no redirects)
- [ ] Dark mode looks correct
- [ ] Mobile responsive design works
- [ ] Related tools links work
- [ ] SEO metadata appears in page source
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] `hreflang` alternate tags present in HTML
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] **Appwrite logs generation** (check database)

#### 15. **MANDATORY: Test All New Tools After Creation**

**CRITICAL**: After creating ANY new tool (or new platform with tools), you MUST test them immediately to ensure they work correctly.

**Testing Protocol:**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Each New Tool Manually:**
   - [ ] Navigate to the tool page (both English and Spanish URLs)
   - [ ] Fill in the form with realistic test data
   - [ ] Verify Turnstile widget loads and completes
   - [ ] Click "Generate" button
   - [ ] Verify API call succeeds and returns data
   - [ ] Check that results display correctly
   - [ ] Test "Copy" button functionality
   - [ ] Test "Use Again" button (should reset form and Turnstile)
   - [ ] Switch UI language (🇺🇸/🇪🇸) and verify translations work
   - [ ] If tool has output language selector, test generating in different languages
   - [ ] Test on mobile view (responsive design)
   - [ ] Test dark mode toggle

3. **Verify Navigation:**
   - [ ] Tool appears in platform dropdown menu
   - [ ] Tool appears in platform hub page
   - [ ] Tool appears in home page platform card (if new platform)
   - [ ] Related tools links work correctly

4. **Check Console & Network:**
   - [ ] No console errors in browser
   - [ ] API response is successful (200 status)
   - [ ] Check Appwrite database for generation log entry
   - [ ] Verify DeepSeek API call completed successfully

5. **Report Results:**
   - List all tested tools with their status (✅ or ❌)
   - Report any issues found
   - Confirm all tools are working before finishing

**Example Test Report:**
```
Testing Results:
✅ Voice Script Writer - All features working
✅ Video Voiceover Script - Generating correctly in EN/ES
✅ Voice Text Formatter - Formatting applied successfully
✅ Navigation updated and working
✅ All URLs accessible (EN + ES)
✅ Appwrite logs confirmed
```

**DO NOT** consider the task complete until you've tested the tools and confirmed they work.

#### 16. **Platform-Specific Styling**

Use these colors for consistency:

- **TikTok**: `bg-purple-100`, `text-purple-600`, `dark:bg-purple-900/30`, `dark:text-purple-400`
- **Instagram**: `bg-pink-100`, `text-pink-600`, `dark:bg-pink-900/30`, `dark:text-pink-400`
- **Twitter**: `bg-blue-100`, `text-blue-600`, `dark:bg-blue-900/30`, `dark:text-blue-400`
- **Snapchat**: `bg-yellow-100`, `text-yellow-600`, `dark:bg-yellow-900/30`, `dark:text-yellow-400`
- **YouTube**: `bg-red-100`, `text-red-600`, `dark:bg-red-900/30`, `dark:text-red-400`
- **Reddit**: `bg-orange-100`, `text-orange-600`, `dark:bg-orange-900/30`, `dark:text-orange-400`
- **Discord**: `bg-indigo-100`, `text-indigo-600`, `dark:bg-indigo-900/30`, `dark:text-indigo-400`
- **Twitch**: `bg-purple-100`, `text-purple-600`, `dark:bg-purple-900/30`, `dark:text-purple-400`

Icons:

- TikTok: 🎵, Instagram: 📸, Twitter: 🐦, Snapchat: 👻, YouTube: 📺, Reddit: 🤖, Discord: 💬, Twitch: 🎮

#### 13. **Common Patterns**

**Form Input Pattern:**

```tsx
<div>
  <label
    htmlFor="input-id"
    className="block text-sm font-medium text-foreground mb-2"
  >
    {t("toolName.form.fieldLabel")}
  </label>
  <input
    id="input-id"
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder={t("toolName.form.placeholder")}
    disabled={isLoading}
    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[platform]-500 focus:border-transparent bg-surface text-foreground"
  />
</div>
```

**Textarea Pattern:**

```tsx
<div>
  <label
    htmlFor="textarea-id"
    className="block text-sm font-medium text-foreground mb-2"
  >
    {t("toolName.form.fieldLabel")}
  </label>
  <textarea
    id="textarea-id"
    value={textValue}
    onChange={(e) => setTextValue(e.target.value)}
    placeholder={t("toolName.form.placeholder")}
    rows={3}
    disabled={isLoading}
    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[platform]-500 focus:border-transparent bg-surface text-foreground resize-none"
  />
</div>
```

**Select Input Pattern:**

```tsx
<select
  id="select-id"
  value={selectValue}
  onChange={(e) => setSelectValue(e.target.value)}
  disabled={isLoading}
  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[platform]-500 focus:border-transparent bg-surface text-foreground"
>
  <option value="option1">{t("toolName.form.option1")}</option>
  <option value="option2">{t("toolName.form.option2")}</option>
</select>
```

**Language Selector Pattern (for output language):**

```tsx
import { LANGUAGES } from "@/types";

const { t, language: uiLanguage } = useLanguage();
const [language, setLanguage] = useState(uiLanguage);

<div>
  <label
    htmlFor="language"
    className="block text-sm font-medium text-foreground mb-2"
  >
    {t("toolName.form.language")}
  </label>
  <select
    id="language"
    value={language}
    onChange={(e) => setLanguage(e.target.value as "en" | "es")}
    disabled={isLoading}
    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[platform]-500 focus:border-transparent bg-surface text-foreground"
  >
    {LANGUAGES.map((l) => (
      <option key={l.value} value={l.value}>
        {t(l.labelKey)}
      </option>
    ))}
  </select>
</div>;
```

**Turnstile Widget Pattern (REQUIRED for all tools):**

```tsx
import TurnstileWidget from "@/app/components/turnstile-widget";

const [turnstileToken, setTurnstileToken] = useState<string>("");

{
  /* Place BEFORE generate button, AFTER form inputs */
}
<TurnstileWidget
  onSuccess={(token) => setTurnstileToken(token)}
  onError={() => setError(t("turnstile.failed"))}
/>;
```

**Generate Button Pattern:**

```tsx
{
  !results.length && (
    <Button
      onPress={handleGenerate}
      isDisabled={isLoading || !turnstileToken}
      variant="secondary"
      size="lg"
      className="w-full"
    >
      {isLoading ? t("toolName.form.generating") : t("toolName.form.generate")}
    </Button>
  );
}
```

**Use Again Button Pattern:**

```tsx
const handleUseAgain = () => {
  setResults([]);
  setError("");
  setTurnstileToken(""); // Reset Turnstile token
};

{
  results.length > 0 && (
    <Button
      onPress={handleUseAgain}
      variant="ghost"
      size="lg"
      className="w-full"
    >
      {t("toolName.form.useAgain")}
    </Button>
  );
}
```

**Error Display Pattern:**

```tsx
{
  error && (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <p className="text-red-800 dark:text-red-200">{error}</p>
    </div>
  );
}
```

**Copy Function Pattern:**

```tsx
const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(t("toolName.result.copied"));
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
```

**Copy All Function Pattern (for multiple results):**

```tsx
const handleCopyAll = async () => {
  try {
    const allResults = results
      .map((item, i) => `${i + 1}. ${item}`)
      .join("\n\n");
    await navigator.clipboard.writeText(allResults);
    alert(t("toolName.result.copiedAll"));
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
```

#### 15. **Quick Reference - File Locations**

- **API Route**: `app/api/tools/[platform]/[tool-name]/route.ts`
- **Page Component**: `app/(tools)/[platform]/[tool-name]/page.tsx`
- **DeepSeek Function**: `lib/deepseek.ts` (add new export)
- **Translations**: `lib/translations.ts` (add to both `es` and `en`)
- **Platform Page**: `app/(tools)/[platform]/page.tsx` (add to tools array)
- **SEO Functions**: `lib/seo-metadata.ts` (already created, just import)
- **Appwrite Logging**: `lib/appwrite.ts` (already created, just import)
- **Turnstile**: `lib/turnstile.ts` (already created, just import)
- **Spanish Aliases**: `next.config.ts` (add rewrite rule)
- **Alias Documentation**: `RUTAS_ALIAS.md` (document new routes)

#### 16. **Spanish URL Naming Conventions**

Follow these patterns for Spanish slugs:

**Generators:**

- `generator` → `generador`
- Examples: `bio-generator` → `generador-bio`
- Examples: `tweet-generator` → `generador-tweets`

**Calculators:**

- `calculator` → `calculadora`
- Examples: `coins-calculator` → `calculadora-monedas`
- Examples: `money-calculator` → `calculadora-dinero`

**Makers/Writers:**

- `writer` → `escritor`
- `maker` → `creador`
- Examples: `script-writer` → `escritor-de-guiones`
- Examples: `thread-maker` → `creador-hilos`

**Ideas:**

- `ideas` → `ideas`
- Examples: `video-ideas` → `ideas-de-videos`
- Examples: `story-ideas` → `ideas-historias`

**Common Terms:**

- `hook` → `gancho` / `ganchos`
- `hashtag` → `hashtag` (same)
- `username` → `nombre` / `nombres`
- `caption` → `subtítulo` / `subtitulos`
- `description` → `descripción` / `descripciones`
- `title` → `título` / `titulos`

**Reference:** Check `RUTAS_ALIAS.md` for existing patterns before creating new ones.

#### 17. **Language Localization System**

The project supports **dual localization**:

**1. UI Language (Interface):**

- User's selected language for buttons, labels, errors
- Controlled by `useLanguage()` hook
- Switches entire interface (ES ↔ EN)

**2. Output Language (Generated Content):**

- Language of the AI-generated content
- Separate state: `const [language, setLanguage] = useState(uiLanguage);`
- User can generate in Spanish while UI is in English (or vice versa)

**Implementation:**

```tsx
const { t, language: uiLanguage } = useLanguage(); // UI language
const [language, setLanguage] = useState(uiLanguage); // Output language

// Send to API
await fetch("/api/...", {
  body: JSON.stringify({
    topic,
    language, // ← Output language
    turnstileToken,
  }),
});
```

**When to include language selector:**

- ✅ Content generation tools (scripts, captions, ideas, etc.)
- ❌ Calculators or analytics tools (language-agnostic)
- ❌ Tools that only process input (downloaders, checkers, etc.)

**Types definition** (in `types/index.ts`):

```typescript
export const LANGUAGES = [
  { value: "en", labelKey: "common.language.english" },
  { value: "es", labelKey: "common.language.spanish" },
] as const;
```

#### 18. **Example Reference**

For complete working examples:

**Simple tool (no language selector):**

- **Page**: `app/(tools)/tiktok/username-generator/page.tsx`
- **API**: `app/api/tools/tiktok/username-generator/route.ts`
- **DeepSeek**: Search for `generateTikTokUsernames` in `lib/deepseek.ts`

**Advanced tool (with language selector):**

- **Page**: `app/(tools)/snapchat/lens-ideas/page.tsx`
- **API**: `app/api/tools/snapchat/lens-ideas/route.ts`
- **DeepSeek**: Search for `generateSnapchatLensIdeas` in `lib/deepseek.ts`

**Spanish Alias**: `next.config.ts` (search for rewrites)

---

## URL Structure & Multilingual SEO

### How It Works

The project supports **dual URLs** for every tool:

- **English URL** (canonical): `/platform/tool-name`
- **Spanish URL** (alias): `/platform/nombre-español`

Both URLs display the **exact same page** (no redirects).

### Implementation

1. **English page** is the actual file: `app/(tools)/platform/tool-name/page.tsx`
2. **Spanish alias** is configured in `next.config.ts`:
   ```typescript
   { source: "/platform/nombre-español", destination: "/platform/tool-name" }
   ```
3. **SEO metadata** includes `hreflang` tags:
   ```typescript
   generateToolMetadata({
     englishSlug: "tool-name",
     spanishSlug: "nombre-español", // ← Creates hreflang alternates
   });
   ```

### SEO Benefits

- ✅ Google indexes both URLs separately
- ✅ Better ranking in Spanish searches (LATAM, Spain)
- ✅ Better ranking in English searches (US, UK, etc.)
- ✅ No duplicate content penalties (hreflang + canonical)
- ✅ Both URLs in sitemap.xml
- ✅ Natural URLs for each language audience

### Testing URLs

```bash
# Test English URL
curl -I http://localhost:3000/tiktok/username-generator

# Test Spanish URL (same page)
curl -I http://localhost:3000/tiktok/generador-de-nombres

# Both should return 200 OK
```

**Reference Documentation:** `RUTAS_ALIAS.md`

---

**Final Checklist Before Committing:**

- [ ] All files created (page.tsx, route.ts, deepseek function)
- [ ] All translations added (both ES and EN)
- [ ] **Language selector added** (if tool generates content)
- [ ] **LANGUAGES import from types** (if using language selector)
- [ ] SEO metadata added (generateToolMetadata, JSON-LD)
- [ ] **Spanish slug added to metadata** (`spanishSlug` parameter)
- [ ] **Spanish rewrite rule added to next.config.ts**
- [ ] **Spanish URL documented in RUTAS_ALIAS.md**
- [ ] **Turnstile widget integrated** (`TurnstileWidget` component)
- [ ] **Turnstile token validated in API route** (403 if missing)
- [ ] **Turnstile token reset on "Use Again"**
- [ ] Appwrite logging included (with `saveGenerationLog`)
- [ ] Tool added to platform page
- [ ] Related tools section populated
- [ ] PRD.md updated with tool status
- [ ] All sections present (11 total: header → related tools)
- [ ] **Both URLs tested** (English + Spanish)
- [ ] **Output language tested** (if applicable)
- [ ] **Turnstile verification tested**
- [ ] Dark mode tested
- [ ] Mobile responsive tested
- [ ] UI language switcher tested (🇺🇸/🇪🇸)
- [ ] No TypeScript/console errors
- [ ] **ALL NEW TOOLS TESTED** (see "MANDATORY: Test All New Tools After Creation" section above)

**REMINDER**: Do NOT consider the work complete until you have manually tested all new tools following the testing protocol in step 15.
