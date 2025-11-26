# Quickstart: Cookie Policy & Consent Banner

**Feature**: 004-cookie-policy  
**Estimated Time**: 4-6 hours

## Prerequisites

- Node.js 18+
- Project running locally (`npm run dev`)
- Access to `lib/locales` translation files

## Implementation Order

### Phase 1: Core Infrastructure (1-2 hours)

1. **Create types file**

   ```bash
   # Copy the contract to types folder
   cp specs/004-cookie-policy/contracts/cookie-consent.ts types/cookie-consent.ts
   ```

2. **Create CookieConsentContext**

   - File: `contexts/CookieConsentContext.tsx`
   - Implements state management for preferences
   - Handles localStorage read/write
   - Sets consent cookie for SSR detection

3. **Wrap app with context**
   - File: `app/layout.tsx`
   - Add `CookieConsentProvider` inside `LanguageProvider`

### Phase 2: UI Components (1-2 hours)

4. **Create CookieBanner component**

   - File: `app/components/cookie-banner.tsx`
   - Uses HeroUI Modal with `placement="bottom"`
   - Three buttons: Accept All, Reject Non-essential, Customize
   - Shows only when `needsRenewal` is true

5. **Create CookiePreferencesModal component**

   - File: `app/components/cookie-preferences-modal.tsx`
   - Uses HeroUI Modal (center placement)
   - Switch toggles for each category
   - Essential category disabled (always on)

6. **Add banner to layout**
   - File: `app/layout.tsx`
   - Import and render `<CookieBanner />` after `<Footer />`

### Phase 3: Conditional Loading (30 min)

7. **Modify GoogleAnalytics component**

   - File: `app/components/google-analytics.tsx`
   - Add consent check before rendering Script tags
   - Return null if `analytics` consent is false

8. **Modify AdSlot component**
   - File: `app/components/ad-slot.tsx`
   - Add consent check before rendering ads
   - Return null if `advertising` consent is false

### Phase 4: Legal Page (30 min)

9. **Create cookie-policy page**

   - File: `app/(legal)/cookie-policy/page.tsx`
   - Follow pattern from `privacy-policy/page.tsx`
   - Include cookies table with all categories
   - Link to preferences modal

10. **Update footer**
    - File: `app/components/footer.tsx`
    - Add "Cookie Settings" link that opens preferences modal
    - Add "Cookie Policy" link to `/cookie-policy`

### Phase 5: Translations (1 hour)

11. **Add translations to all 6 locales**
    - Files: `lib/locales/{en,es,fr,de,it,pt}/legal.ts`
    - Keys: `cookies.banner.*`, `cookies.preferences.*`, `cookies.policy.*`
    - Use comedic/fun tone per project guidelines

## Key Files to Create/Modify

| File                                          | Action | Description                     |
| --------------------------------------------- | ------ | ------------------------------- |
| `types/cookie-consent.ts`                     | Create | Type definitions from contracts |
| `contexts/CookieConsentContext.tsx`           | Create | State management                |
| `app/components/cookie-banner.tsx`            | Create | Bottom banner modal             |
| `app/components/cookie-preferences-modal.tsx` | Create | Preferences modal               |
| `app/components/google-analytics.tsx`         | Modify | Add consent check               |
| `app/components/ad-slot.tsx`                  | Modify | Add consent check               |
| `app/(legal)/cookie-policy/page.tsx`          | Create | Policy page                     |
| `app/components/footer.tsx`                   | Modify | Add links                       |
| `app/layout.tsx`                              | Modify | Add context + banner            |
| `lib/locales/*/legal.ts`                      | Modify | Add translations (6 files)      |

## Testing Checklist

After implementation, verify:

- [ ] Banner appears on first visit (incognito mode)
- [ ] "Accept All" enables GA and dismisses banner
- [ ] "Reject Non-essential" keeps GA disabled
- [ ] Preferences modal opens from footer link
- [ ] Switches toggle correctly (essential stays locked)
- [ ] Preferences persist after page refresh
- [ ] Banner doesn't reappear after consent given
- [ ] Dark mode looks correct
- [ ] All 6 languages display correctly
- [ ] `/cookie-policy` page renders with table
- [ ] GA script not present when analytics=false (check Network tab)

## Common Pitfalls

1. **Don't forget "use client"** - Context and Modal need client components
2. **Check localStorage on mount** - Use useEffect to avoid hydration mismatch
3. **Use semantic colors** - `bg-surface` not `bg-white dark:bg-gray-800`
4. **Test incognito** - localStorage persists in normal browsing

## Quick Reference: HeroUI Components

```tsx
// Modal pattern
<Modal>
  <Button>Trigger</Button>
  <Modal.Container placement="bottom">
    <Modal.Dialog>
      {({ close }) => (
        <>
          <Modal.Header><Modal.Heading>Title</Modal.Heading></Modal.Header>
          <Modal.Body>Content</Modal.Body>
          <Modal.Footer><Button onPress={close}>OK</Button></Modal.Footer>
        </>
      )}
    </Modal.Dialog>
  </Modal.Container>
</Modal>

// Switch pattern
<Switch isSelected={value} onChange={setValue}>
  <Switch.Control><Switch.Thumb /></Switch.Control>
  <Label>Label text</Label>
</Switch>
```
