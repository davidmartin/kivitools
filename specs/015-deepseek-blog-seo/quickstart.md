# Quickstart: Adding DeepSeek Blog Posts

**Feature**: 015-deepseek-blog-seo  
**Date**: 2025-01-20

## Overview

This feature adds 18 blog posts to `lib/blog-data.ts`. No new components, API routes, or configuration needed.

## Prerequisites

- Access to `lib/blog-data.ts`
- Understanding of BlogPost interface (see [data-model.md](./data-model.md))
- Constitution compliance (Principle VII: Content Tone)

## Adding a New Blog Post

### Step 1: Prepare Content

1. Write article content in HTML following the template in [research.md](./research.md)
2. Ensure comedic, relatable tone per Constitution
3. Include internal links to 3+ tools and 3+ other blog posts
4. Prepare both ES and EN versions

### Step 2: Add to blogPosts Array

Open `lib/blog-data.ts` and add entries to the `blogPosts` array:

```typescript
// Spanish version
{
  slug: "que-es-deepseek-guia-completa",
  title: "¿Qué es DeepSeek? La IA que Está Cambiando el Juego del Contenido",
  excerpt: "DeepSeek es la IA china que le está dando dolores de cabeza a ChatGPT...",
  date: "2025-01-20",
  dateModified: "2025-01-20",
  author: "Equipo KiviTools",
  readTime: 10,
  platform: "general",
  language: "es",
  alternateSlug: "what-is-deepseek-complete-guide",
  keywords: ["qué es deepseek", "deepseek ia", "deepseek español", "deepseek vs chatgpt"],
  metaTitle: "¿Qué es DeepSeek? Guía Completa 2025 | KiviTools",
  metaDescription: "Descubre qué es DeepSeek, cómo funciona y cómo usarlo gratis para crear contenido. La guía más completa en español.",
  tags: ["DeepSeek", "IA", "Inteligencia Artificial", "Creación de Contenido"],
  relatedTool: {
    name: "Generador de Scripts para TikTok",
    link: "/tiktok/script-writer",
    cta: "Probar DeepSeek Gratis"
  },
  secondaryTools: [
    { name: "Generador de Ideas", link: "/tiktok/video-ideas", cta: "Generar Ideas" },
    { name: "Generador de Captions", link: "/instagram/caption-generator", cta: "Crear Captions" }
  ],
  content: `<article class="prose prose-lg prose-invert max-w-none">
    <!-- Full HTML content here -->
  </article>`
},

// English version
{
  slug: "what-is-deepseek-complete-guide",
  title: "What is DeepSeek? The AI That's Changing the Content Game",
  excerpt: "DeepSeek is the Chinese AI giving ChatGPT headaches...",
  date: "2025-01-20",
  dateModified: "2025-01-20",
  author: "KiviTools Team",
  readTime: 10,
  platform: "general",
  language: "en",
  alternateSlug: "que-es-deepseek-guia-completa",
  keywords: ["what is deepseek", "deepseek ai", "deepseek explained", "deepseek vs chatgpt"],
  metaTitle: "What is DeepSeek? Complete Guide 2025 | KiviTools",
  metaDescription: "Discover what DeepSeek is, how it works, and how to use it free for content creation. The most complete guide.",
  tags: ["DeepSeek", "AI", "Artificial Intelligence", "Content Creation"],
  relatedTool: {
    name: "TikTok Script Generator",
    link: "/tiktok/script-writer",
    cta: "Try DeepSeek Free"
  },
  secondaryTools: [
    { name: "Ideas Generator", link: "/tiktok/video-ideas", cta: "Generate Ideas" },
    { name: "Caption Generator", link: "/instagram/caption-generator", cta: "Create Captions" }
  ],
  content: `<article class="prose prose-lg prose-invert max-w-none">
    <!-- Full HTML content here -->
  </article>`
}
```

### Step 3: Verify

1. Run `npm run build` to check for TypeScript errors
2. Start dev server: `npm run dev`
3. Navigate to `/blog/[slug]` for both ES and EN versions
4. Verify:
   - Content renders correctly
   - Tool links work
   - SEO metadata appears in page source
   - Alternate language link works

## Content Guidelines

### Required Sections in content HTML

1. **Lead paragraph** with `.lead` class
2. **H2 section headers** with target keywords
3. **Lists** for scannable content
4. **Tool recommendation boxes** with `.bg-surface` styling
5. **Internal links** to tools (use `class="text-accent hover:underline"`)
6. **CTA block** at the end with gradient background

### Tone Checklist

- [ ] Comedic/relatable (not corporate)
- [ ] "Tú" form for Spanish
- [ ] Light sarcasm acceptable
- [ ] No buzzwords unless ironic
- [ ] Addresses creator frustrations

### SEO Checklist

- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least one H2
- [ ] metaTitle under 60 characters
- [ ] metaDescription under 160 characters
- [ ] 3+ internal links to tools
- [ ] 3+ internal links to other blog posts

## File Reference

```
lib/blog-data.ts          # Add BlogPost entries here
app/(blog)/blog/[slug]/   # Dynamic route (no changes needed)
```

## Testing

After adding posts:

1. `npm run build` - Ensure no TypeScript errors
2. `npm run dev` - Local verification
3. Check both language versions
4. Verify SEO metadata in page source
5. Test all internal links
