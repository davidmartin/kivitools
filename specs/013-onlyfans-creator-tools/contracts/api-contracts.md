# API Contracts: OnlyFans Creator AI Tools

**Feature**: 013-onlyfans-creator-tools  
**Date**: November 30, 2025  
**Base URL**: `/api/tools/onlyfans`

## Common Types

```typescript
interface BaseRequest {
  turnstileToken: string; // Required for all endpoints
  language: "en" | "es"; // Output language
}

interface SuccessResponse {
  success: true;
  result: string[]; // Always 5 items
}

interface ErrorResponse {
  success: false;
  error: string;
}
```

## Endpoints

### 1. Bio Generator

**POST** `/api/tools/onlyfans/bio-generator`

#### Request

```typescript
interface BioGeneratorRequest extends BaseRequest {
  niche: string; // Required: 1-100 chars
  personality?: string; // Optional: personality traits
  unique?: string; // Optional: unique selling points
  tone: "playful" | "mysterious" | "friendly" | "exclusive" | "professional";
}
```

#### Response

```typescript
// 200 OK
{
  "success": true,
  "result": [
    "✨ Fitness enthusiast sharing exclusive workout tips and motivation 💪",
    "Your daily dose of inspiration and behind-the-scenes content 🌟",
    "Join me on my fitness journey - tips, routines & real talk 🔥",
    "Premium fitness content creator | DM for custom plans 💫",
    "Bringing you exclusive workouts and motivation daily ⚡"
  ]
}

// 400 Bad Request
{
  "success": false,
  "error": "Niche is required"
}

// 403 Forbidden
{
  "success": false,
  "error": "Bot verification failed"
}
```

---

### 2. Caption Generator

**POST** `/api/tools/onlyfans/caption-generator`

#### Request

```typescript
interface CaptionGeneratorRequest extends BaseRequest {
  description: string; // Required: post description
  tone: "playful" | "mysterious" | "friendly" | "teasing";
  length?: "short" | "medium" | "long"; // Default: medium
  includeCTA?: boolean; // Default: false
  niche?: string; // Optional: for terminology
}
```

#### Response

```typescript
// 200 OK
{
  "success": true,
  "result": [
    "New content just dropped 🔥 Who's ready?",
    "Something special coming your way today ✨",
    "Check your inbox for a surprise 💌",
    "Made this just for you 💕 Let me know what you think!",
    "Your support means everything 🙏 New post live now!"
  ]
}
```

---

### 3. PPV Message Generator

**POST** `/api/tools/onlyfans/ppv-message-generator`

#### Request

```typescript
interface PPVMessageRequest extends BaseRequest {
  content: string; // Required: content description
  pricePoint?: string; // Optional: price
  urgency?: "none" | "limited" | "special"; // Default: none
}
```

#### Response

```typescript
// 200 OK
{
  "success": true,
  "result": [
    "Hey! I made something special just for you 💕 Check it out!",
    "Exclusive content alert! 🔔 This one's too good to miss",
    "I think you're going to love this... 👀✨",
    "Something new and exclusive waiting for you! 💫",
    "Made with love, just for my VIPs like you 💝"
  ]
}
```

---

### 4. Welcome Message Generator

**POST** `/api/tools/onlyfans/welcome-message-generator`

#### Request

```typescript
interface WelcomeMessageRequest extends BaseRequest {
  personality: string; // Required: creator personality
  contentType: string; // Required: type of content
  tier?: string; // Optional: subscription tier
  encourageDMs?: boolean; // Default: true
}
```

#### Response

```typescript
// 200 OK
{
  "success": true,
  "result": [
    "Welcome to the family! 🎉 So excited to have you here...",
    "Hey there! Thanks for subscribing 💕 Can't wait to share...",
    "Welcome! 🌟 You just made my day by joining...",
    "Hi new friend! 👋 I'm so happy you're here...",
    "Welcome aboard! ✨ You're now part of something special..."
  ]
}
```

## Error Codes

| HTTP Code | Meaning      | When                                     |
| --------- | ------------ | ---------------------------------------- |
| 200       | Success      | Content generated successfully           |
| 400       | Bad Request  | Missing/invalid required fields          |
| 403       | Forbidden    | Turnstile verification failed            |
| 500       | Server Error | DeepSeek API error or unexpected failure |

## Rate Limiting

Rate limiting is handled by Turnstile token verification. Each valid token allows one generation request.

## Content Moderation

All responses are generated with content moderation guardrails. The API will never return explicit or adult content regardless of input.
