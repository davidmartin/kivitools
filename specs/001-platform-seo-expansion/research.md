# Research: Platform SEO Expansion

**Feature**: 001-platform-seo-expansion  
**Date**: 2025-11-25  
**Status**: Complete

## Platform Color Schemes

Each platform needs a consistent color scheme for badges, buttons, and visual elements. Colors must work in both light and dark mode using Tailwind CSS v4 syntax.

### Decision: Platform Colors

| Platform  | Primary Color | Tailwind Light                | Tailwind Dark                              | Hex Code |
| --------- | ------------- | ----------------------------- | ------------------------------------------ | -------- |
| Pinterest | Red           | `bg-red-100 text-red-600`     | `dark:bg-red-900/30 dark:text-red-400`     | #E60023  |
| Spotify   | Green         | `bg-green-100 text-green-600` | `dark:bg-green-900/30 dark:text-green-400` | #1DB954  |
| Facebook  | Blue          | `bg-blue-100 text-blue-600`   | `dark:bg-blue-900/30 dark:text-blue-400`   | #1877F2  |
| Threads   | Black/Gray    | `bg-gray-100 text-gray-600`   | `dark:bg-gray-900/30 dark:text-gray-400`   | #000000  |

**Rationale**: Colors match official brand guidelines. Using 100/600 for light mode and 900/30 opacity + 400 for dark mode provides good contrast while staying on-brand.

**Alternatives Considered**:

- Using custom CSS variables: Rejected - Tailwind utility classes are more maintainable
- Using HeroUI semantic colors only: Rejected - Need platform-specific branding

## Platform Logo Sources

### Decision: SVG Logos

| Platform  | Source                | Dark Mode Handling                     |
| --------- | --------------------- | -------------------------------------- |
| Pinterest | Official brand assets | No invert needed (red works on both)   |
| Spotify   | Official brand assets | No invert needed (green works on both) |
| Facebook  | Official brand assets | No invert needed (blue works on both)  |
| Threads   | Official brand assets | Needs `dark:invert` (black logo)       |

**Rationale**: Using official SVGs ensures brand accuracy. Only Threads needs inversion due to black logo.

## Tool-Specific Requirements

### Pinterest Tools

| Tool            | Input Fields                            | Output Format         | Character Limits  |
| --------------- | --------------------------------------- | --------------------- | ----------------- |
| Pin Description | Product/topic, keywords, tone, language | SEO description + CTA | 500 chars max     |
| Board Name      | Theme, style, keywords                  | 5 creative names      | 50 chars per name |
| Profile Bio     | Business type, personality, language    | Optimized bio         | 160 chars max     |

**Decision**: Pinterest focuses on SEO keywords since pins rank in Google Images.

### Spotify Tools

| Tool                 | Input Fields                               | Output Format        | Character Limits |
| -------------------- | ------------------------------------------ | -------------------- | ---------------- |
| Playlist Name        | Theme, mood, genre                         | 5 creative names     | 100 chars max    |
| Playlist Description | Theme, mood, songs included, language      | Engaging description | 300 chars        |
| Artist Bio           | Artist name, genre, achievements, language | Professional bio     | 1500 chars       |

**Decision**: Spotify content focuses on discoverability with mood/genre keywords.

### Facebook Tools

| Tool           | Input Fields                            | Output Format        | Character Limits              |
| -------------- | --------------------------------------- | -------------------- | ----------------------------- |
| Post Generator | Topic, tone, CTA type, language         | Engaging post        | 63,206 chars (optimal: 40-80) |
| Page Bio       | Business type, tone, keywords, language | Optimized about text | 255 chars                     |
| Ad Copy        | Product, audience, tone, CTA, language  | Ad text + headline   | Headline: 40, Primary: 125    |

**Decision**: Facebook posts should be concise. Ad copy follows Meta's recommended lengths.

### Threads Tools

| Tool           | Input Fields                     | Output Format       | Character Limits |
| -------------- | -------------------------------- | ------------------- | ---------------- |
| Post Generator | Topic, tone, language            | Conversational post | 500 chars        |
| Bio Generator  | Personality, interests, language | Casual bio          | 150 chars        |

**Decision**: Threads content is more casual/conversational than Twitter. Character limit is 500.

### Existing Platform Expansions

#### TikTok New Tools

| Tool          | Input Fields                          | Output Format     |
| ------------- | ------------------------------------- | ----------------- |
| Comment Reply | Original comment, tone, language      | 3-5 witty replies |
| Duet Ideas    | Original video topic, niche, language | 5 duet concepts   |

#### Instagram New Tools

| Tool            | Input Fields                       | Output Format              |
| --------------- | ---------------------------------- | -------------------------- |
| Carousel Script | Topic, slide count, tone, language | Script per slide with hook |

**Note**: Story Ideas already exists in `/instagram/story-ideas/`

## DeepSeek Prompt Patterns

### Decision: Prompt Structure

All new tools follow the established pattern:

```typescript
export async function generate[Platform][Tool](params: {
  // Required inputs
  topic: string;
  language: "en" | "es";
  // Tool-specific inputs
  tone?: string;
}): Promise<string | string[]> {
  const prompt = `You are an expert ${platform} content creator...

  [Platform-specific instructions]

  Generate content in ${params.language === "es" ? "Spanish" : "English"}.

  Input: ${params.topic}

  Return ONLY the generated content, no explanations.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8, // Higher for creative content
    max_tokens: 1000,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}
```

**Rationale**: Consistent with existing tools. Temperature 0.8 for creative content.

## Translation Key Structure

### Decision: Key Naming Convention

Following existing flat key pattern with dot notation:

```typescript
// Platform pages
"nav.pinterest": "Pinterest",
"pinterest.page.description": "Create viral pins...",

// Tools
"pinterestPinDescription.title": "Pin Description Generator",
"pinterestPinDescription.description": "Generate SEO-optimized pin descriptions",
"pinterestPinDescription.form.topic": "Product or Topic",
"pinterestPinDescription.form.generate": "Generate",
// ... etc
```

**Rationale**: Matches existing pattern. Platform tools use camelCase prefix (e.g., `pinterestPinDescription`).

## Spanish URL Aliases

### Decision: URL Patterns

| English URL                     | Spanish URL                         |
| ------------------------------- | ----------------------------------- |
| `/pinterest/pin-description`    | `/pinterest/descripcion-pin`        |
| `/pinterest/board-name`         | `/pinterest/nombre-tablero`         |
| `/pinterest/profile-bio`        | `/pinterest/bio-perfil`             |
| `/spotify/playlist-name`        | `/spotify/nombre-playlist`          |
| `/spotify/playlist-description` | `/spotify/descripcion-playlist`     |
| `/spotify/artist-bio`           | `/spotify/bio-artista`              |
| `/facebook/post-generator`      | `/facebook/generador-publicaciones` |
| `/facebook/page-bio`            | `/facebook/bio-pagina`              |
| `/facebook/ad-copy`             | `/facebook/texto-anuncio`           |
| `/threads/post-generator`       | `/threads/generador-publicaciones`  |
| `/threads/bio-generator`        | `/threads/generador-bio`            |
| `/tiktok/comment-reply`         | `/tiktok/respuesta-comentarios`     |
| `/tiktok/duet-ideas`            | `/tiktok/ideas-dueto`               |
| `/instagram/carousel-script`    | `/instagram/guion-carrusel`         |

**Rationale**: Spanish URLs improve SEO for Spanish-speaking markets. Pattern matches existing aliases.

## HeroUI Component Usage

### Decision: Component Mapping

| UI Element      | HeroUI Component                         | Notes                           |
| --------------- | ---------------------------------------- | ------------------------------- |
| Generate button | `<Button variant="secondary" size="lg">` | Use `onPress` not `onClick`     |
| Copy button     | `<Button variant="primary">`             | Green bg for success            |
| Form card       | `<Card>` with compound pattern           | No native divs                  |
| Text input      | Native `<textarea>` with HeroUI styling  | HeroUI TextArea for consistency |
| Select          | Native `<select>` with HeroUI styling    | Match existing pattern          |
| Loading state   | `isDisabled={isLoading}` on Button       | Standard pattern                |
| Error display   | Custom div with red bg                   | Match existing pattern          |

**Rationale**: Follow existing tool pages exactly for consistency. HeroUI for interactive elements, native elements for form inputs with HeroUI-compatible styling.

## Performance Considerations

### Decision: Optimization Strategy

1. **SSR**: All tool pages use server components for initial render
2. **Client hydration**: Form interactivity via `"use client"` directive
3. **Image optimization**: Platform logos use Next.js Image component
4. **API caching**: None - each generation is unique
5. **Bundle splitting**: Each tool page is a separate chunk

**Rationale**: Follows existing architecture. SSR critical for SEO.

## Open Questions Resolved

| Question                               | Resolution                                         |
| -------------------------------------- | -------------------------------------------------- |
| Should tools share API routes?         | No - each tool has dedicated route for clarity     |
| Should we add more tools per platform? | Start with minimum required, expand based on usage |
| Character limits for each platform?    | Researched and documented above                    |
| Dark mode handling for logos?          | Only Threads needs invert                          |
