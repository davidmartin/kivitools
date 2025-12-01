# Tasks: DeepSeek Branding & SEO

**Input**: Design documents from `/specs/014-deepseek-platform/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅

**Tests**: Not requested in specification - skipping test tasks.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Assets and shared translations needed by all user stories

- [x] T001 Create DeepSeek logo SVG at `public/platforms/deepseek.svg` (simple blue icon, brand color #4F6CFF)
- [x] T002 [P] Add shared translations to `lib/locales/en/common.ts` (badge text, technology page)
- [x] T003 [P] Add shared translations to `lib/locales/es/common.ts` (badge text, technology page)

**Checkpoint**: Assets ready, translations available for all components

---

## Phase 2: User Story 1 - DeepSeek Badge Visibility (Priority: P1)

**Goal**: Users see "Powered by DeepSeek" badge in footer on ALL pages

**Independent Test**: Visit any page, scroll to footer, verify badge visible with logo

- [x] T004 [US1] Add "Powered by DeepSeek" badge component to `app/components/footer.tsx` with dark mode support
- [x] T005 [US1] Verify badge displays correctly on mobile (responsive)

**Checkpoint**: Badge visible in footer on all pages, works in light/dark mode

---

## Phase 3: User Story 2 - Technology Page for SEO (Priority: P1)

**Goal**: SEO landing page at `/about/technology` captures DeepSeek-related searches

**Independent Test**: Access `/about/technology` and `/sobre/tecnologia`, verify content and schema.org

- [x] T006 [US2] Create technology page at `app/(legal)/about/technology/page.tsx` with:
  - SEO metadata (title, description, keywords)
  - schema.org SoftwareApplication JSON-LD
  - Content explaining DeepSeek usage
  - HeroUI components (Card, Link)
- [x] T007 [US2] Add Spanish URL rewrite `/sobre/tecnologia` → `/about/technology` in `next.config.ts`
- [x] T008 [P] [US2] Document new route in `docs/RUTAS_ALIAS.md`

**Checkpoint**: Technology page accessible at both URLs with proper SEO metadata

---

## Phase 4: User Story 3 - Homepage DeepSeek Mention (Priority: P2)

**Goal**: Homepage mentions "Powered by DeepSeek" with link to technology page

**Independent Test**: Visit homepage, verify DeepSeek mention in hero/features section

- [x] T009 [US3] Add DeepSeek mention to homepage hero or features section in `app/page.tsx`
- [x] T010 [P] [US3] Add link from DeepSeek mention to `/about/technology`

**Checkpoint**: Homepage mentions DeepSeek with working link to technology page

---

## Phase 5: Validation & Polish

**Purpose**: Quality assurance across all user stories

- [x] T011 Validate US1: Badge visible on 5+ different pages, dark mode works, mobile responsive
- [x] T012 [P] Validate US2: Both URLs work (`/about/technology` and `/sobre/tecnologia`), Lighthouse ≥ 90
- [x] T013 [P] Validate US3: Homepage DeepSeek link navigates correctly

**Checkpoint**: All acceptance criteria from spec.md verified

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **US1 (Phase 2)**: Depends on T001 (logo) and T002/T003 (translations)
- **US2 (Phase 3)**: Depends on T002/T003 (translations)
- **US3 (Phase 4)**: Depends on T006 (technology page exists for link target)
- **Validation (Phase 5)**: Depends on all user stories complete

### Parallel Opportunities

```text
Phase 1 - Setup:
  T002, T003 can run in parallel (different files)

After Phase 1 complete:
  US1 (T004-T005) and US2 (T006-T008) can run in parallel

After US2 complete:
  US3 (T009-T010) can begin
```

---

## Summary

| Phase                | Tasks               | Story | Effort |
| -------------------- | ------------------- | ----- | ------ |
| Setup                | T001-T003 (3 tasks) | -     | 20 min |
| US1: Badge           | T004-T005 (2 tasks) | P1    | 30 min |
| US2: Technology Page | T006-T008 (3 tasks) | P1    | 45 min |
| US3: Homepage        | T009-T010 (2 tasks) | P2    | 20 min |
| Validation           | T011-T013 (3 tasks) | -     | 25 min |

**Total**: 13 tasks | **Estimated Time**: 2-2.5 hours

---

## Requirements Coverage

| Requirement                 | Task(s)           |
| --------------------------- | ----------------- |
| FR-001 (Footer badge)       | T004              |
| FR-002 (Technology page)    | T006              |
| FR-003 (Spanish URL)        | T007              |
| FR-004 (schema.org)         | T006              |
| FR-005 (Homepage mention)   | T009              |
| FR-006 (Translations)       | T002, T003        |
| FR-007 (SEO meta tags)      | T006              |
| NFR-001 (Badge performance) | T001 (inline SVG) |
| NFR-002 (Page load <2s)     | T012 (Lighthouse) |
