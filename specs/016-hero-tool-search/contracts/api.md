# API Contracts: Hero Tool Search

**Feature**: 016-hero-tool-search  
**Date**: 2024-12-04

## Endpoints

### GET /api/search

Search community tools in Appwrite database.

**Query Parameters**:

| Parameter | Type   | Required | Description                                    |
| --------- | ------ | -------- | ---------------------------------------------- |
| q         | string | ✅       | Search query (min 2 chars)                     |
| userId    | string | ❌       | Current user ID (for pending tools visibility) |
| limit     | number | ❌       | Max results (default: 10, max: 20)             |

**Response 200 OK**:

```typescript
{
  success: true,
  results: Array<{
    id: string;           // Appwrite $id
    name: string;
    description: string;
    platform: string;
    slug: string;
    authorName: string;
    authorId: string;
  }>,
  total: number           // Total matching documents
}
```

**Response 400 Bad Request**:

```typescript
{
  success: false,
  error: "Query must be at least 2 characters"
}
```

**Example**:

```
GET /api/search?q=generator&userId=user123&limit=10

Response:
{
  "success": true,
  "results": [
    {
      "id": "emoji-text-gen",
      "name": "Emoji to Text Generator",
      "description": "Convert emojis to text descriptions",
      "platform": "general",
      "slug": "emoji-text-gen",
      "authorName": "JohnDoe",
      "authorId": "user456"
    }
  ],
  "total": 1
}
```

---

### POST /api/tools/auto-create

Generate tool configuration from search query using AI.

**Request Body**:

```typescript
{
  query: string;           // User's search query (required)
  language: "en" | "es";   // Output language (required)
  suggestedPlatform?: string;  // Platform hint (optional)
}
```

**Response 200 OK**:

```typescript
{
  success: true,
  config: {
    name: string;           // Generated tool name
    description: string;    // Generated description
    platform: string;       // Inferred platform
    promptTemplate: string; // Generated AI prompt
    inputs: Array<{
      id: string;
      label: string;
      type: "text" | "textarea" | "select" | "number";
      placeholder?: string;
      required: boolean;
    }>
  }
}
```

**Response 400 Bad Request**:

```typescript
{
  success: false,
  error: "Query is required"
}
```

**Response 500 Internal Server Error**:

```typescript
{
  success: false,
  error: "Failed to generate tool configuration"
}
```

**Example**:

```
POST /api/tools/auto-create
Content-Type: application/json

{
  "query": "convert emojis to readable text",
  "language": "en"
}

Response:
{
  "success": true,
  "config": {
    "name": "Emoji to Text Converter",
    "description": "Transform emoji sequences into readable text descriptions for accessibility and clarity",
    "platform": "general",
    "promptTemplate": "You are an emoji interpreter. Convert the following emoji sequence into a clear, readable text description.\n\nEmoji input: {{input}}\n\nProvide a natural language description of what these emojis represent.",
    "inputs": [
      {
        "id": "input",
        "label": "Emoji Sequence",
        "type": "textarea",
        "placeholder": "e.g. 🎉🎂🎁",
        "required": true
      }
    ]
  }
}
```

---

## TypeScript Interfaces

```typescript
// lib/types/search.ts

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  platform: string;
  href: string;
  type: "official" | "community";
  icon?: string;
  authorName?: string;
  relevanceScore: number;
}

export interface OfficialTool {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  platform: string;
  href: string;
  icon: string;
}

export interface CommunityToolResult {
  id: string;
  name: string;
  description: string;
  platform: string;
  slug: string;
  authorName: string;
  authorId: string;
}

export interface SearchAPIResponse {
  success: boolean;
  results?: CommunityToolResult[];
  total?: number;
  error?: string;
}

export interface AutoCreateRequest {
  query: string;
  language: "en" | "es";
  suggestedPlatform?: string;
}

export interface ToolInput {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  options?: string;
  required: boolean;
}

export interface AutoCreateConfig {
  name: string;
  description: string;
  platform: string;
  promptTemplate: string;
  inputs: ToolInput[];
}

export interface AutoCreateResponse {
  success: boolean;
  config?: AutoCreateConfig;
  error?: string;
}
```

---

## Component Contracts

### HeroSearch Component

**Props**:

```typescript
interface HeroSearchProps {
  className?: string;
  placeholder?: string;
  onNavigate?: (href: string) => void;
}
```

**Emits**:

- Navigate to tool page on result click
- Navigate to builder with query params on "Create tool" click

### SearchResultItem Component

**Props**:

```typescript
interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
}
```

### CreateToolCTA Component

**Props**:

```typescript
interface CreateToolCTAProps {
  query: string;
  isProminent: boolean; // true when <3 results
  onClick: () => void;
}
```
