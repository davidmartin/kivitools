# Tasks: Suno Tools Expansion

**Input**: Design documents from `/specs/010-suno-tools-expansion/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: No automated tests requested - manual testing per quickstart.md checklist

**Organization**: Tasks grouped by user story (each tool = one user story) for independent implementation

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US5 = 5 tools from spec.md)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify branch and environment ready

- [x] T001 Verify on branch `010-suno-tools-expansion` and dependencies installed
- [x] T002 Verify dev server runs with `npm run dev`
- [x] T003 Verify existing Suno tools work at http://localhost:3000/suno

---

## Phase 2: Foundational (DeepSeek Functions)

**Purpose**: Add all DeepSeek generation functions - MUST complete before any tool pages

**⚠️ CRITICAL**: Tool pages depend on these functions existing

- [x] T004 [P] Add `generateSunoSongTitles()` function in lib/deepseek.ts
- [x] T005 [P] Add `generateSunoSongTags()` function in lib/deepseek.ts
- [x] T006 [P] Add `generateSunoAlbumNames()` function in lib/deepseek.ts
- [x] T007 [P] Add `generateSunoCoverArtPrompts()` function in lib/deepseek.ts
- [x] T008 [P] Add `generateSunoRemixIdeas()` function in lib/deepseek.ts

**Checkpoint**: All 5 DeepSeek functions ready - tool implementation can begin

---

## Phase 3: User Story 1 - Song Title Generator (Priority: P1) 🎯 MVP

**Goal**: Generate 10 creative song titles based on description, genre, and mood

**Independent Test**: User enters song description → receives 10 unique titles → can copy any title

### API Route

- [x] T009 [US1] Create API route in app/api/tools/suno/song-title-generator/route.ts with Turnstile + Appwrite logging

### Translations

- [x] T010 [P] [US1] Add Spanish translations for Song Title Generator (~40 keys) in lib/locales/es/tools/suno/title-generator.ts
- [x] T011 [P] [US1] Add English translations for Song Title Generator (~40 keys) in lib/locales/en/tools/suno/title-generator.ts

### Page Component

- [x] T012 [US1] Create page with 8 sections in app/(tools)/suno/song-title-generator/page.tsx

### URL Alias

- [x] T013 [US1] Add Spanish URL rewrite `/suno/generador-titulos-canciones` → `/suno/song-title-generator` in next.config.ts

**Checkpoint**: Song Title Generator fully functional - test both EN/ES URLs

---

## Phase 4: User Story 2 - Song Tag Generator (Priority: P1)

**Goal**: Generate 15-20 optimized tags for Suno discoverability

**Independent Test**: User enters song details → receives 15-20 tags → can copy all as comma-separated

### API Route

- [x] T014 [US2] Create API route in app/api/tools/suno/song-tag-generator/route.ts with Turnstile + Appwrite logging

### Translations

- [x] T015 [P] [US2] Add Spanish translations for Song Tag Generator (~40 keys) in lib/locales/es/tools/suno/tag-generator.ts
- [x] T016 [P] [US2] Add English translations for Song Tag Generator (~40 keys) in lib/locales/en/tools/suno/tag-generator.ts

### Page Component

- [x] T017 [US2] Create page with 8 sections in app/(tools)/suno/song-tag-generator/page.tsx

### URL Alias

- [x] T018 [US2] Add Spanish URL rewrite `/suno/generador-tags-canciones` → `/suno/song-tag-generator` in next.config.ts

**Checkpoint**: Song Tag Generator fully functional - test Copy All functionality

---

## Phase 5: User Story 3 - Album Name Generator (Priority: P2)

**Goal**: Generate 10 album/EP name suggestions based on concept and release type

**Independent Test**: User describes album concept → receives 10 name suggestions → can copy any name

### API Route

- [x] T019 [US3] Create API route in app/api/tools/suno/album-name-generator/route.ts with Turnstile + Appwrite logging

### Translations

- [x] T020 [P] [US3] Add Spanish translations for Album Name Generator (~40 keys) in lib/locales/es/tools/suno/album-name-generator.ts
- [x] T021 [P] [US3] Add English translations for Album Name Generator (~40 keys) in lib/locales/en/tools/suno/album-name-generator.ts

### Page Component

- [x] T022 [US3] Create page with 8 sections + releaseType selector in app/(tools)/suno/album-name-generator/page.tsx

### URL Alias

- [x] T023 [US3] Add Spanish URL rewrite `/suno/generador-nombres-album` → `/suno/album-name-generator` in next.config.ts

**Checkpoint**: Album Name Generator fully functional - verify releaseType affects output

---

## Phase 6: User Story 4 - Cover Art Prompt Generator (Priority: P2)

**Goal**: Generate 3-5 AI art prompts for album covers with platform-specific formatting

**Independent Test**: User enters song title + selects Midjourney → receives prompts with --ar parameters

### API Route

- [x] T024 [US4] Create API route in app/api/tools/suno/cover-art-prompt-generator/route.ts with Turnstile + Appwrite logging

### Translations

- [x] T025 [P] [US4] Add Spanish translations for Cover Art Prompt Generator (~45 keys) in lib/locales/es/tools/suno/cover-art-prompt-generator.ts
- [x] T026 [P] [US4] Add English translations for Cover Art Prompt Generator (~45 keys) in lib/locales/en/tools/suno/cover-art-prompt-generator.ts

### Page Component

- [x] T027 [US4] Create page with 8 sections + artStyle + targetPlatform selectors in app/(tools)/suno/cover-art-prompt-generator/page.tsx

### URL Alias

- [x] T028 [US4] Add Spanish URL rewrite `/suno/generador-prompts-portada` → `/suno/cover-art-prompt-generator` in next.config.ts

**Checkpoint**: Cover Art Prompt Generator fully functional - verify Midjourney/DALL-E formatting differs

---

## Phase 7: User Story 5 - Remix Idea Generator (Priority: P3)

**Goal**: Generate 5-7 structured remix concepts with genre, tempo, and element suggestions

**Independent Test**: User describes original song + selects remix style → receives detailed remix concepts

### API Route

- [x] T029 [US5] Create API route in app/api/tools/suno/remix-idea-generator/route.ts with Turnstile + Appwrite logging

### Translations

- [x] T030 [P] [US5] Add Spanish translations for Remix Idea Generator (~45 keys) in lib/locales/es/tools/suno/remix-idea-generator.ts
- [x] T031 [P] [US5] Add English translations for Remix Idea Generator (~45 keys) in lib/locales/en/tools/suno/remix-idea-generator.ts

### Page Component

- [x] T032 [US5] Create page with 8 sections + remixStyle selector + structured results display in app/(tools)/suno/remix-idea-generator/page.tsx

### URL Alias

- [x] T033 [US5] Add Spanish URL rewrite `/suno/generador-ideas-remix` → `/suno/remix-idea-generator` in next.config.ts

**Checkpoint**: Remix Idea Generator fully functional - verify structured output (genre + tempo + elements)

---

## Phase 8: Integration & Polish

**Purpose**: Update hub page, navigation, documentation, and final verification

### Hub Page Update

- [x] T034 Update Suno hub page to include all 5 new tools in app/(tools)/suno/page.tsx

### Navigation & Component Updates

- [x] T034.1 Update navigation dropdown in app/components/navigation.tsx to add 5 new Suno tools
- [x] T034.2 Update tool selector in app/components/tool-selector.tsx to include new Suno tools in PLATFORM_TOOLS mapping

### Related Tools

- [x] T035 [P] Update related tools section in all 5 new tool pages to link to each other
- [x] T036 [P] Update existing Suno tools (lyric-generator, music-prompt, song-description) to link to new tools

### Documentation

- [x] T037 Update RUTAS_ALIAS.md with 5 new Spanish URL aliases in docs/RUTAS_ALIAS.md
- [x] T038 Update PRD.md to mark Suno expansion complete in PRD.md

### Final Verification

- [x] T039 Run full manual testing checklist from quickstart.md for all 5 tools
- [x] T040 Verify `npm run build` succeeds without errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all tool phases
- **Phases 3-7 (User Stories)**: All depend on Phase 2 completion
  - Stories can proceed in parallel if desired
  - Or sequentially: P1 → P1 → P2 → P2 → P3
- **Phase 8 (Polish)**: Depends on all Phase 3-7 completion

### User Story Dependencies

- **US1 (Song Title)**: After Phase 2 - No other story dependencies
- **US2 (Song Tag)**: After Phase 2 - No other story dependencies
- **US3 (Album Name)**: After Phase 2 - No other story dependencies
- **US4 (Cover Art)**: After Phase 2 - No other story dependencies
- **US5 (Remix Idea)**: After Phase 2 - No other story dependencies

### Within Each User Story

1. API route first (needs DeepSeek function from Phase 2)
2. Translations in parallel (ES + EN independent)
3. Page component (needs API route + translations)
4. URL alias (independent, can be done anytime)

### Parallel Opportunities per Story

```bash
# Within any user story, run translations in parallel:
Task: "Add Spanish translations for [Tool]..."
Task: "Add English translations for [Tool]..."
```

---

## Parallel Example: Phase 2 (All DeepSeek Functions)

```bash
# All 5 DeepSeek functions can be implemented in parallel:
Task T004: "Add generateSunoSongTitles() function..."
Task T005: "Add generateSunoSongTags() function..."
Task T006: "Add generateSunoAlbumNames() function..."
Task T007: "Add generateSunoCoverArtPrompts() function..."
Task T008: "Add generateSunoRemixIdeas() function..."
```

---

## Implementation Strategy

### MVP First (P1 Tools Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: All DeepSeek functions
3. Complete Phase 3: Song Title Generator (US1)
4. Complete Phase 4: Song Tag Generator (US2)
5. **STOP and VALIDATE**: Both P1 tools working
6. Update hub page with 2 new tools → Deploy

### Full Delivery

1. MVP First (above)
2. Add Phase 5: Album Name Generator (US3)
3. Add Phase 6: Cover Art Prompt Generator (US4)
4. Add Phase 7: Remix Idea Generator (US5)
5. Complete Phase 8: Integration & Polish
6. Final validation → Deploy

---

## Task Summary

| Phase             | Tasks                     | Parallelizable     |
| ----------------- | ------------------------- | ------------------ |
| 1. Setup          | T001-T003                 | No                 |
| 2. Foundational   | T004-T008                 | Yes (all 5)        |
| 3. US1 Song Title | T009-T013                 | T010-T011 parallel |
| 4. US2 Song Tag   | T014-T018                 | T015-T016 parallel |
| 5. US3 Album Name | T019-T023                 | T020-T021 parallel |
| 6. US4 Cover Art  | T024-T028                 | T025-T026 parallel |
| 7. US5 Remix Idea | T029-T033                 | T030-T031 parallel |
| 8. Polish         | T034-T040 + T034.1-T034.2 | T035-T036 parallel |
| **Total**         | **42 tasks**              |                    |

---

## Notes

- No automated tests - use manual testing checklist in quickstart.md
- Each tool follows exact 8-section page structure from copilot-instructions.md
- Purple color scheme for all Suno tools (bg-purple-100, text-purple-600)
- All translations use comedic, fun tone per project rules
- Commit after each tool is complete (checkpoint)
