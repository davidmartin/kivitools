# Research: Suno Tools Expansion

**Feature**: 010-suno-tools-expansion  
**Date**: November 30, 2025

## Overview

Research findings for expanding Suno platform tools from 3 to 8 tools.

## Existing Patterns Analysis

### Current Suno Tools Structure

Analyzed existing tools to extract patterns:

1. **Lyric Generator** (`/suno/lyric-generator`)

   - Form inputs: theme (text), genre (select), mood (select), language (select)
   - Output: Single textarea with formatted lyrics
   - DeepSeek function: `generateSunoLyrics()`

2. **Music Prompt Generator** (`/suno/music-prompt-generator`)

   - Form inputs: style, instruments, bpm, mood, language
   - Output: Single text prompt
   - DeepSeek function: `generateMusicPrompt()`

3. **Song Description Generator** (`/suno/song-description-generator`)
   - Form inputs: theme, genre, mood, platform, language
   - Output: Multiple descriptions (array)
   - DeepSeek function: `generateSongDescription()`

### Common Form Elements

All Suno tools share these select options:

```typescript
const GENRES = [
  { value: "pop", label: "Pop" },
  { value: "rap", label: "Hip-Hop / Rap" },
  { value: "indie", label: "Indie" },
  { value: "rock", label: "Rock" },
  { value: "reggaeton", label: "Reggaeton" },
  { value: "electronic", label: "Electronic/EDM" },
  { value: "rnb", label: "R&B" },
  { value: "acoustic", label: "Acoustic" },
  { value: "metal", label: "Metal" },
  { value: "jazz", label: "Jazz" },
];

const MOODS = [
  { value: "uplifting", label: "Uplifting" },
  { value: "energetic", label: "Energetic" },
  { value: "sad", label: "Sad / Melancholic" },
  { value: "romantic", label: "Romantic" },
  { value: "aggressive", label: "Aggressive" },
  { value: "calm", label: "Calm / Peaceful" },
  { value: "mysterious", label: "Mysterious" },
  { value: "motivational", label: "Motivational" },
  { value: "playful", label: "Playful / Fun" },
  { value: "dark", label: "Dark" },
];
```

### Platform Color Scheme

Suno uses purple theme (consistent with music/creativity):

- Badge: `bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400`
- Step circles: Same purple colors
- No gradients (project rule)

## New Tool Specifications

### 1. Song Title Generator

**Decision**: Generate array of 10 creative titles

**Form Inputs**:

- `description` (textarea): What the song is about
- `genre` (select): Reuse GENRES constant
- `mood` (select): Reuse MOODS constant
- `language` (select): Output language

**Rationale**: Song titles need context about the song's theme/story. Genre and mood help match the vibe.

**Alternatives Considered**:

- Keywords-only input: Rejected - too limited for creative titles
- No genre selector: Rejected - genre heavily influences title style (e.g., pop vs metal)

### 2. Song Tag Generator

**Decision**: Generate 15-20 tags as comma-separated array

**Form Inputs**:

- `description` (textarea): Song theme/description
- `genre` (select): Primary genre
- `mood` (select): Song mood
- `language` (select): Tag language

**Rationale**: Tags should be optimized for Suno's discovery algorithm. Mix of broad (genre) and niche (specific themes) tags.

**Tag Categories to Generate**:

- Genre tags (3-4)
- Mood/vibe tags (3-4)
- Theme/topic tags (4-5)
- Production style tags (2-3)
- Audience/era tags (2-3)

**Alternatives Considered**:

- Fewer tags (5-10): Rejected - users need variety to choose from
- More tags (25+): Rejected - overwhelming, diminishing returns

### 3. Album Name Generator

**Decision**: Generate 10 album/EP name suggestions

**Form Inputs**:

- `concept` (textarea): Album concept/theme description
- `genre` (select): Primary genre
- `releaseType` (select): Album vs EP
- `trackCount` (number, optional): Number of tracks
- `language` (select): Output language

**Release Types**:

```typescript
const RELEASE_TYPES = [
  { value: "album", label: "Full Album" },
  { value: "ep", label: "EP (Extended Play)" },
  { value: "single", label: "Single" },
  { value: "mixtape", label: "Mixtape" },
];
```

**Rationale**: Album names should reflect cohesive themes. Release type affects naming conventions (EPs often have simpler names).

### 4. Cover Art Prompt Generator

**Decision**: Generate 3-5 detailed AI art prompts

**Form Inputs**:

- `songTitle` (text): Song or album title
- `genre` (select): Musical genre
- `mood` (select): Visual mood
- `artStyle` (select): Art style preference
- `targetPlatform` (select): AI image generator target
- `language` (select): Prompt language

**Art Styles**:

```typescript
const ART_STYLES = [
  { value: "digital-art", label: "Digital Art" },
  { value: "photography", label: "Photography Style" },
  { value: "illustration", label: "Illustration" },
  { value: "3d-render", label: "3D Render" },
  { value: "abstract", label: "Abstract" },
  { value: "minimalist", label: "Minimalist" },
  { value: "vintage", label: "Vintage/Retro" },
  { value: "neon", label: "Neon/Cyberpunk" },
];
```

**Target Platforms**:

```typescript
const AI_ART_PLATFORMS = [
  { value: "midjourney", label: "Midjourney" },
  { value: "dalle", label: "DALL-E" },
  { value: "stable-diffusion", label: "Stable Diffusion" },
  { value: "generic", label: "Generic (Any AI)" },
];
```

**Rationale**: Different AI generators have different prompt styles. Midjourney uses `--ar` parameters, DALL-E prefers descriptive prose.

### 5. Remix Idea Generator

**Decision**: Generate 5-7 detailed remix concepts

**Form Inputs**:

- `originalSong` (textarea): Description of original song
- `originalGenre` (select): Original genre
- `remixStyle` (select): Type of remix desired
- `language` (select): Output language

**Remix Styles**:

```typescript
const REMIX_STYLES = [
  { value: "genre-flip", label: "Genre Flip (Dramatic Change)" },
  { value: "club-remix", label: "Club/Dance Remix" },
  { value: "acoustic", label: "Acoustic/Stripped Down" },
  { value: "orchestral", label: "Orchestral/Cinematic" },
  { value: "lo-fi", label: "Lo-Fi/Chill" },
  { value: "experimental", label: "Experimental/Avant-garde" },
  { value: "vintage", label: "Vintage/Retro Style" },
];
```

**Output Format** (per remix idea):

- Target genre
- Tempo change (faster/slower/same)
- Key elements to keep
- New elements to add
- Production notes

**Rationale**: Remix ideas need to be specific and actionable. Users should be able to recreate the concept in Suno.

## Spanish URL Aliases

Following project conventions for bilingual SEO:

| Tool                 | English                            | Spanish                             |
| -------------------- | ---------------------------------- | ----------------------------------- |
| Song Title Generator | `/suno/song-title-generator`       | `/suno/generador-titulos-canciones` |
| Song Tag Generator   | `/suno/song-tag-generator`         | `/suno/generador-tags-canciones`    |
| Album Name Generator | `/suno/album-name-generator`       | `/suno/generador-nombres-album`     |
| Cover Art Prompt     | `/suno/cover-art-prompt-generator` | `/suno/generador-prompts-portada`   |
| Remix Idea Generator | `/suno/remix-idea-generator`       | `/suno/generador-ideas-remix`       |

## Translation Key Strategy

Using flat key structure per project conventions:

```
sunoTitleGenerator.*
sunoTagGenerator.*
sunoAlbumName.*
sunoCoverArt.*
sunoRemixIdea.*
```

Each tool needs ~40 translation keys:

- Header/title/description (3)
- Form labels and placeholders (10-15)
- Result labels and buttons (5)
- Features section (8)
- Hero section (2)
- How It Works (6)
- FAQ (10)
- Related tools (1)

Total: ~200 new translation keys across both languages.

## DeepSeek Prompt Patterns

Based on existing Suno prompts, effective patterns include:

1. **System prompt** establishing expertise context
2. **Structured output instructions** (numbered lists, specific counts)
3. **Language targeting** via `languageNames[language]` mapping
4. **Temperature settings**: 0.85-0.9 for creative content
5. **Max tokens**: 500-1000 depending on output length

## Resolved Questions

| Question                       | Decision                              | Rationale                             |
| ------------------------------ | ------------------------------------- | ------------------------------------- |
| Reuse GENRES/MOODS constants?  | Yes                                   | Consistency across Suno tools         |
| Output format for tags?        | Array of strings                      | Easy copy-all functionality           |
| Include Midjourney parameters? | Yes, when platform selected           | Users expect platform-specific output |
| Remix idea detail level?       | Structured (genre + tempo + elements) | Actionable for Suno recreation        |
