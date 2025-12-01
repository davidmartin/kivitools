# Data Model: DeepSeek Blog SEO Content

**Feature**: 015-deepseek-blog-seo  
**Date**: 2025-01-20

## Entity: BlogPost

The blog system uses a static array of `BlogPost` objects in `lib/blog-data.ts`. No database storage is involved.

### Schema

```typescript
interface BlogPost {
  // Core fields (required)
  slug: string; // URL path: "que-es-deepseek-guia-completa"
  title: string; // "¿Qué es DeepSeek? La Guía Completa 2025"
  excerpt: string; // Short description for cards
  content: string; // Full HTML article content
  date: string; // "2025-01-20" (YYYY-MM-DD)
  author: string; // "Equipo KiviTools" | "KiviTools Team"
  readTime: number; // Estimated minutes to read
  platform: Platform; // "general" for cross-platform content
  language: "es" | "en"; // Content language
  keywords: string[]; // SEO target keywords
  tags: string[]; // Display categorization tags
  relatedTool: RelatedTool; // Primary CTA tool

  // SEO fields (optional but recommended)
  alternateSlug?: string; // Slug of same post in other language
  metaTitle?: string; // SEO title (<60 chars)
  metaDescription?: string; // Meta description (<160 chars)
  secondaryTools?: RelatedTool[]; // Additional tool CTAs
  dateModified?: string; // Last update date
  coverImage?: string; // Cover image path
}

interface RelatedTool {
  name: string; // "Generador de Scripts para TikTok"
  link: string; // "/tiktok/script-writer"
  cta: string; // "Crear Guión Gratis"
}

type Platform =
  | "tiktok"
  | "instagram"
  | "twitter"
  | "youtube"
  | "linkedin"
  | "twitch"
  | "reddit"
  | "spotify"
  | "general";
```

### Relationships

```
BlogPost (1) ──────────────── (1) RelatedTool     [primary CTA]
BlogPost (1) ──────────────── (0..*) RelatedTool  [secondary CTAs]
BlogPost (1) ── alternateSlug ── (0..1) BlogPost  [bilingual pair]
```

### Validation Rules

| Field             | Rule                                       |
| ----------------- | ------------------------------------------ |
| `slug`            | Unique, kebab-case, no special characters  |
| `title`           | Non-empty, reasonable length (<100 chars)  |
| `date`            | Valid ISO date format                      |
| `language`        | Must be "es" or "en"                       |
| `platform`        | Must match Platform type                   |
| `metaTitle`       | If provided, must be <60 chars             |
| `metaDescription` | If provided, must be <160 chars            |
| `alternateSlug`   | If provided, must exist in blogPosts array |

## Blog Post Content Plan

### Tier 1: High Priority (P1)

| #   | ES Slug                              | EN Slug                             | Platform | relatedTool                  |
| --- | ------------------------------------ | ----------------------------------- | -------- | ---------------------------- |
| 1   | que-es-deepseek-guia-completa        | what-is-deepseek-complete-guide     | general  | /tiktok/script-writer        |
| 2   | deepseek-vs-chatgpt-comparativa-2025 | deepseek-vs-chatgpt-comparison-2025 | general  | /tiktok/video-ideas          |
| 3   | como-usar-deepseek-redes-sociales    | how-to-use-deepseek-social-media    | general  | /instagram/caption-generator |

### Tier 2: Platform-Specific (P2)

| #   | ES Slug                      | EN Slug                      | Platform  | relatedTool                  |
| --- | ---------------------------- | ---------------------------- | --------- | ---------------------------- |
| 4   | deepseek-para-tiktok-guia    | deepseek-for-tiktok-guide    | tiktok    | /tiktok/script-writer        |
| 5   | deepseek-para-instagram-guia | deepseek-for-instagram-guide | instagram | /instagram/caption-generator |
| 6   | deepseek-para-youtube-guia   | deepseek-for-youtube-guide   | youtube   | /youtube/title-generator     |
| 7   | deepseek-para-twitter-guia   | deepseek-for-twitter-guide   | twitter   | /twitter/thread-maker        |

### Tier 3: Long-Tail SEO (P3)

| #   | ES Slug                     | EN Slug                 | Platform | relatedTool           |
| --- | --------------------------- | ----------------------- | -------- | --------------------- |
| 8   | herramientas-ia-gratis-2025 | free-ai-tools-2025      | general  | /about/technology     |
| 9   | deepseek-para-musica-suno   | deepseek-for-music-suno | general  | /suno/lyric-generator |

## State Transitions

N/A - Blog posts are static content with no state changes.

## Data Migration

N/A - Content is added directly to source code. No database migration needed.
