# Tasks: Platform SEO Expansion

**Input**: Design documents from `/specs/001-platform-seo-expansion/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Manual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add platform assets and update shared configuration files

- [x] T001 [P] Add Pinterest logo SVG to `public/platforms/pinterest.svg`
- [x] T002 [P] Add Spotify logo SVG to `public/platforms/spotify.svg`
- [x] T003 [P] Add Facebook logo SVG to `public/platforms/facebook.svg`
- [x] T004 [P] Add Threads logo SVG to `public/platforms/threads.svg`

**Checkpoint**: All platform assets in place

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Update shared components and configuration that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Update Platform type in `lib/seo-metadata.ts` - add pinterest, spotify, facebook, threads to type union, platformColors, and platformNames
- [x] T006 Update Platform type in `app/components/platform-logo.tsx` - add 4 new platforms to PlatformLogoProps union, add threads to needsInvert check
- [x] T007 Update Platform type in `app/components/tool-selector.tsx` - add 4 new platforms to union type and empty PLATFORM_TOOLS entries
- [x] T008 Add navigation translation keys in `lib/translations.ts` - add `nav.pinterest`, `nav.spotify`, `nav.facebook`, `nav.threads` to both ES and EN
- [x] T009 Add platform page description translations in `lib/translations.ts` - add `pinterest.page.description`, `spotify.page.description`, `facebook.page.description`, `threads.page.description` to both ES and EN

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Discover Pinterest Tools (Priority: P1) 🎯 MVP

**Goal**: Content creators can use Pinterest tools for pin descriptions, board names, and profile bios

**Independent Test**: Navigate to `/pinterest`, use Pin Description Generator with a product topic, verify SEO-optimized output with copy functionality

### Pinterest Platform Hub

- [x] T010 [US1] Create Pinterest hub page at `app/(tools)/pinterest/page.tsx` following Instagram hub pattern with red color scheme (bg-red-100/text-red-600)

### Pinterest Tool 1: Pin Description Generator

- [x] T011 [P] [US1] Add DeepSeek function `generatePinterestPinDescription` in `lib/deepseek.ts`
- [x] T012 [P] [US1] Add all pinterestPinDescription translations in `lib/translations.ts` (title, description, form fields, features, howItWorks, FAQ 5 Q&As, relatedTools) for ES and EN
- [x] T013 [US1] Create API route at `app/api/tools/pinterest/pin-description/route.ts` with Turnstile verification and Appwrite logging
- [x] T014 [US1] Create tool page at `app/(tools)/pinterest/pin-description/page.tsx` with all 8 sections using HeroUI components

### Pinterest Tool 2: Board Name Generator

- [x] T015 [P] [US1] Add DeepSeek function `generatePinterestBoardNames` in `lib/deepseek.ts`
- [x] T016 [P] [US1] Add all pinterestBoardName translations in `lib/translations.ts` for ES and EN
- [x] T017 [US1] Create API route at `app/api/tools/pinterest/board-name/route.ts`
- [x] T018 [US1] Create tool page at `app/(tools)/pinterest/board-name/page.tsx` with all 8 sections

### Pinterest Tool 3: Profile Bio Generator

- [x] T019 [P] [US1] Add DeepSeek function `generatePinterestProfileBio` in `lib/deepseek.ts`
- [x] T020 [P] [US1] Add all pinterestProfileBio translations in `lib/translations.ts` for ES and EN
- [x] T021 [US1] Create API route at `app/api/tools/pinterest/profile-bio/route.ts`
- [x] T022 [US1] Create tool page at `app/(tools)/pinterest/profile-bio/page.tsx` with all 8 sections

### Pinterest Integration

- [x] T023 [US1] Add Pinterest to navigation platforms array in `app/components/navigation.tsx` with 3 tools
- [x] T024 [US1] Add Pinterest tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [x] T025 [US1] Add Pinterest Spanish URL rewrites to `next.config.ts` (descripcion-pin, nombre-tablero, bio-perfil)
- [x] T026 [US1] Update Pinterest hub page tools array with all 3 tools
- [x] T026A [US1] Add Pinterest to platforms array in `app/page.tsx` with red color
- [x] T026B [US1] Update `docs/RUTAS_ALIAS.md` with Pinterest Spanish URL aliases (3 entries)
- [x] T026C [US1] Update `PRD.md` with Pinterest platform and 3 tools status

**Checkpoint**: Pinterest platform fully functional and testable independently (all 10 integration points complete) ✅ COMPLETED

---

## Phase 4: User Story 2 - Create Spotify Playlist Content (Priority: P1)

**Goal**: Music curators can generate playlist names, descriptions, and artist bios for Spotify

**Independent Test**: Navigate to `/spotify`, use Playlist Description Generator, verify mood keywords and genre tags in output

### Spotify Platform Hub

- [x] T027 [US2] Create Spotify hub page at `app/(tools)/spotify/page.tsx` with green color scheme (bg-green-100/text-green-600)

### Spotify Tool 1: Playlist Name Generator

- [x] T028 [P] [US2] Add DeepSeek function `generateSpotifyPlaylistNames` in `lib/deepseek.ts`
- [x] T029 [P] [US2] Add all spotifyPlaylistName translations in `lib/translations.ts` for ES and EN
- [x] T030 [US2] Create API route at `app/api/tools/spotify/playlist-name/route.ts`
- [x] T031 [US2] Create tool page at `app/(tools)/spotify/playlist-name/page.tsx` with all 8 sections

### Spotify Tool 2: Playlist Description Generator

- [x] T032 [P] [US2] Add DeepSeek function `generateSpotifyPlaylistDescription` in `lib/deepseek.ts`
- [x] T033 [P] [US2] Add all spotifyPlaylistDescription translations in `lib/translations.ts` for ES and EN
- [x] T034 [US2] Create API route at `app/api/tools/spotify/playlist-description/route.ts`
- [x] T035 [US2] Create tool page at `app/(tools)/spotify/playlist-description/page.tsx` with all 8 sections

### Spotify Tool 3: Artist Bio Generator

- [x] T036 [P] [US2] Add DeepSeek function `generateSpotifyArtistBio` in `lib/deepseek.ts`
- [x] T037 [P] [US2] Add all spotifyArtistBio translations in `lib/translations.ts` for ES and EN
- [x] T038 [US2] Create API route at `app/api/tools/spotify/artist-bio/route.ts`
- [x] T039 [US2] Create tool page at `app/(tools)/spotify/artist-bio/page.tsx` with all 8 sections

### Spotify Integration

- [x] T040 [US2] Add Spotify to navigation platforms array in `app/components/navigation.tsx` with 3 tools
- [x] T041 [US2] Add Spotify tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [x] T042 [US2] Add Spotify Spanish URL rewrites to `next.config.ts` (nombre-playlist, descripcion-playlist, bio-artista)
- [x] T043 [US2] Update Spotify hub page tools array with all 3 tools
- [x] T043A [US2] Add Spotify to platforms array in `app/page.tsx` with green color
- [x] T043B [US2] Update `docs/RUTAS_ALIAS.md` with Spotify Spanish URL aliases (3 entries)
- [x] T043C [US2] Update `PRD.md` with Spotify platform and 3 tools status

**Checkpoint**: Spotify platform fully functional and testable independently (all 10 integration points complete) ✅ COMPLETED

---

## Phase 5: User Story 3 - Generate Facebook Content (Priority: P2)

**Goal**: Social media managers can create engaging Facebook posts, page bios, and ad copy

**Independent Test**: Navigate to `/facebook`, use Post Generator with business topic, verify engagement-optimized output

### Facebook Platform Hub

- [x] T044 [US3] Create Facebook hub page at `app/(tools)/facebook/page.tsx` with blue color scheme (bg-blue-100/text-blue-600)

### Facebook Tool 1: Post Generator

- [x] T045 [P] [US3] Add DeepSeek function `generateFacebookPost` in `lib/deepseek.ts`
- [x] T046 [P] [US3] Add all facebookPost translations in `lib/translations.ts` for ES and EN
- [x] T047 [US3] Create API route at `app/api/tools/facebook/post-generator/route.ts`
- [x] T048 [US3] Create tool page at `app/(tools)/facebook/post-generator/page.tsx` with all 8 sections

### Facebook Tool 2: Page Bio Generator

- [x] T049 [P] [US3] Add DeepSeek function `generateFacebookPageBio` in `lib/deepseek.ts`
- [x] T050 [P] [US3] Add all facebookPageBio translations in `lib/translations.ts` for ES and EN
- [x] T051 [US3] Create API route at `app/api/tools/facebook/page-bio/route.ts`
- [x] T052 [US3] Create tool page at `app/(tools)/facebook/page-bio/page.tsx` with all 8 sections

### Facebook Tool 3: Ad Copy Generator

- [x] T053 [P] [US3] Add DeepSeek function `generateFacebookAdCopy` in `lib/deepseek.ts`
- [x] T054 [P] [US3] Add all facebookAdCopy translations in `lib/translations.ts` for ES and EN
- [x] T055 [US3] Create API route at `app/api/tools/facebook/ad-copy/route.ts`
- [x] T056 [US3] Create tool page at `app/(tools)/facebook/ad-copy/page.tsx` with all 8 sections (dual output: headline + primaryText)

### Facebook Integration

- [x] T057 [US3] Add Facebook to navigation platforms array in `app/components/navigation.tsx` with 3 tools
- [x] T058 [US3] Add Facebook tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [x] T059 [US3] Add Facebook Spanish URL rewrites to `next.config.ts` (generador-publicaciones, bio-pagina, texto-anuncio)
- [x] T060 [US3] Update Facebook hub page tools array with all 3 tools
- [x] T060A [US3] Add Facebook to platforms array in `app/page.tsx` with blue color
- [x] T060B [US3] Update `docs/RUTAS_ALIAS.md` with Facebook Spanish URL aliases (3 entries)
- [x] T060C [US3] Update `PRD.md` with Facebook platform and 3 tools status

**Checkpoint**: Facebook platform fully functional and testable independently (all 10 integration points complete) ✅ COMPLETED

---

## Phase 6: User Story 4 - Optimize Threads Content (Priority: P2)

**Goal**: Creators can generate conversational Threads posts and bios

**Independent Test**: Navigate to `/threads`, use Post Generator, verify conversational style and 500-char limit

### Threads Platform Hub

- [ ] T061 [US4] Create Threads hub page at `app/(tools)/threads/page.tsx` with gray color scheme (bg-gray-100/text-gray-600)

### Threads Tool 1: Post Generator

- [ ] T062 [P] [US4] Add DeepSeek function `generateThreadsPost` in `lib/deepseek.ts`
- [ ] T063 [P] [US4] Add all threadsPost translations in `lib/translations.ts` for ES and EN
- [ ] T064 [US4] Create API route at `app/api/tools/threads/post-generator/route.ts`
- [ ] T065 [US4] Create tool page at `app/(tools)/threads/post-generator/page.tsx` with all 8 sections

### Threads Tool 2: Bio Generator

- [ ] T066 [P] [US4] Add DeepSeek function `generateThreadsBio` in `lib/deepseek.ts`
- [ ] T067 [P] [US4] Add all threadsBio translations in `lib/translations.ts` for ES and EN
- [ ] T068 [US4] Create API route at `app/api/tools/threads/bio-generator/route.ts`
- [ ] T069 [US4] Create tool page at `app/(tools)/threads/bio-generator/page.tsx` with all 8 sections

### Threads Integration

- [ ] T070 [US4] Add Threads to navigation platforms array in `app/components/navigation.tsx` with 2 tools
- [ ] T071 [US4] Add Threads tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T072 [US4] Add Threads Spanish URL rewrites to `next.config.ts` (generador-publicaciones, generador-bio)
- [ ] T073 [US4] Update Threads hub page tools array with all 2 tools
- [ ] T073A [US4] Add Threads to platforms array in `app/page.tsx` with gray color
- [ ] T073B [US4] Update `docs/RUTAS_ALIAS.md` with Threads Spanish URL aliases (2 entries)
- [ ] T073C [US4] Update `PRD.md` with Threads platform and 2 tools status

**Checkpoint**: Threads platform fully functional and testable independently (all 10 integration points complete)

---

## Phase 7: User Story 5 - Enhance Existing Platform Tools (Priority: P3)

**Goal**: Add new tools to TikTok and Instagram platforms for increased user retention

**Independent Test**: Navigate to `/tiktok` and `/instagram`, verify new tools appear and function correctly

### TikTok Tool 1: Comment Reply Generator

- [ ] T074 [P] [US5] Add DeepSeek function `generateTikTokCommentReplies` in `lib/deepseek.ts`
- [ ] T075 [P] [US5] Add all tiktokCommentReply translations in `lib/translations.ts` for ES and EN
- [ ] T076 [US5] Create API route at `app/api/tools/tiktok/comment-reply/route.ts`
- [ ] T077 [US5] Create tool page at `app/(tools)/tiktok/comment-reply/page.tsx` with all 8 sections

### TikTok Tool 2: Duet Ideas Generator

- [ ] T078 [P] [US5] Add DeepSeek function `generateTikTokDuetIdeas` in `lib/deepseek.ts`
- [ ] T079 [P] [US5] Add all tiktokDuetIdeas translations in `lib/translations.ts` for ES and EN
- [ ] T080 [US5] Create API route at `app/api/tools/tiktok/duet-ideas/route.ts`
- [ ] T081 [US5] Create tool page at `app/(tools)/tiktok/duet-ideas/page.tsx` with all 8 sections

### TikTok Integration

- [ ] T082 [US5] Add TikTok new tools to navigation in `app/components/navigation.tsx`
- [ ] T083 [US5] Add TikTok new tools to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T084 [US5] Add TikTok Spanish URL rewrites to `next.config.ts` (respuesta-comentarios, ideas-dueto)
- [ ] T085 [US5] Update TikTok hub page tools array to include new tools in `app/(tools)/tiktok/page.tsx`

### Instagram Tool: Carousel Script Generator

- [ ] T086 [P] [US5] Add DeepSeek function `generateInstagramCarouselScript` in `lib/deepseek.ts`
- [ ] T087 [P] [US5] Add all instagramCarouselScript translations in `lib/translations.ts` for ES and EN
- [ ] T088 [US5] Create API route at `app/api/tools/instagram/carousel-script/route.ts`
- [ ] T089 [US5] Create tool page at `app/(tools)/instagram/carousel-script/page.tsx` with all 8 sections

### Instagram Integration

- [ ] T090 [US5] Add Instagram carousel-script to navigation in `app/components/navigation.tsx`
- [ ] T091 [US5] Add Instagram carousel-script to PLATFORM_TOOLS in `app/components/tool-selector.tsx`
- [ ] T092 [US5] Add Instagram Spanish URL rewrite to `next.config.ts` (guion-carrusel)
- [ ] T093 [US5] Update Instagram hub page tools array to include carousel-script in `app/(tools)/instagram/page.tsx`

**Checkpoint**: All existing platform expansions complete and testable

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and verification

### Final Verification

- [ ] T094 Verify all 4 new platforms appear in home page platforms array
- [ ] T095 Verify `docs/RUTAS_ALIAS.md` contains all 13 Spanish URL aliases
- [ ] T096 Verify `PRD.md` reflects 4 new platforms and 13 new tools
- [ ] T097 Verify total tool count is 47+ (run: `find app/\(tools\) -name "page.tsx" -path "*/[a-z]*/*" | wc -l`)

### Final Validation

- [ ] T100 Test all Pinterest tools on English URLs (3 tools)
- [ ] T101 Test all Pinterest tools on Spanish URLs (3 tools)
- [ ] T102 Test all Spotify tools on English URLs (3 tools)
- [ ] T103 Test all Spotify tools on Spanish URLs (3 tools)
- [ ] T104 Test all Facebook tools on English URLs (3 tools)
- [ ] T105 Test all Facebook tools on Spanish URLs (3 tools)
- [ ] T106 Test all Threads tools on English URLs (2 tools)
- [ ] T107 Test all Threads tools on Spanish URLs (2 tools)
- [ ] T108 Test TikTok expansion tools on both URLs (2 tools)
- [ ] T109 Test Instagram expansion tool on both URLs (1 tool)
- [ ] T110 Test dark mode across all new platforms
- [ ] T111 Test mobile responsive design across all new tools
- [ ] T112 Verify Lighthouse score 90+ on mobile for sample tools
- [ ] T113 Run `npm run build` to verify no TypeScript errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion - BLOCKS all user stories
- **Phases 3-7 (User Stories)**: All depend on Phase 2 completion
  - US1 (Pinterest) and US2 (Spotify) can run in parallel (both P1)
  - US3 (Facebook) and US4 (Threads) can run in parallel (both P2)
  - US5 (Expansion) can start after Phase 2 (P3)
- **Phase 8 (Polish)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Pinterest - P1)**: Can start after Phase 2 - No dependencies on other stories
- **US2 (Spotify - P1)**: Can start after Phase 2 - No dependencies on other stories
- **US3 (Facebook - P2)**: Can start after Phase 2 - No dependencies on other stories
- **US4 (Threads - P2)**: Can start after Phase 2 - No dependencies on other stories
- **US5 (Expansion - P3)**: Can start after Phase 2 - No dependencies on other stories

### Within Each User Story

1. DeepSeek function and translations (parallel)
2. API route (depends on DeepSeek function)
3. Tool page (depends on API route and translations)
4. Integration (depends on tool page)
5. Hub page update (depends on all tools)

### Parallel Opportunities

```bash
# Phase 1: All logo assets in parallel
T001, T002, T003, T004

# Phase 2: Foundation tasks are sequential (same files)

# Phase 3 (US1 Pinterest): Parallel DeepSeek + translations per tool
T011 + T012  # Pin Description
T015 + T016  # Board Name
T019 + T020  # Profile Bio

# Phase 4 (US2 Spotify): Same pattern
T028 + T029  # Playlist Name
T032 + T033  # Playlist Description
T036 + T037  # Artist Bio

# Cross-story parallelism (if multiple developers):
# Developer A: US1 (Pinterest)
# Developer B: US2 (Spotify)
# Developer C: US5 (Expansion)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (logos)
2. Complete Phase 2: Foundational (shared components)
3. Complete Phase 3: User Story 1 (Pinterest)
4. **STOP and VALIDATE**: Test Pinterest on both URLs
5. Deploy/demo if ready - 3 tools available

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Pinterest) → Test → Deploy (3 tools)
3. Add US2 (Spotify) → Test → Deploy (6 tools)
4. Add US3 (Facebook) → Test → Deploy (9 tools)
5. Add US4 (Threads) → Test → Deploy (11 tools)
6. Add US5 (Expansion) → Test → Deploy (13 tools)
7. Polish phase → Final validation

### Estimated Time

| Phase                  | Tasks   | Estimated Time  |
| ---------------------- | ------- | --------------- |
| Phase 1 (Setup)        | 4       | 30 min          |
| Phase 2 (Foundational) | 5       | 1 hour          |
| Phase 3 (Pinterest)    | 20      | 3.5 hours       |
| Phase 4 (Spotify)      | 20      | 3.5 hours       |
| Phase 5 (Facebook)     | 20      | 3.5 hours       |
| Phase 6 (Threads)      | 16      | 2.5 hours       |
| Phase 7 (Expansion)    | 20      | 2.5 hours       |
| Phase 8 (Polish)       | 18      | 2.5 hours       |
| **Total**              | **123** | **~19.5 hours** |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- All tool pages require 8 sections: Header, Form, Results, Features, Hero, HowItWorks, FAQ, RelatedTools
- All translations require both ES and EN versions
- All API routes require Turnstile verification and Appwrite logging
- Spanish URLs configured via rewrites in `next.config.ts`
- Commit after each tool or logical group of tasks
