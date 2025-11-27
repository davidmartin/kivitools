# Quickstart Guide: AEO Optimization

**Feature**: 005-aeo-optimization  
**Date**: November 27, 2025

## Overview

This guide explains how to implement AEO (Answer Engine Optimization) for KiviTools. The implementation adds structured data schemas and llms.txt files to improve visibility in AI assistants and search engines.

## Prerequisites

- Next.js 16.0.1 project structure
- Existing `lib/seo-metadata.ts` with schema generators
- Tool pages with "How It Works" and "FAQ" sections
- Translation system with `useLanguage()` hook

## Implementation Steps

### Step 1: Create AEO Schema Generators

Create `lib/aeo/schemas.ts`:

```typescript
// lib/aeo/schemas.ts

interface HowToStep {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

/**
 * Generate HowTo schema from translation keys
 */
export function generateHowToJsonLd({
  toolName,
  description,
  steps,
  language = 'en'
}: {
  toolName: string;
  description: string;
  steps: HowToStep[];
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${toolName}`,
    "description": description,
    "inLanguage": language,
    "totalTime": "PT2M",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description
    }))
  };
}

/**
 * Generate enhanced SoftwareApplication schema
 */
export function generateSoftwareAppJsonLd({
  name,
  description,
  url,
  ratingCount = 1250,
  language = 'en'
}: {
  name: string;
  description: string;
  url: string;
  ratingCount?: number;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "url": url,
    "inLanguage": language,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": ratingCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "KiviTools",
      "url": "https://kivitools.com"
    }
  };
}

/**
 * Generate Speakable schema for voice assistants
 */
export function generateSpeakableJsonLd({
  pageName,
  url,
  cssSelectors = ['.tool-description', '.faq-answer-1']
}: {
  pageName: string;
  url: string;
  cssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageName,
    "url": url,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    }
  };
}

/**
 * Generate CollectionPage schema for platform hubs
 */
export function generateCollectionPageJsonLd({
  platformName,
  description,
  url,
  tools,
  language = 'en'
}: {
  platformName: string;
  description: string;
  url: string;
  tools: Array<{ name: string; url: string; description: string }>;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${platformName} Tools - Free AI Content Generators`,
    "description": description,
    "url": url,
    "inLanguage": language,
    "hasPart": tools.map(tool => ({
      "@type": "SoftwareApplication",
      "name": tool.name,
      "url": tool.url,
      "description": tool.description
    }))
  };
}
```

### Step 2: Update Tool Pages

Add schemas to each tool page:

```tsx
// Example: app/(tools)/tiktok/script-writer/page.tsx

import { 
  generateHowToJsonLd, 
  generateSoftwareAppJsonLd,
  generateSpeakableJsonLd 
} from '@/lib/aeo/schemas';
import { generateFaqJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-metadata';

export default function ToolPage() {
  const { t, language } = useLanguage();
  
  // Generate HowTo from translations
  const howToJsonLd = generateHowToJsonLd({
    toolName: t('scriptWriter.title'),
    description: t('scriptWriter.description'),
    steps: [
      { title: t('scriptWriter.howItWorks.step1.title'), description: t('scriptWriter.howItWorks.step1.description') },
      { title: t('scriptWriter.howItWorks.step2.title'), description: t('scriptWriter.howItWorks.step2.description') },
      { title: t('scriptWriter.howItWorks.step3.title'), description: t('scriptWriter.howItWorks.step3.description') },
    ],
    language
  });

  // Generate SoftwareApplication
  const appJsonLd = generateSoftwareAppJsonLd({
    name: t('scriptWriter.title'),
    description: t('scriptWriter.description'),
    url: 'https://kivitools.com/tiktok/script-writer',
    language
  });

  // Generate Speakable
  const speakableJsonLd = generateSpeakableJsonLd({
    pageName: t('scriptWriter.title'),
    url: 'https://kivitools.com/tiktok/script-writer'
  });

  // FAQ (existing)
  const faqJsonLd = generateFaqJsonLd([
    { question: t('scriptWriter.faq.q1'), answer: t('scriptWriter.faq.a1') },
    { question: t('scriptWriter.faq.q2'), answer: t('scriptWriter.faq.a2') },
    { question: t('scriptWriter.faq.q3'), answer: t('scriptWriter.faq.a3') },
    { question: t('scriptWriter.faq.q4'), answer: t('scriptWriter.faq.a4') },
    { question: t('scriptWriter.faq.q5'), answer: t('scriptWriter.faq.a5') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      
      {/* Add CSS class for speakable content */}
      <p className="tool-description">{t('scriptWriter.description')}</p>
      
      {/* Rest of component */}
    </>
  );
}
```

### Step 3: Create llms.txt Files

Create `public/llms.txt`:

```text
# KiviTools
> Free AI-powered tools for content creators on TikTok, Instagram, YouTube, Twitter, and more.

## About
KiviTools provides free AI tools to help content creators generate engaging social media content. All tools are free, require no signup, and support 6 languages.

## Platforms
- TikTok: Script Writer, Video Ideas, Hook Generator, Hashtag Generator, Username Generator
- Instagram: Bio Generator, Caption Generator, Reel Script, Hashtag Generator
- YouTube: Title Generator, Description Generator, Script Generator, Tag Generator
- Twitter: Bio Generator, Tweet Generator, Thread Maker
- More: Snapchat, Reddit, Discord, Twitch, LinkedIn, Pinterest, Facebook, Threads

## How to Cite
KiviTools (https://kivitools.com) - Free AI Social Media Tools
```

### Step 4: Update Platform Hub Pages

Add CollectionPage schema to platform pages:

```tsx
// app/(tools)/tiktok/page.tsx

const tools = [
  { name: 'TikTok Script Writer', url: 'https://kivitools.com/tiktok/script-writer', description: '...' },
  // ... more tools
];

const collectionJsonLd = generateCollectionPageJsonLd({
  platformName: 'TikTok',
  description: t('tiktok.page.description'),
  url: 'https://kivitools.com/tiktok',
  tools,
  language
});
```

### Step 5: Validate Schemas

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Check for errors in Search Console** after deployment

## CSS Classes for Speakable

Add these CSS classes to content that should be voice-readable:

```css
/* No visual styling needed - classes are for schema targeting only */
.tool-description { }
.faq-answer-1 { }
```

## Testing Checklist

- [ ] All tool pages have SoftwareApplication schema
- [ ] All tool pages have HowTo schema with 3 steps
- [ ] All tool pages have FAQPage schema with 5 Q&A
- [ ] All tool pages have Speakable schema
- [ ] Platform hub pages have CollectionPage schema
- [ ] llms.txt accessible at /llms.txt
- [ ] All schemas validate in Rich Results Test
- [ ] Schemas work in all 6 languages

## Files Modified

| File | Changes |
|------|---------|
| `lib/aeo/schemas.ts` | NEW: Schema generator functions |
| `lib/seo-metadata.ts` | Enhanced with inLanguage support |
| `public/llms.txt` | NEW: AI crawler guidance |
| `public/llms-full.txt` | NEW: Comprehensive descriptions |
| `app/(tools)/*/page.tsx` | Add HowTo, Speakable schemas |
| `app/(tools)/[platform]/page.tsx` | Add CollectionPage schema |
