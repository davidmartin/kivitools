# Tasks: Cookie Policy & Consent Banner

**Input**: Design documents from `/specs/004-cookie-policy/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/cookie-consent.ts

**Tests**: No tests requested - manual testing per quickstart.md checklist

**Organization**: Tasks grouped by user story for independent implementation

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1, US2, US3, US4)
- Setup/Foundational phases: No story label

---

## Phase 1: Setup

**Purpose**: Type definitions and core constants

- [ ] T001 Copy contract types from `specs/004-cookie-policy/contracts/cookie-consent.ts` to `types/cookie-consent.ts`
- [ ] T002 Export cookie-consent types from `types/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**⚠️ CRITICAL**: No UI components can work without the Context

- [ ] T003 Create CookieConsentContext in `contexts/CookieConsentContext.tsx` with:

  - localStorage read/write for preferences
  - Cookie set/get for SSR detection (`kivi_consent`)
  - State: preferences, hasConsented, isExpired, needsRenewal, isPreferencesOpen
  - Actions: acceptAll, rejectNonEssential, updatePreferences, openPreferences, closePreferences
  - useEffect to load saved preferences on mount
  - Helper functions from contracts (isConsentExpired, needsConsentRenewal)

- [ ] T004 Wrap app with CookieConsentProvider in `app/layout.tsx`:
  - Import CookieConsentProvider from contexts
  - Wrap children inside LanguageProvider (after LanguageProvider, before AuthProvider)

**Checkpoint**: Context ready - UI components can now use useCookieConsent()

---

## Phase 3: User Story 1 - First Visit with Consent (Priority: P1) 🎯 MVP

**Goal**: New users see banner and can accept/reject cookies before any non-essential cookies load

**Independent Test**: Visit site in incognito, verify banner appears, GA NOT loaded until accept

### Implementation for User Story 1

- [ ] T005 [US1] Create CookieBanner component in `app/components/cookie-banner.tsx`:

  - Use HeroUI Modal with `placement="bottom"`
  - Controlled by needsRenewal from context (isOpen when needsRenewal is true)
  - Three HeroUI Buttons: Accept All (primary), Reject Non-essential (secondary), Customize (tertiary/ghost)
  - "Más información" Link to /cookie-policy
  - All text via t() translations
  - Semantic colors: bg-surface, text-foreground, border-border
  - Use onPress for all buttons (NOT onClick)

- [ ] T006 [US1] Add CookieBanner to layout in `app/layout.tsx`:

  - Import CookieBanner
  - Render after Footer, before closing body tags
  - Wrapped inside CookieConsentProvider

- [ ] T007 [US1] Modify GoogleAnalytics in `app/components/google-analytics.tsx`:

  - Add "use client" directive (if not present)
  - Import useCookieConsent from contexts
  - Check preferences?.analytics before rendering Script tags
  - Return null if analytics consent is false or preferences is null

- [ ] T008 [US1] Modify AdSlot in `app/components/ad-slot.tsx`:

  - Add useCookieConsent import
  - Check preferences?.advertising before rendering ad code
  - Return null if advertising consent is false or preferences is null

- [ ] T009 [P] [US1] Add EN translations in `lib/locales/en/legal.ts`:

  - Banner: cookies.banner.title, description, acceptAll, rejectNonEssential, customize, moreInfo
  - Fun/comedic tone per project guidelines

- [ ] T010 [P] [US1] Add ES translations in `lib/locales/es/legal.ts`:

  - Same keys as EN with Spanish translations
  - Fun/comedic tone

- [ ] T011 [P] [US1] Add FR translations in `lib/locales/fr/legal.ts`:

  - Same keys as EN with French translations

- [ ] T012 [P] [US1] Add DE translations in `lib/locales/de/legal.ts`:

  - Same keys as EN with German translations

- [ ] T013 [P] [US1] Add IT translations in `lib/locales/it/legal.ts`:

  - Same keys as EN with Italian translations

- [ ] T014 [P] [US1] Add PT translations in `lib/locales/pt/legal.ts`:
  - Same keys as EN with Portuguese translations

**Checkpoint**: Banner appears, accept/reject works, GA blocked until consent. MVP complete!

---

## Phase 4: User Story 2 - Manage Cookie Preferences (Priority: P1)

**Goal**: Users can change preferences anytime via footer link

**Independent Test**: Accept cookies, click footer link, toggle analytics off, verify GA stops loading

### Implementation for User Story 2

- [ ] T015 [US2] Create CookiePreferencesModal in `app/components/cookie-preferences-modal.tsx`:

  - HeroUI Modal with center placement
  - Controlled by isPreferencesOpen from context
  - Three Switch toggles (Essential disabled/always on, Analytics, Advertising)
  - Use HeroUI Switch compound pattern: Switch.Control, Switch.Thumb
  - Description under each category from translations
  - Save button calls updatePreferences() and closePreferences()
  - Cancel button just closes modal

- [ ] T016 [US2] Update CookieBanner "Customize" button in `app/components/cookie-banner.tsx`:

  - Customize button should call openPreferences() from context
  - (This integrates the preferences modal with the banner)

- [ ] T017 [US2] Update footer with cookie links in `app/components/footer.tsx`:

  - Add new list item under Legal section: "Cookie Settings" button
  - Cookie Settings is NOT a link, it's a button that calls openPreferences()
  - Import useCookieConsent to get openPreferences function
  - Add "Cookie Policy" Link to /cookie-policy

- [ ] T018 [US2] Add CookiePreferencesModal to layout in `app/layout.tsx`:

  - Import CookiePreferencesModal
  - Render alongside CookieBanner (both inside CookieConsentProvider)

- [ ] T019 [P] [US2] Add preferences modal translations EN in `lib/locales/en/legal.ts`:

  - cookies.preferences.title, save, cancel
  - cookies.preferences.essential.title, description
  - cookies.preferences.analytics.title, description
  - cookies.preferences.advertising.title, description

- [ ] T020 [P] [US2] Add preferences modal translations ES in `lib/locales/es/legal.ts`

- [ ] T021 [P] [US2] Add preferences modal translations FR in `lib/locales/fr/legal.ts`

- [ ] T022 [P] [US2] Add preferences modal translations DE in `lib/locales/de/legal.ts`

- [ ] T023 [P] [US2] Add preferences modal translations IT in `lib/locales/it/legal.ts`

- [ ] T024 [P] [US2] Add preferences modal translations PT in `lib/locales/pt/legal.ts`

**Checkpoint**: Users can change preferences from footer, changes apply immediately

---

## Phase 5: User Story 3 - Cookie Policy Page (Priority: P2)

**Goal**: Dedicated page with complete cookie information

**Independent Test**: Navigate to /cookie-policy, verify table shows all cookies with details

### Implementation for User Story 3

- [ ] T025 [US3] Create cookie-policy page in `app/(legal)/cookie-policy/page.tsx`:

  - Follow pattern from privacy-policy/page.tsx
  - "use client" directive
  - Import Card from @heroui/react
  - Table showing all cookies from COOKIE_CATEGORIES constant
  - Columns: Cookie Name, Provider, Purpose, Duration
  - Group by category (Essential, Analytics, Advertising)
  - Link back to home
  - All text via translations

- [ ] T026 [P] [US3] Add policy page translations EN in `lib/locales/en/legal.ts`:

  - cookies.policy.title, intro, lastUpdated
  - cookies.policy.table.name, provider, purpose, duration
  - cookies.policy.cookie.consent, turnstile, ga, gaSession, gid, adsense (purpose descriptions)

- [ ] T027 [P] [US3] Add policy page translations ES in `lib/locales/es/legal.ts`

- [ ] T028 [P] [US3] Add policy page translations FR in `lib/locales/fr/legal.ts`

- [ ] T029 [P] [US3] Add policy page translations DE in `lib/locales/de/legal.ts`

- [ ] T030 [P] [US3] Add policy page translations IT in `lib/locales/it/legal.ts`

- [ ] T031 [P] [US3] Add policy page translations PT in `lib/locales/pt/legal.ts`

**Checkpoint**: /cookie-policy accessible with complete cookie information

---

## Phase 6: User Story 4 - Persistence (Priority: P2)

**Goal**: Preferences persist across sessions, renewal after 12 months

**Independent Test**: Accept cookies, close browser, return - banner should NOT appear

### Implementation for User Story 4

Note: Most persistence logic is already in CookieConsentContext (Phase 2). This phase ensures it works correctly.

- [ ] T032 [US4] Verify localStorage persistence in CookieConsentContext:

  - On mount: read from localStorage, parse, validate version
  - On save: write to localStorage as JSON
  - If version mismatch: set needsRenewal = true

- [ ] T033 [US4] Verify cookie persistence for SSR in CookieConsentContext:

  - On save: set kivi_consent=1 cookie with 365 day expiry
  - On clear: remove cookie
  - Use document.cookie API (client-side only)

- [ ] T034 [US4] Verify expiration logic:
  - Check consentDate + 365 days < now = expired
  - If expired: needsRenewal = true, show banner again

**Checkpoint**: Preferences persist, consent renewal works after 12 months

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup

- [ ] T035 [P] Verify dark mode support in all components:

  - CookieBanner uses semantic colors
  - CookiePreferencesModal uses semantic colors
  - cookie-policy page uses semantic colors
  - No hardcoded colors (white, black, gray-\*)

- [ ] T036 [P] Verify responsive design:

  - Banner looks good on mobile (full width)
  - Preferences modal scrollable on small screens
  - Footer links wrap correctly

- [ ] T037 [P] Accessibility check:

  - Modal has proper focus trap (HeroUI provides)
  - Switches have aria-label
  - Links have descriptive text
  - Color contrast meets 4.5:1

- [ ] T038 Update footer translations in all 6 locales:

  - footer.cookieSettings (new key for button)
  - footer.cookiePolicy (new key for link)

- [ ] T039 Run quickstart.md testing checklist:
  - [ ] Banner appears on first visit (incognito mode)
  - [ ] "Accept All" enables GA and dismisses banner
  - [ ] "Reject Non-essential" keeps GA disabled
  - [ ] Preferences modal opens from footer link
  - [ ] Switches toggle correctly (essential stays locked)
  - [ ] Preferences persist after page refresh
  - [ ] Banner doesn't reappear after consent given
  - [ ] Dark mode looks correct
  - [ ] All 6 languages display correctly
  - [ ] /cookie-policy page renders with table
  - [ ] GA script not present when analytics=false (Network tab)
  - [ ] **SC-001**: Banner appears < 1s (Chrome DevTools Performance tab)
  - [ ] **SC-006**: Run CookieBot Scanner or similar compliance tool post-deploy

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 3 (uses banner's Customize button)
- **User Story 3 (Phase 5)**: Depends on Phase 2 only (can run parallel with US1/US2)
- **User Story 4 (Phase 6)**: Depends on Phase 2 (verification of context logic)
- **Polish (Phase 7)**: Depends on all previous phases

### Parallel Opportunities

**Within Phase 3 (US1)**:

```
T009, T010, T011, T012, T013, T014 can all run in parallel (different locale files)
```

**Within Phase 4 (US2)**:

```
T019, T020, T021, T022, T023, T024 can all run in parallel (different locale files)
```

**Within Phase 5 (US3)**:

```
T026, T027, T028, T029, T030, T031 can all run in parallel (different locale files)
```

**Cross-Phase Parallel**:

```
Phase 5 (US3) can run in parallel with Phase 4 (US2) after Phase 2 is complete
Phase 6 (US4) can run in parallel with Phase 5 after Phase 3 is complete
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001-T002 (Setup)
2. Complete T003-T004 (Foundational Context)
3. Complete T005-T014 (Banner + GA blocking + translations)
4. **STOP and VALIDATE**: Test in incognito - banner works, GA blocked
5. **This is deployable MVP** - GDPR compliant!

### Incremental Delivery

1. Setup + Foundational → Context ready
2. User Story 1 → Banner working → **Deploy MVP**
3. User Story 2 → Preferences modal → Deploy update
4. User Story 3 → Policy page → Deploy update
5. User Story 4 + Polish → Final verification → Deploy complete

---

## Summary

| Phase             | Tasks     | Parallel             | Estimated Time |
| ----------------- | --------- | -------------------- | -------------- |
| Setup             | T001-T002 | Yes                  | 10 min         |
| Foundational      | T003-T004 | No                   | 45 min         |
| US1 - Banner      | T005-T014 | 6 translation tasks  | 1.5 hours      |
| US2 - Preferences | T015-T024 | 6 translation tasks  | 1 hour         |
| US3 - Policy Page | T025-T031 | 6 translation tasks  | 45 min         |
| US4 - Persistence | T032-T034 | No                   | 30 min         |
| Polish            | T035-T039 | 3 parallel + testing | 30 min         |

**Total**: 39 tasks, ~5 hours estimated
