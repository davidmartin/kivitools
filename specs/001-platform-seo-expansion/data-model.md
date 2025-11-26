# Data Model: Platform SEO Expansion

**Feature**: 001-platform-seo-expansion  
**Date**: 2025-11-25  
**Status**: Complete

## Entities

### Platform

Represents a digital platform that hosts user-generated content.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | string | Unique identifier (slug) | lowercase, alphanumeric |
| name | string | Display name | From translations |
| logo | string | Path to SVG file | `/public/platforms/{id}.svg` |
| color | string | Brand hex color | 6-char hex |
| tools | Tool[] | Collection of tools | Min 2 tools |

**New Platforms**:
- `pinterest` - Pinterest (visual discovery)
- `spotify` - Spotify (music streaming)  
- `facebook` - Facebook (social network)
- `threads` - Threads (text-based social)

### Tool

Represents an AI-powered content generation tool.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | string | Unique identifier (slug) | lowercase, hyphenated |
| platform | string | Parent platform ID | FK to Platform |
| name | string | Display name | From translations |
| description | string | Short description | From translations |
| icon | string | Emoji icon | Single emoji |
| href | string | URL path | `/{platform}/{tool-id}` |
| inputs | InputField[] | Form fields | Min 1 field |
| output | OutputConfig | Generation output | Single or array |

### InputField

Configuration for a tool's input form field.

| Field | Type | Description | Options |
|-------|------|-------------|---------|
| name | string | Field identifier | camelCase |
| type | enum | Field type | `text`, `textarea`, `select`, `checkbox` |
| labelKey | string | Translation key | `{tool}.form.{name}` |
| required | boolean | Is required? | Default: true |
| maxLength | number | Character limit | Optional |
| options | Option[] | For select type | Optional |

### Generation (Appwrite)

Log record for each content generation (existing schema).

| Field | Type | Description |
|-------|------|-------------|
| platform | string | Platform ID |
| tool | string | Tool ID |
| requestData | object | Input parameters |
| responseData | object | Generated content |
| userIp | string | Anonymized IP |
| language | string | Output language |
| createdAt | datetime | Timestamp |

## New Tools by Platform

### Pinterest (3 tools)

#### pin-description
- **Inputs**: topic (textarea), keywords (text), tone (select), language (select)
- **Output**: Single string (SEO description)
- **Max Length**: 500 characters

#### board-name
- **Inputs**: theme (text), style (select), language (select)
- **Output**: Array of 5 strings
- **Max Length**: 50 characters each

#### profile-bio
- **Inputs**: businessType (text), personality (select), language (select)
- **Output**: Single string
- **Max Length**: 160 characters

### Spotify (3 tools)

#### playlist-name
- **Inputs**: theme (text), mood (select), genre (select), language (select)
- **Output**: Array of 5 strings
- **Max Length**: 100 characters each

#### playlist-description
- **Inputs**: theme (text), mood (select), featuredArtists (text), language (select)
- **Output**: Single string
- **Max Length**: 300 characters

#### artist-bio
- **Inputs**: artistName (text), genre (select), achievements (textarea), language (select)
- **Output**: Single string
- **Max Length**: 1500 characters

### Facebook (3 tools)

#### post-generator
- **Inputs**: topic (textarea), tone (select), ctaType (select), language (select)
- **Output**: Single string
- **Max Length**: 80 characters (optimal)

#### page-bio
- **Inputs**: businessType (text), tone (select), keywords (text), language (select)
- **Output**: Single string
- **Max Length**: 255 characters

#### ad-copy
- **Inputs**: product (text), audience (text), tone (select), cta (text), language (select)
- **Output**: Object { headline: string, primaryText: string }
- **Max Length**: Headline 40, Primary 125 characters

### Threads (2 tools)

#### post-generator
- **Inputs**: topic (textarea), tone (select), language (select)
- **Output**: Single string
- **Max Length**: 500 characters

#### bio-generator
- **Inputs**: personality (text), interests (text), language (select)
- **Output**: Single string
- **Max Length**: 150 characters

### TikTok Expansion (2 tools)

#### comment-reply
- **Inputs**: originalComment (textarea), tone (select), language (select)
- **Output**: Array of 5 strings (reply options)

#### duet-ideas
- **Inputs**: originalTopic (text), niche (select), language (select)
- **Output**: Array of 5 strings (duet concepts)

### Instagram Expansion (1 tool)

#### carousel-script
- **Inputs**: topic (textarea), slideCount (select: 3-10), tone (select), language (select)
- **Output**: Array of strings (one per slide)

## Type Definitions

```typescript
// types/index.ts additions

// Platform types
export type Platform = 
  | "tiktok" | "instagram" | "twitter" | "snapchat" 
  | "youtube" | "reddit" | "discord" | "twitch" 
  | "suno" | "elevenlabs" | "linkedin" | "forocoches" | "amazon"
  | "pinterest" | "spotify" | "facebook" | "threads"; // NEW

// Tool request/response types
export interface PinterestPinDescriptionRequest {
  topic: string;
  keywords?: string;
  tone: string;
  language: "en" | "es";
  turnstileToken: string;
}

export interface PinterestPinDescriptionResponse {
  success: boolean;
  description?: string;
  error?: string;
}

export interface SpotifyPlaylistNameRequest {
  theme: string;
  mood: string;
  genre: string;
  language: "en" | "es";
  turnstileToken: string;
}

export interface SpotifyPlaylistNameResponse {
  success: boolean;
  names?: string[];
  error?: string;
}

export interface FacebookAdCopyRequest {
  product: string;
  audience: string;
  tone: string;
  cta: string;
  language: "en" | "es";
  turnstileToken: string;
}

export interface FacebookAdCopyResponse {
  success: boolean;
  headline?: string;
  primaryText?: string;
  error?: string;
}

// ... similar patterns for other tools
```

## Validation Rules

| Tool | Field | Rule |
|------|-------|------|
| All | topic/theme | Required, min 3 chars, max 500 chars |
| All | language | Required, enum: "en" | "es" |
| All | turnstileToken | Required, non-empty string |
| All | tone | Required, from TONES constant |
| Pinterest pin-description | keywords | Optional, max 200 chars |
| Spotify playlist-description | featuredArtists | Optional, max 300 chars |
| Facebook ad-copy | product | Required, max 100 chars |
| Instagram carousel-script | slideCount | Required, range 3-10 |

## State Transitions

Tools have simple state: `idle` → `loading` → `success`/`error`

```
idle: Initial state, form editable
  ↓ [Generate clicked]
loading: Form disabled, spinner shown
  ↓ [API response]
success: Results shown, copy buttons available
  ↓ [Use Again clicked]
idle: Form reset, ready for new generation

error: Error message shown, form editable
  ↓ [Retry or new input]
loading: ...
```
