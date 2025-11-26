# Research: Cookie Policy & Consent Banner

**Feature**: 004-cookie-policy  
**Date**: 2025-11-26

## 1. GDPR Cookie Consent Requirements

### Decision: Privacy by Default + Explicit Consent

**Rationale**: GDPR Article 7 requires:

- Consent must be freely given, specific, informed, and unambiguous
- Pre-ticked boxes are NOT valid consent
- Consent must be as easy to withdraw as to give
- Must be able to prove consent was given (audit trail)

**Alternatives Considered**:

- Implied consent (rejected: not GDPR compliant)
- Consent wall (rejected: poor UX, may be legally questionable)
- Geolocation-based banners (rejected: adds complexity, same banner for all is safer)

## 2. Cookie Categories Best Practices

### Decision: Three Categories (Essential, Analytics, Advertising)

| Category    | Description               | Default | User Can Change |
| ----------- | ------------------------- | ------- | --------------- |
| Essential   | Turnstile, consent cookie | ✅ ON   | ❌ No           |
| Analytics   | Google Analytics          | ❌ OFF  | ✅ Yes          |
| Advertising | Google AdSense            | ❌ OFF  | ✅ Yes          |

**Rationale**:

- Essential cookies don't require consent under GDPR
- Separating analytics from advertising gives users granular control
- Three categories is the industry standard (ICO guidance)

**Alternatives Considered**:

- Single on/off toggle (rejected: doesn't meet GDPR granularity requirements)
- Five+ categories (rejected: overcomplicated for our use case)

## 3. HeroUI v3 Component Patterns

### Decision: Modal-based Banner with Switch toggles

**Components to use**:

```tsx
// Banner principal
<Modal>
  <Modal.Container placement="bottom">
    <Modal.Dialog>...</Modal.Dialog>
  </Modal.Container>
</Modal>

// Preferencias granulares
<Switch>
  <Switch.Control><Switch.Thumb /></Switch.Control>
  <Label>Analytics cookies</Label>
</Switch>
```

**Rationale**:

- Modal provides accessibility (focus trap, ESC to close, ARIA)
- `placement="bottom"` for non-intrusive banner at bottom of screen
- Switch component perfect for on/off toggles per category
- HeroUI handles dark/light mode automatically

**Alternatives Considered**:

- Custom div-based banner (rejected: lacks accessibility features)
- Full-page modal (rejected: too intrusive for cookie consent)
- Alert component (rejected: not dismissable, not right semantic)

## 4. State Management Approach

### Decision: React Context + localStorage

```typescript
// CookieConsentContext.tsx
interface CookiePreferences {
  essential: true; // Always true, not editable
  analytics: boolean;
  advertising: boolean;
  consentDate: number;
  version: string;
}
```

**Storage Strategy**:

1. **localStorage**: Store full preferences object (fast, synchronous)
2. **Cookie**: Store minimal flag `kivi_consent=1` (for SSR detection)

**Rationale**:

- localStorage is synchronous = no flash of consent banner
- Cookie allows SSR to know if user has consented
- Context makes preferences accessible anywhere in the app

**Alternatives Considered**:

- Only cookies (rejected: 4KB limit, complex serialization)
- Only localStorage (rejected: not accessible in SSR)
- Zustand/Redux (rejected: overkill for simple boolean state)

## 5. Google Analytics Conditional Loading

### Decision: Modify GoogleAnalytics component to check consent

**Current code** (`google-analytics.tsx`):

```tsx
// Loads GA unconditionally in production
if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) {
  return null;
}
```

**New approach**:

```tsx
"use client";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function GoogleAnalytics() {
  const { preferences } = useCookieConsent();

  // Only load if analytics consent is given
  if (!preferences.analytics) {
    return null;
  }

  // ... existing GA code
}
```

**Rationale**:

- Simple boolean check before rendering Script tags
- No GA code loaded = no cookies set
- Consent changes require page refresh (acceptable for analytics)

## 6. Consent Cookie Expiration

### Decision: 12 months expiration

**Rationale**:

- GDPR doesn't specify exact duration, but recommends periodic renewal
- 12 months is industry standard (ICO, CNIL guidance)
- Shorter periods (6 months) are more GDPR-safe but worse UX
- Longer periods (24 months) may be challenged by regulators

**Implementation**:

```typescript
const CONSENT_EXPIRY_DAYS = 365;
const expiryDate = Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
```

## 7. Translation Keys Structure

### Decision: Flat keys under `cookies.*` namespace

```typescript
// lib/locales/{lang}/legal.ts
export const legal = {
  // Banner
  "cookies.banner.title": "We use cookies",
  "cookies.banner.description": "...",
  "cookies.banner.acceptAll": "Accept all",
  "cookies.banner.rejectNonEssential": "Reject non-essential",
  "cookies.banner.customize": "Customize",

  // Preferences modal
  "cookies.preferences.title": "Cookie preferences",
  "cookies.preferences.essential.title": "Essential",
  "cookies.preferences.essential.description": "...",
  "cookies.preferences.analytics.title": "Analytics",
  "cookies.preferences.analytics.description": "...",
  "cookies.preferences.advertising.title": "Advertising",
  "cookies.preferences.advertising.description": "...",
  "cookies.preferences.save": "Save preferences",

  // Policy page
  "cookies.policy.title": "Cookie Policy",
  "cookies.policy.intro": "...",
  // ... table content
};
```

**Rationale**:

- Follows existing flat key pattern in project
- Clear namespace separation from other legal translations
- Easy to maintain across 6 languages

## 8. Banner Positioning & UX

### Decision: Fixed bottom banner, non-blocking

**Design specs**:

- Position: Fixed bottom, full width on mobile, max-width on desktop
- Z-index: High enough to overlay content but below modals
- Animation: Slide up on appear, slide down on dismiss
- Blocking: NO - user can interact with site while banner is visible

**Rationale**:

- Bottom position is less intrusive than center modal
- Non-blocking allows users to explore site before deciding
- Fixed position ensures visibility during scroll

**Alternatives Considered**:

- Center modal (rejected: too intrusive, blocks content)
- Top banner (rejected: competes with navigation)
- Cookie wall (rejected: poor UX, may be illegal in some jurisdictions)

## 9. Dark/Light Mode Integration

### Decision: Use HeroUI semantic colors exclusively

**Classes to use**:

```tsx
// ✅ Correct
className = "bg-surface text-foreground border-border";

// ❌ Wrong
className = "bg-white dark:bg-gray-800 text-black dark:text-white";
```

**Rationale**:

- HeroUI semantic colors automatically adapt to theme
- Consistent with rest of KiviTools design system
- No manual dark: variants needed

## 10. Accessibility Requirements

### Decision: Full WCAG 2.1 AA compliance

**Requirements**:

- Focus trap in modal (HeroUI provides this)
- ESC key to close (HeroUI provides this)
- Tab navigation through all interactive elements
- ARIA labels on switches
- Sufficient color contrast (4.5:1 minimum)
- Screen reader announcements for state changes

**HeroUI provides**:

- Modal focus management
- Switch ARIA attributes
- Keyboard navigation
- Focus visible states

**We must add**:

- `aria-label` on switches without visible labels
- `role="alertdialog"` on banner (important info)
- Clear heading hierarchy

## Summary of Key Decisions

| Decision         | Choice                        | Key Reason             |
| ---------------- | ----------------------------- | ---------------------- |
| Consent approach | Explicit opt-in               | GDPR requirement       |
| Categories       | 3 (Essential, Analytics, Ads) | Industry standard      |
| UI Component     | HeroUI Modal + Switch         | Accessibility built-in |
| Storage          | localStorage + Cookie         | Fast + SSR support     |
| Expiration       | 12 months                     | GDPR guidance          |
| Position         | Fixed bottom                  | Non-intrusive UX       |
| Theme            | Semantic colors only          | Auto dark/light        |
