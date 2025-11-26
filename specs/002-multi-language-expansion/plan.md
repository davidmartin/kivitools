# Implementation Plan: Multi-Language Expansion

**Branch**: `002-multi-language-expansion` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-multi-language-expansion/spec.md`

## Summary

Expand KiviTools from 2 languages (EN/ES) to 6 languages (EN, ES, PT, FR, DE, IT) by:

1. Replicating the existing modular translation structure (`lib/locales/[lang]/`) for 4 new languages
2. Updating the Language type and LanguageContext to support multi-language selection
3. Replacing the current toggle button with a dropdown `<Select>` component for language switching
4. Adding language-prefixed URL routes for SEO (`/pt/`, `/fr/`, `/de/`, `/it/`)

**Critical**: All ~92 translation files per language must be replicated exactly to maintain complete UI coverage.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4  
**Storage**: localStorage (language preference persistence)  
**Testing**: Manual testing (language switcher, all UI elements)  
**Target Platform**: Web (desktop + mobile responsive)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: < 100ms additional load time per language bundle  
**Constraints**: All 92 translation files must exist for each language, no English fallback visible in UI  
**Scale/Scope**: ~92 translation files × 6 languages = 552 total translation files

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                       | Status     | Notes                                                   |
| ------------------------------- | ---------- | ------------------------------------------------------- |
| **I. HeroUI-First**             | ✅ PASS    | Language selector will use HeroUI `<Select>` component  |
| **II. Translation-Mandatory**   | ✅ PASS    | All new languages follow existing translation structure |
| **III. Tool Page Completeness** | ✅ PASS    | No tool pages modified, only translation infrastructure |
| **IV. Performance Budget**      | ⚠️ MONITOR | Must verify bundle size with 6 languages (~300KB total) |
| **V. Platform Integration**     | N/A        | No new platforms added                                  |

**Pre-Design Gate**: PASSED

### Post-Design Re-Check (Phase 1 Complete)

| Principle                       | Status  | Notes                                               |
| ------------------------------- | ------- | --------------------------------------------------- |
| **I. HeroUI-First**             | ✅ PASS | Select component design confirmed in quickstart.md  |
| **II. Translation-Mandatory**   | ✅ PASS | 92 files × 6 languages structure defined            |
| **III. Tool Page Completeness** | ✅ PASS | No changes to tool pages                            |
| **IV. Performance Budget**      | ✅ PASS | ~300KB acceptable, lazy loading available if needed |
| **V. Platform Integration**     | N/A     | No new platforms                                    |

**Post-Design Gate**: PASSED - Ready for Phase 2 (tasks)

## Project Structure

### Documentation (this feature)

```text
specs/002-multi-language-expansion/
├── plan.md              # This file
├── research.md          # Phase 0: Translation patterns research
├── data-model.md        # Phase 1: Language/Translation entity definitions
├── quickstart.md        # Phase 1: Implementation guide
├── contracts/           # Phase 1: API contracts (if any)
└── tasks.md             # Phase 2: Implementation tasks
```

### Source Code (repository root)

```text
lib/
├── translations.ts              # UPDATE: Add pt, fr, de, it to Language type
├── locales/
│   ├── en/                      # EXISTING: 92 files (reference)
│   │   ├── index.ts
│   │   ├── common.ts
│   │   ├── home.ts
│   │   ├── platforms.ts
│   │   └── tools/
│   │       ├── tiktok/
│   │       ├── instagram/
│   │       └── ... (16 platform folders)
│   ├── es/                      # EXISTING: 93 files
│   │   └── ... (same structure as en/)
│   ├── pt/                      # NEW: Portuguese (copy from en/, translate)
│   │   └── ... (same structure as en/)
│   ├── fr/                      # NEW: French (copy from en/, translate)
│   │   └── ... (same structure as en/)
│   ├── de/                      # NEW: German (copy from en/, translate)
│   │   └── ... (same structure as en/)
│   └── it/                      # NEW: Italian (copy from en/, translate)
│       └── ... (same structure as en/)

contexts/
└── LanguageContext.tsx          # UPDATE: Support 6 languages, detect browser

app/
├── components/
│   └── navigation.tsx           # UPDATE: Replace toggle with <Select> dropdown
└── sitemap.ts                   # UPDATE: Add language prefixes for SEO

types/
└── index.ts                     # UPDATE: Add UI_LANGUAGES constant

next.config.ts                   # UPDATE: Add /pt/, /fr/, /de/, /it/ rewrites
```

**Structure Decision**: Extends existing Next.js App Router structure with additional locale folders. No new directories needed except `lib/locales/{pt,fr,de,it}/`.

## Complexity Tracking

No constitution violations. Complexity is in translation volume, not architecture.
