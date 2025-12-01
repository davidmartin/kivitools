# Data Model: OnlyFans Creator AI Tools

**Feature**: 013-onlyfans-creator-tools  
**Date**: November 30, 2025  
**Status**: Complete

## Entities

### 1. CreatorProfile (Input Entity)

Represents the information a creator provides to generate content.

| Field        | Type   | Required | Validation  | Description                                              |
| ------------ | ------ | -------- | ----------- | -------------------------------------------------------- |
| niche        | string | Yes      | 1-100 chars | Content niche (fitness, lifestyle, cosplay, etc.)        |
| personality  | string | No       | 0-200 chars | Personality traits and style                             |
| uniqueTraits | string | No       | 0-200 chars | What makes the creator unique                            |
| tone         | string | Yes      | enum        | Selected tone (playful, mysterious, friendly, exclusive) |

**Used by**: Bio Generator

### 2. PostContext (Input Entity)

Represents the context for a post caption.

| Field       | Type    | Required | Validation  | Description                                  |
| ----------- | ------- | -------- | ----------- | -------------------------------------------- |
| description | string  | Yes      | 1-300 chars | Description of post content                  |
| tone        | string  | Yes      | enum        | Caption tone (playful, mysterious, friendly) |
| length      | string  | No       | enum        | short, medium, long (default: medium)        |
| includeCTA  | boolean | No       | -           | Include call-to-action (default: false)      |
| niche       | string  | No       | 0-50 chars  | Content niche for terminology                |

**Used by**: Caption Generator

### 3. PPVContent (Input Entity)

Represents PPV message generation context.

| Field              | Type   | Required | Validation  | Description                            |
| ------------------ | ------ | -------- | ----------- | -------------------------------------- |
| contentDescription | string | Yes      | 1-300 chars | Description of exclusive content       |
| pricePoint         | string | No       | 0-20 chars  | Price (e.g., "$15", "15")              |
| urgency            | string | No       | enum        | none, limited, special (default: none) |

**Used by**: PPV Message Generator

### 4. SubscriberContext (Input Entity)

Represents welcome message generation context.

| Field        | Type    | Required | Validation  | Description                                |
| ------------ | ------- | -------- | ----------- | ------------------------------------------ |
| personality  | string  | Yes      | 1-200 chars | Creator's personality                      |
| contentType  | string  | Yes      | 1-100 chars | Type of content created                    |
| tier         | string  | No       | 0-50 chars  | Subscription tier name                     |
| encourageDMs | boolean | No       | -           | Encourage DM conversations (default: true) |

**Used by**: Welcome Message Generator

### 5. GeneratedContent (Output Entity)

Represents AI-generated content stored in Appwrite.

| Field        | Type     | Description                                                                        |
| ------------ | -------- | ---------------------------------------------------------------------------------- |
| id           | string   | Auto-generated unique ID                                                           |
| platform     | string   | Always "onlyfans"                                                                  |
| tool         | string   | bio-generator, caption-generator, ppv-message-generator, welcome-message-generator |
| requestData  | object   | Sanitized input parameters                                                         |
| responseData | object   | Generated content array                                                            |
| userIp       | string   | Hashed user IP for analytics                                                       |
| language     | string   | Output language (en, es)                                                           |
| createdAt    | datetime | Generation timestamp                                                               |

**Stored in**: Appwrite `generations` collection

## Enums

### ToneOptions

```typescript
type BioTone =
  | "playful"
  | "mysterious"
  | "friendly"
  | "exclusive"
  | "professional";
type CaptionTone = "playful" | "mysterious" | "friendly" | "teasing";
type UrgencyLevel = "none" | "limited" | "special";
type CaptionLength = "short" | "medium" | "long";
```

## Relationships

```
CreatorProfile ─────► Bio Generator ─────► GeneratedContent (5 bios)
PostContext ────────► Caption Generator ──► GeneratedContent (5 captions)
PPVContent ─────────► PPV Generator ──────► GeneratedContent (5 messages)
SubscriberContext ──► Welcome Generator ──► GeneratedContent (5 messages)
```

## State Transitions

### Generation Flow

```
IDLE → VALIDATING → VERIFYING → GENERATING → SUCCESS
         │             │            │
         ▼             ▼            ▼
       ERROR        ERROR        ERROR
   (validation)   (turnstile)   (deepseek)
```

1. **IDLE**: User on form, inputs empty
2. **VALIDATING**: Client-side validation running
3. **VERIFYING**: Turnstile token being verified
4. **GENERATING**: DeepSeek API call in progress
5. **SUCCESS**: Content generated, displayed to user
6. **ERROR**: Any step failed, error message shown

## Constraints

### Business Rules

1. Bio output MUST be ≤150 characters per variation (FR-003)
2. Short captions MUST be ≤100 characters (User Story 2, Scenario 4)
3. All outputs MUST be professional, no explicit content (FR-010, FR-017)
4. Always generate exactly 5 variations per request (FR-003, FR-005, FR-007, FR-009)

### Technical Constraints

1. Turnstile token required before generation (FR-011)
2. All generations logged to Appwrite (FR-014)
3. Both EN and ES output languages supported (FR-012)
