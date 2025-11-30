# Quickstart: Blog Posts Expansion

**Feature**: 009-blog-posts-expansion  
**Date**: 2025-11-30  
**Estimated Time**: 4-6 hours

## Prerequisites

- Node.js 18+
- Access to KiviTools codebase
- Familiarity with Next.js App Router

## Quick Setup

```bash
# Switch to feature branch
git checkout 009-blog-posts-expansion

# Install dependencies (if any new)
npm install

# Start dev server
npm run dev
```

## Implementation Order

### Phase 1: Data Model Updates (30 min)

1. **Update `lib/blog-data.ts`**
   - Extend `BlogPost` interface with new fields
   - Extend `Platform` type with new platforms
   - Keep existing posts, add `language: "es"` to them

### Phase 2: Create Blog Posts (3-4 hours)

Create 12 posts in `lib/blog-data.ts`:

| Order | Post                      | Language | Priority |
| ----- | ------------------------- | -------- | -------- |
| 1     | Twitter Growth Guide      | ES       | P1       |
| 2     | Twitter Growth Guide      | EN       | P1       |
| 3     | LinkedIn Profile Guide    | ES       | P1       |
| 4     | LinkedIn Profile Guide    | EN       | P1       |
| 5     | Twitch Streaming Guide    | ES       | P2       |
| 6     | Twitch Streaming Guide    | EN       | P2       |
| 7     | Reddit Front Page Guide   | ES       | P2       |
| 8     | Reddit Front Page Guide   | EN       | P2       |
| 9     | Spotify Playlist Strategy | ES       | P2       |
| 10    | Spotify Playlist Strategy | EN       | P2       |
| 11    | Content Calendar Guide    | ES       | P1       |
| 12    | Content Calendar Guide    | EN       | P1       |

### Phase 3: URL Rewrites (15 min)

Add Spanish URL aliases to `next.config.ts`:

```typescript
// Blog - Spanish URL aliases
{ source: "/blog/guia-crecer-twitter-2025", destination: "/blog/twitter-growth-guide-2025" },
{ source: "/blog/guia-perfil-linkedin-2025", destination: "/blog/linkedin-profile-guide-2025" },
// ... etc
```

### Phase 4: SEO Enhancements (45 min)

1. **Update `app/(blog)/blog/[slug]/page.tsx`**

   - Add JSON-LD Article schema
   - Add hreflang alternate tags
   - Add related posts grid

2. **Create helper functions in `lib/blog-data.ts`**
   - `getRelatedPosts(slug, platform, language, limit)`
   - `getPostBySlugOrAlternate(slug)`

### Phase 5: Testing (30 min)

```bash
# Test all new URLs work
curl -I http://localhost:3000/blog/twitter-growth-guide-2025
curl -I http://localhost:3000/blog/guia-crecer-twitter-2025

# Validate JSON-LD
# Visit: https://search.google.com/test/rich-results

# Check Lighthouse SEO score
npm run build && npm run start
# Run Lighthouse on a blog post page
```

## Content Writing Guidelines

Each post must include:

### Structure

```html
<article>
  <!-- Lead paragraph (50-100 words) -->
  <p class="lead">Hook that addresses reader's problem</p>

  <!-- Section 1: The Problem (200-300 words) -->
  <h2>The Problem</h2>
  <p>Describe the pain point...</p>

  <!-- CTA #1: Subtle intro mention -->
  <p>¿Quieres automatizarlo? <a href="/tool">Tool Name</a> puede ayudarte.</p>

  <!-- Section 2: The Solution (300-400 words) -->
  <h2>The Solution</h2>
  <p>Explain the approach...</p>

  <!-- Section 3: Step-by-Step (400-500 words) -->
  <h2>Tutorial: How to Do X</h2>
  <h3>Step 1</h3>
  <h3>Step 2</h3>
  <h3>Step 3</h3>

  <!-- CTA #2: Contextual mid-article -->
  <div class="bg-surface p-6 rounded-xl">Tool example demonstration</div>

  <!-- Section 4: Pro Tips (200-300 words) -->
  <h2>Pro Tips for 2025</h2>
  <ul>
    ...
  </ul>

  <!-- CTA #3: Prominent end card -->
  <div class="bg-gradient-to-r ...">
    <h3>Ready to try?</h3>
    <a href="/tool">CTA Button</a>
  </div>
</article>
```

### Tone Checklist

- [ ] Uses "tú" form (Spanish)
- [ ] Includes at least 1 self-deprecating joke
- [ ] References real creator struggles
- [ ] No corporate buzzwords
- [ ] Emojis used sparingly (1-2 per section max)
- [ ] Feels like advice from a friend

### SEO Checklist

- [ ] Primary keyword in title
- [ ] Primary keyword in first paragraph
- [ ] Secondary keywords in H2s
- [ ] Meta title < 60 characters
- [ ] Meta description < 160 characters
- [ ] 5-10 keywords defined
- [ ] Internal links to 3+ tools
- [ ] Links to 2+ other blog posts

## Validation Commands

```bash
# Check for TypeScript errors
npm run type-check

# Run linter
npm run lint

# Build to catch SSG errors
npm run build
```

## Files Changed Summary

| File                              | Action | Purpose                        |
| --------------------------------- | ------ | ------------------------------ |
| `lib/blog-data.ts`                | MODIFY | Add 12 posts, extend interface |
| `app/(blog)/blog/[slug]/page.tsx` | MODIFY | SEO enhancements               |
| `next.config.ts`                  | MODIFY | Add 6 Spanish URL rewrites     |

## Success Criteria

- [ ] All 12 posts render correctly
- [ ] Spanish and English URLs both work
- [ ] JSON-LD validates in Rich Results Test
- [ ] hreflang tags present in HTML
- [ ] Related posts grid shows 3 cards
- [ ] All tool links work
- [ ] Lighthouse SEO score > 90
