# Implementation Plan: TikTok Video Prompt Generator & Publisher

**Branch**: `003-auto-video-social` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-auto-video-social/spec.md`

## Summary

Create an admin-only page for generating optimized Veo 2 prompts for KiviTools' existing tools, uploading generated videos, and preparing TikTok captions for quick manual publishing. Uses HeroUI v3 components with full i18n support and light/dark theme.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1 with App Router  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, DeepSeek API (existing), Tailwind CSS v4  
**Storage**: Session-based (no persistent storage for MVP), Appwrite for history logging (existing)  
**Testing**: Manual testing per constitution guidelines  
**Target Platform**: Web (desktop-first admin interface)  
**Project Type**: Web (existing Next.js app)  
**Performance Goals**: Prompt generation < 5s, Caption generation < 5s  
**Constraints**: Admin-only access, HeroUI components mandatory, i18n required (ES/EN + other langs)  
**Scale/Scope**: Single admin user, ~100+ tools across 18 platforms

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Design Check ✅

| Principle                   | Status  | Notes                                                             |
| --------------------------- | ------- | ----------------------------------------------------------------- |
| I. HeroUI-First             | ✅ PASS | Will use Button, Card, Input, Select, TextArea from @heroui/react |
| II. Translation-Mandatory   | ✅ PASS | All text via useLanguage() hook, keys in all locale files         |
| III. Tool Page Completeness | ⚠️ N/A  | This is an admin page, not a public tool page                     |
| IV. Performance Budget      | ✅ PASS | API < 5s, page load < 1.5s FCP                                    |
| V. Platform Integration     | ⚠️ N/A  | Not adding a new platform, using existing tools data              |

### Post-Design Re-Check ✅

| Principle                   | Status  | Verification                                                            |
| --------------------------- | ------- | ----------------------------------------------------------------------- |
| I. HeroUI-First             | ✅ PASS | Page uses Button, Card, Chip, TextArea, Alert - no native HTML elements |
| II. Translation-Mandatory   | ✅ PASS | ~25 keys defined for 6 languages in admin.ts files                      |
| III. Tool Page Completeness | ⚠️ N/A  | Admin page, not public tool                                             |
| IV. Performance Budget      | ✅ PASS | DeepSeek API calls < 5s, no heavy client-side processing                |
| V. Platform Integration     | ⚠️ N/A  | No new platform added                                                   |

## Project Structure

### Documentation (this feature)

```text
specs/003-auto-video-social/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API routes)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── admin/
│   └── video-generator/
│       └── page.tsx           # New admin page for video workflow
├── api/
│   └── admin/
│       └── video-generator/
│           ├── prompt/
│           │   └── route.ts   # POST: Generate Veo 2 prompt
│           └── caption/
│               └── route.ts   # POST: Generate TikTok caption
lib/
├── deepseek.ts               # Add new functions (existing file)
├── locales/
│   ├── en/
│   │   └── admin.ts          # Add video generator translations
│   ├── es/
│   │   └── admin.ts          # Add video generator translations
│   └── [other langs]/
│       └── admin.ts          # Add video generator translations
```

**Structure Decision**: Extend existing admin section with new `/admin/video-generator` page. No new platform or public tool page needed.

## Complexity Tracking

No constitution violations requiring justification.
