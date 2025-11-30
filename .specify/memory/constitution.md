<!--
==========================================================================
SYNC IMPACT REPORT
==========================================================================
Version change: N/A → 1.0.0 (initial constitution)
Modified principles: N/A (new document)
Added sections: Core Principles (7), Technology Stack, Quality Gates, Governance
Removed sections: N/A
Templates status:
  - .specify/templates/spec-template.md: ✅ Compatible (no changes needed)
  - .specify/templates/plan-template.md: ✅ Compatible (Constitution Check section present)
  - .specify/templates/tasks-template.md: ✅ Compatible (no changes needed)
Follow-up TODOs: None
==========================================================================
-->

# KiviTools Constitution

**Mission**: Provide free, AI-powered tools for content creators on any digital platform—democratizing access to professional-grade content generation without registration barriers.

## Core Principles

### I. Internationalization-First (NON-NEGOTIABLE)

Every piece of user-facing text MUST use the translation system. No hardcoded strings in any language.

**Requirements**:
- All text uses `t("key.name")` from `useLanguage()` hook
- Translation keys MUST exist in BOTH `es` and `en` sections of `lib/locales/`
- Keys use flat dot notation: `"toolName.form.submit"`, NOT nested objects
- Spanish: Colloquial "tú" form, Latin American expressions
- English: Casual, conversational tone
- Additional languages (PT/FR/DE/IT) use English fallback until properly translated

**Rationale**: KiviTools serves a global, bilingual audience. Incomplete i18n breaks user experience and SEO.

### II. HeroUI v3 Component-Only (NON-NEGOTIABLE)

All UI elements MUST use HeroUI v3 Beta components. Native HTML elements are forbidden where HeroUI equivalents exist.

**Requirements**:
- Use `<Button onPress={...}>` NOT `<button onClick={...}>`
- Use `<Input>`, `<TextArea>`, `<Select>` NOT native `<input>`, `<textarea>`, `<select>`
- Import from `@heroui/react` only
- Use compound component patterns: `<Card><Card.Header>...</Card.Header></Card>`
- Use semantic color classes: `text-foreground`, `bg-surface`, `border-border`

**Rationale**: Consistency, accessibility, and proper dark mode support require a unified component system.

### III. Security-By-Default

All API routes MUST implement proper security controls before any AI generation.

**Requirements**:
- Cloudflare Turnstile verification on ALL tool API routes
- DeepSeek API key MUST remain server-side only (never exposed to client)
- All generations logged to Appwrite with sanitized request data
- Input validation before any AI call
- Rate limiting through Turnstile token verification

**Rationale**: Bot protection and audit trails are essential for a free, public service.

### IV. 10-Point Platform Integration (NON-NEGOTIABLE)

Adding a new platform MUST update ALL 10 integration points. Missing any breaks functionality.

**Checklist**:
1. Platform hub page: `app/(tools)/[platform]/page.tsx`
2. Navigation: `app/components/navigation.tsx`
3. Translations: Navigation keys in `lib/locales/[lang]/common.ts`
4. SEO metadata: `lib/seo-metadata.ts` (Platform type, colors, names)
5. Tool selector: `app/components/tool-selector.tsx`
6. Platform logo: `app/components/platform-logo.tsx` + `/public/platforms/[platform].svg`
7. Home page: `app/page.tsx` platforms array
8. Spanish URLs: `next.config.ts` rewrites
9. Routes docs: `docs/RUTAS_ALIAS.md`
10. PRD update: `PRD.md` tool tables

**Rationale**: Partial integration creates broken navigation, missing SEO, or invisible platforms.

### V. Tool Page Structure

Every tool page MUST include all 8 sections for SEO completeness and user experience.

**Required Sections**:
1. Header (badge, title, description)
2. Tool selector (platform navigation)
3. Form (inputs with validation + Turnstile widget)
4. Results (generated content with copy functionality)
5. Features (4-card grid)
6. Hero description (full explanation)
7. How It Works (3 numbered steps)
8. FAQ (5 questions with schema.org markup)

**Rationale**: Complete pages rank higher in search and provide comprehensive user value.

### VI. API Route Pattern

All tool API routes MUST follow the established security and logging pattern.

**Pattern**:
```
1. Extract request body
2. Verify Turnstile token (return 403 if invalid)
3. Validate inputs (return 400 if missing/invalid)
4. Call DeepSeek generation function
5. Log to Appwrite (platform, tool, request, response, IP)
6. Return success response
```

**Rationale**: Consistent API structure ensures security, logging, and maintainability.

### VII. Content Tone

All user-facing content MUST be comedic, fun, and lighthearted. Corporate speak is forbidden.

**Guidelines**:
- Be playful: Use humor and self-deprecation
- Be relatable: Reference common creator frustrations
- Keep it punchy: Short, memorable phrases
- Avoid: "leverage", "synergy", "optimize" (unless ironic)
- Emojis: Only for meaningful emphasis, never decoration

**Rationale**: KiviTools' brand differentiator is being the "funny friend" that helps creators, not a sterile business tool.

## Technology Stack

**Framework**: Next.js 16.0.1 with App Router (TypeScript strict mode)

**UI**: @heroui/react v3.0.0-beta.1 with Tailwind CSS v4

**AI**: DeepSeek API (deepseek-chat model, temperature 0.85-0.9 for creative tasks)

**Backend Services**:
- Appwrite: Generation logging, user management
- Cloudflare Turnstile: Bot verification

**Styling Constraints**:
- NEVER use gradients (`bg-linear-to-*` or `bg-gradient-to-*`)
- Use solid colors and HeroUI semantic tokens
- Tailwind v4 syntax required (`bg-linear-to-br` NOT `bg-gradient-to-br`)

**Platform Color Scheme**:
- TikTok/Suno/Twitch: Purple (`bg-purple-100`, `text-purple-600`)
- Instagram: Pink (`bg-pink-100`, `text-pink-600`)
- Twitter/Bluesky: Blue (`bg-blue-100`, `text-blue-600`)
- Snapchat: Yellow (`bg-yellow-100`, `text-yellow-600`)
- YouTube: Red (`bg-red-100`, `text-red-600`)
- Reddit: Orange (`bg-orange-100`, `text-orange-600`)

## Quality Gates

### Before Merging

1. **Build passes**: `npm run build` completes without errors
2. **Translations complete**: All keys exist in ES and EN
3. **TypeScript clean**: No type errors
4. **Dark mode verified**: UI works in both themes
5. **Mobile responsive**: Tested on mobile viewports

### After Implementation

1. **Test all new tools**: Navigate, fill form, generate, verify results
2. **Both URLs work**: English and Spanish aliases functional
3. **PRD updated**: Tool status marked as ✅
4. **Turnstile functional**: Bot verification completes

## Governance

This constitution supersedes all other development practices for KiviTools.

**Amendment Process**:
1. Document proposed change with rationale
2. Verify impact on existing tools/platforms
3. Update all affected templates if principles change
4. Increment version following semantic versioning:
   - MAJOR: Principle removal or redefinition
   - MINOR: New principle or expanded guidance
   - PATCH: Clarifications or typo fixes

**Compliance**:
- All PRs MUST verify adherence to these principles
- Complexity additions MUST be justified against simplicity goals
- Runtime guidance in `.github/copilot-instructions.md` supplements this constitution

**Version**: 1.0.0 | **Ratified**: 2025-01-20 | **Last Amended**: 2025-01-20
