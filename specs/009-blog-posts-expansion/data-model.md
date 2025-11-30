# Data Model: Blog Posts Expansion

**Feature**: 009-blog-posts-expansion  
**Date**: 2025-11-30  
**Status**: Complete

## Entity: BlogPost (Extended)

### Current Interface

```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: number;
  platform: "tiktok" | "instagram" | "twitter" | "general";
  coverImage?: string;
  tags: string[];
  relatedTool?: {
    name: string;
    link: string;
    cta: string;
  };
}
```

### Extended Interface (New)

```typescript
interface BlogPost {
  // Existing fields
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: number;
  platform: Platform;
  coverImage?: string;
  tags: string[];
  relatedTool?: RelatedTool;

  // NEW: Bilingual support
  language: "es" | "en";
  alternateSlug?: string; // Slug of the same post in other language

  // NEW: Enhanced SEO
  metaTitle?: string; // Override for SEO title (<60 chars)
  metaDescription?: string; // Override for meta description (<160 chars)
  keywords: string[]; // Target keywords for SEO

  // NEW: Multiple CTAs
  secondaryTools?: RelatedTool[]; // Additional tools mentioned in post

  // NEW: Content freshness
  dateModified?: string; // Last update date for SEO
}

type Platform =
  | "tiktok"
  | "instagram"
  | "twitter"
  | "youtube"
  | "linkedin" // NEW
  | "twitch" // NEW
  | "reddit" // NEW
  | "spotify" // NEW
  | "general";

interface RelatedTool {
  name: string;
  link: string;
  cta: string;
}
```

### Field Descriptions

| Field             | Type            | Required | Description                               |
| ----------------- | --------------- | -------- | ----------------------------------------- |
| `language`        | `"es" \| "en"`  | Yes      | Content language                          |
| `alternateSlug`   | `string`        | No       | Link to same post in other language       |
| `metaTitle`       | `string`        | No       | SEO title override (max 60 chars)         |
| `metaDescription` | `string`        | No       | Meta description override (max 160 chars) |
| `keywords`        | `string[]`      | Yes      | 5-10 target keywords                      |
| `secondaryTools`  | `RelatedTool[]` | No       | Additional tools linked in content        |
| `dateModified`    | `string`        | No       | ISO date of last update                   |

### Validation Rules

1. **slug**: Must be URL-safe, lowercase, hyphenated
2. **title**: Max 100 characters
3. **metaTitle**: Max 60 characters (for SERP display)
4. **metaDescription**: Max 160 characters
5. **content**: Min 1,500 words (HTML stripped)
6. **keywords**: Array of 5-10 strings
7. **language**: Must be "es" or "en"
8. **alternateSlug**: Must reference existing post slug

### State Transitions

N/A - Static content, no state changes.

## Entity: RelatedPostsGrid (New Component)

### Props Interface

```typescript
interface RelatedPostsGridProps {
  currentSlug: string;
  platform: Platform;
  language: "es" | "en";
  maxPosts?: number; // Default: 3
}
```

### Behavior

1. Query all posts matching `language`
2. Filter by `platform` (prioritize same platform)
3. Exclude post with `currentSlug`
4. Sort by `date` descending
5. Return top `maxPosts` results

## URL Mapping

### Spanish Slugs (rewrites in next.config.ts)

| English Slug                     | Spanish Slug                       |
| -------------------------------- | ---------------------------------- |
| `twitter-growth-guide-2025`      | `guia-crecer-twitter-2025`         |
| `linkedin-profile-guide-2025`    | `guia-perfil-linkedin-2025`        |
| `twitch-streaming-guide-2025`    | `guia-empezar-twitch-2025`         |
| `reddit-front-page-guide-2025`   | `guia-reddit-portada-2025`         |
| `spotify-playlist-strategy-2025` | `estrategia-playlist-spotify-2025` |
| `content-calendar-guide-2025`    | `guia-calendario-contenido-2025`   |

## JSON-LD Schema

```typescript
interface ArticleJsonLd {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: {
    "@type": "Organization";
    name: "KiviTools";
    url: "https://kivitools.com";
  };
  publisher: {
    "@type": "Organization";
    name: "KiviTools";
    logo: {
      "@type": "ImageObject";
      url: "https://kivitools.com/logo.png";
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string; // Canonical URL
  };
  image: string;
  inLanguage: "es" | "en";
  keywords: string;
}
```

## Relationships

```
BlogPost (ES) <-----> BlogPost (EN)
    │                     │
    │ alternateSlug       │ alternateSlug
    └─────────────────────┘
           │
           ▼
    ┌─────────────┐
    │ RelatedTool │
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  Tool Page  │
    └─────────────┘
```
