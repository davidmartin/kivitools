# Implementation Plan: Platform SEO Expansion

**Branch**: `001-platform-seo-expansion` | **Date**: 2025-11-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-platform-seo-expansion/spec.md`

## Summary

Expand KiviTools with 4 new high-traffic platforms (Pinterest, Spotify, Facebook, Threads) and add tools to existing platforms (TikTok, Instagram) to improve SEO coverage and attract more users. Each platform requires complete 10-point integration following established patterns, HeroUI v3 components, bilingual support (ES/EN), and dark/light theme compatibility.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API  
**Storage**: Appwrite (generation logs), Vercel (hosting)  
**Testing**: Manual testing (both EN/ES URLs, dark/light mode)  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web application (single monorepo with App Router)  
**Performance Goals**: Lighthouse 90+, FCP <1.5s, TTI <3.5s, API <2s  
**Constraints**: WCAG 2.1 Level AA, Turnstile verification on all tools  
**Scale/Scope**: 13 new tools across 6 platforms (4 new + 2 existing). Note: Instagram story-ideas already exists.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Phase 0 Check

| Principle                              | Status  | Notes                                                         |
| -------------------------------------- | ------- | ------------------------------------------------------------- |
| I. HeroUI-First Component Architecture | ✅ PASS | All new tool pages use HeroUI components (Button, Card, etc.) |
| II. Translation-Mandatory Content      | ✅ PASS | All user-facing text uses `t()` function, keys in both ES/EN  |
| III. Tool Page Completeness Standard   | ✅ PASS | Each tool includes all 8 mandatory sections                   |
| IV. Performance Budget Enforcement     | ✅ PASS | Target Lighthouse 90+, SSR for SEO                            |
| V. Platform Integration Completeness   | ✅ PASS | 10-point checklist followed for each platform                 |

**Pre-Phase 0 Gate**: PASSED - All principles can be satisfied.

### Post-Phase 1 Re-Check (Design Complete)

| Principle               | Status  | Verification                                                 |
| ----------------------- | ------- | ------------------------------------------------------------ |
| I. HeroUI-First         | ✅ PASS | data-model.md specifies HeroUI Button, Card for all tools    |
| II. Translations        | ✅ PASS | research.md defines translation key patterns for all content |
| III. Tool Completeness  | ✅ PASS | quickstart.md checklist ensures all 8 sections per tool      |
| IV. Performance         | ✅ PASS | SSR specified, Lighthouse 90+ target in testing plan         |
| V. Platform Integration | ✅ PASS | 10-point checklist explicit in quickstart.md                 |

**Post-Design Gate**: PASSED - Design adheres to all constitution principles.

## Project Structure

### Documentation (this feature)

```text
specs/001-platform-seo-expansion/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API routes)
│   ├── pinterest/
│   ├── spotify/
│   ├── facebook/
│   └── threads/
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── (tools)/
│   ├── pinterest/                    # NEW PLATFORM
│   │   ├── page.tsx                  # Platform hub
│   │   ├── pin-description/page.tsx
│   │   ├── board-name/page.tsx
│   │   └── profile-bio/page.tsx
│   ├── spotify/                      # NEW PLATFORM
│   │   ├── page.tsx
│   │   ├── playlist-name/page.tsx
│   │   ├── playlist-description/page.tsx
│   │   └── artist-bio/page.tsx
│   ├── facebook/                     # NEW PLATFORM
│   │   ├── page.tsx
│   │   ├── post-generator/page.tsx
│   │   ├── page-bio/page.tsx
│   │   └── ad-copy/page.tsx
│   ├── threads/                      # NEW PLATFORM
│   │   ├── page.tsx
│   │   ├── post-generator/page.tsx
│   │   └── bio-generator/page.tsx
│   ├── tiktok/                       # EXISTING - ADD TOOLS
│   │   ├── comment-reply/page.tsx    # NEW
│   │   └── duet-ideas/page.tsx       # NEW
│   └── instagram/                    # EXISTING - ADD TOOLS
│       ├── story-ideas/page.tsx      # ALREADY EXISTS (verified)
│       └── carousel-script/page.tsx  # NEW
├── api/tools/
│   ├── pinterest/
│   │   ├── pin-description/route.ts
│   │   ├── board-name/route.ts
│   │   └── profile-bio/route.ts
│   ├── spotify/
│   │   ├── playlist-name/route.ts
│   │   ├── playlist-description/route.ts
│   │   └── artist-bio/route.ts
│   ├── facebook/
│   │   ├── post-generator/route.ts
│   │   ├── page-bio/route.ts
│   │   └── ad-copy/route.ts
│   ├── threads/
│   │   ├── post-generator/route.ts
│   │   └── bio-generator/route.ts
│   ├── tiktok/
│   │   ├── comment-reply/route.ts    # NEW
│   │   └── duet-ideas/route.ts       # NEW
│   └── instagram/
│       └── carousel-script/route.ts  # NEW
├── components/
│   ├── navigation.tsx                # UPDATE - Add 4 platforms
│   ├── platform-logo.tsx             # UPDATE - Add 4 platforms
│   └── tool-selector.tsx             # UPDATE - Add 4 platforms
└── page.tsx                          # UPDATE - Add 4 platforms to home

lib/
├── deepseek.ts                       # UPDATE - Add 14 new functions
├── seo-metadata.ts                   # UPDATE - Add 4 platforms
└── translations.ts                   # UPDATE - Add all translations

public/platforms/
├── pinterest.svg                     # NEW
├── spotify.svg                       # NEW
├── facebook.svg                      # NEW
└── threads.svg                       # NEW

next.config.ts                        # UPDATE - Add Spanish URL rewrites
docs/RUTAS_ALIAS.md                   # UPDATE - Document new routes
PRD.md                                # UPDATE - Add platforms & tools
```

**Structure Decision**: Web application following existing Next.js App Router pattern with (tools) route group. Each platform follows the established structure: hub page + individual tool pages, matching API routes, shared components.

## Complexity Tracking

> No constitution violations. Standard feature expansion following established patterns.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       | -          | -                                    |
