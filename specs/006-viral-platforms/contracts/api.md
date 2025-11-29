# API Contracts: New Viral Platforms

**Feature**: 006-viral-platforms  
**Date**: November 28, 2025  
**Base URL**: `/api/tools/[platform]/[tool]`

## Common Request/Response Patterns

### Authentication

All endpoints use Cloudflare Turnstile for bot protection.

### Common Request Fields

```typescript
{
  turnstileToken: string;  // Required - Cloudflare Turnstile token
  language?: "en" | "es" | "pt" | "fr" | "de" | "it";  // Output language, defaults to "en"
}
```

### Common Response Format

```typescript
// Success
{
  success: true;
  result: string | string[];
}

// Error
{
  success: false;
  error: string;
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `403` - Forbidden (Turnstile verification failed)
- `500` - Internal Server Error

---

## Bluesky Endpoints

### POST /api/tools/bluesky/post-generator

Generate Bluesky posts (max 300 characters).

**Request:**

```typescript
{
  topic: string;           // Required - Post topic
  tone: string;            // Required - casual | professional | funny | informative
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 post options (each ≤300 chars)
}
```

---

### POST /api/tools/bluesky/bio-generator

Generate Bluesky profile bio (max 256 characters).

**Request:**

```typescript
{
  description: string;     // Required - What the user does/is about
  style: string;           // Required - professional | creative | minimal | friendly
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤256 chars)
}
```

---

### POST /api/tools/bluesky/thread-composer

Generate Bluesky thread (main post + replies).

**Request:**

```typescript
{
  topic: string;           // Required - Thread topic
  points: number;          // Required - Number of posts (3-10)
  tone: string;            // Required - casual | professional | educational
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of posts (each ≤300 chars), first is main post
}
```

---

## Lemon8 Endpoints

### POST /api/tools/lemon8/caption-generator

Generate Lemon8 captions with formatting (max 2,200 characters).

**Request:**

```typescript
{
  topic: string;           // Required - Post topic
  aesthetic: string;       // Required - minimal | cozy | bold | soft | vibrant
  includeHashtags: boolean;// Optional - Include hashtags, default true
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted caption with bullet points and emojis
}
```

---

### POST /api/tools/lemon8/content-ideas

Generate Lemon8 content ideas by niche.

**Request:**

```typescript
{
  niche: string;           // Required - beauty | fashion | travel | food | lifestyle | fitness
  count: number;           // Optional - Number of ideas (5-10), default 5
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of content ideas with titles
}
```

---

### POST /api/tools/lemon8/bio-generator

Generate Lemon8 profile bio (max 80 characters).

**Request:**

```typescript
{
  niche: string;           // Required - User's content niche
  style: string;           // Required - aesthetic | professional | fun | minimal
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤80 chars)
}
```

---

## Kick Endpoints

### POST /api/tools/kick/stream-title

Generate Kick stream titles (max 140 characters).

**Request:**

```typescript
{
  game: string;            // Required - Game or activity
  vibe: string;            // Required - chill | hype | tryhard | memes | interactive
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 8 title options (each ≤140 chars)
}
```

---

### POST /api/tools/kick/bio-generator

Generate Kick channel bio (max 300 characters).

**Request:**

```typescript
{
  content: string;         // Required - What the streamer does
  schedule: string;        // Optional - Streaming schedule
  style: string;           // Required - professional | edgy | friendly | meme
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤300 chars)
}
```

---

### POST /api/tools/kick/chat-rules

Generate Kick chat rules.

**Request:**

```typescript
{
  strictness: string;      // Required - relaxed | moderate | strict
  focus: string;           // Required - inclusive | gaming | mature | family
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5-8 chat rules
}
```

---

## Telegram Endpoints

### POST /api/tools/telegram/announcement-generator

Generate Telegram channel announcement with markdown formatting.

**Request:**

```typescript
{
  topic: string;           // Required - Announcement topic
  type: string;            // Required - update | news | event | promotion
  includeEmojis: boolean;  // Optional - Include emojis, default true
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted announcement with Telegram markdown
}
```

---

### POST /api/tools/telegram/channel-description

Generate Telegram channel description (max 255 characters).

**Request:**

```typescript
{
  topic: string;           // Required - Channel topic/purpose
  type: string;            // Required - news | community | business | education | entertainment
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 description options (each ≤255 chars)
}
```

---

### POST /api/tools/telegram/welcome-message

Generate Telegram group welcome message.

**Request:**

```typescript
{
  groupName: string;       // Required - Name of the group
  purpose: string;         // Required - Group's purpose
  includeRules: boolean;   // Optional - Include basic rules, default false
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted welcome message with markdown
}
```

---

## BeReal Endpoints

### POST /api/tools/bereal/caption-generator

Generate BeReal captions (max 500 characters).

**Request:**

```typescript
{
  moment: string;          // Required - Description of the photo moment
  mood: string;            // Required - happy | tired | random | chaos | chill
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 caption options (each ≤500 chars)
}
```

---

### POST /api/tools/bereal/bio-generator

Generate BeReal profile bio (max 150 characters).

**Request:**

```typescript
{
  personality: string;     // Required - Brief personality description
  style: string;           // Required - honest | funny | minimal | chaotic
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤150 chars)
}
```

---

### POST /api/tools/bereal/realmoji-ideas

Generate RealMoji reaction ideas for friends' BeReals.

**Request:**

```typescript
{
  context: string;         // Required - Description of friend's BeReal
  relationship: string;    // Required - bestie | friend | acquaintance | crush
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 RealMoji face/caption ideas
}
```

---

## Validation Rules

### All Endpoints

- `turnstileToken` - Required, validated via Cloudflare API
- `language` - Optional, must be one of: en, es, pt, fr, de, it

### String Length Validations

- `topic`, `description`, `moment` - Min 3 chars, max 500 chars
- `game`, `content`, `niche` - Min 2 chars, max 200 chars

### Enum Validations

Each endpoint validates tone/style/type against allowed values (documented above).
