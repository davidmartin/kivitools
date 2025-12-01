# Implementation Plan: DeepSeek Branding & SEO

**Branch**: `014-deepseek-platform` | **Date**: December 1, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/014-deepseek-platform/spec.md`
**Pivot Note**: Simplified from "DeepSeek tools platform" to "Powered by branding"

## Summary

Add "Powered by DeepSeek" branding to KiviTools to attract users who trust DeepSeek AI. This is a marketing/SEO initiative, NOT a feature development project. No new tools are created - we leverage the existing 100+ tools catalog by highlighting our technology stack.

**Primary deliverables**:

1. Footer badge visible on all pages
2. Technology page for SEO (`/about/technology`)
3. Homepage mention with link to technology page

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1 (App Router)
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4
**Storage**: N/A (static content only, no database changes)
**Testing**: Manual testing (visual verification + URL testing)
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web application (Next.js monorepo)
**Performance Goals**: Lighthouse ≥90 for technology page, <2s load time
**Constraints**: Badge must not affect page load time (inline SVG)
**Scale/Scope**: ~8 files modified, 2 new files created, 2-3 hours effort

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                         | Pre-Design | Post-Design | Notes                                                 |
| --------------------------------- | ---------- | ----------- | ----------------------------------------------------- |
| I. Internationalization-First     | ✅ PASS    | ✅ PASS     | Badge and page translated in ES/EN via `lib/locales/` |
| II. HeroUI v3 Component-Only      | ✅ PASS    | ✅ PASS     | Technology page uses HeroUI Card, Link components     |
| III. Security-By-Default          | ✅ N/A     | ✅ N/A      | No API routes, static content only                    |
| IV. 10-Point Platform Integration | ✅ N/A     | ✅ N/A      | NOT adding a platform - just branding                 |
| V. Tool Page Structure            | ✅ N/A     | ✅ N/A      | Not creating tool pages                               |
| VI. API Route Pattern             | ✅ N/A     | ✅ N/A      | No API routes                                         |
| VII. Content Tone                 | ✅ PASS    | ✅ PASS     | Casual, friendly tone in translations                 |

**No violations. Design approved.**

## Project Structure

### Documentation (this feature)

```text
specs/014-deepseek-platform/
├── plan.md              # This file
├── research.md          # Decision log (already complete)
├── spec.md              # Feature specification
└── tasks.md             # Phase 2 output (to be created)
```

### Source Code (repository root)

```text
app/
├── (legal)/
│   └── about/
│       └── technology/
│           └── page.tsx          # NEW: Technology/stack page
├── components/
│   └── footer.tsx                # MODIFY: Add "Powered by DeepSeek" badge
└── page.tsx                      # MODIFY: Add DeepSeek mention in hero

lib/
└── locales/
    ├── en/
    │   └── common.ts             # MODIFY: Add badge + technology page translations
    └── es/
        └── common.ts             # MODIFY: Add badge + technology page translations

public/
└── platforms/
    └── deepseek.svg              # NEW: DeepSeek logo for badge

next.config.ts                    # MODIFY: Add /sobre/tecnologia rewrite
docs/RUTAS_ALIAS.md              # MODIFY: Document new route
```

**Structure Decision**: Following existing patterns for legal/about pages and footer component. No new directories needed except for the technology page.

## Complexity Tracking

> No violations. All implementation follows existing patterns with minimal new code.
