# Tasks: Creator & Commerce Platforms (Medium, Etsy, OnlyFans, Patreon)

**Input**: Design documents from `/specs/008-creator-platforms/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: No automated tests requested - manual testing via quickstart.md Testing Checklist

**Organization**: Tasks organized by user story (one platform per story) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=Medium, US2=Etsy, US3=OnlyFans, US4=Patreon)
- File paths are absolute from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Platform registration across all shared configuration files

- [x] T001 Create Medium logo SVG in public/platforms/medium.svg
- [x] T002 [P] Create Etsy logo SVG in public/platforms/etsy.svg
- [x] T003 [P] Create OnlyFans logo SVG in public/platforms/onlyfans.svg
- [x] T004 [P] Create Patreon logo SVG in public/platforms/patreon.svg
- [x] T005 Register all 4 platform logos in app/components/platform-logo.tsx (add to Platform type, add medium/onlyfans to needsInvert)
- [x] T006 Add 4 platforms to SEO metadata types in lib/seo-metadata.ts (Platform type, platformColors, platformNames)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core integrations that MUST be complete before ANY tool can work

**⚠️ CRITICAL**: No tool implementation can begin until this phase is complete

- [x] T007 Add 4 platforms to navigation.tsx with empty tools arrays in app/components/navigation.tsx
- [x] T008 [P] Add 4 platforms to tool-selector.tsx with empty tools arrays in app/components/tool-selector.tsx
- [x] T009 [P] Add 4 platforms to home page platforms array in app/page.tsx (currently 24, will be 28)
- [x] T010 [P] Update home page stats counter from "9" to "28" in app/page.tsx (line ~559, stats section shows outdated "9")
- [x] T011 Add navigation translation keys (nav.medium, nav.etsy, nav.onlyfans, nav.patreon) for all 6 languages in lib/translations.ts
- [x] T012 [P] Add platform page translation keys ([platform].page.title, [platform].page.description, [platform].info.title, [platform].info.description) for all 4 platforms × 6 languages in lib/translations.ts

**Checkpoint**: Foundation ready - platform tool implementation can now begin

---

## Phase 3: User Story 1 - Medium Platform (Priority: P1) 🎯 MVP

**Goal**: Implement Medium platform with 3 AI writing tools for article creation

**Independent Test**: Navigate to /medium, verify hub page loads, test all 3 tools generate content correctly

### Medium DeepSeek Functions

- [x] T013 [US1] Implement generateMediumArticleTitles() function in lib/deepseek.ts
- [x] T014 [P] [US1] Implement generateMediumArticleIntros() function in lib/deepseek.ts
- [x] T015 [P] [US1] Implement generateMediumBio() function in lib/deepseek.ts

### Medium Tool 1: Article Title Generator

- [x] T016 [US1] Create API route app/api/tools/medium/article-title-generator/route.ts
- [x] T017 [US1] Create tool page app/(tools)/medium/article-title-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T018 [US1] Add mediumArticleTitle._ translations (title, description, form._, result._, features._, hero._, howItWorks._, faq.\*) for 6 languages in lib/translations.ts

### Medium Tool 2: Article Intro Generator

- [x] T019 [P] [US1] Create API route app/api/tools/medium/article-intro-generator/route.ts
- [x] T020 [US1] Create tool page app/(tools)/medium/article-intro-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T021 [US1] Add mediumArticleIntro.\* translations for 6 languages in lib/translations.ts

### Medium Tool 3: Bio Generator

- [x] T022 [P] [US1] Create API route app/api/tools/medium/bio-generator/route.ts
- [x] T023 [US1] Create tool page app/(tools)/medium/bio-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T024 [US1] Add mediumBio.\* translations for 6 languages in lib/translations.ts

### Medium Hub & Integration

- [x] T025 [US1] Create Medium hub page app/(tools)/medium/page.tsx with 3 tool cards
- [x] T026 [US1] Update navigation.tsx Medium tools array with 3 tool entries
- [x] T027 [P] [US1] Update tool-selector.tsx Medium tools array with 3 tool entries
- [x] T028 [US1] Add Medium Spanish URL rewrites (3 routes) in next.config.ts
- [x] T029 [US1] Document Medium routes in docs/RUTAS_ALIAS.md

**Checkpoint**: Medium platform fully functional - can be deployed as MVP

---

## Phase 4: User Story 2 - Etsy Platform (Priority: P2)

**Goal**: Implement Etsy platform with 3 AI e-commerce tools for shop optimization

**Independent Test**: Navigate to /etsy, verify hub page loads, test all 3 tools generate SEO-optimized content

### Etsy DeepSeek Functions

- [x] T030 [US2] Implement generateEtsyProductTitles() function in lib/deepseek.ts
- [x] T031 [P] [US2] Implement generateEtsyProductDescriptions() function in lib/deepseek.ts
- [x] T032 [P] [US2] Implement generateEtsyShopAnnouncement() function in lib/deepseek.ts

### Etsy Tool 1: Product Title Generator

- [x] T033 [US2] Create API route app/api/tools/etsy/product-title-generator/route.ts
- [x] T034 [US2] Create tool page app/(tools)/etsy/product-title-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T035 [US2] Add etsyProductTitle.\* translations for 6 languages in lib/translations.ts

### Etsy Tool 2: Product Description Generator

- [x] T036 [P] [US2] Create API route app/api/tools/etsy/product-description-generator/route.ts
- [x] T037 [US2] Create tool page app/(tools)/etsy/product-description-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T038 [US2] Add etsyProductDescription.\* translations for 6 languages in lib/translations.ts

### Etsy Tool 3: Shop Announcement Generator

- [x] T039 [P] [US2] Create API route app/api/tools/etsy/shop-announcement-generator/route.ts
- [x] T040 [US2] Create tool page app/(tools)/etsy/shop-announcement-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T041 [US2] Add etsyShopAnnouncement.\* translations for 6 languages in lib/translations.ts

### Etsy Hub & Integration

- [x] T042 [US2] Create Etsy hub page app/(tools)/etsy/page.tsx with 3 tool cards
- [x] T043 [US2] Update navigation.tsx Etsy tools array with 3 tool entries
- [x] T044 [P] [US2] Update tool-selector.tsx Etsy tools array with 3 tool entries
- [x] T045 [US2] Add Etsy Spanish URL rewrites (3 routes) in next.config.ts
- [x] T046 [US2] Document Etsy routes in docs/RUTAS_ALIAS.md

**Checkpoint**: Etsy platform fully functional - Medium + Etsy both working

---

## Phase 5: User Story 3 - OnlyFans Platform (Priority: P3)

**Goal**: Implement OnlyFans platform with 3 AI content tools (SFW only, creator-focused)

**Independent Test**: Navigate to /onlyfans, verify hub page loads, test all 3 tools generate SFW professional content

### OnlyFans DeepSeek Functions

- [x] T047 [US3] Implement generateOnlyFansBio() function in lib/deepseek.ts (SFW prompts only)
- [x] T048 [P] [US3] Implement generateOnlyFansPostCaptions() function in lib/deepseek.ts (SFW prompts only)
- [x] T049 [P] [US3] Implement generateOnlyFansPromo() function in lib/deepseek.ts (SFW prompts only)

### OnlyFans Tool 1: Bio Generator

- [x] T050 [US3] Create API route app/api/tools/onlyfans/bio-generator/route.ts
- [x] T051 [US3] Create tool page app/(tools)/onlyfans/bio-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T052 [US3] Add onlyfansBio.\* translations for 6 languages in lib/translations.ts

### OnlyFans Tool 2: Post Caption Generator

- [x] T053 [P] [US3] Create API route app/api/tools/onlyfans/post-caption-generator/route.ts
- [x] T054 [US3] Create tool page app/(tools)/onlyfans/post-caption-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T055 [US3] Add onlyfansPostCaption.\* translations for 6 languages in lib/translations.ts

### OnlyFans Tool 3: Promo Generator

- [x] T056 [P] [US3] Create API route app/api/tools/onlyfans/promo-generator/route.ts
- [x] T057 [US3] Create tool page app/(tools)/onlyfans/promo-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T058 [US3] Add onlyfansPromo.\* translations for 6 languages in lib/translations.ts

### OnlyFans Hub & Integration

- [x] T059 [US3] Create OnlyFans hub page app/(tools)/onlyfans/page.tsx with 3 tool cards
- [x] T060 [US3] Update navigation.tsx OnlyFans tools array with 3 tool entries
- [x] T061 [P] [US3] Update tool-selector.tsx OnlyFans tools array with 3 tool entries
- [x] T062 [US3] Add OnlyFans Spanish URL rewrites (3 routes) in next.config.ts
- [x] T063 [US3] Document OnlyFans routes in docs/RUTAS_ALIAS.md

**Checkpoint**: OnlyFans platform fully functional - Medium + Etsy + OnlyFans all working

---

## Phase 6: User Story 4 - Patreon Platform (Priority: P4)

**Goal**: Implement Patreon platform with 3 AI creator tools using platform vocabulary

**Independent Test**: Navigate to /patreon, verify hub page loads, test all 3 tools generate content with Patreon vocabulary (patrons, tiers, benefits)

### Patreon DeepSeek Functions

- [x] T064 [US4] Implement generatePatreonTierDescriptions() function in lib/deepseek.ts
- [x] T065 [P] [US4] Implement generatePatreonAboutPage() function in lib/deepseek.ts
- [x] T066 [P] [US4] Implement generatePatreonPosts() function in lib/deepseek.ts

### Patreon Tool 1: Tier Description Generator

- [x] T067 [US4] Create API route app/api/tools/patreon/tier-description-generator/route.ts
- [x] T068 [US4] Create tool page app/(tools)/patreon/tier-description-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T069 [US4] Add patreonTierDescription.\* translations for 6 languages in lib/translations.ts

### Patreon Tool 2: About Page Generator

- [x] T070 [P] [US4] Create API route app/api/tools/patreon/about-page-generator/route.ts
- [x] T071 [US4] Create tool page app/(tools)/patreon/about-page-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T072 [US4] Add patreonAboutPage.\* translations for 6 languages in lib/translations.ts

### Patreon Tool 3: Post Generator

- [x] T073 [P] [US4] Create API route app/api/tools/patreon/post-generator/route.ts
- [x] T074 [US4] Create tool page app/(tools)/patreon/post-generator/page.tsx (with 8 sections, TurnstileWidget, JSON-LD)
- [x] T075 [US4] Add patreonPost.\* translations for 6 languages in lib/translations.ts

### Patreon Hub & Integration

- [x] T076 [US4] Create Patreon hub page app/(tools)/patreon/page.tsx with 3 tool cards
- [x] T077 [US4] Update navigation.tsx Patreon tools array with 3 tool entries
- [x] T078 [P] [US4] Update tool-selector.tsx Patreon tools array with 3 tool entries
- [x] T079 [US4] Add Patreon Spanish URL rewrites (3 routes) in next.config.ts
- [x] T080 [US4] Document Patreon routes in docs/RUTAS_ALIAS.md

**Checkpoint**: All 4 platforms fully functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, testing, and final validation

- [x] T081 [P] Update PRD.md with 4 new platforms and 12 new tools status
- [x] T082 [P] Run TypeScript compilation check (npm run build) - fix any errors
- [ ] T083 Run manual testing per quickstart.md Testing Checklist for all 12 tools + verify Lighthouse score 90+ on each tool page
- [ ] T084 [P] Verify all 12 Spanish URLs work correctly
- [ ] T085 [P] Verify all 6 languages display correctly in UI
- [ ] T086 [P] Test dark mode on all tool pages
- [ ] T087 [P] Test mobile responsiveness on all tool pages
- [ ] T088 Verify Appwrite logs are created for generations
- [ ] T089 Final review and code cleanup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 - Medium (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 - Etsy (P2)**: Can start after Foundational - Independent of Medium
- **User Story 3 - OnlyFans (P3)**: Can start after Foundational - Independent of others
- **User Story 4 - Patreon (P4)**: Can start after Foundational - Independent of others

### Within Each User Story

1. DeepSeek functions first (T013-T015, T030-T032, etc.)
2. API routes can be parallel after DeepSeek functions
3. Tool pages depend on API routes
4. Translations can be parallel with pages
5. Hub page after all tools complete
6. Navigation/selector updates after hub
7. URL rewrites and docs last

### Parallel Opportunities

Within a user story phase, these can run in parallel:

- All DeepSeek functions (different exports, same file)
- All API routes (different directories)
- All translation additions (different keys, same file - careful with conflicts)
- Navigation and tool-selector updates (different files)

---

## Parallel Example: User Story 1 (Medium)

```bash
# After T013 completes, launch these in parallel:
T014: generateMediumArticleIntros() in lib/deepseek.ts
T015: generateMediumBio() in lib/deepseek.ts

# After DeepSeek functions complete, launch API routes in parallel:
T016: Article Title API route
T019: Article Intro API route
T022: Bio API route

# After API routes complete, tool pages can be parallel:
T017: Article Title page
T020: Article Intro page
T023: Bio page

# Translations can be done in parallel with pages (different sections of same file)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006) - ~30 minutes
2. Complete Phase 2: Foundational (T007-T012) - ~1 hour
3. Complete Phase 3: Medium Platform (T013-T029) - ~3 hours
4. **STOP and VALIDATE**: Test Medium independently
5. Deploy/demo Medium as MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready (~1.5 hours)
2. Add Medium (US1) → Test → Deploy (MVP!) (~3 hours)
3. Add Etsy (US2) → Test → Deploy (~2.5 hours)
4. Add OnlyFans (US3) → Test → Deploy (~2.5 hours)
5. Add Patreon (US4) → Test → Deploy (~2.5 hours)
6. Polish phase → Final release (~1 hour)

**Total estimated time**: ~13 hours for complete implementation

### Parallel Team Strategy

With 4 developers after Foundational phase:

- Developer A: Medium (US1)
- Developer B: Etsy (US2)
- Developer C: OnlyFans (US3)
- Developer D: Patreon (US4)

All platforms complete in ~3 hours instead of ~10 hours.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story (US1-US4)
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **OnlyFans tools**: Ensure ALL prompts are SFW - no explicit content
- **Character limits**: Medium bio ≤160, Etsy title ≤140, OnlyFans bio ≤1000
- **Platform colors**: Medium=#000000, Etsy=#F56400, OnlyFans=#00AFF0, Patreon=#FF424D
- **Patreon vocabulary**: Use "patrons", "tiers", "benefits" - not "subscribers"
