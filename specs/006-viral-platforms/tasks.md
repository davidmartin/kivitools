# Tasks: New Viral Platforms

**Input**: Design documents from `/specs/006-viral-platforms/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual testing only (no automated tests requested)

**Organization**: Tasks grouped by user story (P1-P5 platforms) to enable independent implementation

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1=Bluesky, US2=Lemon8, US3=Kick, US4=Telegram, US5=BeReal)
- Exact file paths included

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Core type updates and shared assets that all platforms need

- [x] T001 Update Platform type union in `lib/seo-metadata.ts` (add bluesky, lemon8, kick, telegram, bereal)
- [x] T002 [P] Update Platform type union in `app/components/platform-logo.tsx` (add 5 new platforms)
- [x] T003 [P] Update Platform type union in `app/components/tool-selector.tsx` (add 5 new platforms)
- [x] T004 [P] Add platform logo SVG for Bluesky in `public/platforms/bluesky.svg`
- [x] T005 [P] Add platform logo SVG for Lemon8 in `public/platforms/lemon8.svg`
- [x] T006 [P] Add platform logo SVG for Kick in `public/platforms/kick.svg`
- [x] T007 [P] Add platform logo SVG for Telegram in `public/platforms/telegram.svg`
- [x] T008 [P] Add platform logo SVG for BeReal in `public/platforms/bereal.svg`
- [x] T009 Update `needsInvert` check in `app/components/platform-logo.tsx` (add kick, bereal)
- [x] T010 Add platformColors in `lib/seo-metadata.ts` (bluesky:#0085FF, lemon8:#3EE98E, kick:#53FC18, telegram:#0088CC, bereal:#000000)
- [x] T011 Add platformNames in `lib/seo-metadata.ts` (Bluesky, Lemon8, Kick, Telegram, BeReal)

---

## Phase 2: Foundational (Navigation & Shared Translations)

**Purpose**: Navigation updates and common translations that all platforms share

**⚠️ CRITICAL**: Must complete before any user story implementation

- [x] T012 Add nav translations for all 5 platforms in `lib/locales/en/common.ts` (nav.bluesky, nav.lemon8, nav.kick, nav.telegram, nav.bereal)
- [x] T013 [P] Add nav translations for all 5 platforms in `lib/locales/es/common.ts`
- [x] T014 [P] Add nav translations for all 5 platforms in `lib/locales/pt/common.ts`
- [x] T015 [P] Add nav translations for all 5 platforms in `lib/locales/fr/common.ts`
- [x] T016 [P] Add nav translations for all 5 platforms in `lib/locales/de/common.ts`
- [x] T017 [P] Add nav translations for all 5 platforms in `lib/locales/it/common.ts`
- [x] T018 Add platform descriptions in `lib/locales/en/platforms.ts` (5 platforms)
- [x] T019 [P] Add platform descriptions in `lib/locales/es/platforms.ts` (5 platforms)
- [x] T020 [P] Add platform descriptions in `lib/locales/pt/platforms.ts` (5 platforms)
- [x] T021 [P] Add platform descriptions in `lib/locales/fr/platforms.ts` (5 platforms)
- [x] T022 [P] Add platform descriptions in `lib/locales/de/platforms.ts` (5 platforms)
- [x] T023 [P] Add platform descriptions in `lib/locales/it/platforms.ts` (5 platforms)
- [x] T024 Add 5 new platforms to navigation array in `app/components/navigation.tsx`
- [x] T025 Add 5 new platforms to home page platforms array in `app/page.tsx`

**Checkpoint**: All platforms visible in navigation and home page (no tools yet) ✅ COMPLETED

---

## Phase 3: User Story 1 - Bluesky (Priority: P1) 🎯 MVP

**Goal**: Bluesky content creator can generate posts, bio, and threads

**Independent Test**: Navigate to /bluesky, use each tool, verify generation works in EN/ES

### Tool Selector & DeepSeek Functions

- [x] T026 [US1] Add Bluesky tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [x] T027 [US1] Add generateBlueskyPost function in `lib/deepseek.ts` (300 char limit)
- [x] T028 [P] [US1] Add generateBlueskyBio function in `lib/deepseek.ts` (256 char limit)
- [x] T029 [P] [US1] Add generateBlueskyThread function in `lib/deepseek.ts` (300 char/post)

### Translations (EN)

- [x] T030 [P] [US1] Create Bluesky Post Generator translations in `lib/locales/en/tools/bluesky/post-generator.ts`
- [x] T031 [P] [US1] Create Bluesky Bio Generator translations in `lib/locales/en/tools/bluesky/bio-generator.ts`
- [x] T032 [P] [US1] Create Bluesky Thread Composer translations in `lib/locales/en/tools/bluesky/thread-composer.ts`
- [x] T033 [US1] Export Bluesky tools in `lib/locales/en/tools/bluesky/index.ts`

### Translations (ES)

- [x] T034 [P] [US1] Create Bluesky Post Generator translations in `lib/locales/es/tools/bluesky/post-generator.ts`
- [x] T035 [P] [US1] Create Bluesky Bio Generator translations in `lib/locales/es/tools/bluesky/bio-generator.ts`
- [x] T036 [P] [US1] Create Bluesky Thread Composer translations in `lib/locales/es/tools/bluesky/thread-composer.ts`
- [x] T037 [US1] Export Bluesky tools in `lib/locales/es/tools/bluesky/index.ts`

### Translations (PT, FR, DE, IT)

- [x] T038 [P] [US1] Create all Bluesky tool translations in `lib/locales/pt/tools/bluesky/` (3 files + index)
- [x] T039 [P] [US1] Create all Bluesky tool translations in `lib/locales/fr/tools/bluesky/` (3 files + index)
- [x] T040 [P] [US1] Create all Bluesky tool translations in `lib/locales/de/tools/bluesky/` (3 files + index)
- [x] T041 [P] [US1] Create all Bluesky tool translations in `lib/locales/it/tools/bluesky/` (3 files + index)

### API Routes

- [x] T042 [P] [US1] Create API route in `app/api/tools/bluesky/post-generator/route.ts`
- [x] T043 [P] [US1] Create API route in `app/api/tools/bluesky/bio-generator/route.ts`
- [x] T044 [P] [US1] Create API route in `app/api/tools/bluesky/thread-composer/route.ts`

### Tool Pages

- [x] T045 [US1] Create Bluesky hub page in `app/(tools)/bluesky/page.tsx`
- [x] T046 [P] [US1] Create Post Generator page in `app/(tools)/bluesky/post-generator/page.tsx` (all 8 sections)
- [x] T047 [P] [US1] Create Bio Generator page in `app/(tools)/bluesky/bio-generator/page.tsx` (all 8 sections)
- [x] T048 [P] [US1] Create Thread Composer page in `app/(tools)/bluesky/thread-composer/page.tsx` (all 8 sections)

### Integration

- [x] T049 [US1] Add Bluesky Spanish URL rewrites in `next.config.ts` (3 tools)
- [x] T050 [US1] Document Bluesky routes in `docs/RUTAS_ALIAS.md`
- [x] T051 [US1] Update PRD.md with Bluesky platform and tools

**Checkpoint**: Bluesky fully functional - test all 3 tools in EN/ES, dark/light mode

---

## Phase 4: User Story 2 - Lemon8 (Priority: P2)

**Goal**: Lemon8 lifestyle creator can generate captions, content ideas, and bio

**Independent Test**: Navigate to /lemon8, use each tool, verify aesthetic formatting works

### Tool Selector & DeepSeek Functions

- [ ] T052 [US2] Add Lemon8 tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T053 [US2] Add generateLemon8Caption function in `lib/deepseek.ts` (2200 char, bullet formatting)
- [ ] T054 [P] [US2] Add generateLemon8Ideas function in `lib/deepseek.ts`
- [ ] T055 [P] [US2] Add generateLemon8Bio function in `lib/deepseek.ts` (80 char limit)

### Translations (EN)

- [ ] T056 [P] [US2] Create Lemon8 Caption Generator translations in `lib/locales/en/tools/lemon8/caption-generator.ts`
- [ ] T057 [P] [US2] Create Lemon8 Content Ideas translations in `lib/locales/en/tools/lemon8/content-ideas.ts`
- [ ] T058 [P] [US2] Create Lemon8 Bio Generator translations in `lib/locales/en/tools/lemon8/bio-generator.ts`
- [ ] T059 [US2] Export Lemon8 tools in `lib/locales/en/tools/lemon8/index.ts`

### Translations (ES)

- [ ] T060 [P] [US2] Create Lemon8 Caption Generator translations in `lib/locales/es/tools/lemon8/caption-generator.ts`
- [ ] T061 [P] [US2] Create Lemon8 Content Ideas translations in `lib/locales/es/tools/lemon8/content-ideas.ts`
- [ ] T062 [P] [US2] Create Lemon8 Bio Generator translations in `lib/locales/es/tools/lemon8/bio-generator.ts`
- [ ] T063 [US2] Export Lemon8 tools in `lib/locales/es/tools/lemon8/index.ts`

### Translations (PT, FR, DE, IT)

- [ ] T064 [P] [US2] Create all Lemon8 tool translations in `lib/locales/pt/tools/lemon8/` (3 files + index)
- [ ] T065 [P] [US2] Create all Lemon8 tool translations in `lib/locales/fr/tools/lemon8/` (3 files + index)
- [ ] T066 [P] [US2] Create all Lemon8 tool translations in `lib/locales/de/tools/lemon8/` (3 files + index)
- [ ] T067 [P] [US2] Create all Lemon8 tool translations in `lib/locales/it/tools/lemon8/` (3 files + index)

### API Routes

- [ ] T068 [P] [US2] Create API route in `app/api/tools/lemon8/caption-generator/route.ts`
- [ ] T069 [P] [US2] Create API route in `app/api/tools/lemon8/content-ideas/route.ts`
- [ ] T070 [P] [US2] Create API route in `app/api/tools/lemon8/bio-generator/route.ts`

### Tool Pages

- [ ] T071 [US2] Create Lemon8 hub page in `app/(tools)/lemon8/page.tsx`
- [ ] T072 [P] [US2] Create Caption Generator page in `app/(tools)/lemon8/caption-generator/page.tsx` (all 8 sections)
- [ ] T073 [P] [US2] Create Content Ideas page in `app/(tools)/lemon8/content-ideas/page.tsx` (all 8 sections)
- [ ] T074 [P] [US2] Create Bio Generator page in `app/(tools)/lemon8/bio-generator/page.tsx` (all 8 sections)

### Integration

- [ ] T075 [US2] Add Lemon8 Spanish URL rewrites in `next.config.ts` (3 tools)
- [ ] T076 [US2] Document Lemon8 routes in `docs/RUTAS_ALIAS.md`
- [ ] T077 [US2] Update PRD.md with Lemon8 platform and tools

**Checkpoint**: Lemon8 fully functional - test all 3 tools in EN/ES, dark/light mode

---

## Phase 5: User Story 3 - Kick (Priority: P3)

**Goal**: Kick streamer can generate stream titles, bio, and chat rules

**Independent Test**: Navigate to /kick, use each tool, verify streamer-focused content

### Tool Selector & DeepSeek Functions

- [ ] T078 [US3] Add Kick tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T079 [US3] Add generateKickStreamTitle function in `lib/deepseek.ts` (140 char limit)
- [ ] T080 [P] [US3] Add generateKickBio function in `lib/deepseek.ts` (300 char limit)
- [ ] T081 [P] [US3] Add generateKickChatRules function in `lib/deepseek.ts`

### Translations (EN)

- [ ] T082 [P] [US3] Create Kick Stream Title translations in `lib/locales/en/tools/kick/stream-title.ts`
- [ ] T083 [P] [US3] Create Kick Bio Generator translations in `lib/locales/en/tools/kick/bio-generator.ts`
- [ ] T084 [P] [US3] Create Kick Chat Rules translations in `lib/locales/en/tools/kick/chat-rules.ts`
- [ ] T085 [US3] Export Kick tools in `lib/locales/en/tools/kick/index.ts`

### Translations (ES)

- [ ] T086 [P] [US3] Create Kick Stream Title translations in `lib/locales/es/tools/kick/stream-title.ts`
- [ ] T087 [P] [US3] Create Kick Bio Generator translations in `lib/locales/es/tools/kick/bio-generator.ts`
- [ ] T088 [P] [US3] Create Kick Chat Rules translations in `lib/locales/es/tools/kick/chat-rules.ts`
- [ ] T089 [US3] Export Kick tools in `lib/locales/es/tools/kick/index.ts`

### Translations (PT, FR, DE, IT)

- [ ] T090 [P] [US3] Create all Kick tool translations in `lib/locales/pt/tools/kick/` (3 files + index)
- [ ] T091 [P] [US3] Create all Kick tool translations in `lib/locales/fr/tools/kick/` (3 files + index)
- [ ] T092 [P] [US3] Create all Kick tool translations in `lib/locales/de/tools/kick/` (3 files + index)
- [ ] T093 [P] [US3] Create all Kick tool translations in `lib/locales/it/tools/kick/` (3 files + index)

### API Routes

- [ ] T094 [P] [US3] Create API route in `app/api/tools/kick/stream-title/route.ts`
- [ ] T095 [P] [US3] Create API route in `app/api/tools/kick/bio-generator/route.ts`
- [ ] T096 [P] [US3] Create API route in `app/api/tools/kick/chat-rules/route.ts`

### Tool Pages

- [ ] T097 [US3] Create Kick hub page in `app/(tools)/kick/page.tsx`
- [ ] T098 [P] [US3] Create Stream Title page in `app/(tools)/kick/stream-title/page.tsx` (all 8 sections)
- [ ] T099 [P] [US3] Create Bio Generator page in `app/(tools)/kick/bio-generator/page.tsx` (all 8 sections)
- [ ] T100 [P] [US3] Create Chat Rules page in `app/(tools)/kick/chat-rules/page.tsx` (all 8 sections)

### Integration

- [ ] T101 [US3] Add Kick Spanish URL rewrites in `next.config.ts` (3 tools)
- [ ] T102 [US3] Document Kick routes in `docs/RUTAS_ALIAS.md`
- [ ] T103 [US3] Update PRD.md with Kick platform and tools

**Checkpoint**: Kick fully functional - test all 3 tools in EN/ES, dark/light mode

---

## Phase 6: User Story 4 - Telegram (Priority: P4)

**Goal**: Telegram channel manager can generate announcements, descriptions, and welcome messages

**Independent Test**: Navigate to /telegram, use each tool, verify markdown formatting

### Tool Selector & DeepSeek Functions

- [ ] T104 [US4] Add Telegram tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T105 [US4] Add generateTelegramAnnouncement function in `lib/deepseek.ts` (4096 char, markdown)
- [ ] T106 [P] [US4] Add generateTelegramChannelDesc function in `lib/deepseek.ts` (255 char limit)
- [ ] T107 [P] [US4] Add generateTelegramWelcome function in `lib/deepseek.ts` (4096 char, markdown)

### Translations (EN)

- [ ] T108 [P] [US4] Create Telegram Announcement translations in `lib/locales/en/tools/telegram/announcement-generator.ts`
- [ ] T109 [P] [US4] Create Telegram Channel Description translations in `lib/locales/en/tools/telegram/channel-description.ts`
- [ ] T110 [P] [US4] Create Telegram Welcome Message translations in `lib/locales/en/tools/telegram/welcome-message.ts`
- [ ] T111 [US4] Export Telegram tools in `lib/locales/en/tools/telegram/index.ts`

### Translations (ES)

- [ ] T112 [P] [US4] Create Telegram Announcement translations in `lib/locales/es/tools/telegram/announcement-generator.ts`
- [ ] T113 [P] [US4] Create Telegram Channel Description translations in `lib/locales/es/tools/telegram/channel-description.ts`
- [ ] T114 [P] [US4] Create Telegram Welcome Message translations in `lib/locales/es/tools/telegram/welcome-message.ts`
- [ ] T115 [US4] Export Telegram tools in `lib/locales/es/tools/telegram/index.ts`

### Translations (PT, FR, DE, IT)

- [ ] T116 [P] [US4] Create all Telegram tool translations in `lib/locales/pt/tools/telegram/` (3 files + index)
- [ ] T117 [P] [US4] Create all Telegram tool translations in `lib/locales/fr/tools/telegram/` (3 files + index)
- [ ] T118 [P] [US4] Create all Telegram tool translations in `lib/locales/de/tools/telegram/` (3 files + index)
- [ ] T119 [P] [US4] Create all Telegram tool translations in `lib/locales/it/tools/telegram/` (3 files + index)

### API Routes

- [ ] T120 [P] [US4] Create API route in `app/api/tools/telegram/announcement-generator/route.ts`
- [ ] T121 [P] [US4] Create API route in `app/api/tools/telegram/channel-description/route.ts`
- [ ] T122 [P] [US4] Create API route in `app/api/tools/telegram/welcome-message/route.ts`

### Tool Pages

- [ ] T123 [US4] Create Telegram hub page in `app/(tools)/telegram/page.tsx`
- [ ] T124 [P] [US4] Create Announcement Generator page in `app/(tools)/telegram/announcement-generator/page.tsx` (all 8 sections)
- [ ] T125 [P] [US4] Create Channel Description page in `app/(tools)/telegram/channel-description/page.tsx` (all 8 sections)
- [ ] T126 [P] [US4] Create Welcome Message page in `app/(tools)/telegram/welcome-message/page.tsx` (all 8 sections)

### Integration

- [ ] T127 [US4] Add Telegram Spanish URL rewrites in `next.config.ts` (3 tools)
- [ ] T128 [US4] Document Telegram routes in `docs/RUTAS_ALIAS.md`
- [ ] T129 [US4] Update PRD.md with Telegram platform and tools

**Checkpoint**: Telegram fully functional - test all 3 tools in EN/ES, dark/light mode

---

## Phase 7: User Story 5 - BeReal (Priority: P5)

**Goal**: BeReal user can generate captions, bio, and RealMoji ideas

**Independent Test**: Navigate to /bereal, use each tool, verify authentic/humorous tone

### Tool Selector & DeepSeek Functions

- [ ] T130 [US5] Add BeReal tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T131 [US5] Add generateBerealCaption function in `lib/deepseek.ts` (500 char limit)
- [ ] T132 [P] [US5] Add generateBerealBio function in `lib/deepseek.ts` (150 char limit)
- [ ] T133 [P] [US5] Add generateBerealRealmoji function in `lib/deepseek.ts`

### Translations (EN)

- [ ] T134 [P] [US5] Create BeReal Caption translations in `lib/locales/en/tools/bereal/caption-generator.ts`
- [ ] T135 [P] [US5] Create BeReal Bio Generator translations in `lib/locales/en/tools/bereal/bio-generator.ts`
- [ ] T136 [P] [US5] Create BeReal RealMoji Ideas translations in `lib/locales/en/tools/bereal/realmoji-ideas.ts`
- [ ] T137 [US5] Export BeReal tools in `lib/locales/en/tools/bereal/index.ts`

### Translations (ES)

- [ ] T138 [P] [US5] Create BeReal Caption translations in `lib/locales/es/tools/bereal/caption-generator.ts`
- [ ] T139 [P] [US5] Create BeReal Bio Generator translations in `lib/locales/es/tools/bereal/bio-generator.ts`
- [ ] T140 [P] [US5] Create BeReal RealMoji Ideas translations in `lib/locales/es/tools/bereal/realmoji-ideas.ts`
- [ ] T141 [US5] Export BeReal tools in `lib/locales/es/tools/bereal/index.ts`

### Translations (PT, FR, DE, IT)

- [ ] T142 [P] [US5] Create all BeReal tool translations in `lib/locales/pt/tools/bereal/` (3 files + index)
- [ ] T143 [P] [US5] Create all BeReal tool translations in `lib/locales/fr/tools/bereal/` (3 files + index)
- [ ] T144 [P] [US5] Create all BeReal tool translations in `lib/locales/de/tools/bereal/` (3 files + index)
- [ ] T145 [P] [US5] Create all BeReal tool translations in `lib/locales/it/tools/bereal/` (3 files + index)

### API Routes

- [ ] T146 [P] [US5] Create API route in `app/api/tools/bereal/caption-generator/route.ts`
- [ ] T147 [P] [US5] Create API route in `app/api/tools/bereal/bio-generator/route.ts`
- [ ] T148 [P] [US5] Create API route in `app/api/tools/bereal/realmoji-ideas/route.ts`

### Tool Pages

- [ ] T149 [US5] Create BeReal hub page in `app/(tools)/bereal/page.tsx`
- [ ] T150 [P] [US5] Create Caption Generator page in `app/(tools)/bereal/caption-generator/page.tsx` (all 8 sections)
- [ ] T151 [P] [US5] Create Bio Generator page in `app/(tools)/bereal/bio-generator/page.tsx` (all 8 sections)
- [ ] T152 [P] [US5] Create RealMoji Ideas page in `app/(tools)/bereal/realmoji-ideas/page.tsx` (all 8 sections)

### Integration

- [ ] T153 [US5] Add BeReal Spanish URL rewrites in `next.config.ts` (3 tools)
- [ ] T154 [US5] Document BeReal routes in `docs/RUTAS_ALIAS.md`
- [ ] T155 [US5] Update PRD.md with BeReal platform and tools

**Checkpoint**: BeReal fully functional - test all 3 tools in EN/ES, dark/light mode

---

## Phase 8: Polish & Final Validation

**Purpose**: Cross-cutting validation and documentation

- [ ] T156 Run `npm run build` and verify no TypeScript errors
- [ ] T157 Test all 15 tools manually in English
- [ ] T158 Test all 15 tools manually in Spanish
- [ ] T159 Test dark/light mode toggle on all platform hub pages
- [ ] T160 Test dark/light mode toggle on all tool pages
- [ ] T161 Verify all Spanish URL aliases work without 404s
- [ ] T162 Run quickstart.md validation checklist
- [ ] T163 Final PRD.md review (all 5 platforms, 15 tools marked complete)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational completion
  - Can proceed in parallel (if staffed) or sequentially (P1→P2→P3→P4→P5)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Bluesky)**: Can start after Phase 2 - No story dependencies
- **US2 (Lemon8)**: Can start after Phase 2 - No story dependencies
- **US3 (Kick)**: Can start after Phase 2 - No story dependencies
- **US4 (Telegram)**: Can start after Phase 2 - No story dependencies
- **US5 (BeReal)**: Can start after Phase 2 - No story dependencies

All user stories are **fully independent** and can be implemented/tested/deployed separately.

### Within Each User Story

1. Tool Selector update (adds to PLATFORM_TOOLS)
2. DeepSeek functions (can be parallel)
3. Translations (can be parallel across languages)
4. API routes (can be parallel)
5. Hub page (creates platform landing)
6. Tool pages (can be parallel, depend on translations + API)
7. Integration (Spanish URLs, docs, PRD)

---

## Parallel Execution Examples

### Phase 1: All Setup Tasks [P]

```
T002, T003, T004, T005, T006, T007, T008 - can all run in parallel
```

### Phase 2: All Translation Tasks [P]

```
T013, T014, T015, T016, T017 - nav translations in parallel
T019, T020, T021, T022, T023 - platform descriptions in parallel
```

### User Story 1 (Bluesky): Maximum Parallelism

```
# DeepSeek functions (parallel)
T027, T028, T029

# EN translations (parallel)
T030, T031, T032

# ES translations (parallel)
T034, T035, T036

# Other language translations (parallel)
T038, T039, T040, T041

# API routes (parallel)
T042, T043, T044

# Tool pages (parallel)
T046, T047, T048
```

---

## Implementation Strategy

### MVP First (Bluesky Only)

1. Complete Phase 1: Setup (T001-T011)
2. Complete Phase 2: Foundational (T012-T025)
3. Complete Phase 3: User Story 1 - Bluesky (T026-T051)
4. **STOP and VALIDATE**: Test Bluesky independently
5. Deploy Bluesky MVP

### Full Incremental Delivery

1. Setup + Foundational → Navigation shows all 5 platforms
2. Add Bluesky → Test → Deploy (MVP!)
3. Add Lemon8 → Test → Deploy
4. Add Kick → Test → Deploy
5. Add Telegram → Test → Deploy
6. Add BeReal → Test → Deploy
7. Polish → Final validation → Done

### Parallel Team Strategy (5 developers)

After Phase 2 completion:

- Dev A: US1 (Bluesky) - T026-T051
- Dev B: US2 (Lemon8) - T052-T077
- Dev C: US3 (Kick) - T078-T103
- Dev D: US4 (Telegram) - T104-T129
- Dev E: US5 (BeReal) - T130-T155

All stories complete independently and integrate automatically.

---

## Summary

| Phase     | Tasks          | Purpose                                 |
| --------- | -------------- | --------------------------------------- |
| 1         | T001-T011 (11) | Setup: Types & Logos                    |
| 2         | T012-T025 (14) | Foundational: Nav & Common Translations |
| 3         | T026-T051 (26) | US1: Bluesky (P1) 🎯 MVP                |
| 4         | T052-T077 (26) | US2: Lemon8 (P2)                        |
| 5         | T078-T103 (26) | US3: Kick (P3)                          |
| 6         | T104-T129 (26) | US4: Telegram (P4)                      |
| 7         | T130-T155 (26) | US5: BeReal (P5)                        |
| 8         | T156-T163 (8)  | Polish & Validation                     |
| **Total** | **163 tasks**  | 5 platforms, 15 tools                   |

---

## Notes

- [P] tasks = different files, no dependencies
- [US#] label maps task to specific platform/story
- Each platform is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate platform independently
- Avoid: vague tasks, same file conflicts, cross-platform dependencies
