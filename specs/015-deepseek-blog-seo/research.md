# Research: DeepSeek Blog SEO Content Strategy

**Feature**: 015-deepseek-blog-seo  
**Date**: 2025-01-20  
**Purpose**: Document findings for blog content implementation

## 1. BlogPost Interface Analysis

**Source**: `lib/blog-data.ts`

### Required Fields

| Field         | Type         | Description                                                                             |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `slug`        | string       | URL path segment (kebab-case)                                                           |
| `title`       | string       | Full article title                                                                      |
| `excerpt`     | string       | Short description for cards/SEO                                                         |
| `content`     | string       | HTML content with article structure                                                     |
| `date`        | string       | Publication date (YYYY-MM-DD)                                                           |
| `author`      | string       | "Equipo KiviTools" or "KiviTools Team"                                                  |
| `readTime`    | number       | Estimated reading time in minutes                                                       |
| `platform`    | Platform     | One of: tiktok, instagram, twitter, youtube, linkedin, twitch, reddit, spotify, general |
| `language`    | "es" \| "en" | Content language                                                                        |
| `keywords`    | string[]     | Target SEO keywords (5-10)                                                              |
| `tags`        | string[]     | Display tags for categorization                                                         |
| `relatedTool` | RelatedTool  | Primary tool CTA                                                                        |

### Optional Fields

| Field             | Type          | Description                         |
| ----------------- | ------------- | ----------------------------------- |
| `alternateSlug`   | string        | Slug of same post in other language |
| `metaTitle`       | string        | SEO title override (<60 chars)      |
| `metaDescription` | string        | Meta description (<160 chars)       |
| `secondaryTools`  | RelatedTool[] | Additional tool CTAs (2-4)          |
| `dateModified`    | string        | Last update date                    |
| `coverImage`      | string        | Optional cover image path           |

### RelatedTool Structure

```typescript
interface RelatedTool {
  name: string; // Tool display name
  link: string; // Tool URL path
  cta: string; // Button text
}
```

## 2. Content Structure Patterns

**Decision**: Follow existing blog post HTML structure  
**Rationale**: Consistency with established posts ensures proper rendering and SEO

### HTML Structure Template

```html
<article class="prose prose-lg prose-invert max-w-none">
  <!-- Lead paragraph -->
  <p class="lead text-xl text-muted-foreground mb-8">
    [Hook with problem statement and promise]
  </p>

  <!-- Main sections with H2 -->
  <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">[Section Title]</h2>
  <p class="mb-6">[Content paragraphs]</p>

  <!-- Lists -->
  <ul class="list-disc pl-6 mb-8 space-y-2">
    <li><strong>[Point]:</strong> [Explanation]</li>
  </ul>

  <!-- Tool recommendation boxes -->
  <div class="bg-surface p-6 rounded-xl border border-border my-8">
    <p class="text-lg font-semibold mb-2">💡 [Tip Title]</p>
    <p class="text-muted-foreground mb-4">[Description with tool link]</p>
  </div>

  <!-- CTA block at end -->
  <div
    class="bg-linear-to-r from-[color]-500/10 to-[color2]-500/10 p-8 rounded-2xl border border-[color]-500/20 mt-12 text-center"
  >
    <h3 class="text-2xl font-bold mb-4">[CTA Title]</h3>
    <p class="mb-6 text-muted-foreground">[CTA Description]</p>
    <a
      href="[tool-link]"
      class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
    >
      [Button Text]
    </a>
  </div>
</article>
```

## 3. SEO Best Practices for DeepSeek Posts

**Decision**: Optimize for informational search intent  
**Rationale**: DeepSeek queries are primarily "what is" and "how to" searches

### Target Keyword Clusters

| Cluster          | ES Keywords                                            | EN Keywords                                           |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Brand awareness  | qué es deepseek, deepseek ia, deepseek español         | what is deepseek, deepseek ai, deepseek explained     |
| Comparison       | deepseek vs chatgpt, deepseek vs openai, mejor ia 2025 | deepseek vs chatgpt, deepseek vs openai, best ai 2025 |
| Usage            | como usar deepseek, deepseek gratis, deepseek tutorial | how to use deepseek, deepseek free, deepseek tutorial |
| Content creation | deepseek para redes sociales, ia para tiktok           | deepseek for social media, ai for tiktok              |

### On-Page SEO Requirements

1. **Title tag**: Include primary keyword, under 60 chars
2. **Meta description**: Include primary keyword, under 160 chars, include CTA
3. **H1**: Match title, contain primary keyword
4. **H2s**: Include secondary keywords naturally
5. **First 100 words**: Must contain primary keyword
6. **Internal links**: 3+ to other blog posts, 3+ to tools
7. **URL slug**: Contain primary keyword, kebab-case

## 4. Tool Linking Strategy

**Decision**: Map posts to most relevant existing tools  
**Rationale**: Maximize conversion by connecting search intent to tool functionality

### Primary Tool Assignments

| Post Topic                | Primary Tool                 | Secondary Tools                                 |
| ------------------------- | ---------------------------- | ----------------------------------------------- |
| What is DeepSeek          | /tiktok/script-writer        | video-ideas, caption-generator, tweet-generator |
| DeepSeek vs ChatGPT       | /tiktok/video-ideas          | script-writer, youtube-title-generator          |
| DeepSeek for Social Media | /instagram/caption-generator | tiktok/script-writer, twitter/thread-maker      |
| DeepSeek for TikTok       | /tiktok/script-writer        | hook-generator, hashtag-generator, video-ideas  |
| DeepSeek for Instagram    | /instagram/caption-generator | bio-generator, reel-script, hashtag-generator   |
| DeepSeek for YouTube      | /youtube/title-generator     | description-generator, script-generator         |
| DeepSeek for Twitter      | /twitter/thread-maker        | tweet-generator, bio-generator                  |
| Free AI Tools 2025        | /about/technology            | Multiple platform tools                         |
| DeepSeek for Music        | /suno/lyric-generator        | song-description-generator, music-prompt        |

## 5. Content Tone Guidelines

**Decision**: Comedic, relatable, anti-corporate  
**Rationale**: KiviTools brand identity per Constitution Principle VII

### Tone Examples

**✅ Good (DeepSeek explainer)**:

> "DeepSeek es la IA china que está haciendo sudar a Silicon Valley. ¿ChatGPT quién? Bueno, no tanto, pero casi. Lo mejor: puedes usarla gratis en KiviTools sin vender un riñón por una suscripción."

**❌ Bad (Corporate)**:

> "DeepSeek is a state-of-the-art large language model that leverages advanced neural architectures to deliver optimized content generation solutions."

### Language-Specific Notes

- **Spanish**: Use "tú" form, include colloquialisms, Latin American expressions
- **English**: Casual but informative, light sarcasm acceptable

## 6. Platform Color Assignments

**Decision**: Use "general" platform with purple accents for DeepSeek posts  
**Rationale**: DeepSeek is cross-platform; purple aligns with AI/tech aesthetic

### Color Classes for DeepSeek Posts

```css
/* CTA gradient */
from-purple-500/10 to-blue-500/10 border-purple-500/20

/* Badges/highlights */
bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400
```

## Summary

All technical questions resolved. Ready for Phase 1 (data model documentation and quickstart guide).
