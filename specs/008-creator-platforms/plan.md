# Implementation Plan: Creator & Commerce Platforms

**Branch**: `008-creator-platforms` | **Date**: November 30, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-creator-platforms/spec.md`

## Summary

Add 4 new creator economy platforms (Medium, Etsy, OnlyFans, Patreon) with 12 AI-powered content generation tools. Each platform follows the established KiviTools pattern: hub page, 3 tools, navigation integration, translations (6 languages), Spanish URL aliases, and full SEO metadata. Additionally, update home page platforms array and stats to reflect new platforms.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1 with App Router  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API (deepseek-chat model)  
**Storage**: Appwrite (generation logs), Cloudflare Turnstile (bot protection)  
**Testing**: Manual testing protocol per tool (both EN/ES URLs)  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: Web application (Next.js)  
**Performance Goals**: <5s AI generation, Lighthouse 90+, <2s API response (p95)  
**Constraints**: Platform character limits (Medium bio: 160, Etsy title: 140, OnlyFans bio: 1000), SFW content only for OnlyFans tools  
**Scale/Scope**: 4 platforms × 3 tools = 12 new tools, 4 hub pages, ~200 translation keys

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                              | Status  | Notes                                                                |
| -------------------------------------- | ------- | -------------------------------------------------------------------- |
| I. HeroUI-First Component Architecture | ✅ PASS | All tools will use HeroUI components (Button, Card, Input, TextArea) |
| II. Translation-Mandatory Content      | ✅ PASS | All text via `useLanguage()`, keys in both ES and EN (6 languages)   |
| III. Tool Page Completeness Standard   | ✅ PASS | All 8 sections required per tool, FAQ JSON-LD, Spanish aliases       |
| IV. Performance Budget Enforcement     | ✅ PASS | <5s generation, Lighthouse 90+, server-side API keys                 |
| V. Platform Integration Completeness   | ✅ PASS | All 10 integration points per platform documented in spec            |

**Gate Status**: ✅ PASSED - All constitution principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/008-creator-platforms/
├── plan.md              # This file
├── research.md          # Phase 0 output (platform specifics research)
├── data-model.md        # Phase 1 output (entity definitions)
├── quickstart.md        # Phase 1 output (implementation guide)
├── contracts/
│   └── api.md           # API contracts (already created)
├── checklists/
│   └── requirements.md  # Quality validation
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (new files for this feature)

```text
app/
├── (tools)/
│   ├── medium/
│   │   ├── page.tsx                    # Platform hub
│   │   ├── article-title-generator/
│   │   │   └── page.tsx
│   │   ├── article-intro-generator/
│   │   │   └── page.tsx
│   │   └── bio-generator/
│   │       └── page.tsx
│   ├── etsy/
│   │   ├── page.tsx                    # Platform hub
│   │   ├── product-title-generator/
│   │   │   └── page.tsx
│   │   ├── product-description-generator/
│   │   │   └── page.tsx
│   │   └── shop-announcement-generator/
│   │       └── page.tsx
│   ├── onlyfans/
│   │   ├── page.tsx                    # Platform hub
│   │   ├── bio-generator/
│   │   │   └── page.tsx
│   │   ├── post-caption-generator/
│   │   │   └── page.tsx
│   │   └── promo-generator/
│   │       └── page.tsx
│   └── patreon/
│       ├── page.tsx                    # Platform hub
│       ├── tier-description-generator/
│       │   └── page.tsx
│       ├── about-page-generator/
│       │   └── page.tsx
│       └── post-generator/
│           └── page.tsx
├── api/tools/
│   ├── medium/
│   │   ├── article-title-generator/route.ts
│   │   ├── article-intro-generator/route.ts
│   │   └── bio-generator/route.ts
│   ├── etsy/
│   │   ├── product-title-generator/route.ts
│   │   ├── product-description-generator/route.ts
│   │   └── shop-announcement-generator/route.ts
│   ├── onlyfans/
│   │   ├── bio-generator/route.ts
│   │   ├── post-caption-generator/route.ts
│   │   └── promo-generator/route.ts
│   └── patreon/
│       ├── tier-description-generator/route.ts
│       ├── about-page-generator/route.ts
│       └── post-generator/route.ts
├── page.tsx                            # Update platforms array + stats
└── components/
    ├── navigation.tsx                  # Add 4 new platforms
    ├── platform-logo.tsx               # Register 4 new logos
    └── tool-selector.tsx               # Add 4 new platforms

lib/
├── deepseek.ts                         # Add 12 new generation functions
├── translations.ts                     # Add ~200 translation keys (6 languages)
└── seo-metadata.ts                     # Add 4 platforms to types

public/platforms/
├── medium.svg
├── etsy.svg
├── onlyfans.svg
└── patreon.svg

next.config.ts                          # Add Spanish URL rewrites
docs/RUTAS_ALIAS.md                     # Document new routes
PRD.md                                  # Update platform/tool status
```

**Structure Decision**: Follows existing KiviTools Next.js App Router structure with (tools) route group for platform pages and /api/tools/ for API routes.

## Complexity Tracking

> No constitution violations - standard platform addition following established patterns.
