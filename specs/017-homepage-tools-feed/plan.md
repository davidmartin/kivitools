# Implementation Plan: Centralized Tools Page with Platform Filtering

**Branch**: `017-homepage-tools-feed` | **Date**: 2024-12-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/017-homepage-tools-feed/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a centralized `/tools` page displaying all 100+ tools with infinite scroll, platform filtering (fixed sidebar on desktop, horizontal chips on mobile), and sorting options (Featured, Newest, Popular, Alphabetical). Update homepage platform cards to link to `/tools?platform=X` instead of individual platform hub pages. Implement 301 redirects from deprecated `/platform` URLs to preserve SEO. Maintain existing search functionality integrated into the new page layout.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1 (App Router)  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, React 19, Tailwind CSS v4, next-intl or custom i18n  
**Storage**: Client-side filtering/sorting (tools data from `lib/tools-index.ts`), URL state via query params  
**Testing**: Manual testing protocol (no automated tests currently)  
**Target Platform**: Web (responsive: mobile, tablet, desktop)  
**Project Type**: Web application (Next.js App Router with client components)  
**Performance Goals**: Initial load <2s, filter/sort <300ms, infinite scroll batch load <500ms, LCP <2.5s  
**Constraints**: 100+ tools client-side rendering, SEO preservation via 301 redirects, bilingual support (ES/EN), dark mode compatibility  
**Scale/Scope**: 1 new page route (`/tools`), ~28 platform redirects, infinite scroll pagination, sidebar + mobile chips UI

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Phase 0 Check (Before Research) ✅ PASSED

All constitution principles satisfied. Performance consideration (infinite scroll) required research.

### Phase 1 Check (After Design) ✅ PASSED

**Re-evaluation after completing data model and contracts:**

### I. Internationalization-First ✅ PASS

- All translation keys defined in contracts/component-interfaces.md
- Translation structure documented: `toolsPage.*` namespace
- Both ES and EN keys required in implementation checklist

### II. HeroUI v3 Component-Only ✅ PASS

- Component interfaces specify HeroUI components only
- ToolCard uses `<Card>`, PlatformFilter uses buttons with semantic classes
- No native HTML elements in component contracts

### III. Security-By-Default ✅ PASS (N/A)

- No API routes created (client-side only feature)
- No user data collection or storage

### IV. 10-Point Platform Integration ✅ PASS (N/A)

- Not adding new platform, modifying navigation to existing platforms
- Changes documented in quickstart.md (navigation.tsx, page.tsx updates)

### V. Tool Page Structure ✅ PASS (N/A)

- Creating tools index page, not individual tool pages

### VI. API Route Pattern ✅ PASS (N/A)

- No new API routes for this feature

### VII. Content Tone ✅ PASS

- Translation keys allow for comedic content
- Empty states and UI labels can follow brand voice

### Additional Checks

**Performance** ✅ RESOLVED

- TanStack Virtual selected (research.md)
- Memoization patterns documented (data-model.md)
- Performance targets defined and achievable

**SEO Preservation** ✅ RESOLVED

- 301 redirects documented in research.md and quickstart.md
- Implementation in next.config.ts specified
- Link equity transfer confirmed (~90-99%)

**Dark Mode** ✅ PASS

- All components use semantic tokens (contracts specify)
- HeroUI color system maintained

**Accessibility** ✅ PASS

- ARIA feed pattern documented in contracts
- Keyboard navigation specified
- Screen reader announcements defined

### Gate Decision: ✅ PROCEED TO PHASE 2 (/speckit.tasks)

All constitution checks pass. Design is complete with:

- ✅ Research findings documented
- ✅ Data model defined
- ✅ Component contracts specified
- ✅ Quickstart guide created
- ✅ Agent context updated
- ✅ Performance targets achievable
- ✅ SEO preserved via 301 redirects
- ✅ Accessibility requirements clear

**Ready for implementation tasks breakdown.**

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── (tools)/
│   ├── tools/                    # NEW: Centralized tools page
│   │   └── page.tsx              # Main /tools page with filters & infinite scroll
│   ├── [platform]/               # MODIFY: Add redirects
│   │   └── page.tsx              # Convert to redirect component
│   └── page.tsx                  # MODIFY: Update platform card links
├── components/
│   ├── navigation.tsx            # MODIFY: Update platform dropdown links
│   ├── tool-card.tsx             # NEW: Reusable tool card component
│   ├── platform-filter.tsx       # NEW: Sidebar/chips filter component
│   └── hero-search.tsx           # EXISTING: Integrate into /tools
├── api/
│   └── [no changes needed]
lib/
├── tools-index.ts                # EXISTING: Contains all tools data
├── locales/
│   ├── en/
│   │   └── tools-page.ts         # NEW: Translations for /tools page
│   └── es/
│       └── tools-page.ts         # NEW: Translations for /tools page
├── seo-metadata.ts               # MODIFY: Add /tools metadata generation
└── hooks/
    └── use-infinite-scroll.ts    # NEW: Infinite scroll hook

next.config.ts                    # MODIFY: Add 301 redirects
docs/
└── RUTAS_ALIAS.md               # UPDATE: Document /tools routes

tests/ [currently none - manual testing per constitution]
```

**Structure Decision**: Next.js App Router structure with client-side components for filtering/sorting. New `/tools` route under `app/(tools)/` grouped route. Redirects implemented via Next.js middleware or config redirects. Tools data sourced from existing `lib/tools-index.ts` registry.

## Complexity Tracking

> **No violations requiring justification**

All constitution principles are satisfied. The feature introduces no architectural complexity requiring special justification.

---

## Phase Summary

### Phase 0: Research ✅ COMPLETE

**Artifacts Created**:

- `research.md`: Comprehensive analysis of infinite scroll libraries, 301 redirects, and implementation patterns

**Key Decisions**:

1. **Infinite Scroll**: TanStack Virtual (@tanstack/react-virtual) for DOM virtualization
2. **Redirects**: next.config.ts redirects for SEO-safe 301/308 status codes
3. **State Management**: URL query parameters for shareable filter state
4. **Performance**: Memoization + virtualization achieves <500ms targets

### Phase 1: Design & Contracts ✅ COMPLETE

**Artifacts Created**:

- `data-model.md`: Entity definitions (Tool, Platform, FilterState, PaginationState)
- `contracts/component-interfaces.md`: Component prop interfaces and contracts
- `quickstart.md`: Step-by-step implementation guide
- `.github/agents/copilot-instructions.md`: Updated agent context

**Architecture Decisions**:

1. **Components**: 5 new (ToolsPage, ToolCard, PlatformFilter, PlatformChips, SortSelector)
2. **Hooks**: useInfiniteScroll (custom), useDebounce (existing)
3. **Data Flow**: Static tools → Client filtering → Virtualized rendering
4. **Accessibility**: ARIA feed pattern with keyboard navigation

**No clarifications needed** - All NEEDS CLARIFICATION items resolved in Phase 0 research.

### Phase 2: Tasks Breakdown (NEXT)

**Command**: `/speckit.tasks`

**Expected Output**: `tasks.md` with granular implementation tasks

---

## Implementation Readiness

✅ **Technical decisions**: All made and documented  
✅ **Dependencies**: Identified (@tanstack/react-virtual)  
✅ **Data model**: Defined with TypeScript interfaces  
✅ **Component contracts**: Specified with props and behavior  
✅ **Performance targets**: Defined and achievable  
✅ **SEO strategy**: 301 redirects documented  
✅ **Accessibility**: ARIA patterns specified  
✅ **Translation keys**: Namespace defined

**Status**: Ready to proceed to `/speckit.tasks` for task breakdown.
