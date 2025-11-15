# GitHub Copilot Instructions for KiviTools

## Project Overview

This is a Next.js 16.0.1 application with TypeScript that provides free AI-powered social media content generation tools. The app uses:

- **Framework**: Next.js 16.0.1 with App Router
- **UI Library**: HeroUI v3 Beta (@heroui/react v3.0.0-beta.1)
- **Styling**: Tailwind CSS v4
- **AI Provider**: DeepSeek API (deepseek-chat model)
- **API Key**: Stored in `.env.local` as `DEEPSEEK_API_KEY`
- **Design Rule**: NEVER use gradients (`bg-linear-to-*` or `bg-gradient-to-*`). Use solid colors only.

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
