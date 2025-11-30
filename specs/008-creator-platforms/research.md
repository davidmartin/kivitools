# Research: Creator & Commerce Platforms

**Feature**: 008-creator-platforms  
**Date**: November 30, 2025  
**Status**: Complete

## Platform-Specific Research

### Medium

**Character Limits & Formatting**:

- Bio: 160 characters max
- Article titles: No hard limit, but 60-70 chars optimal for SEO
- Article body: No limit, but 7-10 min read time (1,400-2,100 words) performs best
- Supports Markdown formatting

**Platform Vocabulary**:

- "Claps" (likes), "Responses" (comments), "Publication" (group blog)
- "Member" (paid subscriber), "Follower" (free subscriber)

**SEO Best Practices**:

- Headlines with numbers and "How to" perform well
- First 150 characters appear in previews
- Tags (up to 5) improve discoverability

**Decision**: Focus on headline optimization and hook paragraphs (first 100-200 words) as these directly impact engagement metrics.

---

### Etsy

**Character Limits & Formatting**:

- Product title: 140 characters max (first 40-50 most important for search)
- Product description: 10,000 characters max
- Shop announcement: 5,000 characters max
- Shop title: 55 characters max

**SEO Requirements**:

- Front-load keywords in title
- Include long-tail keywords (e.g., "handmade silver earrings for women" not just "earrings")
- Categories: jewelry, clothing, home, art, craft supplies, vintage, digital downloads

**Platform Vocabulary**:

- "Listing" (product), "Shop" (store), "Favorites" (likes)
- "Star seller" (top-rated seller badge)

**Decision**: Generate SEO-first titles with keyword density, structured descriptions with sections (Features, Materials, Dimensions, Care Instructions).

---

### OnlyFans

**Character Limits & Formatting**:

- Bio: 1,000 characters max
- Post captions: 1,000 characters max
- Username: 4-30 characters

**Content Guidelines (SFW Marketing)**:

- Promotional content must be platform-safe (no explicit language)
- Focus on personality, exclusivity, and value proposition
- Cross-platform promo must comply with Twitter/Instagram/TikTok/Reddit ToS

**Platform Vocabulary**:

- "Subscribers" (paying members), "Tips" (additional payments)
- "PPV" (pay-per-view content), "Bundles" (discounted subscriptions)

**Decision**: Generate SFW marketing content only. Focus on personality-driven bios, engagement-focused captions, and platform-safe promotional text.

---

### Patreon

**Character Limits & Formatting**:

- About page: Unlimited (recommended 500-1,500 words)
- Tier name: 24 characters max
- Tier description: 500 characters max
- Post title: 100 characters max
- Post body: Unlimited

**Tier Structure Best Practices**:

- 3-5 tiers optimal (too many overwhelms potential patrons)
- Price anchoring: Free, $3-5, $10-15, $25+ tiers common
- Clear value escalation between tiers

**Platform Vocabulary**:

- "Patrons" (subscribers), "Creator" (user running page)
- "Tiers" (membership levels), "Benefits" (perks)
- "Goals" (funding milestones)

**Decision**: Generate 3-tier structure by default with escalating value. About pages should tell a story and explain "why support me."

---

## Technology Decisions

### DeepSeek Prompt Engineering

**Decision**: Use platform-specific system prompts that include:

1. Character limit enforcement
2. Platform-specific vocabulary
3. Content guidelines (especially SFW for OnlyFans)
4. Output format requirements

**Rationale**: DeepSeek performs better with explicit constraints in the system message rather than hoping the model self-limits.

**Alternatives Considered**:

- Post-processing truncation: Rejected because it can cut mid-sentence
- Multiple API calls for validation: Rejected due to latency impact

### Platform Colors & Icons

| Platform | Primary Color    | Tailwind Class | Icon |
| -------- | ---------------- | -------------- | ---- |
| Medium   | #000000 (Black)  | `black`        | 📝   |
| Etsy     | #F56400 (Orange) | `orange`       | 🛍️   |
| OnlyFans | #00AFF0 (Blue)   | `cyan`         | 💎   |
| Patreon  | #FF424D (Red)    | `red`          | ❤️   |

**Decision**: Use these colors consistently across hub pages, tool headers, and navigation.

### Spanish URL Aliases

| English                               | Spanish                                    |
| ------------------------------------- | ------------------------------------------ |
| `/medium/article-title-generator`     | `/medium/generador-titulos-articulos`      |
| `/medium/article-intro-generator`     | `/medium/generador-introduccion-articulos` |
| `/medium/bio-generator`               | `/medium/generador-bio`                    |
| `/etsy/product-title-generator`       | `/etsy/generador-titulos-productos`        |
| `/etsy/product-description-generator` | `/etsy/generador-descripcion-productos`    |
| `/etsy/shop-announcement-generator`   | `/etsy/generador-anuncio-tienda`           |
| `/onlyfans/bio-generator`             | `/onlyfans/generador-bio`                  |
| `/onlyfans/post-caption-generator`    | `/onlyfans/generador-subtitulos`           |
| `/onlyfans/promo-generator`           | `/onlyfans/generador-promociones`          |
| `/patreon/tier-description-generator` | `/patreon/generador-descripcion-niveles`   |
| `/patreon/about-page-generator`       | `/patreon/generador-pagina-sobre-mi`       |
| `/patreon/post-generator`             | `/patreon/generador-publicaciones`         |

**Decision**: Follow existing naming patterns from RUTAS_ALIAS.md for consistency.

---

## Integration Points

### Home Page Updates

**Decision**: Add 4 new platforms to the `platforms` array in `app/page.tsx`:

```typescript
{
  name: "Medium",
  description: t("medium.page.description"),
  href: "/medium",
  icon: "📝",
  color: "black",
},
{
  name: "Etsy",
  description: t("etsy.page.description"),
  href: "/etsy",
  icon: "🛍️",
  color: "orange",
},
{
  name: "OnlyFans",
  description: t("onlyfans.page.description"),
  href: "/onlyfans",
  icon: "💎",
  color: "cyan",
},
{
  name: "Patreon",
  description: t("patreon.page.description"),
  href: "/patreon",
  icon: "❤️",
  color: "red",
},
```

**Stats Update**: Update the platforms count in the stats section from "9" to reflect actual number of platforms.

### Navigation Updates

**Decision**: Add platform entries to navigation.tsx with tools arrays following existing pattern.

### SEO Metadata Updates

**Decision**: Add to `lib/seo-metadata.ts`:

- Platform type union: `"medium" | "etsy" | "onlyfans" | "patreon"`
- Platform colors: `medium: "#000000"`, `etsy: "#F56400"`, `onlyfans: "#00AFF0"`, `patreon: "#FF424D"`
- Platform names: `medium: "Medium"`, `etsy: "Etsy"`, `onlyfans: "OnlyFans"`, `patreon: "Patreon"`

---

## Resolved Clarifications

| Item                    | Resolution                                        |
| ----------------------- | ------------------------------------------------- |
| Medium character limits | Bio: 160 chars, titles: ~70 optimal               |
| Etsy SEO requirements   | Front-load keywords, include materials/dimensions |
| OnlyFans content safety | SFW marketing only, no explicit language          |
| Patreon tier count      | 3 tiers default, escalating value                 |
| Platform colors         | Black, Orange, Cyan, Red respectively             |
| Spanish URL patterns    | Follow existing RUTAS_ALIAS.md conventions        |

---

## Risk Assessment

| Risk                        | Mitigation                                   |
| --------------------------- | -------------------------------------------- |
| OnlyFans content moderation | Strict SFW prompts, content filtering in API |
| Etsy SEO algorithm changes  | Focus on evergreen best practices            |
| Platform ToS compliance     | Review ToS quarterly, add disclaimers        |
| Logo trademark issues       | Use simple, non-trademarked representations  |

All research items resolved. Ready for Phase 1 design.
