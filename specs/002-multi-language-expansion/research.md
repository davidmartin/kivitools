# Research: Multi-Language Expansion

**Feature**: 002-multi-language-expansion  
**Date**: 2025-11-26  
**Purpose**: Resolve all technical unknowns before implementation

## Research Tasks

### 1. Next.js i18n Best Practices

**Question**: What's the best approach for multi-language support in Next.js 16 App Router?

**Research Findings**:

- Next.js App Router supports i18n via middleware-based routing or URL-based routing
- For SEO, language-prefixed URLs (`/pt/`, `/fr/`) are recommended over cookies/headers alone
- Current KiviTools approach uses client-side language switching with localStorage persistence
- No server-side i18n needed since all content is client-rendered

**Decision**: Keep client-side approach with localStorage, add URL prefixes for SEO via `next.config.ts` rewrites

**Rationale**:

- Simpler implementation (no middleware changes)
- SEO benefits from language-prefixed URLs
- Users can still switch languages on any page without navigation

**Alternatives Rejected**:

- Full i18n middleware routing: Too complex for current needs, would require major refactoring
- next-intl library: Overkill for current flat translation structure

---

### 2. Translation File Structure

**Question**: How should 92× translation files be organized for 6 languages?

**Research Findings**:
Current structure (`lib/locales/{en,es}/`):

```
lib/locales/en/
├── index.ts          (aggregates all exports)
├── common.ts         (nav, footer, shared UI)
├── home.ts           (homepage)
├── platforms.ts      (platform hub pages)
├── legal.ts          (legal pages)
├── blog.ts           (blog pages)
├── contact.ts        (contact page)
├── builder.ts        (tool builder)
├── dashboard.ts      (user dashboard)
├── admin.ts          (admin panel)
└── tools/
    ├── tiktok/
    │   ├── index.ts
    │   ├── script-writer.ts
    │   └── ... (20+ tool files)
    ├── instagram/
    │   ├── index.ts
    │   └── ... (tool files)
    └── ... (16 platforms total)
```

**Decision**: Replicate exact structure for `pt/`, `fr/`, `de/`, `it/`

**Rationale**:

- Consistency with existing pattern
- Easy to verify completeness (file count match)
- Modular structure allows lazy loading per platform

**Alternatives Rejected**:

- Single file per language: Would be ~10k+ lines, unmaintainable
- JSON instead of TypeScript: Loses type safety and IDE autocomplete

---

### 3. Language Selector UI Component

**Question**: How to implement a 6-language selector that's accessible and HeroUI-compliant?

**Research Findings**:

- Current implementation: Toggle button switching between EN/ES only
- HeroUI v3 provides `<Select>` component with Popover
- Mobile consideration: Select works well on touch devices
- Accessibility: Native select provides keyboard navigation

**Decision**: Use HeroUI `<Select>` component with language flags/codes

**Rationale**:

- HeroUI-compliant (Constitution Principle I)
- Better UX than cascading menus
- Works on mobile with native picker

**UI Design**:

```tsx
<Select
  aria-label="Select language"
  selectedKeys={[language]}
  onSelectionChange={(keys) => setLanguage(Array.from(keys)[0] as Language)}
>
  <Select.Trigger className="min-w-[80px]">
    <Select.Value>{languageLabels[language]}</Select.Value>
  </Select.Trigger>
  <Select.Content>
    {UI_LANGUAGES.map((lang) => (
      <Select.Item key={lang.code} textValue={lang.name}>
        {lang.flag} {lang.code.toUpperCase()}
      </Select.Item>
    ))}
  </Select.Content>
</Select>
```

**Alternatives Rejected**:

- Popover menu: Less accessible than native Select
- Flag icons only: Poor accessibility for screen readers

---

### 4. Browser Language Detection

**Question**: How to properly detect and default to user's browser language?

**Research Findings**:

- Current implementation uses `navigator.language` with fallback to EN
- `navigator.languages` provides priority list
- Need to handle partial matches (e.g., `pt-BR` → `pt`)

**Decision**: Extend current detection to support 6 languages with region fallback

**Implementation**:

```typescript
const getBrowserLanguage = (): Language => {
  const supported = ["en", "es", "pt", "fr", "de", "it"];
  const browserLangs = navigator.languages || [navigator.language || "en"];

  for (const browserLang of browserLangs) {
    const lang = browserLang.toLowerCase().split("-")[0];
    if (supported.includes(lang)) {
      return lang as Language;
    }
  }
  return "en"; // Default fallback
};
```

**Rationale**: Covers regional variants (pt-BR, fr-CA, de-AT) while mapping to base language

---

### 5. SEO URL Structure

**Question**: How to implement language-prefixed URLs without breaking existing routes?

**Research Findings**:

- Current: Tools at `/tiktok/script-writer`, Spanish alias at `/tiktok/escritor-guiones`
- Need: `/pt/tiktok/script-writer`, `/fr/tiktok/script-writer`, etc.
- `next.config.ts` rewrites can handle this without page duplication

**Decision**: Add rewrites for `/pt/`, `/fr/`, `/de/`, `/it/` prefixes

**Implementation** (next.config.ts):

```typescript
async rewrites() {
  return [
    // Existing Spanish aliases...

    // Language prefix rewrites (same page, different URL for SEO)
    { source: '/pt/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/:path*' },
    { source: '/de/:path*', destination: '/:path*' },
    { source: '/it/:path*', destination: '/:path*' },
  ];
}
```

**Note**: The language prefix in URL should also set the initial language in LanguageContext

**Rationale**:

- No page duplication needed
- Google sees different URLs for each language (hreflang tags)
- Same component serves all languages

**Alternatives Rejected**:

- Separate pages per language: Massive code duplication
- Subdomains (pt.kivitools.com): More complex DNS/hosting setup

---

### 6. Translation Generation Strategy

**Question**: How to efficiently generate translations for 92 files × 4 new languages?

**Research Findings**:

- Manual translation: ~368 files would take weeks
- AI translation (DeepSeek/GPT): Fast but needs review
- Current tone requirement: "comedic, fun, lighthearted"

**Decision**: Use AI-assisted translation with human review for high-traffic pages

**Strategy**:

1. **Phase 1 (Core UI)**: Translate `common.ts`, `home.ts`, `platforms.ts` first
2. **Phase 2 (High-traffic tools)**: TikTok, Instagram, YouTube tools
3. **Phase 3 (Remaining)**: Other platforms alphabetically
4. **Review**: Native speaker review for P1 languages (PT, FR)

**Quality Control**:

- Maintain comedic tone in translations
- Use formal forms where appropriate (DE: "Sie", not "du")
- Preserve emoji usage from English source
- Verify character counts don't break UI layouts

---

### 7. Bundle Size Impact

**Question**: Will 6 language bundles significantly impact performance?

**Research Findings**:

- Current: EN (~50KB) + ES (~50KB) loaded together
- Each language adds ~50KB of translation strings
- Total: ~300KB for all 6 languages

**Decision**: Accept bundle size increase, monitor Core Web Vitals

**Mitigation**:

- Translations are static, highly compressible (gzip)
- Only load active language at runtime (lazy loading possible future enhancement)
- Current approach loads all languages (simple, no additional requests)

**Rationale**: 300KB gzipped is acceptable for modern connections. Future optimization can implement code-splitting per language if needed.

---

## Summary of Decisions

| Topic                  | Decision                   | Impact                            |
| ---------------------- | -------------------------- | --------------------------------- |
| i18n Approach          | Client-side + URL prefixes | Keep existing pattern, add SEO    |
| File Structure         | Replicate exact structure  | 92 files × 4 new langs            |
| Language Selector      | HeroUI Select component    | Replace toggle button             |
| Browser Detection      | Extended 6-lang detection  | Better UX for new users           |
| URL Structure          | Rewrites in next.config.ts | SEO without page duplication      |
| Translation Generation | AI-assisted + review       | Fast but quality-controlled       |
| Bundle Size            | Accept ~300KB total        | Monitor, optimize later if needed |

## Open Questions for Implementation

1. Should we add a translation completeness indicator in dev mode?
2. Do we need language-specific fonts (no, Latin alphabet for all 6)?
3. Should URLs auto-redirect based on browser language? (Decided: No, use hreflang)
