# Implementation Plan: New Viral Platforms

**Branch**: `006-viral-platforms` | **Date**: November 28, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-viral-platforms/spec.md`

## Summary

Add 5 new viral platforms (Bluesky, Lemon8, Kick, Telegram, BeReal) to KiviTools with 3 tools each (15 tools total). Each platform requires full integration following the existing 10-step platform checklist: hub page, navigation, translations (6 languages), SEO metadata, tool selector, platform logo with dark/light mode support, home page, Spanish URL rewrites, routes documentation, and PRD update.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API  
**Storage**: Appwrite (generation logs)  
**Testing**: Manual testing per tool (English + Spanish URLs, dark/light mode)  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: API response < 2s (95th percentile), AI generation < 5s  
**Constraints**: Lighthouse SEO 90+, character limits per platform  
**Scale/Scope**: 15 new tools across 5 platforms, 6 supported UI languages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. HeroUI-First Architecture** | ✅ PASS | All tools will use `<Button>`, `<Card>`, `<Input>` from @heroui/react |
| **II. Translation-Mandatory** | ✅ PASS | All 6 languages (en, es, pt, fr, de, it) will have translations |
| **III. Tool Page Completeness** | ✅ PASS | All 8 sections mandatory per tool |
| **IV. Performance Budget** | ✅ PASS | Following existing patterns meeting < 5s generation |
| **V. Platform Integration** | ✅ PASS | Full 10-step checklist per platform |

**Pre-Phase 0 Gate**: ✅ PASSED - No violations

### Post-Design Re-check (Phase 1)

| Principle | Status | Verification |
|-----------|--------|--------------|
| **I. HeroUI-First** | ✅ PASS | Tool page templates use HeroUI components only |
| **II. Translation-Mandatory** | ✅ PASS | Translation key structure defined in data-model.md |
| **III. Tool Completeness** | ✅ PASS | All 8 sections specified per tool |
| **IV. Performance Budget** | ✅ PASS | Character limits enforced per platform |
| **V. Platform Integration** | ✅ PASS | 10-step checklist in quickstart.md |

**Post-Phase 1 Gate**: ✅ PASSED - Ready for Phase 2 (tasks)

## Project Structure

### Documentation (this feature)

```text
specs/006-viral-platforms/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── (tools)/
│   ├── bluesky/
│   │   ├── page.tsx                    # Platform hub page
│   │   ├── post-generator/page.tsx     # Tool 1
│   │   ├── bio-generator/page.tsx      # Tool 2
│   │   └── thread-composer/page.tsx    # Tool 3
│   ├── lemon8/
│   │   ├── page.tsx
│   │   ├── caption-generator/page.tsx
│   │   ├── content-ideas/page.tsx
│   │   └── bio-generator/page.tsx
│   ├── kick/
│   │   ├── page.tsx
│   │   ├── stream-title/page.tsx
│   │   ├── bio-generator/page.tsx
│   │   └── chat-rules/page.tsx
│   ├── telegram/
│   │   ├── page.tsx
│   │   ├── announcement-generator/page.tsx
│   │   ├── channel-description/page.tsx
│   │   └── welcome-message/page.tsx
│   └── bereal/
│       ├── page.tsx
│       ├── caption-generator/page.tsx
│       ├── bio-generator/page.tsx
│       └── realmoji-ideas/page.tsx
├── api/tools/
│   ├── bluesky/
│   │   ├── post-generator/route.ts
│   │   ├── bio-generator/route.ts
│   │   └── thread-composer/route.ts
│   ├── lemon8/
│   │   ├── caption-generator/route.ts
│   │   ├── content-ideas/route.ts
│   │   └── bio-generator/route.ts
│   ├── kick/
│   │   ├── stream-title/route.ts
│   │   ├── bio-generator/route.ts
│   │   └── chat-rules/route.ts
│   ├── telegram/
│   │   ├── announcement-generator/route.ts
│   │   ├── channel-description/route.ts
│   │   └── welcome-message/route.ts
│   └── bereal/
│       ├── caption-generator/route.ts
│       ├── bio-generator/route.ts
│       └── realmoji-ideas/route.ts
├── components/
│   ├── platform-logo.tsx              # Update: add 5 new platforms
│   ├── navigation.tsx                 # Update: add 5 new platforms
│   └── tool-selector.tsx              # Update: add 5 new platforms

lib/
├── deepseek.ts                        # Add 15 new generation functions
├── seo-metadata.ts                    # Update Platform type
└── locales/
    ├── en/
    │   ├── common.ts                  # Add nav.bluesky, nav.lemon8, etc.
    │   ├── platforms.ts               # Add platform descriptions
    │   └── tools/
    │       ├── bluesky/
    │       │   ├── post-generator.ts
    │       │   ├── bio-generator.ts
    │       │   └── thread-composer.ts
    │       ├── lemon8/
    │       ├── kick/
    │       ├── telegram/
    │       └── bereal/
    ├── es/                            # Same structure
    ├── pt/                            # Same structure
    ├── fr/                            # Same structure
    ├── de/                            # Same structure
    └── it/                            # Same structure

public/platforms/
├── bluesky.svg                        # New logo (dark mode: no invert)
├── lemon8.svg                         # New logo (dark mode: no invert)
├── kick.svg                           # New logo (dark mode: invert needed)
├── telegram.svg                       # New logo (dark mode: no invert)
└── bereal.svg                         # New logo (dark mode: invert needed)
```

**Structure Decision**: Following existing Next.js App Router structure with locales split by tool. Each platform follows the established pattern from existing platforms like Snapchat and Spotify.

## Complexity Tracking

> No violations - following existing patterns exactly
