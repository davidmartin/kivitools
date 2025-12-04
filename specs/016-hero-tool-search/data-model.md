# Data Model: Hero Tool Search with Auto-Create

**Feature**: 016-hero-tool-search  
**Date**: 2024-12-04

## Entities

### SearchResult (Unified)

Represents a tool in search results, regardless of source.

| Field          | Type                      | Required | Description                                              |
| -------------- | ------------------------- | -------- | -------------------------------------------------------- |
| id             | string                    | ✅       | Unique identifier (slug for official, $id for community) |
| name           | string                    | ✅       | Display name of the tool                                 |
| description    | string                    | ✅       | Short description                                        |
| platform       | string                    | ✅       | Platform identifier (tiktok, instagram, etc.)            |
| href           | string                    | ✅       | Full URL path to the tool                                |
| type           | "official" \| "community" | ✅       | Source type                                              |
| icon           | string                    | ❌       | Emoji icon (official tools only)                         |
| authorName     | string                    | ❌       | Creator name (community tools only)                      |
| relevanceScore | number                    | ✅       | Search ranking score (0-110)                             |

### OfficialTool (Static Index)

Extracted from platform page definitions.

| Field          | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| id             | string | ✅       | Unique identifier derived from href |
| name           | string | ✅       | Display name (from translation key) |
| nameKey        | string | ✅       | Translation key for name            |
| description    | string | ✅       | Description (from translation key)  |
| descriptionKey | string | ✅       | Translation key for description     |
| platform       | string | ✅       | Platform identifier                 |
| href           | string | ✅       | URL path                            |
| icon           | string | ✅       | Emoji icon                          |

### CommunityTool (Appwrite - Existing)

Already exists in Appwrite "tools" collection.

| Field           | Type                                  | Required | Description                         |
| --------------- | ------------------------------------- | -------- | ----------------------------------- |
| $id             | string                                | ✅       | Appwrite document ID (used as slug) |
| name            | string                                | ✅       | Tool name                           |
| description     | string                                | ✅       | Tool description                    |
| platform        | string                                | ✅       | Platform identifier                 |
| slug            | string                                | ✅       | URL slug (same as $id)              |
| author_name     | string                                | ✅       | Creator display name                |
| author_id       | string                                | ✅       | Appwrite user ID                    |
| status          | "pending" \| "approved" \| "rejected" | ✅       | Moderation status                   |
| inputs          | string (JSON)                         | ✅       | Input configuration                 |
| prompt_template | string                                | ✅       | AI prompt template                  |

### AutoCreateRequest

Data sent to generate tool configuration from search query.

| Field             | Type         | Required | Description                |
| ----------------- | ------------ | -------- | -------------------------- |
| query             | string       | ✅       | User's search query        |
| language          | "en" \| "es" | ✅       | Output language            |
| suggestedPlatform | string       | ❌       | Platform hint from context |

### AutoCreateResponse

AI-generated tool configuration.

| Field          | Type        | Required | Description                  |
| -------------- | ----------- | -------- | ---------------------------- |
| name           | string      | ✅       | Generated tool name          |
| description    | string      | ✅       | Generated description        |
| platform       | string      | ✅       | Inferred or default platform |
| promptTemplate | string      | ✅       | Generated AI prompt template |
| inputs         | ToolInput[] | ✅       | Suggested input fields       |

### ToolInput (Existing)

Already defined in builder.

| Field       | Type                                         | Required | Description                          |
| ----------- | -------------------------------------------- | -------- | ------------------------------------ |
| id          | string                                       | ✅       | Input field identifier               |
| label       | string                                       | ✅       | Display label                        |
| type        | "text" \| "textarea" \| "select" \| "number" | ✅       | Input type                           |
| placeholder | string                                       | ❌       | Placeholder text                     |
| options     | string                                       | ❌       | Comma-separated options (for select) |
| required    | boolean                                      | ✅       | Is field required                    |

## Relationships

```
┌─────────────────┐     ┌─────────────────┐
│  OfficialTool   │     │  CommunityTool  │
│  (static index) │     │   (Appwrite)    │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │    transform          │    transform
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │ SearchResult│
              │  (unified)  │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Display   │
              │ in dropdown │
              └─────────────┘

┌─────────────────┐     ┌─────────────────┐
│ AutoCreateRequest│──▶ │AutoCreateResponse│
│ (search query)  │ AI  │  (tool config)  │
└─────────────────┘     └────────┬────────┘
                                 │
                          ┌──────▼──────┐
                          │   Builder   │
                          │ pre-filled  │
                          └─────────────┘
```

## State Transitions

### Search Flow

```
[Initial] ─────▶ [Typing] ─────▶ [Searching] ─────▶ [Results]
                    │                                   │
                    │ <2 chars                         │ click
                    ▼                                   ▼
                [No Search]                      [Navigate to Tool]
```

### Auto-Create Flow

```
[Search Results] ──▶ [Click Create] ──▶ [Check Auth]
                                              │
                          ┌───────────────────┴───────────────────┐
                          │                                       │
                    [Authenticated]                         [Not Auth]
                          │                                       │
                          ▼                                       ▼
                   [Generate Config]                      [Save Context]
                          │                                       │
                          ▼                                       ▼
                   [Open Builder]                          [Redirect Login]
                   (pre-filled)                                   │
                                                                  ▼
                                                           [After Login]
                                                                  │
                                                                  ▼
                                                           [Resume Flow]
```

## Validation Rules

### Search Query

- Minimum 2 characters to trigger search
- Maximum 100 characters
- Sanitized: trim whitespace, normalize unicode

### Auto-Create Query

- Non-empty after sanitization
- Must not contain only special characters
- Language must be "en" or "es"

## Indexes (Appwrite - Existing)

The "tools" collection already has:

- `status` index for filtering approved tools
- `platform` index for platform filtering
- `author_id` index for user's tools

**New Index Recommended**:

- Fulltext index on `name` + `description` for better search (optional optimization)
