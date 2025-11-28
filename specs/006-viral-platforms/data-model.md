# Data Model: New Viral Platforms

**Feature**: 006-viral-platforms  
**Date**: November 28, 2025

## Entities

### Platform

Represents a supported digital platform in KiviTools.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | string | Platform identifier | Lowercase, alphanumeric (e.g., "bluesky") |
| `name` | string | Display name | From translations (`nav.[platform]`) |
| `emoji` | string | Platform icon emoji | Single emoji character |
| `color` | string | Brand color hex | Valid hex color |
| `tools` | Tool[] | Array of available tools | Min 3 tools required |
| `needsInvert` | boolean | Logo requires dark mode inversion | Based on logo design |

**New Platforms**:

| ID | Name | Emoji | Color | Needs Invert |
|----|------|-------|-------|--------------|
| `bluesky` | Bluesky | 🦋 | #0085FF | false |
| `lemon8` | Lemon8 | 🍋 | #3EE98E | false |
| `kick` | Kick | 🎮 | #53FC18 | true |
| `telegram` | Telegram | ✈️ | #0088CC | false |
| `bereal` | BeReal | 📷 | #000000 | true |

---

### Tool

Represents a content generation tool within a platform.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `name` | string | Translation key | Format: `[toolKey].title` |
| `href` | string | URL path | Format: `/[platform]/[tool-slug]` |
| `description` | string | Translation key | Format: `[toolKey].description` |
| `icon` | string | Display emoji | Single emoji character |
| `characterLimit` | number | Max output chars | Platform-specific |

**New Tools by Platform**:

#### Bluesky Tools

| Slug | Translation Key | Icon | Char Limit |
|------|----------------|------|------------|
| `post-generator` | `blueskyPost` | 📝 | 300 |
| `bio-generator` | `blueskyBio` | 👤 | 256 |
| `thread-composer` | `blueskyThread` | 🧵 | 300/post |

#### Lemon8 Tools

| Slug | Translation Key | Icon | Char Limit |
|------|----------------|------|------------|
| `caption-generator` | `lemon8Caption` | ✨ | 2200 |
| `content-ideas` | `lemon8Ideas` | 💡 | N/A |
| `bio-generator` | `lemon8Bio` | 👤 | 80 |

#### Kick Tools

| Slug | Translation Key | Icon | Char Limit |
|------|----------------|------|------------|
| `stream-title` | `kickStreamTitle` | 🎬 | 140 |
| `bio-generator` | `kickBio` | 👤 | 300 |
| `chat-rules` | `kickChatRules` | 📋 | N/A |

#### Telegram Tools

| Slug | Translation Key | Icon | Char Limit |
|------|----------------|------|------------|
| `announcement-generator` | `telegramAnnouncement` | 📢 | 4096 |
| `channel-description` | `telegramChannelDesc` | 📝 | 255 |
| `welcome-message` | `telegramWelcome` | 👋 | 4096 |

#### BeReal Tools

| Slug | Translation Key | Icon | Char Limit |
|------|----------------|------|------------|
| `caption-generator` | `berealCaption` | ✨ | 500 |
| `bio-generator` | `berealBio` | 👤 | 150 |
| `realmoji-ideas` | `berealRealmoji` | 😊 | N/A |

---

### Generation (Appwrite Collection)

Existing entity - no changes needed. Records each AI content generation.

| Field | Type | Description |
|-------|------|-------------|
| `platform` | string | Platform ID |
| `tool` | string | Tool slug |
| `requestData` | object | Input parameters |
| `responseData` | object | Generated content |
| `userIp` | string | Anonymized IP |
| `language` | string | Output language |
| `createdAt` | datetime | Timestamp |

---

## Type Definitions

### Platform Type (seo-metadata.ts)

```typescript
type Platform = 
  | "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" 
  | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs" 
  | "linkedin" | "forocoches" | "amazon" | "pinterest" | "spotify" 
  | "facebook" | "threads"
  // New platforms
  | "bluesky" | "lemon8" | "kick" | "telegram" | "bereal";
```

### Platform Logo Props (platform-logo.tsx)

```typescript
interface PlatformLogoProps {
  platform: 
    | "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" 
    | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs" 
    | "linkedin" | "forocoches" | "amazon" | "pinterest" | "spotify" 
    | "facebook" | "threads"
    // New platforms
    | "bluesky" | "lemon8" | "kick" | "telegram" | "bereal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}
```

### Tool Selector Props (tool-selector.tsx)

```typescript
interface ToolSelectorProps {
  platform: 
    | "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" 
    | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs" 
    | "forocoches" | "linkedin" | "amazon" | "pinterest" | "spotify" 
    | "facebook" | "threads"
    // New platforms
    | "bluesky" | "lemon8" | "kick" | "telegram" | "bereal";
}
```

---

## Translation Key Structure

### Navigation (common.ts)

```typescript
{
  "nav.bluesky": "Bluesky",
  "nav.lemon8": "Lemon8",
  "nav.kick": "Kick",
  "nav.telegram": "Telegram",
  "nav.bereal": "BeReal",
}
```

### Platform Descriptions (platforms.ts)

```typescript
{
  "bluesky.page.description": "[Fun description]",
  "lemon8.page.description": "[Fun description]",
  "kick.page.description": "[Fun description]",
  "telegram.page.description": "[Fun description]",
  "bereal.page.description": "[Fun description]",
}
```

### Tool Translations (tools/[platform]/[tool].ts)

Each tool requires these keys:
- `[key].title` - Tool name
- `[key].description` - Short description
- `[key].form.*` - Form labels and placeholders
- `[key].result.*` - Result section text
- `[key].features.*` - 4 feature cards
- `[key].hero.*` - Hero section content
- `[key].howItWorks.*` - 3 steps
- `[key].faq.*` - 5 Q&A pairs
- `[key].relatedTools.title` - Related tools section

---

## State Transitions

### Tool Generation Flow

```
IDLE → VALIDATING → GENERATING → SUCCESS/ERROR → IDLE

States:
- IDLE: Form ready for input
- VALIDATING: Turnstile verification in progress
- GENERATING: API call to DeepSeek in progress
- SUCCESS: Results displayed, copy buttons active
- ERROR: Error message displayed, retry available
```

### Form Reset ("Use Again")

```
SUCCESS/ERROR → IDLE

Actions:
- Clear results
- Reset form fields to defaults
- Clear Turnstile token (force re-verification)
- Clear error message
```
