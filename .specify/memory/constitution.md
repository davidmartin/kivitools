<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (new document)
  Added sections:
    - Core Principles (5 principles)
    - Performance Standards
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ (Constitution Check section exists)
    - .specify/templates/spec-template.md ✅ (compatible with principles)
    - .specify/templates/tasks-template.md ✅ (compatible with principles)
  Follow-up TODOs: None
  ============================================================================
-->

# KiviTools Constitution

## Core Principles

### I. HeroUI-First Component Architecture

All user interface elements MUST use HeroUI v3 Beta components (`@heroui/react`) instead of native
HTML elements. This ensures consistent styling, accessibility, and dark mode support across the
entire application.

**Non-negotiable rules:**

- Use `<Button>` not `<button>`, `<Input>` not `<input>`, `<Card>` not `<div className="card">`
- Button events MUST use `onPress` handler, NEVER `onClick`
- Import components from `@heroui/react`: `import { Button, Card, Input } from "@heroui/react";`
- Use compound component patterns: `<Card><Card.Header><Card.Title>...</Card.Title></Card.Header></Card>`
- Use HeroUI semantic color classes (`text-foreground`, `bg-surface`, `text-muted`) for theme support

**Rationale:** HeroUI provides built-in accessibility (ARIA), keyboard navigation, and automatic
light/dark mode theming. Mixing native elements breaks visual consistency and accessibility
compliance (WCAG 2.1 Level AA).

### II. Translation-Mandatory Content (NON-NEGOTIABLE)

Every user-facing text string MUST use the translation system via `useLanguage()` hook. Hardcoded
strings in English or Spanish are forbidden.

**Non-negotiable rules:**

- Client components MUST include `"use client"` directive and import `useLanguage`
- Access translations via `const { t } = useLanguage();` and `{t("key.name")}`
- Translation keys MUST exist in BOTH `es` and `en` sections in `lib/translations.ts`
- Use flat key structure with dot notation: `"nav.title"`, `"home.hero.title"`
- All translations MUST follow comedic/fun tone guidelines (no corporate-speak)

**Rationale:** KiviTools targets Spanish and English audiences equally. Missing translations create
a broken experience for 50% of users. The tone requirement differentiates the product from
corporate competitors.

### III. Tool Page Completeness Standard

Every tool page MUST include all 8 mandatory sections in order. Incomplete tool pages MUST NOT
be deployed to production.

**Mandatory sections (in order):**

1. Header Section (badge, title, description)
2. Form Section (inputs with HeroUI components)
3. Results Section (generated content with copy functionality)
4. Features Section (4 cards in 2x2 grid)
5. Hero Description Section (full explanation)
6. How It Works Section (3 numbered steps)
7. FAQ Section (5 questions and answers)
8. Related Tools Section (grid of links)

**Non-negotiable rules:**

- All 8 sections MUST be present before tool is considered complete
- Each section MUST use translations (no hardcoded text)
- FAQ JSON-LD schema MUST be included for SEO
- Spanish URL alias MUST be configured in `next.config.ts`
- Turnstile bot verification MUST be integrated
- Tool MUST be manually tested on both English and Spanish URLs before completion

**Rationale:** Incomplete tool pages harm SEO ranking, user trust, and conversion. The FAQ section
provides essential structured data for search engines.

### IV. Performance Budget Enforcement

API responses and page loads MUST meet defined performance thresholds. Violations block production
deployment.

**Non-negotiable thresholds:**

- API response time: < 2 seconds for 95th percentile requests
- First Contentful Paint (FCP): < 1.5 seconds
- Time to Interactive (TTI): < 3.5 seconds
- Cumulative Layout Shift (CLS): < 0.1
- Lighthouse Performance Score: 90+ minimum
- AI content generation: < 5 seconds

**Non-negotiable rules:**

- Server-side rendering (SSR) required for all tool pages (SEO)
- API keys MUST remain server-side only (never exposed to client)
- Images MUST be optimized via `npm run optimize:images` before commit
- No blocking requests in critical render path

**Rationale:** Performance directly impacts user retention and SEO ranking. Google Core Web Vitals
are a ranking factor. Slow tools lose users to competitors.

### V. Platform Integration Completeness

Adding a new platform MUST update all 10 integration points. Partial platform additions are
forbidden.

**10 mandatory integration points:**

1. Platform hub page (`app/(tools)/[platform]/page.tsx`)
2. Navigation header (`app/components/navigation.tsx`)
3. Translations (`lib/translations.ts`) - including `nav.[platform]` key
4. SEO metadata (`lib/seo-metadata.ts`)
5. Tool selector (`app/components/tool-selector.tsx`)
6. Platform logo (`app/components/platform-logo.tsx` + `/public/platforms/` SVG)
7. Home page (`app/page.tsx` - platforms array)
8. Spanish URL rewrites (`next.config.ts`)
9. Routes documentation (`docs/RUTAS_ALIAS.md`)
10. PRD update (`PRD.md`)

**Non-negotiable rules:**

- All 10 points MUST be updated in a single commit/PR
- Navigation MUST include `nav.[platform]` translation key
- Platform logo SVG MUST exist in `/public/platforms/`
- Home page platforms array MUST include the new platform

**Rationale:** Partial integrations create broken navigation, missing SEO, and confused users.
The checklist exists because steps 3, 6, and 7 are frequently forgotten.

## Performance Standards

### API Security Requirements

- HTTPS enforced on all endpoints
- Rate limiting: 100 requests/hour per anonymous IP
- Turnstile bot verification MUST be integrated on all generation forms
- Input sanitization required to prevent XSS/injection attacks
- CORS properly configured for production domain only
- API keys MUST be stored in `.env.local`, never committed to repository

### Accessibility Requirements

- WCAG 2.1 Level AA compliance mandatory
- Full keyboard navigation support
- Screen reader compatibility verified
- Color contrast ratio minimum 4.5:1
- ARIA labels on all interactive elements
- HeroUI components automatically provide most accessibility features

### Style Requirements

- Tailwind CSS v4 syntax required (`bg-linear-to-br` not `bg-gradient-to-br`)
- NEVER use gradients for backgrounds (solid colors only per design rule)
- Dark mode variants required for all custom color classes
- Platform-specific colors defined per platform (purple for TikTok, pink for Instagram, etc.)

## Development Workflow

### Pre-Commit Checklist

Before committing any tool or feature:

1. [ ] All text uses translation system (no hardcoded strings)
2. [ ] Translation keys exist in both `es` and `en`
3. [ ] Language switcher tested (🇺🇸/🇪🇸 button works)
4. [ ] Dark mode toggle tested
5. [ ] Mobile responsive design verified
6. [ ] Turnstile verification integrated (for tools)
7. [ ] No TypeScript errors
8. [ ] No console errors in browser
9. [ ] Lighthouse scores meet thresholds (90+)

### Tool Creation Protocol

New tools MUST follow this sequence:

1. Create API route with Turnstile verification
2. Add DeepSeek function with appropriate prompt
3. Create page component with all 8 sections
4. Add all translations (ES and EN)
5. Configure Spanish URL alias
6. Add to platform page tools array
7. Update navigation if appropriate
8. Document in `RUTAS_ALIAS.md`
9. Update PRD.md status
10. **Test manually on both URLs** before marking complete

### Documentation Updates

- PRD.md MUST be updated after every significant feature completion
- `RUTAS_ALIAS.md` MUST document all URL aliases
- README.md MUST reflect current feature set

## Governance

This constitution supersedes all other development practices for KiviTools. All code contributions
MUST verify compliance with these principles before merge.

**Amendment process:**

1. Propose amendment with rationale in writing
2. Document impact on existing code
3. Update constitution version following semantic versioning:
   - MAJOR: Principle removal or backward-incompatible redefinition
   - MINOR: New principle or material expansion
   - PATCH: Clarifications, wording improvements
4. Update any affected templates in `.specify/templates/`

**Compliance verification:**

- All PRs MUST include constitution compliance check
- Violations MUST be resolved before merge
- Complexity additions MUST be justified in PR description

**Runtime guidance:** Refer to `.github/copilot-instructions.md` for detailed implementation
patterns and examples.

**Version**: 1.0.0 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-11-25
