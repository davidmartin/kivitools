# Implementation Plan: OnlyFans Creator AI Tools

**Branch**: `013-onlyfans-creator-tools` | **Date**: November 30, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-onlyfans-creator-tools/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add OnlyFans platform to KiviTools with 4 AI-powered tools for content creators: Bio Generator, Caption Generator, PPV Message Generator, and Welcome Message Generator. All tools must include content moderation guardrails to prevent explicit content generation while helping creators with professional marketing and engagement aspects.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1 App Router  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API  
**Storage**: Appwrite (generation logging, analytics)  
**Testing**: Manual testing per project standards (navigate, generate, verify)  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web application (Next.js)  
**Performance Goals**: <5 seconds generation time per SC-001  
**Constraints**: 150 char bio limit (FR-003), professional content only (FR-010, FR-017)  
**Scale/Scope**: 4 tools, 1 platform hub, ~20 translation keys per tool

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                         | Status       | Notes                                                            |
| --------------------------------- | ------------ | ---------------------------------------------------------------- |
| I. Internationalization-First     | ✅ COMPLIANT | All tools will use `t()` hook, keys in ES+EN per FR-012          |
| II. HeroUI v3 Component-Only      | ✅ COMPLIANT | All forms use HeroUI Button, Input, Select, TextArea             |
| III. Security-By-Default          | ✅ COMPLIANT | Turnstile verification per FR-011, Appwrite logging per FR-014   |
| IV. 10-Point Platform Integration | ✅ COMPLIANT | New platform requires all 10 points (see checklist below)        |
| V. Tool Page Structure            | ✅ COMPLIANT | All 8 sections required per FR-015                               |
| VI. API Route Pattern             | ✅ COMPLIANT | Standard pattern: Turnstile → Validate → DeepSeek → Log → Return |
| VII. Content Tone                 | ✅ COMPLIANT | Fun, creator-friendly tone in all translations                   |

**Platform Integration Checklist (Principle IV)**:

1. [ ] Platform hub: `app/(tools)/onlyfans/page.tsx`
2. [ ] Navigation: Add to `app/components/navigation.tsx`
3. [ ] Translations: Add `nav.onlyfans` + tool keys to `lib/locales/`
4. [ ] SEO metadata: Add OnlyFans to `lib/seo-metadata.ts`
5. [ ] Tool selector: Add to `app/components/tool-selector.tsx`
6. [ ] Platform logo: `app/components/platform-logo.tsx` + `/public/platforms/onlyfans.svg`
7. [ ] Home page: Add to `app/page.tsx` platforms array
8. [ ] Spanish URLs: Add rewrites to `next.config.ts`
9. [ ] Routes docs: Update `docs/RUTAS_ALIAS.md`
10. [ ] PRD update: Add tools to `PRD.md`

**Special Consideration - Content Moderation**:

- FR-010 and FR-017 require explicit guardrails in AI prompts
- All DeepSeek prompts MUST include instructions to avoid explicit/sexual content
- This is critical for OnlyFans platform to position KiviTools as professional creator economy tool

## Project Structure

### Documentation (this feature)

```text
specs/013-onlyfans-creator-tools/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Next.js App Router structure (existing project)
app/
├── (tools)/
│   └── onlyfans/                    # NEW: Platform hub + tools
│       ├── page.tsx                 # Platform hub page
│       ├── bio-generator/
│       │   └── page.tsx             # Bio Generator tool
│       ├── caption-generator/
│       │   └── page.tsx             # Caption Generator tool
│       ├── ppv-message-generator/
│       │   └── page.tsx             # PPV Message Generator tool
│       └── welcome-message-generator/
│           └── page.tsx             # Welcome Message Generator tool
├── api/
│   └── tools/
│       └── onlyfans/                # NEW: API routes
│           ├── bio-generator/
│           │   └── route.ts
│           ├── caption-generator/
│           │   └── route.ts
│           ├── ppv-message-generator/
│           │   └── route.ts
│           └── welcome-message-generator/
│               └── route.ts
└── components/
    ├── navigation.tsx               # UPDATE: Add OnlyFans platform
    ├── tool-selector.tsx            # UPDATE: Add OnlyFans tools
    └── platform-logo.tsx            # UPDATE: Add OnlyFans logo

lib/
├── deepseek.ts                      # UPDATE: Add 4 generation functions
├── seo-metadata.ts                  # UPDATE: Add OnlyFans platform
└── locales/
    ├── en/
    │   └── common.ts                # UPDATE: Add OnlyFans translations
    └── es/
        └── common.ts                # UPDATE: Add OnlyFans translations

public/
└── platforms/
    └── onlyfans.svg                 # NEW: Platform logo

# Config files
next.config.ts                       # UPDATE: Spanish URL rewrites
docs/RUTAS_ALIAS.md                  # UPDATE: Document new routes
PRD.md                               # UPDATE: Mark tools as complete
```

**Structure Decision**: Follows existing KiviTools pattern for platform tools. No new architectural patterns required - extends existing `/onlyfans/` folder with 4 tools following established conventions.

## Complexity Tracking

> **No constitution violations requiring justification.**

This feature follows all established patterns and does not introduce new complexity. The only special consideration is content moderation guardrails in AI prompts, which is a requirement (FR-010, FR-017), not a complexity violation.

---

## Constitution Check - Post-Design Validation

_Re-checked after Phase 1 design completion._

| Principle                         | Status      | Design Artifacts                                         |
| --------------------------------- | ----------- | -------------------------------------------------------- |
| I. Internationalization-First     | ✅ VERIFIED | quickstart.md specifies translation files to update      |
| II. HeroUI v3 Component-Only      | ✅ VERIFIED | quickstart.md shows HeroUI Button/Input usage            |
| III. Security-By-Default          | ✅ VERIFIED | contracts/api-contracts.md defines Turnstile requirement |
| IV. 10-Point Platform Integration | ✅ VERIFIED | Project Structure lists all 10 integration points        |
| V. Tool Page Structure            | ✅ VERIFIED | data-model.md + contracts define 8-section structure     |
| VI. API Route Pattern             | ✅ VERIFIED | contracts/api-contracts.md follows standard pattern      |
| VII. Content Tone                 | ✅ VERIFIED | research.md confirms professional/fun positioning        |

**Content Moderation Design Validated**:

- research.md documents moderation approach (system prompt guardrails)
- quickstart.md includes code pattern with moderation instructions
- contracts/api-contracts.md notes all responses are moderated

---

## Generated Artifacts Summary

| Artifact            | Path                                                          | Purpose              |
| ------------------- | ------------------------------------------------------------- | -------------------- |
| Implementation Plan | `specs/013-onlyfans-creator-tools/plan.md`                    | This file            |
| Research            | `specs/013-onlyfans-creator-tools/research.md`                | Technical decisions  |
| Data Model          | `specs/013-onlyfans-creator-tools/data-model.md`              | Entity definitions   |
| API Contracts       | `specs/013-onlyfans-creator-tools/contracts/api-contracts.md` | Endpoint specs       |
| Quickstart          | `specs/013-onlyfans-creator-tools/quickstart.md`              | Implementation guide |

**Next Step**: Run `/speckit.tasks` to generate implementation tasks.
