# Implementation Plan: Suno Tools Expansion

**Branch**: `010-suno-tools-expansion` | **Date**: November 30, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-suno-tools-expansion/spec.md`

## Summary

Expand Suno platform from 3 to 8 AI-powered music creation tools. Add 5 new tools: Song Title Generator, Song Tag Generator, Album Name Generator, Cover Art Prompt Generator, and Remix Idea Generator. Each tool follows existing KiviTools patterns with bilingual support (EN/ES), Turnstile verification, Appwrite logging, and 8-section page structure.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API  
**Storage**: Appwrite (logging only - no persistent user data)  
**Testing**: Manual testing per tool checklist in copilot-instructions.md  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: <30 seconds complete flow (excluding AI response time)  
**Constraints**: Bilingual EN/ES, Turnstile bot verification required  
**Scale/Scope**: 5 new tool pages, 5 API routes, ~200 translation keys

## Constitution Check

_GATE: Constitution template not customized for this project. Using project-specific patterns from `.github/copilot-instructions.md`_

**Project-Specific Gates (from copilot-instructions.md):**

| Gate                           | Status  | Notes                                                                             |
| ------------------------------ | ------- | --------------------------------------------------------------------------------- |
| HeroUI v3 components only      | ✅ Pass | Pattern established in existing Suno tools                                        |
| Bilingual translations (ES/EN) | ✅ Pass | All tools must have complete translations                                         |
| Turnstile bot verification     | ✅ Pass | Required for all generation endpoints                                             |
| Appwrite generation logging    | ✅ Pass | All API routes must log to Appwrite                                               |
| 8-section page structure       | ✅ Pass | Required: header, form, results, features, hero, how-it-works, FAQ, related tools |
| Spanish URL aliases            | ✅ Pass | Must add to next.config.ts                                                        |
| No gradients                   | ✅ Pass | Use solid colors only                                                             |
| Comedic tone                   | ✅ Pass | All user-facing text must be fun and lighthearted                                 |

## Project Structure

### Documentation (this feature)

```text
specs/010-suno-tools-expansion/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
│   └── suno-tools-api.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── (tools)/
│   └── suno/
│       ├── page.tsx                        # Update: Add 5 new tools to hub
│       ├── song-title-generator/
│       │   └── page.tsx                    # NEW: Song Title Generator
│       ├── song-tag-generator/
│       │   └── page.tsx                    # NEW: Song Tag Generator
│       ├── album-name-generator/
│       │   └── page.tsx                    # NEW: Album Name Generator
│       ├── cover-art-prompt-generator/
│       │   └── page.tsx                    # NEW: Cover Art Prompt Generator
│       └── remix-idea-generator/
│           └── page.tsx                    # NEW: Remix Idea Generator
├── api/
│   └── tools/
│       └── suno/
│           ├── song-title-generator/
│           │   └── route.ts                # NEW
│           ├── song-tag-generator/
│           │   └── route.ts                # NEW
│           ├── album-name-generator/
│           │   └── route.ts                # NEW
│           ├── cover-art-prompt-generator/
│           │   └── route.ts                # NEW
│           └── remix-idea-generator/
│               └── route.ts                # NEW
lib/
├── deepseek.ts                             # Update: Add 5 new generation functions
├── translations.ts                         # Update: Add ~200 new translation keys
└── locales/
    ├── es/tools/suno/                      # Update: Add new tool translations
    └── en/tools/suno/                      # Update: Add new tool translations

next.config.ts                              # Update: Add Spanish URL aliases for 5 tools
```

**Structure Decision**: Follows existing KiviTools web application pattern. Each tool has:

- Client page component in `app/(tools)/suno/[tool-name]/page.tsx`
- Server API route in `app/api/tools/suno/[tool-name]/route.ts`
- DeepSeek function in `lib/deepseek.ts`
- Translations in `lib/translations.ts` or locale files

## New Tools Summary

| Tool                       | Slug                               | Spanish Alias                       | Output      |
| -------------------------- | ---------------------------------- | ----------------------------------- | ----------- |
| Song Title Generator       | `/suno/song-title-generator`       | `/suno/generador-titulos-canciones` | 10 titles   |
| Song Tag Generator         | `/suno/song-tag-generator`         | `/suno/generador-tags-canciones`    | 15-20 tags  |
| Album Name Generator       | `/suno/album-name-generator`       | `/suno/generador-nombres-album`     | 10 names    |
| Cover Art Prompt Generator | `/suno/cover-art-prompt-generator` | `/suno/generador-prompts-portada`   | 3-5 prompts |
| Remix Idea Generator       | `/suno/remix-idea-generator`       | `/suno/generador-ideas-remix`       | 5-7 ideas   |

## Complexity Tracking

> No violations - follows established patterns
