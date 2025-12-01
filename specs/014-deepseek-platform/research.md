# Research: DeepSeek Branding & SEO

**Feature**: 014-deepseek-platform  
**Date**: December 1, 2025  
**Pivot Note**: Simplified from "DeepSeek tools platform" to "Powered by branding"

## Research Summary

Minimal research needed - this is a branding/marketing initiative using existing patterns.

## Decision Log

### D1: Badge Placement

**Decision**: Place "Powered by DeepSeek" badge in footer (not header)

**Rationale**:

- Footer appears on ALL pages without cluttering navigation
- Matches industry standard for "powered by" badges
- Non-intrusive but always visible
- Easy to implement in single component

### D2: Logo Usage

**Decision**: Create simple DeepSeek wordmark/icon SVG for badge

**Rationale**:

- DeepSeek's brand color is blue (#4F6CFF)
- Use text-based logo or simple icon (not official logo to avoid trademark issues)
- Keep it small and subtle

### D3: Technology Page Location

**Decision**: Place at `/about/technology` (alias: `/sobre/tecnologia`)

**Rationale**:

- Groups with other "about" pages (if they exist)
- Clear, professional URL structure
- Good for SEO ("technology" is searchable)

### D4: SEO Keywords

**Decision**: Target these long-tail keywords:

- "ai tools powered by deepseek"
- "tools using deepseek api"
- "deepseek powered applications"
- "herramientas que usan deepseek"
- "aplicaciones con deepseek"

**Rationale**:

- Long-tail = less competition
- Users searching these WANT to use DeepSeek-powered tools
- Factual claims (we DO use DeepSeek)

**⚠️ Note**: These keywords haven't been validated with Google Trends or keyword research tools. Given the low implementation effort, we accept this risk.

### D5: Schema.org Markup

**Decision**: Use SoftwareApplication schema with "dependencies" mentioning DeepSeek

```json
{
  "@type": "SoftwareApplication",
  "name": "KiviTools",
  "applicationCategory": "UtilitiesApplication",
  "description": "AI-powered tools for content creators",
  "operatingSystem": "Web",
  "softwareRequirements": "DeepSeek AI API"
}
```

**Rationale**: Proper structured data helps Google understand the technology relationship.

## Technical Patterns

| Component            | Source Reference                      |
| -------------------- | ------------------------------------- |
| Footer component     | `app/components/footer.tsx`           |
| Legal page structure | `app/(legal)/privacy-policy/page.tsx` |
| Translations         | `lib/locales/en/common.ts`            |
| URL rewrites         | `next.config.ts`                      |

## No Outstanding Questions

Ready for implementation.
