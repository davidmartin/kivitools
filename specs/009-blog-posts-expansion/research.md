# Research: Blog Posts Expansion

**Feature**: 009-blog-posts-expansion  
**Date**: 2025-11-30  
**Status**: Complete

## Research Tasks Completed

### 1. Existing Blog Infrastructure Analysis

**Decision**: Extend existing `lib/blog-data.ts` pattern  
**Rationale**: The current infrastructure already supports:

- Static blog post data with HTML content
- Platform categorization
- Related tool CTAs
- Dynamic routing via `[slug]`

**Findings**:

- Current `BlogPost` interface needs extension for bilingual support
- Need to add `language` field and `alternateSlug` for hreflang
- Related posts logic needs to be added (currently not implemented)

### 2. SEO Best Practices for Bilingual Content

**Decision**: Use localized URL slugs with hreflang tags  
**Rationale**:

- Google recommends unique URLs per language
- hreflang tags tell search engines about language variants
- Same pattern already used for tools in `next.config.ts`

**Implementation Pattern**:

```typescript
// Spanish post
{ slug: "guia-crecer-twitter-2025", language: "es", alternateSlug: "twitter-growth-guide-2025" }

// English post
{ slug: "twitter-growth-guide-2025", language: "en", alternateSlug: "guia-crecer-twitter-2025" }
```

**Alternatives Rejected**:

- `/es/blog/` prefix: Requires restructuring entire routing, overkill for current scale
- Query params (`?lang=es`): Poor SEO, not indexed as separate pages

### 3. JSON-LD Article Schema Requirements

**Decision**: Add Article schema with BlogPosting type  
**Rationale**: Rich results in Google, better click-through rates

**Required Fields**:

- `@type`: "BlogPosting"
- `headline`: Post title (<110 chars)
- `description`: Post excerpt
- `author`: Organization or Person
- `datePublished`: ISO 8601 format
- `dateModified`: For freshness signals
- `publisher`: KiviTools organization
- `image`: Cover image or placeholder
- `inLanguage`: "es" or "en"
- `mainEntityOfPage`: Canonical URL

### 4. Related Posts Algorithm

**Decision**: Filter by platform + language, show 3 cards  
**Rationale**: Users reading about Twitter want more Twitter content in same language

**Algorithm**:

1. Filter posts by same `language`
2. Prioritize same `platform`
3. Exclude current post
4. Return top 3 by date

### 5. CTA Placement Strategy

**Decision**: Three CTAs per post (intro, mid, end)  
**Rationale**: Research shows mid-article CTAs have highest conversion

**Implementation**:

1. **Intro CTA**: Subtle text link after first section (e.g., "¿Quieres automatizarlo? Prueba nuestro [Tool Name]")
2. **Mid CTA**: Contextual mention when discussing the problem the tool solves
3. **End CTA**: Prominent card with button (existing `relatedTool` pattern)

### 6. Content Tone Guidelines

**Decision**: Informal, witty, relatable Spanish (LATAM focus)  
**Rationale**: KiviTools brand voice, target audience is young creators

**Writing Rules**:

- Use "tú" form (not "usted")
- Include humor and self-deprecation
- Reference real creator struggles
- Avoid corporate buzzwords
- Use emojis sparingly (1-2 per section max)

### 7. Keyword Distribution Strategy

**Decision**: 5-10 keywords naturally distributed  
**Rationale**: Google penalizes keyword stuffing, rewards natural usage

**Distribution Pattern**:

- Title: Primary keyword
- H2s: Secondary keywords
- First paragraph: Primary keyword
- Body: Long-tail variations
- Meta description: Primary + secondary

## Blog Post Topics - Final List

| #   | Topic (ES)                                          | Topic (EN)                                          | Primary Tool                       | Secondary Tools                                      |
| --- | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| 1   | Guía completa para crecer en Twitter/X en 2025      | Complete Guide to Growing on Twitter/X in 2025      | /twitter/thread-maker              | /twitter/tweet-generator, /twitter/bio-generator     |
| 2   | Cómo crear un perfil de LinkedIn irresistible       | How to Create an Irresistible LinkedIn Profile      | /linkedin/headline-generator       | /linkedin/about-generator, /linkedin/post-generator  |
| 3   | Guía completa para empezar en Twitch como streamer  | Complete Twitch Streaming Setup Guide for Beginners | /twitch/stream-title               | /twitch/bio-generator, /twitch/panel-description     |
| 4   | Cómo escribir posts de Reddit que lleguen a portada | How to Write Reddit Posts That Reach the Front Page | /reddit/post-generator             | /reddit/comment-generator, /reddit/ama-questions     |
| 5   | Estrategia de playlists en Spotify para artistas    | Spotify Playlist Strategy for Artists               | /spotify/playlist-name             | /spotify/playlist-description, /spotify/artist-bio   |
| 6   | Guía de calendario de contenido para redes sociales | Content Calendar Guide for Social Media Creators    | /tiktok/content-calendar-generator | /instagram/content-calendar, Multiple platform tools |

## Technical Decisions Summary

| Area              | Decision                            | Pattern/Reference             |
| ----------------- | ----------------------------------- | ----------------------------- |
| Data storage      | Extend `lib/blog-data.ts`           | Existing pattern              |
| URL routing       | Localized slugs via rewrites        | `next.config.ts` pattern      |
| SEO metadata      | JSON-LD Article + hreflang          | `lib/seo-metadata.ts` pattern |
| Related posts     | Platform + language filter, 3 cards | New component needed          |
| Content structure | HTML in `content` field             | Existing pattern              |

## Open Questions - Resolved

All technical questions resolved. Ready for Phase 1 design.
