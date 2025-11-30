# Implementation Plan: Blog Posts Expansion

**Branch**: `009-blog-posts-expansion` | **Date**: 2025-11-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-blog-posts-expansion/spec.md`

## Summary

Create 6 extensive, bilingual (ES/EN) blog posts with SEO optimization, natural human-like writing, internal tool links, and localized URL aliases. Total: 12 posts (6 topics × 2 languages). Posts must include proper JSON-LD structured data, hreflang tags, multiple CTAs, and a related posts grid component.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4  
**Storage**: Static data in `lib/blog-data.ts` (existing pattern)  
**Testing**: Manual testing, Google Rich Results Test, Lighthouse SEO audit  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Core Web Vitals passing, <3s LCP  
**Constraints**: Posts must be 1,500+ words, SEO-friendly, human-like tone  
**Scale/Scope**: 12 blog posts (6 ES + 6 EN), ~18,000+ words total content

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Constitution file contains placeholder template - no specific constraints defined. Proceeding with standard Next.js/KiviTools patterns established in codebase.

**Pre-Phase 0 Check**: ✅ PASS - No violations identified  
**Post-Phase 1 Check**: ✅ PASS - Design follows existing patterns, extends BlogPost interface minimally, uses established rewrite pattern for URLs

## Project Structure

### Documentation (this feature)

```text
specs/009-blog-posts-expansion/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A - no API contracts needed
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
lib/
├── blog-data.ts         # MODIFY: Add 12 new posts, extend BlogPost interface

app/
├── (blog)/
│   └── blog/
│       ├── page.tsx     # MODIFY: Language-aware filtering
│       └── [slug]/
│           └── page.tsx # MODIFY: Add hreflang, JSON-LD, related posts grid

next.config.ts           # MODIFY: Add blog URL rewrites for Spanish slugs
```

**Structure Decision**: Extend existing blog infrastructure. No new directories needed - all changes fit within established patterns.

## Complexity Tracking

> No violations identified - no complexity justification needed.
