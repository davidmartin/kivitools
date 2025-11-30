# Data Model: Suno Tools Expansion

**Feature**: 010-suno-tools-expansion  
**Date**: November 30, 2025

## Overview

Data models for 5 new Suno tools. No persistent storage required - all data flows through API requests/responses and is logged to Appwrite.

## Shared Constants

### Genres (reused across tools)

```typescript
type Genre =
  | "pop"
  | "rap"
  | "indie"
  | "rock"
  | "reggaeton"
  | "electronic"
  | "rnb"
  | "acoustic"
  | "metal"
  | "jazz";
```

### Moods (reused across tools)

```typescript
type Mood =
  | "uplifting"
  | "energetic"
  | "sad"
  | "romantic"
  | "aggressive"
  | "calm"
  | "mysterious"
  | "motivational"
  | "playful"
  | "dark";
```

### Language

```typescript
type OutputLanguage = "en" | "es";
```

## Tool-Specific Models

### 1. Song Title Generator

**Request**:

```typescript
interface SongTitleRequest {
  description: string; // Song theme/story (required, max 500 chars)
  genre: Genre; // Musical genre
  mood: Mood; // Emotional tone
  language: OutputLanguage;
  turnstileToken: string;
}
```

**Response**:

```typescript
interface SongTitleResponse {
  success: boolean;
  titles?: string[]; // Array of 10 titles
  error?: string;
}
```

### 2. Song Tag Generator

**Request**:

```typescript
interface SongTagRequest {
  description: string; // Song description (required, max 500 chars)
  genre: Genre;
  mood: Mood;
  language: OutputLanguage;
  turnstileToken: string;
}
```

**Response**:

```typescript
interface SongTagResponse {
  success: boolean;
  tags?: string[]; // Array of 15-20 tags
  error?: string;
}
```

### 3. Album Name Generator

**Request**:

```typescript
type ReleaseType = "album" | "ep" | "single" | "mixtape";

interface AlbumNameRequest {
  concept: string; // Album concept/theme (required, max 500 chars)
  genre: Genre;
  releaseType: ReleaseType;
  trackCount?: number; // Optional, 1-30
  language: OutputLanguage;
  turnstileToken: string;
}
```

**Response**:

```typescript
interface AlbumNameResponse {
  success: boolean;
  names?: string[]; // Array of 10 album names
  error?: string;
}
```

### 4. Cover Art Prompt Generator

**Request**:

```typescript
type ArtStyle =
  | "digital-art"
  | "photography"
  | "illustration"
  | "3d-render"
  | "abstract"
  | "minimalist"
  | "vintage"
  | "neon";

type ArtPlatform = "midjourney" | "dalle" | "stable-diffusion" | "generic";

interface CoverArtPromptRequest {
  songTitle: string; // Song/album title (required, max 200 chars)
  genre: Genre;
  mood: Mood;
  artStyle: ArtStyle;
  targetPlatform: ArtPlatform;
  language: OutputLanguage;
  turnstileToken: string;
}
```

**Response**:

```typescript
interface CoverArtPromptResponse {
  success: boolean;
  prompts?: string[]; // Array of 3-5 detailed prompts
  error?: string;
}
```

### 5. Remix Idea Generator

**Request**:

```typescript
type RemixStyle =
  | "genre-flip"
  | "club-remix"
  | "acoustic"
  | "orchestral"
  | "lo-fi"
  | "experimental"
  | "vintage";

interface RemixIdeaRequest {
  originalSong: string; // Original song description (required, max 500 chars)
  originalGenre: Genre;
  remixStyle: RemixStyle;
  language: OutputLanguage;
  turnstileToken: string;
}
```

**Response**:

```typescript
interface RemixIdea {
  title: string; // Remix concept title
  targetGenre: string; // New genre
  tempoChange: string; // "faster" | "slower" | "similar"
  keepElements: string[]; // Elements to preserve
  addElements: string[]; // New elements to add
  productionNotes: string; // Brief production guidance
}

interface RemixIdeaResponse {
  success: boolean;
  ideas?: RemixIdea[]; // Array of 5-7 structured ideas
  error?: string;
}
```

## Appwrite Logging Schema

All tools log to existing `generations` collection:

```typescript
interface GenerationLog {
  platform: "suno";
  tool: string; // e.g., "song-title-generator"
  requestData: object; // Request payload (without turnstileToken)
  responseData: object; // Response data
  userIp: string;
  language: string;
  createdAt: Date;
}
```

## Validation Rules

| Field                            | Rule                                 |
| -------------------------------- | ------------------------------------ |
| description/concept/originalSong | Required, 1-500 characters           |
| songTitle                        | Required, 1-200 characters           |
| genre                            | Must be valid Genre enum value       |
| mood                             | Must be valid Mood enum value        |
| releaseType                      | Must be valid ReleaseType enum value |
| artStyle                         | Must be valid ArtStyle enum value    |
| targetPlatform                   | Must be valid ArtPlatform enum value |
| remixStyle                       | Must be valid RemixStyle enum value  |
| trackCount                       | Optional, 1-30 if provided           |
| turnstileToken                   | Required, validated server-side      |

## State Diagram: User Flow

```
[Start] --> [Fill Form] --> [Turnstile Verify] --> [Generate Button Enabled]
    |
    v
[Click Generate] --> [API Request] --> [DeepSeek Processing]
    |
    v
[Results Display] <-- [Success] or [Error Message]
    |
    v
[Copy Individual] or [Copy All] or [Generate Again] --> [Reset Form]
```
