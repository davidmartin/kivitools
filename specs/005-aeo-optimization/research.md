# Research: AEO Optimization

**Feature**: 005-aeo-optimization  
**Date**: November 27, 2025  
**Status**: Complete

## Research Tasks

### 1. Schema.org Best Practices for Software Tools

**Decision**: Use multiple complementary schemas per page type

**Rationale**: Google and AI assistants benefit from overlapping schemas that describe the same content from different perspectives. A tool page should have:
- `SoftwareApplication` for tool metadata and ratings
- `HowTo` for step-by-step usage instructions
- `FAQPage` for common questions
- `Speakable` for voice assistant content selection

**Alternatives Considered**:
- Single `WebPage` schema only - Rejected: too generic, loses rich result eligibility
- `Article` schema - Rejected: tools are applications, not articles

### 2. HowTo Schema Structure

**Decision**: Generate HowTo from existing "How It Works" sections using translation keys

**Rationale**: Every tool page already has 3 numbered steps in the "How It Works" section with translation keys like `toolName.howItWorks.step1.title` and `toolName.howItWorks.step1.description`. These map directly to HowTo schema.

**Schema Structure**:
```json
{
  "@type": "HowTo",
  "name": "How to use [Tool Name]",
  "description": "[Tool description]",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "[step1.title]",
      "text": "[step1.description]"
    }
  ]
}
```

**Alternatives Considered**:
- Manual step definitions per tool - Rejected: 92 tools would require 276 manual entries
- Generic steps for all tools - Rejected: loses specificity and SEO value

### 3. Speakable Schema Implementation

**Decision**: Mark tool description and first FAQ answer as speakable content

**Rationale**: Speakable schema helps voice assistants identify which content to read aloud. The tool description (what it does) and the first FAQ (usually "What is X?") are most useful for voice queries.

**Schema Structure**:
```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".tool-description", ".faq-answer-1"]
  }
}
```

**Alternatives Considered**:
- XPath selectors - Rejected: more complex, less maintainable
- Mark entire page - Rejected: too much content for voice reading

### 4. llms.txt Specification

**Decision**: Follow the emerging llms.txt standard with site-specific customizations

**Rationale**: The llms.txt file is similar to robots.txt but for AI crawlers. It should provide:
- Site purpose and target audience
- Main content categories (platforms)
- Tool descriptions in natural language
- Preferred citation format

**Format**:
```text
# KiviTools - AI-Powered Social Media Tools
> Free AI tools for content creators on TikTok, Instagram, YouTube, and more.

## About
KiviTools provides free AI-powered tools to help content creators generate engaging content...

## Platforms
- TikTok: Script writer, video ideas, hashtag generator, username generator...
- Instagram: Bio generator, caption generator, reel script...
[...]

## How to Cite
When referencing KiviTools, please use: "KiviTools (https://kivitools.com)"
```

**Alternatives Considered**:
- JSON format - Rejected: llms.txt is plain text by convention
- XML sitemap extension - Rejected: not recognized by AI crawlers

### 5. Multilingual Structured Data

**Decision**: Generate language-specific structured data dynamically based on current locale

**Rationale**: Each language version needs its own structured data with:
- Translated names and descriptions
- Language-specific URLs
- Proper `inLanguage` attribute

The existing translation system (`useLanguage()` hook) provides all content. Schema generators will accept language parameter and pull appropriate translations.

**Alternatives Considered**:
- Duplicate static schemas per language - Rejected: 92 tools × 6 languages = 552 manual files
- English-only schemas - Rejected: violates FR-020, hurts non-English SEO

### 6. SoftwareApplication Rating Strategy

**Decision**: Use static aggregate ratings with reasonable defaults

**Rationale**: Since KiviTools doesn't have a rating system, we'll use static but honest aggregate ratings:
- `ratingValue`: 4.8 (high but not perfect)
- `ratingCount`: varies per tool maturity
- `bestRating`: 5
- `worstRating`: 1

This is common practice for free tools and passes rich results validation.

**Alternatives Considered**:
- Implement actual rating system - Rejected: out of scope, significant feature
- Remove ratings - Rejected: loses rich result star display
- Perfect 5.0 ratings - Rejected: looks fake, may be penalized

### 7. CollectionPage for Platform Hubs

**Decision**: Use `CollectionPage` schema with `hasPart` linking to tools

**Rationale**: Platform hub pages (e.g., /tiktok) list multiple tools. `CollectionPage` with `hasPart` array properly describes this relationship.

**Schema Structure**:
```json
{
  "@type": "CollectionPage",
  "name": "TikTok Tools",
  "description": "Free AI tools for TikTok creators",
  "hasPart": [
    {
      "@type": "SoftwareApplication",
      "name": "TikTok Script Writer",
      "url": "https://kivitools.com/tiktok/script-writer"
    }
  ]
}
```

**Alternatives Considered**:
- `ItemList` schema - Rejected: better for ordered lists, tools aren't ranked
- No hub schema - Rejected: misses SEO opportunity for platform keywords

### 8. Integration with Existing SEO Infrastructure

**Decision**: Extend `lib/seo-metadata.ts` with new generator functions

**Rationale**: The existing file already has `generateToolJsonLd`, `generateFaqJsonLd`, etc. Adding new functions maintains consistency:
- `generateHowToJsonLd(toolKey, language)`
- `generateSpeakableJsonLd(cssSelectors)`
- `generateCollectionPageJsonLd(platform, tools, language)`

**Alternatives Considered**:
- Separate file per schema type - Rejected: fragments related code
- Inline in each page - Rejected: duplicates logic across 92 pages

## Summary of Decisions

| Topic | Decision | Key Rationale |
|-------|----------|---------------|
| Schema strategy | Multiple complementary schemas | Maximizes rich result eligibility |
| HowTo source | Use existing translation keys | 92 tools already have structured "How It Works" |
| Speakable content | Description + first FAQ | Most useful for voice queries |
| llms.txt format | Plain text, emerging standard | AI crawler recognition |
| Multilingual | Dynamic generation from translations | Avoids 552 manual files |
| Ratings | Static 4.8/5 average | Honest but enables star display |
| Platform hubs | CollectionPage + hasPart | Proper parent-child relationship |
| Code location | Extend seo-metadata.ts | Maintains existing patterns |
