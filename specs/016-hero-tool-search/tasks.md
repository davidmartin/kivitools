# Tasks: Hero Tool Search with Auto-Create

**Input**: Design documents from `/specs/016-hero-tool-search/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: No automated tests requested. Manual testing per Constitution and quickstart.md.

**Organization**: Tasks grouped by user story (P1, P2, P3) for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared types and utilities needed across all stories

- [x] T001 [P] Create TypeScript interfaces in types/search.ts (SearchResult, OfficialTool, CommunityToolResult, AutoCreateRequest, AutoCreateResponse, ToolInput, AutoCreateConfig)
- [x] T002 [P] Add search-related translations to lib/locales/en/common.ts (search.placeholder, search.noResults, search.createTool, search.createToolPrompt, search.loading, search.official, search.community, search.by, search.viewMore)
- [x] T003 [P] Add search-related translations to lib/locales/es/common.ts (same keys as T002 in Spanish)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create official tools static index in lib/tools-index.ts - extract all tools from platform pages (tiktok, instagram, twitter, snapchat, youtube, reddit, discord, twitch, suno, etc.) with nameKey, descriptionKey, platform, href, icon fields
- [x] T005 Create search utility functions in lib/search-utils.ts - implement calculateRelevanceScore(query, tool), sanitizeSearchQuery(input), mergeAndSortResults(official, community)

**Checkpoint**: Foundation ready - user story implementation can now begin ✅

---

## Phase 3: User Story 1 - Search and Find Existing Tool (Priority: P1) 🎯 MVP

**Goal**: Users can search for tools and find existing official tools instantly

**Independent Test**: Search "tiktok script" → see TikTok Script Writer in results; click → navigate to tool page

### Implementation for User Story 1

- [x] T006 [US1] Create SearchResultItem component in app/components/search-result-item.tsx - display tool name, description, platform, icon, "Official" badge for official tools
- [x] T007 [US1] Create HeroSearch component shell in app/components/hero-search.tsx - input field with placeholder, basic state management (query, results, isOpen)
- [x] T008 [US1] Implement official tools search logic in HeroSearch - filter tools-index based on query, calculate relevance scores, sort by score
- [x] T009 [US1] Add results dropdown to HeroSearch - display up to 10 SearchResultItem components, position below input
- [x] T010 [US1] Add click-to-navigate functionality - clicking a result navigates to tool.href using router.push
- [x] T011 [US1] Add debounce (300ms) to search input - prevent excessive re-renders while typing
- [x] T012 [US1] Add minimum 2 character requirement - don't search until query length >= 2
- [x] T013 [US1] Integrate HeroSearch into app/page.tsx - add component to hero section below h1, style to match hero design

**Checkpoint**: User Story 1 complete - users can search and find official tools ✅

---

## Phase 4: User Story 2 - Browse Combined Tool Catalog (Priority: P1)

**Goal**: Users see both official and community tools in search results with visual distinction

**Independent Test**: Search "generator" → see mixed results with "Official" and "Community" badges; community tools show author name

### Implementation for User Story 2

- [x] T014 [US2] Create GET /api/search/route.ts - query Appwrite "tools" collection with filters: status="approved" OR (author_id=userId AND status="pending"), search in name+description using Query.contains
- [x] T015 [US2] Add userId query param handling to search API - pass current user ID for pending tools visibility
- [x] T016 [US2] Update SearchResultItem to support community tools - add "Community" badge, show "by {authorName}" text
- [x] T017 [US2] Integrate community search in HeroSearch - fetch from /api/search in parallel with local official search
- [x] T018 [US2] Merge official and community results - use mergeAndSortResults from search-utils, limit to 10 total
- [x] T019 [US2] Add loading state to HeroSearch - show "Searching..." while API call in progress, use Spinner from HeroUI

**Checkpoint**: User Story 2 complete - users see combined catalog with visual distinction ✅

---

## Phase 5: User Story 3 - Auto-Create Tool from Search (Priority: P2)

**Goal**: Users can create a new tool when search returns few/no results

**Independent Test**: Search "xyznotexist" → see prominent "Create this tool" CTA; click (logged in) → builder opens pre-filled

### Implementation for User Story 3

- [x] T020 [US3] Add generateToolFromQuery function to lib/deepseek.ts - takes query + language, returns AutoCreateConfig with name, description, platform, promptTemplate, inputs
- [x] T021 [US3] Create POST /api/tools/auto-create/route.ts - validate request, call generateToolFromQuery, return config JSON
- [x] T022 [US3] Create CreateToolCTA component in app/components/create-tool-cta.tsx - prominent style when isProminent=true (results<3), subtle when isProminent=false (results>=3)
- [x] T023 [US3] Integrate CreateToolCTA into HeroSearch dropdown - show after results list, pass isProminent based on results.length
- [x] T024 [US3] Handle authenticated user click on CreateToolCTA - call /api/tools/auto-create, redirect to /builder with config in URL params (encoded)
- [x] T025 [US3] Handle unauthenticated user click on CreateToolCTA - save query to sessionStorage, redirect to /login?createTool=query
- [x] T026 [US3] Update /builder/page.tsx to read URL params - detect createTool param, call auto-create API, pre-fill form fields with returned config
- [x] T027 [US3] Update login success redirect - check for createTool param, redirect to /builder with preserved query

**Checkpoint**: User Story 3 complete - users can auto-create tools from search ✅

---

## Phase 6: User Story 4 - Search Experience Polish (Priority: P3)

**Goal**: Smooth UX with keyboard navigation, loading states, and mobile optimization

**Independent Test**: Use arrow keys to navigate results → Enter opens selected; Escape closes dropdown; mobile shows full-width dropdown

### Implementation for User Story 4

NOTE: Tasks T028, T029, T030 were already implemented as part of MVP (US1) in hero-search.tsx

- [x] T028 [US4] Add keyboard navigation to HeroSearch - track selectedIndex state, handle ArrowUp/ArrowDown to change selection, Enter to navigate, Escape to close
- [x] T029 [US4] Add visual selection indicator - highlight currently selected result with bg-accent-hover
- [x] T030 [US4] Add click-outside-to-close functionality - use useRef and useEffect to detect clicks outside dropdown, close when clicked outside
- [x] T031 [US4] Add loading skeleton while community search in progress - show 3 skeleton rows while waiting for API response
- [ ] T032 [US4] Optimize mobile experience - full-width dropdown on screens < md, touch-friendly tap targets (min 44px height), proper z-index for overlay

**Checkpoint**: User Story 4 complete - polished search experience

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and validation

- [ ] T033 [P] Add "View more results" option when total > 10 - navigate to dedicated search results page (optional, can be /tools?q=query)
- [x] T034 [P] Add error handling to HeroSearch - show user-friendly message if API fails, with retry option
- [x] T035 [P] Verify dark mode styling for all new components - test HeroSearch, SearchResultItem, CreateToolCTA in dark theme
- [x] T036 [P] Verify responsive design - test on mobile viewport (375px), tablet (768px), desktop (1280px)
- [ ] T037 Run quickstart.md validation - execute all test scenarios from quickstart.md, document any issues

**Note**: T033 and T037 are optional polish tasks that can be done post-MVP. The core feature is complete and functional.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ────────────────┐
                                ▼
Phase 2 (Foundational) ─────────┤ BLOCKS all user stories
                                ▼
┌───────────────────────────────┼───────────────────────────────┐
│                               │                               │
▼                               ▼                               ▼
Phase 3 (US1)           Phase 4 (US2)                   Phase 5 (US3)
Search Official         Combined Catalog                 Auto-Create
       │                       │                               │
       │                       │                               │
       ▼                       ▼                               ▼
       └───────────────────────┴───────────────────────────────┘
                                │
                                ▼
                        Phase 6 (US4)
                        Polish UX
                                │
                                ▼
                        Phase 7 (Final)
```

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 - No dependencies on other stories - **MVP**
- **US2 (P1)**: Depends on US1 (extends search with community tools)
- **US3 (P2)**: Depends on US1/US2 (needs search results to show CTA)
- **US4 (P3)**: Depends on US1/US2/US3 (polishes existing functionality)

### Parallel Opportunities per Phase

```bash
# Phase 1 - All tasks can run in parallel:
T001, T002, T003

# Phase 2 - Sequential (T005 depends on T004 for types):
T004 → T005

# Phase 3 (US1) - Some parallelism:
T006, T007 in parallel → T008 → T009 → T010 → T011 → T012 → T013

# Phase 4 (US2) - Some parallelism:
T014, T016 in parallel → T015 → T017 → T018 → T019

# Phase 5 (US3):
T020 → T021 → T022 → T023 → T024, T025 in parallel → T026 → T027

# Phase 6 (US4):
T028 → T029 → T030 → T031 → T032

# Phase 7 - All tasks can run in parallel:
T033, T034, T035, T036 → T037
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T005)
3. Complete Phase 3: User Story 1 (T006-T013)
4. **STOP and VALIDATE**: Users can search and find official tools
5. Deploy if ready - delivers core value

### Incremental Delivery

| Increment | Stories     | Value Delivered                     |
| --------- | ----------- | ----------------------------------- |
| MVP       | US1         | Official tools search               |
| +1        | US1+US2     | Full catalog (official + community) |
| +2        | US1+US2+US3 | Auto-create capability              |
| +3        | All         | Polished experience                 |

---

## Summary

| Phase        | Tasks     | Parallel | Story            |
| ------------ | --------- | -------- | ---------------- |
| Setup        | T001-T003 | 3        | -                |
| Foundational | T004-T005 | 1        | -                |
| US1 (P1)     | T006-T013 | 2        | Search Official  |
| US2 (P1)     | T014-T019 | 2        | Combined Catalog |
| US3 (P2)     | T020-T027 | 2        | Auto-Create      |
| US4 (P3)     | T028-T032 | 0        | Polish           |
| Final        | T033-T037 | 4        | Cleanup          |

**Total Tasks**: 37  
**MVP Tasks (US1 only)**: 13 (T001-T013)  
**Full Feature Tasks**: 37
