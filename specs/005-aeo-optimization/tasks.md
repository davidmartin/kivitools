# Tasks: AEO Optimization

**Input**: Design documents from `/specs/005-aeo-optimization/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: No automated tests required - validation done via Google Rich Results Test and Schema.org validator (manual).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **App**: `app/` - Next.js pages and components
- **Lib**: `lib/` - Utilities and schema generators
- **Public**: `public/` - Static files (llms.txt)
- **Locales**: `lib/locales/` - Translation files (6 languages)

---

## Phase 1: Setup ✅

**Purpose**: Create AEO infrastructure and schema generator utilities

- [x] T001 Create AEO directory structure at lib/aeo/
- [x] T002 [P] Create schema generator functions in lib/aeo/schemas.ts
- [x] T003 [P] Create HowTo generator helper in lib/aeo/howto-generator.ts
- [x] T004 [P] Create Speakable generator helper in lib/aeo/speakable-generator.ts
- [x] T005 [P] Create CollectionPage generator in lib/aeo/collection-page-generator.ts
- [x] T006 Export all generators from lib/aeo/index.ts

**Checkpoint**: Schema generators ready - can now implement page-level schemas ✅

---

## Phase 2: Foundational (llms.txt Files) ✅

**Purpose**: Create AI crawler guidance files that benefit ALL user stories

**⚠️ CRITICAL**: llms.txt provides site-wide AI discoverability (FR-008, FR-009)

- [x] T007 Create public/llms.txt with site description, platforms, and tools summary
- [x] T008 Create public/llms-full.txt with comprehensive tool descriptions and instructions
- [ ] T009 Verify llms.txt accessible at https://kivitools.com/llms.txt (after deployment)

**Checkpoint**: AI crawlers can now understand site structure ✅

---

## Phase 3: User Story 1 - AI Assistant Discovery (Priority: P1) 🎯 MVP

**Goal**: Implement SoftwareApplication and FAQPage schemas on tool pages so AI assistants can extract tool information accurately

**Independent Test**: Use Google Rich Results Test on any tool page URL to verify SoftwareApplication schema is valid

### Implementation for User Story 1

- [x] T010 [US1] Update lib/seo-metadata.ts to add inLanguage parameter to generateToolJsonLd
- [x] T011 [US1] Update lib/seo-metadata.ts to enhance generateFaqJsonLd with inLanguage
- [x] T012 [P] [US1] Add SoftwareApplication schema to app/(tools)/tiktok/script-writer/page.tsx
- [x] T013 [P] [US1] Add SoftwareApplication schema to app/(tools)/tiktok/video-ideas/page.tsx
- [x] T014 [P] [US1] Add SoftwareApplication schema to app/(tools)/tiktok/hook-generator/page.tsx
- [x] T015 [P] [US1] Add SoftwareApplication schema to app/(tools)/tiktok/hashtag-generator/page.tsx
- [x] T016 [P] [US1] Add SoftwareApplication schema to app/(tools)/instagram/bio-generator/page.tsx
- [x] T017 [P] [US1] Add SoftwareApplication schema to app/(tools)/instagram/caption-generator/page.tsx
- [x] T018 [P] [US1] Add SoftwareApplication schema to app/(tools)/youtube/title-generator/page.tsx
- [x] T019 [P] [US1] Add SoftwareApplication schema to app/(tools)/twitter/bio-generator/page.tsx
- [x] T020 [US1] Create script to batch-update remaining 84 tool pages with SoftwareApplication schema in scripts/add-aeo-schemas.mjs
- [x] T021 [US1] Run batch script to add SoftwareApplication to all remaining tool pages (22 additional tools updated)
- [x] T021b [US1] Create script to generate layout.tsx for tools without one (scripts/create-missing-layouts.mjs)
- [x] T021c [US1] Run script to create 44 missing layout.tsx files with full AEO schemas
- [ ] T022 [US1] Validate 5 sample tool pages in Google Rich Results Test

**Checkpoint**: ✅ ALL 92+ tool pages now have SoftwareApplication + HowTo + FAQ + Speakable schemas

---

## Phase 4: User Story 2 - Google Featured Snippets (Priority: P1) ✅

**Goal**: Implement HowTo schema on tool pages for featured snippet eligibility

**NOTE**: HowTo schemas were implemented as part of Phase 3 in all layout.tsx files

### Implementation for User Story 2

- [x] T023-T029: HowTo schemas added to all 92+ tool pages via layout.tsx files
- [ ] T030 [US2] Validate 5 sample tool pages for HowTo in Google Rich Results Test

**Checkpoint**: ✅ All tool pages have HowTo schemas - eligible for featured snippets

---

## Phase 5: User Story 3 - Voice Search Answers (Priority: P2) ✅

**Goal**: Implement Speakable schema to identify voice-readable content

**NOTE**: Speakable schemas were implemented as part of Phase 3 in all layout.tsx files

### Implementation for User Story 3

- [x] T031-T037: Speakable schemas added to all 92+ tool pages via layout.tsx files
- [ ] T038 [US3] Validate Speakable schema in Schema.org validator for 3 sample pages

**Checkpoint**: ✅ Voice assistants can identify speakable content on all tool pages

---

## Phase 6: User Story 4 - Perplexity/AI Search Citation (Priority: P2) ✅

**Goal**: Implement CollectionPage schemas on platform hub pages for better AI search understanding

**NOTE**: CollectionPage schemas were implemented via scripts/create-platform-layouts.mjs

### Implementation for User Story 4

- [x] T039-T055: CollectionPage schemas added to all 17 platform hub pages via layout.tsx files
- [ ] T056 [US4] Validate 5 platform hub pages in Google Rich Results Test

**Checkpoint**: ✅ All 17 platform hub pages have CollectionPage schemas

---

## Phase 7: User Story 5 - Rich Results in Search (Priority: P3)

**Goal**: Enhance homepage schemas and ensure all BreadcrumbList schemas are complete

**Independent Test**: Verify homepage shows rich results preview in Google Rich Results Test

### Implementation for User Story 5

- [ ] T057 [US5] Enhance app/page.tsx with complete SoftwareApplication schema for KiviTools suite
- [ ] T058 [US5] Verify Organization schema in app/layout.tsx has all required fields
- [ ] T059 [US5] Verify WebSite schema in app/layout.tsx has SearchAction
- [ ] T060 [P] [US5] Ensure BreadcrumbList schema exists on all tool pages (verify in batch script)
- [ ] T061 [P] [US5] Ensure BreadcrumbList schema exists on all platform hub pages
- [ ] T062 [US5] Validate homepage in Google Rich Results Test
- [ ] T063 [US5] Test 10 random tool pages in Google Rich Results Test for complete schema coverage

**Checkpoint**: All pages have complete structured data for rich results

---

## Phase 8: Multilingual Schema Support (Cross-cutting)

**Purpose**: Ensure all schemas work correctly across 6 languages (FR-020)

- [ ] T064 [P] Verify schema generators accept and use language parameter correctly
- [ ] T065 [P] Test SoftwareApplication schema output in Spanish (es) locale
- [ ] T066 [P] Test HowTo schema output in Portuguese (pt) locale
- [ ] T067 [P] Test FAQPage schema output in French (fr) locale
- [ ] T068 [P] Test CollectionPage schema output in German (de) locale
- [ ] T069 [P] Test Speakable schema output in Italian (it) locale
- [ ] T070 Verify all 6 languages produce valid schemas in Schema.org validator

**Checkpoint**: Schemas work correctly in all 6 supported languages

---

## Phase 9: Polish & Validation

**Purpose**: Final validation and documentation updates

- [ ] T071 Run Google Rich Results Test on 20 random tool pages across different platforms
- [ ] T072 Run Schema.org validator on 10 sample pages
- [ ] T073 Test llms.txt accessibility and format verification
- [ ] T074 Test llms-full.txt accessibility and completeness
- [ ] T075 Update docs/ with AEO implementation documentation
- [ ] T076 [P] Update PRD.md with AEO feature completion status
- [ ] T077 [P] Run quickstart.md validation checklist
- [ ] T078 Performance audit: verify JSON-LD adds < 2KB per page
- [ ] T079 Create Google Search Console report baseline for tracking improvements

**Checkpoint**: All AEO features implemented and validated

---

## Phase 10: Content Compliance (FR-011, FR-012)

**Purpose**: Ensure tool descriptions meet AEO content requirements

**⚠️ COVERAGE GAP**: These tasks address FR-011 (one-sentence definitions) and FR-012 (What is sections)

- [ ] T080 Audit 10 sample tool pages for FR-011 compliance (description is one clear sentence, <200 chars)
- [ ] T081 Create checklist document for FR-012 compliance (What is [Tool]? section exists and answers directly)
- [ ] T082 Update non-compliant tool descriptions via batch script or manual edits
- [ ] T083 [P] Validate meta descriptions meet FR-010 (under 160 chars, actionable language)

**Checkpoint**: All tool descriptions optimized for direct answer extraction

---

## Phase 11: Voice Assistant Testing (SC-006)

**Purpose**: Validate voice search compatibility per Success Criteria SC-006

- [ ] T084 Test 5 tool queries on Google Assistant and document responses
- [ ] T085 Test 5 tool queries on Siri and document responses
- [ ] T086 Test 5 tool queries on Alexa and document responses
- [ ] T087 Create voice search test report with findings and recommendations

**Checkpoint**: Voice search compatibility confirmed across 3 assistants

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────┐
                                                              │
Phase 2 (Foundational: llms.txt) ────────────────────────────┤
                                                              │
      ┌───────────────────────────────────────────────────────┘
      │
      ├── Phase 3 (US1: AI Assistant Discovery) ──┐
      │                                           │
      ├── Phase 4 (US2: Featured Snippets) ───────┤
      │                                           │
      ├── Phase 5 (US3: Voice Search) ────────────┤
      │                                           │
      ├── Phase 6 (US4: AI Search Citation) ──────┤
      │                                           │
      └── Phase 7 (US5: Rich Results) ────────────┘
                                                  │
Phase 8 (Multilingual) ───────────────────────────┤
                                                  │
Phase 9 (Polish & Validation) ────────────────────┤
                                                  │
Phase 10 (Content Compliance) ────────────────────┤
                                                  │
Phase 11 (Voice Assistant Testing) ───────────────┘
```

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 1 (Setup) - Can start after schema generators exist
- **User Story 2 (P1)**: Depends on Phase 1 (Setup) - Can run parallel to US1
- **User Story 3 (P2)**: Depends on Phase 1 (Setup) - Can run parallel to US1/US2
- **User Story 4 (P2)**: Depends on Phase 1 (Setup) - Can run parallel to US1/US2/US3
- **User Story 5 (P3)**: Depends on Phase 1 (Setup) - Can run parallel to others

### Within Each User Story

- Schema generators before page implementations
- Sample pages before batch script
- Batch script before mass updates
- Mass updates before validation

### Parallel Opportunities

**Phase 1 (Setup)**:

```bash
# Run in parallel:
T002 "Create schema generator functions in lib/aeo/schemas.ts"
T003 "Create HowTo generator helper in lib/aeo/howto-generator.ts"
T004 "Create Speakable generator helper in lib/aeo/speakable-generator.ts"
T005 "Create CollectionPage generator in lib/aeo/collection-page-generator.ts"
```

**User Stories (Phase 3-7)** - Can all run in parallel after Phase 1:

```bash
# Different developers can work on different user stories simultaneously:
Developer A: Phase 3 (US1: SoftwareApplication schemas)
Developer B: Phase 4 (US2: HowTo schemas)
Developer C: Phase 5 (US3: Speakable schemas)
Developer D: Phase 6 (US4: CollectionPage for hubs)
```

**Within US4 (CollectionPage)** - All platform hub pages in parallel:

```bash
# Run in parallel:
T039-T055 (all platform hub pages can be updated simultaneously)
```

**Phase 8 (Multilingual)** - All language tests in parallel:

```bash
# Run in parallel:
T065 "Test SoftwareApplication schema in Spanish"
T066 "Test HowTo schema in Portuguese"
T067 "Test FAQPage schema in French"
T068 "Test CollectionPage schema in German"
T069 "Test Speakable schema in Italian"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (schema generators)
2. Complete Phase 2: llms.txt files
3. Complete Phase 3: User Story 1 (SoftwareApplication + FAQPage)
4. **STOP and VALIDATE**: Test 10 tool pages in Rich Results Test
5. Deploy to production → AI assistants can now extract tool data

### Incremental Delivery

1. **Week 1**: Setup + Foundational + US1 (SoftwareApplication) → Deploy MVP
2. **Week 1**: Add US2 (HowTo schemas) → Deploy → Featured snippet eligibility
3. **Week 2**: Add US3 (Speakable) + US4 (CollectionPage) → Deploy
4. **Week 2**: Add US5 (Rich Results polish) + Multilingual validation → Deploy
5. **Week 3**: Polish, validate, baseline metrics

### Batch Update Strategy

For updating 92 tool pages efficiently:

1. First implement on 5-8 sample pages manually (different platforms)
2. Create batch script based on working implementations
3. Run batch script to update remaining pages
4. Validate random sample with Rich Results Test

---

## Notes

- **Total Tasks**: 87 tasks across 11 phases
- **No automated tests**: Validation is done via Google Rich Results Test and Schema.org validator
- **Batch script**: T020 creates a Node.js script to automate schema additions across 92 tool pages
- **Language parameter**: All schema generators must accept `language` parameter for multilingual support
- **CSS classes**: `.tool-description` and `.faq-answer-1` are for Speakable schema targeting only (no visual changes)
- **Commit strategy**: Commit after each completed phase or logical group of parallel tasks
- **JSON-LD size**: Keep total JSON-LD per page under 2KB for performance
- **Content compliance**: Phase 10 addresses FR-010, FR-011, FR-012 coverage gaps
- **Voice testing**: Phase 11 fulfills SC-006 (test 3 voice assistants)
