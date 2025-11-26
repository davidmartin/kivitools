# API Contracts: Platform SEO Expansion

**Feature**: 001-platform-seo-expansion  
**Date**: 2025-11-25  
**Base URL**: `/api/tools`

## Common Patterns

### Request Headers
```
Content-Type: application/json
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Error Codes
| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 403 | Forbidden - Turnstile verification failed |
| 500 | Internal Server Error - Generation failed |

---

## Pinterest APIs

### POST /api/tools/pinterest/pin-description

Generate SEO-optimized pin descriptions.

**Request Body**:
```typescript
{
  topic: string;        // Required, max 500 chars
  keywords?: string;    // Optional, max 200 chars
  tone: string;         // Required, from TONES
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  description: string;  // Max 500 chars
}
```

---

### POST /api/tools/pinterest/board-name

Generate creative Pinterest board names.

**Request Body**:
```typescript
{
  theme: string;        // Required, max 200 chars
  style: string;        // Required: "minimal" | "colorful" | "vintage" | "modern"
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  names: string[];      // 5 names, max 50 chars each
}
```

---

### POST /api/tools/pinterest/profile-bio

Generate Pinterest profile bio.

**Request Body**:
```typescript
{
  businessType: string;   // Required, max 100 chars
  personality: string;    // Required: "professional" | "friendly" | "creative"
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  bio: string;          // Max 160 chars
}
```

---

## Spotify APIs

### POST /api/tools/spotify/playlist-name

Generate creative playlist names.

**Request Body**:
```typescript
{
  theme: string;        // Required, max 200 chars
  mood: string;         // Required: "happy" | "chill" | "energetic" | "melancholic" | "romantic"
  genre: string;        // Required: "pop" | "rock" | "hiphop" | "electronic" | "indie" | "classical"
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  names: string[];      // 5 names, max 100 chars each
}
```

---

### POST /api/tools/spotify/playlist-description

Generate playlist description for Spotify.

**Request Body**:
```typescript
{
  theme: string;          // Required, max 200 chars
  mood: string;           // Required, from mood enum
  featuredArtists?: string; // Optional, max 300 chars
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  description: string;    // Max 300 chars
}
```

---

### POST /api/tools/spotify/artist-bio

Generate artist biography for Spotify.

**Request Body**:
```typescript
{
  artistName: string;     // Required, max 100 chars
  genre: string;          // Required, from genre enum
  achievements?: string;  // Optional, max 500 chars
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  bio: string;            // Max 1500 chars
}
```

---

## Facebook APIs

### POST /api/tools/facebook/post-generator

Generate engaging Facebook posts.

**Request Body**:
```typescript
{
  topic: string;        // Required, max 500 chars
  tone: string;         // Required, from TONES
  ctaType: string;      // Required: "none" | "comment" | "share" | "link" | "shop"
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  post: string;         // Optimal 40-80 chars
}
```

---

### POST /api/tools/facebook/page-bio

Generate Facebook page about section.

**Request Body**:
```typescript
{
  businessType: string;   // Required, max 100 chars
  tone: string;           // Required, from TONES
  keywords?: string;      // Optional, max 200 chars
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  bio: string;            // Max 255 chars
}
```

---

### POST /api/tools/facebook/ad-copy

Generate Facebook ad copy with headline and primary text.

**Request Body**:
```typescript
{
  product: string;      // Required, max 100 chars
  audience: string;     // Required, max 200 chars
  tone: string;         // Required, from TONES
  cta: string;          // Required, max 50 chars
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  headline: string;     // Max 40 chars
  primaryText: string;  // Max 125 chars
}
```

---

## Threads APIs

### POST /api/tools/threads/post-generator

Generate Threads posts.

**Request Body**:
```typescript
{
  topic: string;        // Required, max 500 chars
  tone: string;         // Required, from TONES
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  post: string;         // Max 500 chars
}
```

---

### POST /api/tools/threads/bio-generator

Generate Threads profile bio.

**Request Body**:
```typescript
{
  personality: string;  // Required, max 100 chars
  interests: string;    // Required, max 200 chars
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  bio: string;          // Max 150 chars
}
```

---

## TikTok Expansion APIs

### POST /api/tools/tiktok/comment-reply

Generate witty comment replies.

**Request Body**:
```typescript
{
  originalComment: string;  // Required, max 500 chars
  tone: string;             // Required, from TONES
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  replies: string[];        // 5 reply options
}
```

---

### POST /api/tools/tiktok/duet-ideas

Generate TikTok duet concepts.

**Request Body**:
```typescript
{
  originalTopic: string;    // Required, max 300 chars
  niche: string;            // Required: "comedy" | "dance" | "education" | "lifestyle" | "music"
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  ideas: string[];          // 5 duet concepts
}
```

---

## Instagram Expansion APIs

### POST /api/tools/instagram/carousel-script

Generate Instagram carousel scripts.

**Request Body**:
```typescript
{
  topic: string;        // Required, max 500 chars
  slideCount: number;   // Required, 3-10
  tone: string;         // Required, from TONES
  language: "en" | "es";
  turnstileToken: string;
}
```

**Response (200)**:
```typescript
{
  success: true;
  slides: string[];     // Array of length slideCount
}
```
