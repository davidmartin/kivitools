# API Contracts: Video Generator

**Feature**: 003-auto-video-social  
**Base Path**: `/api/admin/video-generator`

## POST /api/admin/video-generator/prompt

Generate a Veo 2 prompt for a selected tool.

### Request

```typescript
interface GeneratePromptRequest {
  platform: string; // e.g., "tiktok"
  toolSlug: string; // e.g., "script-writer"
  toolName: string; // Translated name, e.g., "TikTok Script Writer"
  toolDescription: string; // Translated description
  language: "en" | "es"; // Output language
}
```

### Response

```typescript
interface GeneratePromptResponse {
  success: boolean;
  prompt?: string; // Generated Veo 2 prompt
  error?: string; // Error message if failed
}
```

### Example Request

```json
{
  "platform": "tiktok",
  "toolSlug": "script-writer",
  "toolName": "TikTok Script Writer",
  "toolDescription": "Generate engaging scripts for your TikTok videos",
  "language": "en"
}
```

### Example Response (Success)

```json
{
  "success": true,
  "prompt": "**STYLE**: Modern, vibrant tech aesthetic with purple and pink gradients\n**ASPECT**: 9:16 vertical format for TikTok\n**DURATION**: 8 seconds\n\n**SCENE**: A smartphone screen showing the TikTok Script Writer interface. The camera slowly zooms in as animated text appears: \"Never run out of ideas again!\" Purple particles float around the screen. A hand taps the \"Generate\" button and creative scripts appear with a satisfying animation.\n\n**CAMERA**: Slow zoom in, slight rotation for dynamism\n**TEXT OVERLAY**: \"AI Script Writer\" appears at top, \"Free Tool\" pulses at bottom\n**MOOD**: Exciting, innovative, empowering"
}
```

### Example Response (Error)

```json
{
  "success": false,
  "error": "Failed to generate prompt. Please try again."
}
```

### Error Codes

| HTTP | Code                | Description             |
| ---- | ------------------- | ----------------------- |
| 400  | `MISSING_FIELDS`    | Required fields missing |
| 401  | `UNAUTHORIZED`      | Not authenticated       |
| 403  | `FORBIDDEN`         | Not an admin            |
| 500  | `GENERATION_FAILED` | DeepSeek API error      |

---

## POST /api/admin/video-generator/caption

Generate a TikTok caption for a tool.

### Request

```typescript
interface GenerateCaptionRequest {
  platform: string; // e.g., "tiktok"
  toolSlug: string; // e.g., "script-writer"
  toolName: string; // Translated name
  toolDescription: string; // Translated description
  language: "en" | "es"; // Output language
}
```

### Response

```typescript
interface GenerateCaptionResponse {
  success: boolean;
  caption?: string; // Full caption text
  hashtags?: string[]; // Array of hashtags (without #)
  toolUrl?: string; // Full URL to tool
  error?: string; // Error message if failed
}
```

### Example Request

```json
{
  "platform": "tiktok",
  "toolSlug": "script-writer",
  "toolName": "TikTok Script Writer",
  "toolDescription": "Generate engaging scripts for your TikTok videos",
  "language": "en"
}
```

### Example Response (Success)

```json
{
  "success": true,
  "caption": "🔥 Stop staring at a blank screen!\n\nThis FREE AI tool writes TikTok scripts for you in seconds. Just enter your topic and boom - viral-worthy content ready to record.\n\n✨ Try it now (link in bio)\n🔗 kivitools.com/tiktok/script-writer",
  "hashtags": [
    "tiktok",
    "tiktoktips",
    "contentcreator",
    "aitools",
    "scriptwriting",
    "viralvideo",
    "socialmedia",
    "creator"
  ],
  "toolUrl": "https://kivitools.com/tiktok/script-writer"
}
```

### Example Response (Error)

```json
{
  "success": false,
  "error": "Failed to generate caption. Please try again."
}
```

### Error Codes

| HTTP | Code                | Description             |
| ---- | ------------------- | ----------------------- |
| 400  | `MISSING_FIELDS`    | Required fields missing |
| 401  | `UNAUTHORIZED`      | Not authenticated       |
| 403  | `FORBIDDEN`         | Not an admin            |
| 500  | `GENERATION_FAILED` | DeepSeek API error      |

---

## Authentication

Both endpoints require admin authentication:

1. User must be logged in (Appwrite session)
2. User must have `admin` label in `user.labels`

Check performed server-side using Appwrite SDK.

## Rate Limiting

No specific rate limiting for admin endpoints (single admin user).

## CORS

Same-origin only (admin pages are internal).
