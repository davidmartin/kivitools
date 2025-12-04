# Implementation Plan: Hero Tool Search with Auto-Create

**Branch**: `016-hero-tool-search` | **Date**: 2024-12-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-hero-tool-search/spec.md`

## Summary

Add a prominent search bar in the homepage hero that searches both official tools (hardcoded in platform pages) and community tools (Appwrite "tools" collection). Results show visual distinction between Official/Community tools. When results are few (<3), prominently display "Create this tool" option; otherwise show it subtly at the end. Auto-create flow pre-populates builder with AI-generated prompt based on search query. Preserves search context through auth flow for unauthenticated users.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16.0.1 with App Router)
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, appwrite SDK, DeepSeek/OpenRouter API
**Storage**: Appwrite - existing "tools" collection with fields: name, description, platform, slug, author_name, author_id, status, inputs, prompt_template
**Testing**: Manual testing per Constitution (no test framework specified)
**Target Platform**: Web (desktop + mobile responsive)
**Project Type**: Web application (Next.js monolith with API routes)
**Performance Goals**: Search results in <300ms, debounce 300ms, total <3 seconds per SC-001
**Constraints**: Must work without auth for search; auth required only for tool creation
**Scale/Scope**: ~200+ official tools across 28 platforms, unlimited community tools

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                         | Status  | Notes                                                                            |
| --------------------------------- | ------- | -------------------------------------------------------------------------------- |
| I. Internationalization-First     | ✅ PASS | All UI text will use `t()` function; keys in ES/EN defined in quickstart.md      |
| II. HeroUI v3 Component-Only      | ✅ PASS | Search input, dropdown, badges use HeroUI components                             |
| III. Security-By-Default          | ✅ PASS | Search is read-only; auto-create requires auth + uses existing Turnstile pattern |
| IV. 10-Point Platform Integration | ✅ N/A  | No new platform being added                                                      |
| V. Tool Page Structure            | ✅ N/A  | Modifying home page hero, not tool page                                          |
| VI. API Route Pattern             | ✅ PASS | New `/api/search` and `/api/tools/auto-create` follow established pattern        |
| VII. Content Tone                 | ✅ PASS | Search UI copy will be fun/playful per translation keys                          |

**Gate Status**: ✅ PASSED (Pre-Phase 0 and Post-Phase 1)

**Post-Design Verification**:

- ✅ Data model uses existing Appwrite schema, no new collections
- ✅ API contracts follow project conventions
- ✅ Component structure follows existing patterns
- ✅ No new dependencies required

## Project Structure

### Documentation (this feature)

```text
specs/016-hero-tool-search/
├── spec.md              # Feature specification ✅
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── page.tsx                           # MODIFY: Add HeroSearch component to hero
├── components/
│   ├── hero-search.tsx               # CREATE: Main search component
│   ├── search-result-item.tsx        # CREATE: Individual result display
│   └── create-tool-cta.tsx           # CREATE: "Create this tool" CTA
├── api/
│   └── search/
│       └── route.ts                  # CREATE: Combined search API
lib/
├── tools-index.ts                    # CREATE: Official tools static index
├── deepseek.ts                       # MODIFY: Add generateToolFromQuery function
└── locales/
    ├── en/common.ts                  # MODIFY: Add search translations
    └── es/common.ts                  # MODIFY: Add search translations
```

**Structure Decision**: Follows existing project structure. New components in `app/components/`, new API in `app/api/`, shared logic in `lib/`. No new directories needed beyond `contracts/` for spec outputs.

## Complexity Tracking

> No Constitution violations requiring justification.
