# Implementation Plan: AEO Optimization

**Branch**: `005-aeo-optimization` | **Date**: November 27, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-aeo-optimization/spec.md`

## Summary

Implement Answer Engine Optimization (AEO) across KiviTools to maximize visibility in AI assistants (ChatGPT, Claude, Perplexity), voice assistants (Siri, Alexa, Google), and Google Featured Snippets. This involves adding comprehensive structured data schemas (HowTo, SoftwareApplication, Speakable, FAQPage), creating llms.txt files for AI crawlers, and optimizing content structure for direct answer extraction.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.0, Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, @heroui/styles, Tailwind CSS v4  
**Storage**: N/A (structured data is rendered server-side, no database changes)  
**Testing**: Manual validation via Google Rich Results Test, Schema.org validator, AI assistant testing  
**Target Platform**: Web (Vercel deployment), SSR-enabled Next.js  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: No additional page load impact (JSON-LD < 2KB per page)  
**Constraints**: Must work across 6 languages (en, es, pt, fr, de, it), light/dark theme agnostic  
**Scale/Scope**: 92 tool pages, 17+ platform hub pages, 1 homepage

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                         | Status  | Notes                                                                   |
| --------------------------------- | ------- | ----------------------------------------------------------------------- |
| I. HeroUI-First Architecture      | ✅ PASS | No UI changes required; AEO is structured data only                     |
| II. Translation-Mandatory Content | ✅ PASS | Structured data uses existing translation keys; no new user-facing text |
| III. Tool Page Completeness       | ✅ PASS | Enhances existing complete pages with additional schemas                |
| IV. Performance Budget            | ✅ PASS | JSON-LD is minimal (<2KB), no blocking resources                        |
| V. Platform Integration           | N/A     | Not adding new platforms                                                |

**Gate Result**: ✅ PASSED - No constitution violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/005-aeo-optimization/
├── plan.md              # This file
├── research.md          # Phase 0: Schema best practices, llms.txt spec
├── data-model.md        # Phase 1: Schema structures per page type
├── quickstart.md        # Phase 1: Implementation guide
├── contracts/           # Phase 1: Schema examples per page type
│   ├── tool-page-schema.json
│   ├── platform-hub-schema.json
│   ├── homepage-schema.json
│   └── llms-txt-format.md
└── tasks.md             # Phase 2: Implementation tasks
```

### Source Code (repository root)

```text
app/
├── layout.tsx                      # Global Organization + WebSite schemas (existing)
├── page.tsx                        # Homepage schemas (enhance existing)
├── (tools)/
│   ├── [platform]/
│   │   └── page.tsx               # Platform hub: CollectionPage schema
│   └── [platform]/[tool]/
│       └── page.tsx               # Tool pages: SoftwareApplication + HowTo + Speakable
lib/
├── seo-metadata.ts                # Existing - extend with new schema generators
├── aeo/                           # NEW: AEO-specific utilities
│   ├── schemas.ts                 # Schema generator functions
│   ├── howto-generator.ts         # HowTo schema from translations
│   └── speakable-generator.ts     # Speakable schema for voice
public/
├── llms.txt                       # NEW: AI crawler guidance (simple)
└── llms-full.txt                  # NEW: Comprehensive tool descriptions
```

**Structure Decision**: Extend existing Next.js App Router structure. New AEO utilities in `lib/aeo/` to keep schema logic separate from SEO metadata. Static llms.txt files in `public/` for immediate accessibility.

## Complexity Tracking

> No constitution violations - table not required.

---

## Post-Design Constitution Re-Check

_GATE: Re-evaluation after Phase 1 design completion._

| Principle                         | Status  | Post-Design Notes                                                      |
| --------------------------------- | ------- | ---------------------------------------------------------------------- |
| I. HeroUI-First Architecture      | ✅ PASS | No UI component changes; only JSON-LD scripts added                    |
| II. Translation-Mandatory Content | ✅ PASS | All schema content pulls from existing translations via `t()` function |
| III. Tool Page Completeness       | ✅ PASS | Enhances complete pages; doesn't change 8-section requirement          |
| IV. Performance Budget            | ✅ PASS | JSON-LD ~1-2KB per page; no impact on FCP/TTI/CLS                      |
| V. Platform Integration           | N/A     | Not adding platforms                                                   |

**Post-Design Gate Result**: ✅ PASSED - Ready for Phase 2 task breakdown.

---

## Phase Summary

| Phase             | Status      | Output                                                                                         |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| Phase 0: Research | ✅ Complete | [research.md](./research.md)                                                                   |
| Phase 1: Design   | ✅ Complete | [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/](./contracts/) |
| Phase 2: Tasks    | ✅ Complete | [tasks.md](./tasks.md)                                                                         |

---

## Implementation Ready

All planning artifacts are complete. Begin implementation by following tasks.md:

1. **Start with Phase 1 (Setup)**: Create schema generators in `lib/aeo/`
2. **MVP Target**: Complete through Phase 3 (User Story 1) for basic AI discoverability
3. **Full Implementation**: Complete all 9 phases for comprehensive AEO coverage
