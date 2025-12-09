# Tasks: Centralized Tools Page with Platform Filtering

**Feature**: 017-homepage-tools-feed  
**Input**: Design documents from `/specs/017-homepage-tools-feed/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: No automated tests (manual testing protocol per constitution)

**Organization**: Tasks grouped by user story to enable independent implementation and testing

---

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependencies

- [x] T001 Install @tanstack/react-virtual dependency via npm/pnpm
- [x] T002 [P] Verify TypeScript 5.x configuration in tsconfig.json supports strict mode
- [x] T003 [P] Verify Next.js 16.0.1 App Router configuration in next.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Update Tool interface in types/index.ts with new fields (dateAdded, popularity, featured, tags)
- [x] T005 Update OFFICIAL_TOOLS array in lib/tools-index.ts with new fields for all 100+ tools (dateAdded: ISO string, popularity: 0-100, featured: boolean, tags: string[]) - Use migration script scripts/populate-tool-metadata.mjs OR follow population strategy in data-model.md
- [x] T006 [P] Export PLATFORMS array from lib/tools-index.ts (28 platforms list)
- [x] T007 [P] Add SortOption type to types/index.ts ("featured" | "newest" | "popular" | "alphabetical")
- [x] T008 [P] Add FilterState interface to types/index.ts (platform, sort, search)
- [x] T009 [P] Create useDebounce custom hook in lib/hooks/use-debounce.ts (300ms delay for search input)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse All Tools (Priority: P1) 🎯 MVP

**Goal**: Users can navigate to /tools and see all tools as a scrollable infinite feed

**Independent Test**: Navigate to /tools → See first batch of ~30 tools → Scroll down → More tools load automatically

### Implementation for User Story 1

- [x] T010 [P] [US1] Create app/(tools)/tools/page.tsx with basic page structure and "use client" directive
- [x] T011 [US1] Implement filteredTools useMemo in app/(tools)/tools/page.tsx (filter logic: platform, search, sort)
- [x] T012 [US1] Implement TanStack Virtual virtualizer in app/(tools)/tools/page.tsx (parentRef, estimateSize: 200px, overscan: 5)
- [x] T013 [US1] Implement infinite scroll trigger useEffect in app/(tools)/tools/page.tsx (detect last visible item, load +20 batch)
- [x] T014 [US1] Add displayedCount state management in app/(tools)/tools/page.tsx (initial: 30, increment: 20)
- [x] T015 [US1] Add "No more tools" / end of feed indicator in app/(tools)/tools/page.tsx when displayedCount >= filteredTools.length
- [x] T016 [P] [US1] Create ToolCard component in app/components/tool-card.tsx with React.memo wrapper
- [x] T017 [US1] Implement ToolCard rendering in virtualized list in app/(tools)/tools/page.tsx (map virtualItems → ToolCard)
- [x] T018 [US1] Add SEO metadata export in app/(tools)/tools/layout.tsx (generateToolMetadata for /tools page)
- [x] T019 [P] [US1] Add translation keys for tools page in lib/locales/en/common.ts (toolsPage.title, toolsPage.filters._, toolsPage.sort._)
- [x] T020 [P] [US1] Add translation keys for tools page in lib/locales/es/common.ts (same keys as EN)

**Checkpoint**: User Story 1 complete - /tools page displays all tools with infinite scroll

---

## Phase 4: User Story 2 - Filter Tools by Platform from Homepage (Priority: P1)

**Goal**: Clicking platform card on homepage navigates to /tools?platform=X with filtered results

**Independent Test**: Homepage → Click TikTok card → Lands on /tools?platform=tiktok → Only TikTok tools visible

### Implementation for User Story 2

- [x] T021 [US2] Update homepage platform cards href in app/page.tsx (change from "/tiktok" to "/tools?platform=tiktok" for all platforms)
- [x] T022 [US2] Add URL query parameter reading and integrate platform filter in app/(tools)/tools/page.tsx (useSearchParams to read ?platform=X, integrate filter into filteredTools useMemo)
- [x] T023 [US2] Add platform URL state management in app/(tools)/tools/page.tsx (updateFilter function to modify query params)
- [x] T024 [US2] Add scroll reset on platform filter change in app/(tools)/tools/page.tsx (virtualizer.scrollToIndex(0) and setDisplayedCount(30))

**Checkpoint**: User Story 2 complete - Platform cards link to filtered tools page

---

## Phase 5: User Story 3 - Sort Tools by Criteria (Priority: P2)

**Goal**: Users can change sort order on /tools (Featured, Newest, Popular, Alphabetical)

**Independent Test**: /tools → Select "Newest" sort → Tools reorder newest first → URL updates to ?sort=newest

### Implementation for User Story 3

- [x] T026 [P] [US3] Create SortSelector component in app/components/sort-selector.tsx (HeroUI Button or Tabs component)
- [x] T027 [US3] Add sort URL parameter reading and implement sort logic in app/(tools)/tools/page.tsx (useSearchParams to read ?sort=X default "featured", implement switch case in filteredTools useMemo: featured → filter by .featured, newest → sort by dateAdded, popular → sort by popularity, alphabetical → sort by name)
- [x] T028 [US3] Integrate SortSelector component in app/(tools)/tools/page.tsx layout (above tools feed or in header)
- [x] T029 [US3] Add sort state management in app/(tools)/tools/page.tsx (updateFilter('sort', value) to modify URL)
- [x] T030 [US3] Add scroll reset on sort change in app/(tools)/tools/page.tsx (virtualizer.scrollToIndex(0) and setDisplayedCount(30))

**Checkpoint**: User Story 3 complete - Sort functionality working with URL state

---

## Phase 6: User Story 4 - Search Tools from Tools Page (Priority: P2)

**Goal**: Users can search tools by name/description on /tools page

**Independent Test**: /tools → Type "bio" in search → Only bio-related tools appear → URL updates to ?q=bio

### Implementation for User Story 4

- [x] T031 [P] [US4] Create search input component in app/(tools)/tools/page.tsx (HeroUI Input with search icon)
- [x] T032 [US4] Add search URL parameter reading in app/(tools)/tools/page.tsx (useSearchParams to read ?q=X)
- [x] T033 [US4] Implement search debouncing in app/(tools)/tools/page.tsx (useDebounce hook with 300ms delay)
- [x] T034 [US4] Implement search filter logic in filteredTools useMemo in app/(tools)/tools/page.tsx (filter by name.includes(q) || description.includes(q) || tags.some(tag => tag.includes(q)))
- [x] T035 [US4] Add search state management in app/(tools)/tools/page.tsx (updateFilter('search', value) to modify URL ?q=X)
- [x] T036 [US4] Add search clear functionality in app/(tools)/tools/page.tsx (clear button when search active)
- [x] T037 [US4] Add empty state for no search results in app/(tools)/tools/page.tsx (friendly message with suggestions)
- [x] T038 [US4] Add scroll reset on search change in app/(tools)/tools/page.tsx (virtualizer.scrollToIndex(0) and setDisplayedCount(30))

**Checkpoint**: User Story 4 complete - Search functionality working with debounce and URL state

---

## Phase 7: User Story 5 - Platform Filter on Tools Page (Priority: P1)

**Goal**: Users can filter by platform directly on /tools page (sidebar on desktop, chips on mobile)

**Independent Test**: /tools → Click platform in sidebar (desktop) or chip (mobile) → Only tools from that platform appear → URL updates to ?platform=X

### Implementation for User Story 5

- [x] T039 [P] [US5] Create PlatformFilter component in app/components/platform-filter.tsx (fixed sidebar, "All Platforms" option, independent scroll)
- [x] T040 [P] [US5] Create PlatformChips component in app/components/platform-chips.tsx (horizontal scrolling chips for mobile)
- [x] T041 [US5] Integrate PlatformFilter in app/(tools)/tools/page.tsx layout (hidden lg:block, fixed left sidebar)
- [x] T042 [US5] Integrate PlatformChips in app/(tools)/tools/page.tsx layout (lg:hidden, above tools feed)
- [x] T043 [US5] Add platform selection callback in app/(tools)/tools/page.tsx (onSelect handler that calls updateFilter('platform', value))
- [x] T044 [US5] Add selected platform prop passing in app/(tools)/tools/page.tsx (pass current platform from URL to both filter components)
- [x] T045 [US5] Add "All Platforms" clear functionality in both filter components (onSelect(null) clears platform filter)
- [x] T046 [US5] Style PlatformFilter with semantic color classes in app/components/platform-filter.tsx (use text-foreground, bg-surface, bg-accent for selected state)
- [x] T047 [US5] Style PlatformChips with HeroUI Chip component in app/components/platform-chips.tsx (use HeroUI Chip with selected state)

**Checkpoint**: User Story 5 complete - Platform filtering UI working on desktop and mobile

---

## Phase 8: SEO Preservation & Redirects

**Purpose**: Maintain SEO authority and handle legacy platform page URLs

- [x] T048 Generate 301 redirects array in next.config.ts (map all 28 platforms: "/platform" → "/tools?platform=X")
- [x] T049 Add catch-all redirect in next.config.ts (redirect "/platform/:path\*" → "/tools?platform=X" for nested platform routes)
- [x] T050 [P] Update navigation dropdown links in app/components/navigation.tsx (change platform links from "/platform" to "/tools?platform=X")
- [x] T051 [P] Add canonical URL tags in app/(tools)/tools/page.tsx metadata (canonical: https://kivitools.com/tools with query params)

**Checkpoint**: SEO preserved - All legacy URLs redirect with 301 status

---

## Phase 9: Accessibility & ARIA Implementation

**Purpose**: Ensure keyboard navigation and screen reader support

- [x] T052 Add ARIA feed role to tools container in app/(tools)/tools/page.tsx (role="feed" aria-label="Tools Feed")
- [x] T053 Add ARIA article roles to ToolCard in app/components/tool-card.tsx (role="article" aria-posinset aria-setsize)
- [x] T054 Add aria-busy state during loading in app/(tools)/tools/page.tsx (aria-busy={isLoading})
- [x] T055 [P] Add keyboard navigation handlers in app/(tools)/tools/page.tsx (PageDown, PageUp, Ctrl+End, Ctrl+Home)
- [x] T056 [P] Add screen reader announcements in app/(tools)/tools/page.tsx (aria-live region for "Loaded X more tools")

**Checkpoint**: Accessibility complete - ARIA feed pattern implemented

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple components

- [x] T057 [P] Add loading skeleton state in app/(tools)/tools/page.tsx (show skeleton cards during initial load)
- [x] T058 [P] Add error boundary in app/(tools)/tools/page.tsx (catch virtualization errors gracefully)
- [x] T059 [P] Optimize ToolCard re-renders in app/components/tool-card.tsx (verify React.memo is working, add console.log in dev)
- [x] T060 Test dark mode compatibility for all new components (verify semantic color classes work in dark theme)
- [x] T061 Test mobile responsive design on real devices (iOS Safari, Android Chrome)
- [x] T062 Test performance with Chrome DevTools (verify filter < 300ms, infinite scroll batch < 500ms, LCP < 2.5s)
- [x] T063 [P] Update PRD.md with feature completion status (mark 017-homepage-tools-feed as ✅)
- [x] T064 Run quickstart.md validation (follow all 8 steps, verify implementation matches)
- [x] T065 [P] Archive or document platform hub pages in app/(tools)/[platform]/page.tsx (convert to redirect-only routes OR remove files and rely on next.config.ts redirects)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (Browse All Tools) can start after Foundational - No dependencies on other stories
  - US2 (Filter by Platform from Homepage) depends on US1 core page structure
  - US3 (Sort Tools) can start after US1 - Independent implementation
  - US4 (Search Tools) can start after US1 - Independent implementation
  - US5 (Platform Filter UI) depends on US2 platform URL state
- **SEO Preservation (Phase 8)**: Can start after US2 (depends on /tools page existing)
- **Accessibility (Phase 9)**: Can start after US1 (depends on ToolCard and feed structure)
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on T010-T018 from US1 (page.tsx must exist)
- **User Story 3 (P2)**: Depends on T011 from US1 (filteredTools useMemo must exist)
- **User Story 4 (P2)**: Depends on T011 from US1 (filteredTools useMemo must exist)
- **User Story 5 (P1)**: Depends on T022-T024 from US2 (platform URL state management must exist)

### Within Each User Story

- **US1**: T010 (create page) BEFORE all other US1 tasks
- **US2**: T021 (update homepage) can run parallel to other US2 tasks
- **US3**: T026 (create SortSelector) BEFORE T029 (integrate it)
- **US4**: T032-T034 (search input + debounce) BEFORE T035 (filter logic)
- **US5**: T040-T041 (create components) BEFORE T042-T043 (integrate them)

### Parallel Opportunities

- **Setup (Phase 1)**: T002 and T003 can run in parallel
- **Foundational (Phase 2)**: T006, T007, T008, T009 can all run in parallel after T004-T005
- **US1**: T016, T019, T020 can run in parallel (different files)
- **US3**: T026 can start as soon as US1 T011 is complete (independent component)
- **US4**: T032 can start as soon as US1 T011 is complete (independent search input)
- **US5**: T040 and T041 can run in parallel (different component files)
- **Phase 8**: T051 and T052 can run in parallel (different files)
- **Phase 9**: T056 and T057 can run in parallel (different features)
- **Phase 10**: T058, T059, T060 can run in parallel (different files/concerns)

---

## Parallel Example: User Story 1

```bash
# After T010 (create page.tsx) completes:

# Parallel batch 1:
Task T016: "Create ToolCard component in app/components/tool-card.tsx"
Task T019: "Add EN translations in lib/locales/en/common.ts"
Task T020: "Add ES translations in lib/locales/es/common.ts"

# Sequential after T016 completes:
Task T017: "Implement ToolCard rendering in page.tsx" (depends on T016)
```

---

## Parallel Example: Phase 9 (Accessibility)

```bash
# All Phase 9 tasks can start in parallel after US1 is complete:

Task T053: "Add ARIA feed role to tools container"
Task T054: "Add ARIA article roles to ToolCard"
Task T055: "Add aria-busy state during loading"
Task T056: "Add keyboard navigation handlers"  # Different feature, no file conflict
Task T057: "Add screen reader announcements"  # Different feature, no file conflict
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2 Only)

1. Complete Phase 1: Setup ✅
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories) ✅
3. Complete Phase 3: User Story 1 (Browse All Tools) ✅
4. Complete Phase 4: User Story 2 (Filter by Platform from Homepage) ✅
5. **STOP and VALIDATE**: Test /tools page with platform filtering from homepage
6. Deploy/demo if ready

**Rationale**: US1 + US2 deliver core value (centralized tools page with homepage integration). US3-US5 are enhancements.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready ✅
2. Add User Story 1 → Test independently → Deploy/Demo (Browse all tools) 🎯
3. Add User Story 2 → Test independently → Deploy/Demo (Platform filtering from homepage) 🎯
4. Add User Story 5 → Test independently → Deploy/Demo (Platform filter UI on /tools) 🎯
5. Add User Story 3 → Test independently → Deploy/Demo (Sort functionality)
6. Add User Story 4 → Test independently → Deploy/Demo (Search functionality)
7. Add Phase 8 → Test redirects → Deploy/Demo (SEO preservation)
8. Add Phase 9 → Test accessibility → Deploy/Demo (A11y complete)
9. Add Phase 10 → Final polish → Deploy/Demo (Production ready)

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together ✅
2. Once Foundational is done:
   - **Developer A**: User Story 1 (T010-T020)
   - **Developer B**: User Story 3 (T026-T031) _after US1 T011 completes_
   - **Developer C**: User Story 4 (T032-T039) _after US1 T011 completes_
3. After US1 completes:
   - **Developer A**: User Story 2 (T021-T025)
   - **Developer B**: User Story 5 (T040-T048) _after US2 completes_
4. Stories complete and integrate independently

---

## Performance Testing Checklist

**After completing each user story, verify:**

- [ ] Initial page load < 2s (Lighthouse)
- [ ] Filter change < 300ms (Chrome DevTools Performance tab)
- [ ] Infinite scroll batch load < 500ms (Network tab)
- [ ] LCP (Largest Contentful Paint) < 2.5s (Lighthouse)
- [ ] FID (First Input Delay) < 100ms (Lighthouse)
- [ ] CLS (Cumulative Layout Shift) < 0.1 (Lighthouse)
- [ ] Only ~15 DOM elements rendered at any scroll position (inspect virtualized list)
- [ ] No unnecessary re-renders on scroll (React DevTools Profiler)

---

## Manual Testing Protocol

**Test each user story independently:**

### US1 Testing

1. Navigate to http://localhost:3000/tools
2. Verify first ~30 tools appear
3. Scroll down slowly → verify more tools load
4. Scroll to bottom → verify "No more tools" message
5. Test on mobile, tablet, desktop
6. Test in light and dark mode

### US2 Testing

1. Navigate to http://localhost:3000
2. Click TikTok platform card
3. Verify URL is /tools?platform=tiktok
4. Verify only TikTok tools appear
5. Repeat for 3-5 other platforms

### US3 Testing

1. Navigate to /tools
2. Select "Newest" sort → verify tools reorder
3. Verify URL is /tools?sort=newest
4. Repeat for Popular, Alphabetical, Featured

### US4 Testing

1. Navigate to /tools
2. Type "bio" in search bar
3. Wait 300ms (debounce)
4. Verify URL is /tools?q=bio
5. Verify only bio-related tools appear
6. Clear search → verify all tools return

### US5 Testing

1. **Desktop**: Navigate to /tools → verify sidebar visible on left
2. Click platform in sidebar → verify filter applies
3. Click "All Platforms" → verify filter clears
4. **Mobile**: Navigate to /tools → verify horizontal chips above feed
5. Tap platform chip → verify filter applies

### Phase 8 Testing

1. Navigate to http://localhost:3000/tiktok
2. Verify 301 redirect to /tools?platform=tiktok
3. Verify URL in browser address bar changed
4. Test 3-5 platform URLs

### Phase 9 Testing

1. Navigate to /tools
2. Press Tab → verify focus moves through interactive elements
3. Press PageDown → verify next tool focused
4. Press PageUp → verify previous tool focused
5. Use screen reader (NVDA/JAWS/VoiceOver) → verify announcements

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- No automated tests (manual testing protocol per constitution)
- Translation keys required for bilingual support (ES/EN)
- HeroUI v3 components only (no native HTML elements per constitution)
- Semantic color classes for dark mode compatibility (text-foreground, bg-surface, etc.)

---

## Summary

- **Total Tasks**: 65 tasks (reduced from 67 after merging duplicates D1, D2)
- **Phases**: 10 (Setup → Foundational → 5 User Stories → SEO → A11y → Polish)
- **MVP Scope**: Phase 1-4 (Setup + Foundational + US1 + US2) = ~24 tasks
- **Full Implementation**: All 65 tasks
- **Parallel Opportunities**: ~25 tasks marked [P] can run in parallel within their phase
- **Critical Path**: Phase 1 → Phase 2 → US1 T010-T018 → US2 T021-T024 (MVP)
- **Independent Tests**: Each user story has specific test criteria
- **Performance Targets**: < 2s load, < 300ms filter, < 500ms scroll batch
