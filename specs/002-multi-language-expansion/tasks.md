# Tasks: Multi-Language Expansion

**Input**: Design documents from `/specs/002-multi-language-expansion/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Not requested in feature specification. Tasks focus on implementation only.

**Organization**: Tasks are grouped by user story from spec.md to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=Portuguese, US2=French SEO, US3=German, US4=Italian Mobile)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Type Definitions & Infrastructure)

**Purpose**: Core type definitions and infrastructure updates

- [x] T001 Add Language type and UI_LANGUAGES constant in types/index.ts
- [x] T002 Update Language type export in lib/translations.ts to support 6 languages
- [x] T003 [P] Add new language translation keys (languages.pt, languages.fr, languages.de, languages.it) to lib/locales/en/common.ts
- [x] T004 [P] Add new language translation keys (languages.pt, languages.fr, languages.de, languages.it) to lib/locales/es/common.ts
- [x] T005 [P] Add nav.selectLanguage translation key to lib/locales/en/common.ts
- [x] T006 [P] Add nav.selectLanguage translation key to lib/locales/es/common.ts

---

## Phase 2: Foundational (Language Selector UI)

**Purpose**: Replace toggle button with Select dropdown - MUST complete before translation files work

**⚠️ CRITICAL**: Language selector must work before new languages can be tested

- [x] T007 Update LanguageContext.tsx to support 6 languages with extended browser detection in contexts/LanguageContext.tsx
- [x] T008 Replace desktop language toggle with HeroUI Select component in app/components/navigation.tsx
- [x] T009 Replace mobile language toggle with HeroUI Select component in app/components/navigation.tsx
- [x] T010 Verify language selector works with existing EN/ES before proceeding

**Checkpoint**: Language selector shows 6 languages (4 will fail until translations exist)

---

## Phase 3: User Story 1 - Portuguese Creator Uses Tool (Priority: P1) 🎯 MVP

**Goal**: Complete Portuguese translation for full UI coverage

**Independent Test**: Set browser to pt-BR, verify all UI displays in Portuguese, test TikTok Script Writer

### Create Portuguese File Structure

- [x] T011 Create directory structure lib/locales/pt/tools/{tiktok,instagram,twitter,youtube,reddit,snapchat,linkedin,forocoches,suno,twitch,elevenlabs,facebook,pinterest,spotify,amazon}
- [x] T012 Copy lib/locales/en/index.ts to lib/locales/pt/index.ts and update export name to 'pt'

### Translate Core UI Files (P0 Priority)

- [x] T013 [P] [US1] Translate lib/locales/pt/common.ts (nav, footer, shared UI ~120 keys)
- [x] T014 [P] [US1] Translate lib/locales/pt/home.ts (homepage ~50 keys)
- [x] T015 [P] [US1] Translate lib/locales/pt/platforms.ts (platform hub pages ~30 keys)

### Translate Secondary Files

- [x] T016 [P] [US1] Translate lib/locales/pt/legal.ts
- [x] T017 [P] [US1] Translate lib/locales/pt/contact.ts
- [x] T018 [P] [US1] Translate lib/locales/pt/blog.ts
- [x] T019 [P] [US1] Translate lib/locales/pt/builder.ts
- [x] T020 [P] [US1] Translate lib/locales/pt/dashboard.ts
- [x] T021 [P] [US1] Translate lib/locales/pt/admin.ts

### Translate TikTok Tools (Highest Traffic)

- [x] T022 [P] [US1] Translate lib/locales/pt/tools/tiktok/index.ts
- [x] T023 [P] [US1] Translate lib/locales/pt/tools/tiktok/script-writer.ts
- [x] T024 [P] [US1] Translate lib/locales/pt/tools/tiktok/video-ideas.ts
- [x] T025 [P] [US1] Translate lib/locales/pt/tools/tiktok/hook-generator.ts
- [x] T026 [P] [US1] Translate lib/locales/pt/tools/tiktok/hashtag-generator.ts
- [x] T027 [P] [US1] Translate remaining lib/locales/pt/tools/tiktok/\*.ts files (~20 files)

### Translate Other Platform Tools

- [x] T028 [P] [US1] Translate lib/locales/pt/tools/instagram/\*.ts (~9 files)
- [x] T029 [P] [US1] Translate lib/locales/pt/tools/youtube/\*.ts (~7 files)
- [x] T030 [P] [US1] Translate lib/locales/pt/tools/twitter/\*.ts (~4 files)
- [x] T031 [P] [US1] Translate lib/locales/pt/tools/reddit/\*.ts (~4 files)
- [x] T032 [P] [US1] Translate lib/locales/pt/tools/snapchat/\*.ts (~4 files)
- [x] T033 [P] [US1] Translate lib/locales/pt/tools/linkedin/\*.ts (~4 files)
- [x] T034 [P] [US1] Translate lib/locales/pt/tools/twitch/\*.ts (~4 files)
- [x] T035 [P] [US1] Translate lib/locales/pt/tools/elevenlabs/\*.ts (~7 files)
- [x] T036 [P] [US1] Translate lib/locales/pt/tools/suno/\*.ts (~7 files)
- [x] T037 [P] [US1] Translate lib/locales/pt/tools/forocoches/\*.ts (~4 files)
- [x] T038 [P] [US1] Translate lib/locales/pt/tools/facebook.ts
- [x] T039 [P] [US1] Translate lib/locales/pt/tools/pinterest.ts
- [x] T040 [P] [US1] Translate lib/locales/pt/tools/spotify.ts
- [x] T041 [P] [US1] Translate lib/locales/pt/tools/amazon.ts

### Wire Up Portuguese

- [x] T042 [US1] Import pt in lib/translations.ts and add to translations object
- [x] T043 [US1] Verify TypeScript compiles with no errors for Portuguese

**Checkpoint**: Portuguese user can use entire site in their language

---

## Phase 4: User Story 2 - French SEO Discovery (Priority: P1)

**Goal**: Complete French translation + SEO URL structure

**Independent Test**: Visit /fr/tiktok/script-writer, verify French content and hreflang tags

### Create French File Structure

- [x] T044 Create directory structure lib/locales/fr/tools/{all platforms}
- [x] T045 Copy lib/locales/en/index.ts to lib/locales/fr/index.ts and update export name to 'fr'

### Translate Core UI Files

- [x] T046 [P] [US2] Translate lib/locales/fr/common.ts
- [x] T047 [P] [US2] Translate lib/locales/fr/home.ts
- [x] T048 [P] [US2] Translate lib/locales/fr/platforms.ts

### Translate Secondary + Tool Files

- [x] T049 [P] [US2] Translate lib/locales/fr/legal.ts, contact.ts, blog.ts, builder.ts, dashboard.ts, admin.ts
- [x] T050 [P] [US2] Translate lib/locales/fr/tools/tiktok/\*.ts (all files)
- [x] T051 [P] [US2] Translate lib/locales/fr/tools/instagram/\*.ts (all files)
- [x] T052 [P] [US2] Translate lib/locales/fr/tools/youtube/\*.ts (all files)
- [x] T053 [P] [US2] Translate remaining lib/locales/fr/tools/\*_/_.ts (all platforms)

### Wire Up French + SEO

- [x] T054 [US2] Import fr in lib/translations.ts and add to translations object
- [ ] T055 [US2] Add /fr/:path\* rewrite rule in next.config.ts
- [ ] T056 [US2] Update app/sitemap.ts to include /fr/ URLs
- [ ] T057 [US2] Add French hreflang tags to lib/seo-metadata.ts
- [x] T058 [US2] Verify TypeScript compiles with no errors for French

**Checkpoint**: French SEO URLs work and appear in sitemap

---

## Phase 5: User Story 3 - German Creator (Priority: P2)

**Goal**: Complete German translation with formal "Sie" form

**Independent Test**: Switch to German, verify formal language (Sie-form) throughout

### Create German File Structure

- [x] T059 Create directory structure lib/locales/de/tools/{all platforms}
- [x] T060 Copy lib/locales/en/index.ts to lib/locales/de/index.ts and update export name to 'de'

### Translate All German Files

- [x] T061 [P] [US3] Translate lib/locales/de/common.ts (use formal Sie-form)
- [x] T062 [P] [US3] Translate lib/locales/de/home.ts (use formal Sie-form)
- [x] T063 [P] [US3] Translate lib/locales/de/platforms.ts
- [x] T064 [P] [US3] Translate lib/locales/de/\*.ts secondary files
- [ ] T065 [P] [US3] Translate lib/locales/de/tools/\*_/_.ts (all platforms, all tools) - IN PROGRESS (amazon, facebook, pinterest, spotify, tiktok/script-writer, tiktok/video-ideas, tiktok/username-generator, tiktok/bio-generator done)

### Wire Up German + SEO

- [x] T066 [US3] Import de in lib/translations.ts and add to translations object
- [ ] T067 [US3] Add /de/:path\* rewrite rule in next.config.ts
- [ ] T068 [US3] Update app/sitemap.ts to include /de/ URLs
- [ ] T069 [US3] Add German hreflang tags to lib/seo-metadata.ts
- [ ] T070 [US3] Verify TypeScript compiles with no errors for German

**Checkpoint**: German translation complete with formal tone

---

## Phase 6: User Story 4 - Italian Mobile Creator (Priority: P2)

**Goal**: Complete Italian translation with mobile-friendly verification

**Independent Test**: Access site on mobile with Italian language, verify navigation works without overflow

### Create Italian File Structure

- [ ] T071 Create directory structure lib/locales/it/tools/{all platforms}
- [ ] T072 Copy lib/locales/en/index.ts to lib/locales/it/index.ts and update export name to 'it'

### Translate All Italian Files

- [ ] T073 [P] [US4] Translate lib/locales/it/common.ts (keep text lengths similar to EN for mobile)
- [ ] T074 [P] [US4] Translate lib/locales/it/home.ts
- [ ] T075 [P] [US4] Translate lib/locales/it/platforms.ts
- [ ] T076 [P] [US4] Translate lib/locales/it/\*.ts secondary files
- [ ] T077 [P] [US4] Translate lib/locales/it/tools/\*_/_.ts (all platforms, all tools)

### Wire Up Italian + SEO

- [ ] T078 [US4] Import it in lib/translations.ts and add to translations object
- [ ] T079 [US4] Add /it/:path\* rewrite rule in next.config.ts
- [ ] T080 [US4] Update app/sitemap.ts to include /it/ URLs
- [ ] T081 [US4] Add Italian hreflang tags to lib/seo-metadata.ts
- [ ] T082 [US4] Verify TypeScript compiles with no errors for Italian
- [ ] T083 [US4] Test mobile navigation with Italian (verify no text overflow)

**Checkpoint**: Italian translation complete and mobile-verified

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and cleanup

- [ ] T084 Verify all 6 languages have matching file counts (run validation script)
- [ ] T085 Test browser language detection for all 6 languages
- [ ] T086 Test language preference persistence in localStorage
- [ ] T087 [P] Update docs/RUTAS_ALIAS.md with new language URL patterns
- [ ] T088 [P] Update PRD.md with multi-language support status
- [ ] T089 Run quickstart.md verification checklist
- [ ] T090 Verify Lighthouse performance score remains 90+ with all languages loaded
- [ ] T091 Final review: ensure comedic/fun tone maintained in all translations

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──────────────────────────────┐
                                               │
Phase 2 (Foundational: Language Selector) ◄───┘
           │
           ▼
    ┌──────┴──────┬──────────────┬──────────────┐
    │             │              │              │
    ▼             ▼              ▼              ▼
Phase 3       Phase 4        Phase 5        Phase 6
(Portuguese)  (French)       (German)       (Italian)
    │             │              │              │
    └──────┬──────┴──────────────┴──────────────┘
           │
           ▼
     Phase 7 (Polish)
```

### User Story Independence

- **US1 (Portuguese)**: Can complete independently after Phase 2
- **US2 (French + SEO)**: Can complete independently after Phase 2, adds SEO URL pattern
- **US3 (German)**: Can complete independently after Phase 2
- **US4 (Italian + Mobile)**: Can complete independently after Phase 2, includes mobile verification

### Parallel Opportunities

**Within Phase 1** (all can run in parallel):

- T003, T004, T005, T006 (translation key additions)

**Within Each User Story Phase** (all translation files can run in parallel):

- All tasks marked [P] within the same story

**Across User Stories** (after Phase 2 completes):

- US1, US2, US3, US4 can all proceed in parallel with different team members

---

## Parallel Example: User Story 1 (Portuguese)

```bash
# After T012 (index.ts created), launch all core translations together:
T013: Translate lib/locales/pt/common.ts
T014: Translate lib/locales/pt/home.ts
T015: Translate lib/locales/pt/platforms.ts

# After core complete, launch all secondary + tools together:
T016-T021: Secondary files (6 parallel)
T022-T041: Tool files (20 parallel batches)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Language Selector UI (T007-T010)
3. Complete Phase 3: Portuguese (T011-T043)
4. **STOP and VALIDATE**: Portuguese user can use entire site
5. Deploy Portuguese as first new language

### Incremental Delivery

1. **Week 1**: Setup + Language Selector + Portuguese (MVP)
2. **Week 2**: French + SEO URLs
3. **Week 3**: German + Italian
4. **Week 4**: Polish + Native speaker review

### Task Counts

| Phase          | Tasks  | Parallel?       |
| -------------- | ------ | --------------- |
| Setup          | 6      | Mostly          |
| Foundational   | 4      | Sequential      |
| US1 Portuguese | 32     | Highly parallel |
| US2 French     | 15     | Highly parallel |
| US3 German     | 12     | Highly parallel |
| US4 Italian    | 13     | Highly parallel |
| Polish         | 8      | Mostly          |
| **Total**      | **90** |                 |

---

## Notes

- [P] tasks = different files, no dependencies
- [US#] label maps task to specific user story for traceability
- Translation files can be AI-generated then reviewed (per research.md decision)
- German translations MUST use formal "Sie" form
- Portuguese translations use Brazilian Portuguese (você form)
- French translations use informal "tu" form
- Italian translations use informal "tu" form
- Keep translations similar length to English to avoid UI overflow
- Maintain comedic/fun tone per project guidelines
