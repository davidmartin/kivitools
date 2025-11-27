# Data Model: AEO Optimization

**Feature**: 005-aeo-optimization  
**Date**: November 27, 2025  
**Status**: Complete

## Overview

This document defines the structured data schemas used for AEO. All schemas follow Schema.org vocabulary and are rendered as JSON-LD in page `<head>` sections.

## Entity: Tool Page Schemas

A tool page (e.g., `/tiktok/script-writer`) requires 4 schema types:

### 1. SoftwareApplication

**Purpose**: Describes the tool as a software application for rich results.

| Field                       | Type   | Source                                  | Required |
| --------------------------- | ------ | --------------------------------------- | -------- |
| @type                       | string | "SoftwareApplication"                   | Yes      |
| name                        | string | Translation: `{toolKey}.title`          | Yes      |
| description                 | string | Translation: `{toolKey}.description`    | Yes      |
| applicationCategory         | string | "WebApplication"                        | Yes      |
| operatingSystem             | string | "Any"                                   | Yes      |
| url                         | string | Canonical URL                           | Yes      |
| offers.@type                | string | "Offer"                                 | Yes      |
| offers.price                | string | "0"                                     | Yes      |
| offers.priceCurrency        | string | "USD"                                   | Yes      |
| aggregateRating.@type       | string | "AggregateRating"                       | Yes      |
| aggregateRating.ratingValue | string | "4.8"                                   | Yes      |
| aggregateRating.ratingCount | string | Dynamic per tool                        | Yes      |
| aggregateRating.bestRating  | string | "5"                                     | Yes      |
| aggregateRating.worstRating | string | "1"                                     | Yes      |
| author.@type                | string | "Organization"                          | Yes      |
| author.name                 | string | "KiviTools"                             | Yes      |
| inLanguage                  | string | Current locale (en, es, pt, fr, de, it) | Yes      |

### 2. HowTo

**Purpose**: Describes step-by-step instructions for featured snippets.

| Field           | Type        | Source                                                  | Required |
| --------------- | ----------- | ------------------------------------------------------- | -------- |
| @type           | string      | "HowTo"                                                 | Yes      |
| name            | string      | "How to use {tool name}"                                | Yes      |
| description     | string      | Translation: `{toolKey}.description`                    | Yes      |
| totalTime       | string      | "PT2M" (2 minutes)                                      | No       |
| step[]          | HowToStep[] | See below                                               | Yes      |
| step[].@type    | string      | "HowToStep"                                             | Yes      |
| step[].position | number      | 1, 2, 3                                                 | Yes      |
| step[].name     | string      | Translation: `{toolKey}.howItWorks.step{n}.title`       | Yes      |
| step[].text     | string      | Translation: `{toolKey}.howItWorks.step{n}.description` | Yes      |

### 3. FAQPage

**Purpose**: Provides FAQ structured data for People Also Ask.

| Field                             | Type       | Source                            | Required |
| --------------------------------- | ---------- | --------------------------------- | -------- |
| @type                             | string     | "FAQPage"                         | Yes      |
| mainEntity[]                      | Question[] | See below                         | Yes      |
| mainEntity[].@type                | string     | "Question"                        | Yes      |
| mainEntity[].name                 | string     | Translation: `{toolKey}.faq.q{n}` | Yes      |
| mainEntity[].acceptedAnswer.@type | string     | "Answer"                          | Yes      |
| mainEntity[].acceptedAnswer.text  | string     | Translation: `{toolKey}.faq.a{n}` | Yes      |

### 4. Speakable (within WebPage)

**Purpose**: Identifies voice-readable content for assistants.

| Field                   | Type     | Source                              | Required |
| ----------------------- | -------- | ----------------------------------- | -------- |
| @type                   | string   | "WebPage"                           | Yes      |
| speakable.@type         | string   | "SpeakableSpecification"            | Yes      |
| speakable.cssSelector[] | string[] | CSS selectors for speakable content | Yes      |

**Speakable Selectors**:

- `.tool-description` - Main tool description paragraph
- `.faq-answer-1` - First FAQ answer (usually "What is X?")

---

## Entity: Platform Hub Page Schemas

A platform hub page (e.g., `/tiktok`) requires 2 schema types:

### 1. CollectionPage

**Purpose**: Describes the platform as a collection of tools.

| Field           | Type                  | Source                                     | Required |
| --------------- | --------------------- | ------------------------------------------ | -------- |
| @type           | string                | "CollectionPage"                           | Yes      |
| name            | string                | Translation: `{platform}.page.title`       | Yes      |
| description     | string                | Translation: `{platform}.page.description` | Yes      |
| url             | string                | Platform URL                               | Yes      |
| hasPart[]       | SoftwareApplication[] | Array of tool references                   | Yes      |
| hasPart[].@type | string                | "SoftwareApplication"                      | Yes      |
| hasPart[].name  | string                | Tool name                                  | Yes      |
| hasPart[].url   | string                | Tool URL                                   | Yes      |
| inLanguage      | string                | Current locale                             | Yes      |

### 2. BreadcrumbList

**Purpose**: Navigation hierarchy for search results.

| Field                      | Type       | Source                | Required |
| -------------------------- | ---------- | --------------------- | -------- |
| @type                      | string     | "BreadcrumbList"      | Yes      |
| itemListElement[]          | ListItem[] | See below             | Yes      |
| itemListElement[].@type    | string     | "ListItem"            | Yes      |
| itemListElement[].position | number     | 1, 2                  | Yes      |
| itemListElement[].name     | string     | "Home", Platform name | Yes      |
| itemListElement[].item     | string     | URL                   | Yes      |

---

## Entity: Homepage Schemas

The homepage (`/`) requires 3 schema types (2 already exist):

### 1. Organization (existing in layout.tsx)

Already implemented. No changes needed.

### 2. WebSite (existing in layout.tsx)

Already implemented. No changes needed.

### 3. SoftwareApplication (for suite)

**Purpose**: Describes KiviTools as a complete software suite.

| Field                       | Type   | Source                               | Required |
| --------------------------- | ------ | ------------------------------------ | -------- |
| @type                       | string | "SoftwareApplication"                | Yes      |
| name                        | string | "KiviTools"                          | Yes      |
| description                 | string | Translation: `home.hero.description` | Yes      |
| applicationCategory         | string | "MultimediaApplication"              | Yes      |
| operatingSystem             | string | "Any"                                | Yes      |
| offers.price                | string | "0"                                  | Yes      |
| aggregateRating.ratingValue | string | "4.9"                                | Yes      |
| aggregateRating.ratingCount | string | "5000"                               | Yes      |

---

## Entity: llms.txt Structure

**Purpose**: Machine-readable site description for AI crawlers.

### llms.txt (Simple)

```text
# Site name and tagline
# Brief description
## Main sections with tool lists
## Citation guidance
```

**Sections**:
| Section | Content |
|---------|---------|
| Header | Site name, one-line description |
| About | 2-3 sentences about KiviTools purpose |
| Platforms | Bullet list of platforms with tool summaries |
| Citation | Preferred citation format |

### llms-full.txt (Comprehensive)

Extended version with:

- Complete tool descriptions
- Usage instructions per tool
- Feature lists
- Target audience information

---

## Schema Relationships

```
Homepage
├── Organization (global)
├── WebSite (global)
└── SoftwareApplication (suite)

Platform Hub (/tiktok)
├── CollectionPage
│   └── hasPart[] → Tool references
└── BreadcrumbList

Tool Page (/tiktok/script-writer)
├── SoftwareApplication
├── HowTo
│   └── step[] → 3 steps from translations
├── FAQPage
│   └── mainEntity[] → 5 Q&A from translations
├── BreadcrumbList
└── WebPage + Speakable
```

---

## Validation Rules

1. **All schemas MUST validate** in Google Rich Results Test
2. **All schemas MUST include** `inLanguage` matching current locale
3. **URLs MUST be absolute** (https://kivitools.com/...)
4. **Ratings MUST be** between 1-5 with realistic values
5. **Prices MUST show** "0" for free tools
6. **Steps MUST have** sequential position numbers starting at 1
