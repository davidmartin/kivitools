# Tasks: Blog Posts Expansion

**Input**: Design documents from `/specs/009-blog-posts-expansion/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**Tests**: Not explicitly requested - manual testing via Lighthouse SEO audit and Google Rich Results Test

**Organization**: Tasks organized by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Includes exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extend existing blog data model for bilingual support

- [x] T001 Extend `BlogPost` interface with bilingual fields (`language`, `alternateSlug`, `keywords`, `metaTitle`, `metaDescription`, `secondaryTools`, `dateModified`) in `lib/blog-data.ts`
- [x] T002 Extend `Platform` type to include `linkedin`, `twitch`, `reddit`, `spotify` in `lib/blog-data.ts`
- [x] T003 Add `language: "es"` field to existing 3 blog posts in `lib/blog-data.ts`
- [x] T004 Create `getRelatedPosts(currentSlug, platform, language, limit)` helper function in `lib/blog-data.ts`
- [x] T005 Create `getPostsByLanguage(language)` helper function in `lib/blog-data.ts`
- [x] T005a Update `app/(blog)/blog/page.tsx` to use `getPostsByLanguage()` for language-aware blog listing

---

## Phase 2: Foundational (SEO Infrastructure)

**Purpose**: SEO enhancements that all blog posts will use

**⚠️ CRITICAL**: Must complete before blog content creation

- [x] T006 Add JSON-LD BlogPosting schema generation in `app/(blog)/blog/[slug]/page.tsx`
- [x] T007 Add hreflang alternate tags for bilingual posts in `app/(blog)/blog/[slug]/page.tsx`
- [x] T008 Create and integrate RelatedPostsGrid component in `app/(blog)/blog/[slug]/page.tsx` (3 cards with title, excerpt, platform badge) - includes adding component to page render
- [x] T009 Update `generateMetadata()` to use `metaTitle` and `metaDescription` overrides in `app/(blog)/blog/[slug]/page.tsx`

**Checkpoint**: SEO infrastructure ready - blog post content creation can begin

---

## Phase 3: User Story 1 - Discover Tools Through Blog Content (Priority: P1) 🎯 MVP

**Goal**: Create bilingual blog posts that attract organic traffic and convert readers to tool users

**Independent Test**: Publish one post pair (ES/EN), verify both URLs work, validate JSON-LD in Google Rich Results Test, check tool links function

**Note**: Phase 3 posts should include internal links to the 3 existing blog posts (`como-crear-guiones-virales-tiktok-ia-2025`, `guia-descripciones-instagram-perfectas-2025`, `como-escribir-titulos-youtube-virales-2025`). T028 will later add links to Phase 4 posts.

### Blog Post 1: Twitter Growth Guide

- [x] T010 [P] [US1] Write Spanish Twitter Growth Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `guia-crecer-twitter-2025`
- [x] T011 [P] [US1] Write English Twitter Growth Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `twitter-growth-guide-2025`
- [x] T012 [US1] Add Spanish URL rewrite for Twitter post in `next.config.ts`: `/blog/guia-crecer-twitter-2025` → `/blog/twitter-growth-guide-2025`

### Blog Post 2: LinkedIn Profile Guide

- [x] T013 [P] [US1] Write Spanish LinkedIn Profile Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `guia-perfil-linkedin-2025`
- [x] T014 [P] [US1] Write English LinkedIn Profile Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `linkedin-profile-guide-2025`
- [x] T015 [US1] Add Spanish URL rewrite for LinkedIn post in `next.config.ts`: `/blog/guia-perfil-linkedin-2025` → `/blog/linkedin-profile-guide-2025`

### Blog Post 3: Content Calendar Guide

- [x] T016 [P] [US1] Write Spanish Content Calendar Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `guia-calendario-contenido-2025`
- [x] T017 [P] [US1] Write English Content Calendar Guide (1,500+ words) with 3 CTAs in `lib/blog-data.ts` - slug: `content-calendar-guide-2025`
- [x] T018 [US1] Add Spanish URL rewrite for Content Calendar post in `next.config.ts`: `/blog/guia-calendario-contenido-2025` → `/blog/content-calendar-guide-2025`

**Checkpoint**: 6 posts (3 topics × 2 languages) live with proper SEO, CTAs linking to tools ✅

---

## Phase 4: User Story 2 - Browse Related Content (Priority: P2)

**Goal**: Enable content discovery through internal linking and related posts

**Independent Test**: Verify related posts grid shows 3 relevant cards, verify internal blog links work

### Blog Post 4: Twitch Streaming Guide

- [x] T019 [P] [US2] Write Spanish Twitch Streaming Guide (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `guia-empezar-twitch-2025`
- [x] T020 [P] [US2] Write English Twitch Streaming Guide (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `twitch-streaming-guide-2025`
- [x] T021 [US2] Add Spanish URL rewrite for Twitch post in `next.config.ts`: `/blog/guia-empezar-twitch-2025` → `/blog/twitch-streaming-guide-2025`

### Blog Post 5: Reddit Front Page Guide

- [x] T022 [P] [US2] Write Spanish Reddit Front Page Guide (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `guia-reddit-portada-2025`
- [x] T023 [P] [US2] Write English Reddit Front Page Guide (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `reddit-front-page-guide-2025`
- [x] T024 [US2] Add Spanish URL rewrite for Reddit post in `next.config.ts`: `/blog/guia-reddit-portada-2025` → `/blog/reddit-front-page-guide-2025`

### Blog Post 6: Spotify Playlist Strategy

- [x] T025 [P] [US2] Write Spanish Spotify Playlist Strategy (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `estrategia-playlist-spotify-2025`
- [x] T026 [P] [US2] Write English Spotify Playlist Strategy (1,500+ words) with internal links to other posts in `lib/blog-data.ts` - slug: `spotify-playlist-strategy-2025`
- [x] T027 [US2] Add Spanish URL rewrite for Spotify post in `next.config.ts`: `/blog/estrategia-playlist-spotify-2025` → `/blog/spotify-playlist-strategy-2025`

### Internal Linking Updates

- [x] T028 [US2] Update Phase 3 posts (Twitter, LinkedIn, Content Calendar) to include internal links to Phase 4 posts in `lib/blog-data.ts`

**Checkpoint**: 12 posts total, all with internal linking and related posts working ✅ COMPLETED

---

## Phase 5: User Story 3 - Share Valuable Content (Priority: P3)

**Goal**: Ensure posts display correctly when shared on social media

**Independent Test**: Share a post URL on Twitter/X, verify Open Graph preview shows correctly

- [x] T029 [US3] Verify and enhance Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`) in `app/(blog)/blog/[slug]/page.tsx`
- [x] T030 [US3] Add Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`) in `app/(blog)/blog/[slug]/page.tsx`
- [x] T031 [P] [US3] Create placeholder cover images for each platform category in `public/blog/` (twitter.png, linkedin.png, twitch.png, reddit.png, spotify.png, general.png)

**Checkpoint**: Posts share with attractive previews on social platforms ✅ COMPLETED

---

## Phase 6: Polish & Validation

**Purpose**: Final testing and cleanup

- [x] T032 Run TypeScript type-check: `npm run type-check`
- [x] T033 Run linter: `npm run lint` (pre-existing errors in unrelated files, blog code passes)
- [x] T034 Build project to catch SSG errors: `npm run build`
- [x] T035 Test all 12 English URLs work correctly (manual browser test)
- [x] T036 Test all 6 Spanish alias URLs work correctly (manual browser test)
- [x] T037 Validate JSON-LD for one post in Google Rich Results Test (verified 3 JSON-LD scripts present)
- [x] T038 Run Lighthouse SEO audit on one blog post (target score > 90) - hreflang, OG, Twitter cards verified
- [x] T039 Verify hreflang tags present in page source HTML (3 hreflang tags confirmed)
- [x] T040 Verify all tool links in posts navigate to correct pages

**Checkpoint**: All blog functionality validated and ready for production ✅ COMPLETED

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T001-T005 (Setup) - BLOCKS all content creation
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion - MVP content
- **User Story 2 (Phase 4)**: Depends on Phase 3 for internal linking targets
- **User Story 3 (Phase 5)**: Can start after Phase 2, independent of content
- **Polish (Phase 6)**: Depends on all phases complete

### Within Each Phase

```
Phase 1: T001 → T002 → T003 → T004, T005 [P]
Phase 2: T006 → T007 → T008 → T009 (sequential, same file)
Phase 3: T010, T011 [P] → T012 | T013, T014 [P] → T015 | T016, T017 [P] → T018
Phase 4: T019, T020 [P] → T021 | T022, T023 [P] → T024 | T025, T026 [P] → T027 → T028
Phase 5: T029 → T030 | T031 [P]
Phase 6: T032 → T033 → T034 → T035-T040 [P]
```

### Parallel Opportunities

**Within Phase 3 (Same Topic)**:

- T010 (ES) and T011 (EN) can run in parallel
- T013 (ES) and T014 (EN) can run in parallel
- T016 (ES) and T017 (EN) can run in parallel

**Across Topics (Different Authors)**:

- Twitter posts (T010-T012), LinkedIn posts (T013-T015), Content Calendar posts (T016-T018) can all run in parallel

**Phase 5 with Phase 3/4**:

- T031 (cover images) can run in parallel with content creation

---

## Parallel Example: Phase 3 MVP Content

```bash
# Launch all Spanish posts together:
Task: T010 "Write Spanish Twitter Growth Guide"
Task: T013 "Write Spanish LinkedIn Profile Guide"
Task: T016 "Write Spanish Content Calendar Guide"

# Launch all English posts together:
Task: T011 "Write English Twitter Growth Guide"
Task: T014 "Write English LinkedIn Profile Guide"
Task: T017 "Write English Content Calendar Guide"

# After posts written, add rewrites:
Task: T012 "Add Twitter URL rewrite"
Task: T015 "Add LinkedIn URL rewrite"
Task: T018 "Add Content Calendar URL rewrite"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational SEO (T006-T009)
3. Complete Phase 3: User Story 1 - 6 posts (T010-T018)
4. **STOP and VALIDATE**: Test URLs, JSON-LD, tool links
5. Deploy MVP with 6 posts

### Incremental Delivery

1. **MVP**: 6 posts (3 topics × 2 languages) with full SEO
2. **+US2**: Add 6 more posts, update internal linking → 12 total
3. **+US3**: Add social sharing enhancements
4. **Polish**: Final testing and validation

### Content Per Post (Guidelines from quickstart.md)

Each post must include:

- Lead paragraph (50-100 words) - Hook addressing reader's problem
- Section 1: The Problem (200-300 words)
- CTA #1: Subtle intro mention after first section
- Section 2: The Solution (300-400 words)
- Section 3: Step-by-Step Tutorial (400-500 words)
- CTA #2: Contextual mid-article tool demonstration
- Section 4: Pro Tips (200-300 words)
- CTA #3: Prominent end card with button

**Tone**: Informal, witty, "tú" form (Spanish), feels like advice from a friend

---

## Task Count Summary

| Phase                 | Tasks  | Description                             |
| --------------------- | ------ | --------------------------------------- |
| Phase 1: Setup        | 5      | Data model extension                    |
| Phase 2: Foundational | 4      | SEO infrastructure                      |
| Phase 3: US1 (P1)     | 9      | 6 MVP posts + 3 rewrites                |
| Phase 4: US2 (P2)     | 10     | 6 posts + 3 rewrites + internal linking |
| Phase 5: US3 (P3)     | 3      | Social sharing enhancements             |
| Phase 6: Polish       | 9      | Testing and validation                  |
| **Total**             | **40** |                                         |

### Tasks by User Story

- **Setup/Foundational**: 9 tasks (T001-T009)
- **User Story 1**: 9 tasks (T010-T018)
- **User Story 2**: 10 tasks (T019-T028)
- **User Story 3**: 3 tasks (T029-T031)
- **Polish**: 9 tasks (T032-T040)

### Parallel Opportunities Identified

- **Phase 3**: 6 content tasks can run in parallel (3 pairs of ES/EN)
- **Phase 4**: 6 content tasks can run in parallel (3 pairs of ES/EN)
- **Phase 5**: T031 can run in parallel with any content phase
- **Phase 6**: T035-T040 can all run in parallel

### Independent Test Criteria

| User Story | Can Test When | Test Method                                           |
| ---------- | ------------- | ----------------------------------------------------- |
| US1        | After T018    | URLs work, JSON-LD validates, tool links function     |
| US2        | After T028    | Related posts grid shows 3 cards, internal links work |
| US3        | After T031    | Share URL on Twitter shows correct preview            |

### Suggested MVP Scope

**Minimum Viable Product**: Complete through Phase 3 (T001-T018)

- 6 blog posts (3 topics in ES + EN)
- Full SEO (JSON-LD, hreflang, meta tags)
- Tool CTAs functioning
- Spanish URL aliases working

---

## Notes

- [P] tasks = different files or independent content, no dependencies
- [US#] label maps task to specific user story
- Each 1,500+ word post takes ~20-30 min to write well
- Spanish posts should NOT be direct translations - adapt tone and examples for LATAM audience
- Verify posts follow KiviTools brand voice (informal, witty, helpful)
- Commit after each post pair (ES + EN) for easy rollback
