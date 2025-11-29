# Research: New Viral Platforms

**Feature**: 006-viral-platforms  
**Date**: November 28, 2025

## Platform Research

### 1. Bluesky

**Decision**: Include as P1 priority platform

**Rationale**:

- Fastest-growing Twitter/X alternative with 25M+ users (as of Nov 2024)
- Decentralized protocol (AT Protocol) with open API
- Character limit: 300 characters per post
- No algorithmic feed - chronological timeline
- Growing creator community migrating from Twitter

**Alternatives Considered**:

- Mastodon: More established but fragmented across instances, harder to explain to users
- Threads: Already in KiviTools (threads platform exists)

**Platform-specific requirements**:

- Post character limit: 300 chars
- Bio character limit: 256 chars
- Thread format: Main post + replies (no native threading)
- No hashtag system (uses searchable text)
- Custom feeds via algorithms users can choose

**Color scheme**: Sky blue (#0085FF)

---

### 2. Lemon8

**Decision**: Include as P2 priority platform

**Rationale**:

- ByteDance's lifestyle platform (TikTok's sister app)
- 5M+ monthly active users, growing rapidly
- Combines Instagram aesthetics + Pinterest discoverability
- Popular for: beauty, fashion, travel, food, lifestyle
- Strong among Gen Z and millennials

**Alternatives Considered**:

- Xiaohongshu (RED): Similar but primarily Chinese market, less relevant for EN/ES users

**Platform-specific requirements**:

- Caption character limit: 2,200 chars
- Bio character limit: 80 chars
- Strong emphasis on formatted text (bullet points, spacing)
- Hashtag-heavy discovery system
- Template-based content encouraged

**Color scheme**: Lime green (#3EE98E)

---

### 3. Kick

**Decision**: Include as P3 priority platform

**Rationale**:

- Fastest-growing Twitch competitor
- 95/5 revenue split vs Twitch's 50/50
- More relaxed content policies
- 35M+ monthly active users
- Major streamers migrating (xQc, Adin Ross, etc.)

**Alternatives Considered**:

- Rumble: More political/news focused, different audience
- YouTube Gaming: Already have YouTube platform

**Platform-specific requirements**:

- Stream title limit: 140 chars
- Bio limit: 300 chars
- Panel descriptions: No strict limit
- Chat rules: Similar to Twitch
- Different community culture (more edgy, less corporate)

**Color scheme**: Neon green (#53FC18)

---

### 4. Telegram

**Decision**: Include as P4 priority platform

**Rationale**:

- 900M+ monthly active users
- Essential for crypto, tech, news communities
- Channel/group management is complex
- Markdown formatting support
- Growing creator economy

**Alternatives Considered**:

- Signal: More privacy-focused but no channel system
- WhatsApp Channels: Limited functionality

**Platform-specific requirements**:

- Message limit: 4,096 chars
- Channel description: 255 chars
- Supports Markdown (bold, italic, code, links)
- Pin messages, scheduled posts
- Bot integration possibilities

**Color scheme**: Telegram blue (#0088CC)

---

### 5. BeReal

**Decision**: Include as P5 priority platform

**Rationale**:

- 73M+ downloads, 25M daily active users
- Authenticity-focused platform
- Popular with Gen Z
- Low commitment, casual use case
- Growing brand presence

**Alternatives Considered**:

- Dispo: Similar concept but less popular
- Locket: Widget-based, different use case

**Platform-specific requirements**:

- Caption limit: 500 chars
- Bio limit: 150 chars
- Focus on authenticity and humor
- RealMoji reactions (selfie-based reactions)
- No hashtags or discoverability features

**Color scheme**: Black (#000000)

---

## Technical Research

### Logo Dark Mode Support

Based on existing `platform-logo.tsx` pattern:

```typescript
const needsInvert =
  platform === "twitter" ||
  platform === "suno" ||
  platform === "elevenlabs" ||
  platform === "amazon" ||
  platform === "threads";
```

**New platforms requiring dark mode invert**:

- `kick` - Green on transparent, needs invert for dark mode
- `bereal` - Black text/logo, needs invert for dark mode

**New platforms NOT requiring invert**:

- `bluesky` - Blue logo works on both backgrounds
- `lemon8` - Green logo works on both backgrounds
- `telegram` - Blue logo works on both backgrounds

### Existing Pattern Analysis

**Translation file structure** (from `lib/locales/en/`):

- `common.ts` - Navigation keys (`nav.bluesky`, etc.)
- `platforms.ts` - Platform descriptions (`bluesky.page.description`)
- `tools/[platform]/[tool].ts` - Tool-specific translations

**API route pattern** (from existing tools):

```typescript
// Required imports
import { NextRequest, NextResponse } from "next/server";
import { generate[Tool]Content } from "@/lib/deepseek";
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
import { verifyTurnstileToken } from "@/lib/turnstile";

// Turnstile verification required
// Appwrite logging required
// Language parameter for output language
```

**DeepSeek function pattern**:

```typescript
export async function generate[Platform][Tool]({
  param1,
  param2,
  language = "en",
}: {
  param1: string;
  param2: string;
  language?: string;
}): Promise<string | string[]> {
  // Platform-specific prompt with character limits
  // Temperature: 0.8-0.9 for creative content
}
```

### URL Naming Conventions (Spanish)

Following existing patterns in `next.config.ts`:

| English                  | Spanish                   |
| ------------------------ | ------------------------- |
| `post-generator`         | `generador-publicaciones` |
| `bio-generator`          | `generador-bio`           |
| `thread-composer`        | `compositor-hilos`        |
| `caption-generator`      | `generador-subtitulos`    |
| `content-ideas`          | `ideas-contenido`         |
| `stream-title`           | `titulo-stream`           |
| `chat-rules`             | `reglas-chat`             |
| `announcement-generator` | `generador-anuncios`      |
| `channel-description`    | `descripcion-canal`       |
| `welcome-message`        | `mensaje-bienvenida`      |
| `realmoji-ideas`         | `ideas-realmoji`          |

---

## Character Limits Summary

| Platform | Post/Content      | Bio       | Notes                |
| -------- | ----------------- | --------- | -------------------- |
| Bluesky  | 300 chars         | 256 chars | No hashtags          |
| Lemon8   | 2,200 chars       | 80 chars  | Formatting important |
| Kick     | 140 chars (title) | 300 chars | Stream titles        |
| Telegram | 4,096 chars       | 255 chars | Markdown support     |
| BeReal   | 500 chars         | 150 chars | Authenticity focus   |

---

## Resolved Clarifications

All NEEDS CLARIFICATION items from Technical Context have been resolved:

1. **Logo dark mode behavior**: Kick and BeReal need invert; Bluesky, Lemon8, Telegram do not
2. **Character limits**: All platforms researched and documented
3. **Spanish URL conventions**: Following existing patterns
4. **Translation structure**: Using existing 6-language locale structure
5. **API route pattern**: Following existing Turnstile + Appwrite pattern
