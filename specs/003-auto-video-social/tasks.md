# Tasks: TikTok Video Prompt Generator & Publisher

**Input**: Design documents from `/specs/003-auto-video-social/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Not requested - manual testing per constitution guidelines

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. All user stories are P1 priority for this MVP feature.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md structure - extending existing Next.js app:

- **API Routes**: `app/api/admin/video-generator/`
- **Admin Page**: `app/admin/video-generator/`
- **DeepSeek Functions**: `lib/deepseek.ts`
- **Translations**: `lib/locales/{lang}/admin.ts`

---

## Phase 1: Setup

**Purpose**: Project structure for new admin feature

- [ ] T001 Create directory structure `app/api/admin/video-generator/prompt/` and `app/api/admin/video-generator/caption/`
- [ ] T002 Create directory structure `app/admin/video-generator/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Add `generateVeo2Prompt()` function to `lib/deepseek.ts` - accepts platform, toolSlug, toolName, toolDescription, language; returns structured Veo 2 prompt with STYLE, ASPECT, DURATION, SCENE, CAMERA, TEXT, MOOD sections; prompt engineering must handle abstract/hard-to-visualize tools by focusing on user benefits and UI animations rather than literal tool representation
- [ ] T004 [P] Add `generateTikTokCaption()` function to `lib/deepseek.ts` - accepts platform, toolSlug, toolName, toolDescription, language; returns caption text, hashtags array, and tool URL
- [ ] T005 [P] Add video generator translation keys to `lib/locales/en/admin.ts` (~25 keys: title, subtitle, steps 1-4, form labels, button texts, error messages)
- [ ] T006 [P] Add video generator translation keys to `lib/locales/es/admin.ts` (~25 keys matching English)
- [ ] T007 [P] Add video generator translation keys to `lib/locales/pt/admin.ts` (~25 keys matching English)
- [ ] T008 [P] Add video generator translation keys to `lib/locales/fr/admin.ts` (~25 keys matching English)
- [ ] T009 [P] Add video generator translation keys to `lib/locales/de/admin.ts` (~25 keys matching English)
- [ ] T010 [P] Add video generator translation keys to `lib/locales/it/admin.ts` (~25 keys matching English)

**Checkpoint**: Foundation ready - DeepSeek functions and translations available for all stories

---

## Phase 3: User Story 1 - Generate Veo 2 Prompt for a Tool (Priority: P1)

**Goal**: Admin can select a tool and get an optimized Veo 2 prompt for video generation

**Independent Test**: Select any tool → click Generate Prompt → verify structured prompt appears with STYLE, ASPECT, DURATION, SCENE sections → copy prompt to clipboard

### Implementation for User Story 1

- [ ] T011 [US1] Create POST API route `app/api/admin/video-generator/prompt/route.ts` - verify admin auth (check user.labels.includes("admin") using Appwrite SDK, return 401/403 if unauthorized), validate request body (platform, toolSlug, toolName, toolDescription, language), call generateVeo2Prompt(), return {success, prompt} or {success: false, error}
- [ ] T012 [US1] Create base admin page `app/admin/video-generator/page.tsx` with admin auth check (reuse pattern from app/admin/page.tsx), loading state, and access denied view
- [ ] T013 [US1] Add tool selector dropdown to `app/admin/video-generator/page.tsx` - import PLATFORM_TOOLS from tool-selector.tsx, flatten to list with platform/name/href/slug, use HeroUI Button + Popover for dropdown, show platform emoji + tool name
- [ ] T014 [US1] Add prompt generation section to `app/admin/video-generator/page.tsx` - "Generate Prompt" Button (onPress), loading state, display generated prompt in Card with pre-formatted text, copy button using navigator.clipboard.writeText(), include helper text with AI Studio link (aistudio.google.com/prompts/new_video) and fallback note if service unavailable
- [ ] T015 [US1] Add step indicator to `app/admin/video-generator/page.tsx` - use HeroUI Chip components showing steps 1-4, highlight current step based on workflow state

**Checkpoint**: User Story 1 complete - admin can select tool, generate prompt, and copy it

---

## Phase 4: User Story 2 - Upload Generated Video (Priority: P1)

**Goal**: Admin can upload a video file generated in VideoFX and see a preview

**Independent Test**: After prompt is copied, click Upload Video → select MP4 file → verify video preview displays → verify validation errors for invalid files

### Implementation for User Story 2

- [ ] T016 [US2] Add video upload section to `app/admin/video-generator/page.tsx` - file input (accept="video/mp4"), styled with HeroUI Button, hidden native input pattern
- [ ] T017 [US2] Add video validation to `app/admin/video-generator/page.tsx` - check file.type includes 'mp4', check file.size <= 100MB, show validation errors using Alert component
- [ ] T018 [US2] Add video preview to `app/admin/video-generator/page.tsx` - create object URL with URL.createObjectURL(), display in native video element with controls, store in state as UploadedVideo type

**Checkpoint**: User Story 2 complete - admin can upload video and see preview with validation

---

## Phase 5: User Story 3 - Generate TikTok Caption (Priority: P1)

**Goal**: System generates engaging TikTok caption with hashtags after video is uploaded

**Independent Test**: After video is uploaded → click Generate Caption → verify caption appears with hook, description, CTA, hashtags, URL → edit caption → verify changes are saved

### Implementation for User Story 3

- [ ] T019 [US3] Create POST API route `app/api/admin/video-generator/caption/route.ts` - verify admin auth (check user.labels.includes("admin") using Appwrite SDK, return 401/403 if unauthorized), validate request body (platform, toolSlug, toolName, toolDescription, language), call generateTikTokCaption(), return {success, caption, hashtags, toolUrl} or error
- [ ] T020 [US3] Add caption generation section to `app/admin/video-generator/page.tsx` - "Generate Caption" Button (appears after video upload), loading state, auto-generate when video is valid
- [ ] T021 [US3] Add editable caption display to `app/admin/video-generator/page.tsx` - use HeroUI TextArea for caption text, display hashtags as Chip components, show tool URL, track isEdited state
- [ ] T022 [US3] Add copy caption button to `app/admin/video-generator/page.tsx` - copies full caption with hashtags formatted as #tag1 #tag2, show success feedback

**Checkpoint**: User Story 3 complete - admin gets AI-generated caption, can edit it, and copy it

---

## Phase 6: User Story 4 - Prepare for TikTok Publishing (Priority: P1)

**Goal**: Admin has everything ready to publish to TikTok in under 10 seconds

**Independent Test**: After caption is ready → see video preview + caption + copy button + download button → copy caption → download video → verify both work

### Implementation for User Story 4

- [ ] T023 [US4] Add ready-to-publish section to `app/admin/video-generator/page.tsx` - Card with video preview, caption preview with copy button, download video Button
- [ ] T024 [US4] Implement video download to `app/admin/video-generator/page.tsx` - create download link using object URL, trigger download with filename based on tool slug
- [ ] T025 [US4] Add "Start Over" button to `app/admin/video-generator/page.tsx` - resets all state (selectedTool, prompt, video, caption), returns to step 1

**Checkpoint**: User Story 4 complete - admin can copy caption and download video for manual TikTok publishing

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements across all user stories

- [ ] T026 [P] Add dark mode support to `app/admin/video-generator/page.tsx` - verify all colors use HeroUI semantic classes (text-foreground, bg-surface, etc.)
- [ ] T027 [P] Add responsive design to `app/admin/video-generator/page.tsx` - test on mobile viewport, adjust grid/flex layouts for smaller screens
- [ ] T028 Test complete workflow: login as admin → select tool → generate prompt → copy prompt → (external: use VideoFX) → upload video → generate caption → edit caption → copy caption → download video → (external: post to TikTok)
- [ ] T029 Test non-admin access: verify access denied page shows for non-admin users
- [ ] T030 Test all 6 language translations: switch UI language and verify all videoGenerator keys display correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational phase completion
  - US1 → US2 → US3 → US4 (sequential flow, each step depends on previous)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies (Sequential for this feature)

This feature has a strict sequential workflow:

```
US1: Generate Prompt
    ↓
US2: Upload Video (needs prompt first)
    ↓
US3: Generate Caption (needs video first)
    ↓
US4: Publish Preparation (needs caption first)
```

**Note**: While the user stories are sequential in the workflow, the implementation within each story can be parallelized where marked [P].

### Parallel Opportunities

Within Phase 2 (Foundational):

```bash
# All these can run in parallel:
T003: generateVeo2Prompt() function
T004: generateTikTokCaption() function
T005-T010: All 6 translation files
```

Within Phase 7 (Polish):

```bash
# These can run in parallel:
T026: Dark mode support
T027: Responsive design
```

---

## Implementation Strategy

### MVP First (Complete Workflow)

Since all user stories are P1 and form a single workflow:

1. Complete Phase 1: Setup (directories)
2. Complete Phase 2: Foundational (DeepSeek functions + translations)
3. Complete Phase 3: User Story 1 (prompt generation)
4. Complete Phase 4: User Story 2 (video upload)
5. Complete Phase 5: User Story 3 (caption generation)
6. Complete Phase 6: User Story 4 (publish preparation)
7. Complete Phase 7: Polish (dark mode, responsive, testing)

**Estimated Time**: 2-3 hours (per quickstart.md)

### Incremental Validation

- After T015: Verify prompt generation works end-to-end
- After T018: Verify video upload and preview works
- After T022: Verify caption generation and editing works
- After T025: Verify complete workflow from start to finish

---

## Summary

| Metric                  | Value                                |
| ----------------------- | ------------------------------------ |
| Total Tasks             | 30                                   |
| Phase 1 (Setup)         | 2 tasks                              |
| Phase 2 (Foundational)  | 8 tasks                              |
| Phase 3 (US1 - Prompt)  | 5 tasks                              |
| Phase 4 (US2 - Video)   | 3 tasks                              |
| Phase 5 (US3 - Caption) | 4 tasks                              |
| Phase 6 (US4 - Publish) | 3 tasks                              |
| Phase 7 (Polish)        | 5 tasks                              |
| Parallel Opportunities  | 10 tasks (T003-T010, T026-T027)      |
| MVP Scope               | All 4 user stories (single workflow) |

---

## Notes

- All user stories are P1 priority (single workflow MVP)
- No tests requested - manual testing per constitution guidelines
- HeroUI v3 components required per constitution Principle I
- All text must use translations per constitution Principle II
- Admin auth pattern reused from existing /admin page
- Video storage is client-side only (session-based)
- DeepSeek API used for both prompt and caption generation
