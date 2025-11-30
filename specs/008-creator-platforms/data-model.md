# Data Model: Creator & Commerce Platforms

**Feature**: 008-creator-platforms  
**Date**: November 30, 2025  
**Status**: Complete

## Entities

### Platform

Represents a supported digital platform in KiviTools.

| Field       | Type   | Description                                   |
| ----------- | ------ | --------------------------------------------- |
| id          | string | Unique identifier (lowercase, e.g., "medium") |
| name        | string | Display name (e.g., "Medium")                 |
| description | string | Platform description (via translation key)    |
| href        | string | URL path (e.g., "/medium")                    |
| icon        | string | Emoji icon (e.g., "📝")                       |
| color       | string | Tailwind color name (e.g., "black", "orange") |
| tools       | Tool[] | Array of tools for this platform              |

**New Platforms**:

| id       | name     | icon | color  |
| -------- | -------- | ---- | ------ |
| medium   | Medium   | 📝   | black  |
| etsy     | Etsy     | 🛍️   | orange |
| onlyfans | OnlyFans | 💎   | cyan   |
| patreon  | Patreon  | ❤️   | red    |

---

### Tool

Represents a content generation tool within a platform.

| Field          | Type         | Description                                |
| -------------- | ------------ | ------------------------------------------ |
| platform       | string       | Parent platform id                         |
| slug           | string       | URL slug (e.g., "article-title-generator") |
| spanishSlug    | string       | Spanish URL alias                          |
| title          | string       | Translation key for title                  |
| description    | string       | Translation key for description            |
| inputs         | InputField[] | Form fields required                       |
| output         | OutputConfig | Result configuration                       |
| characterLimit | number?      | Max chars for output (if applicable)       |

---

### InputField

Form field configuration for tools.

| Field       | Type                                         | Description                        |
| ----------- | -------------------------------------------- | ---------------------------------- |
| name        | string                                       | Field identifier                   |
| type        | "text" \| "textarea" \| "select" \| "number" | Input type                         |
| required    | boolean                                      | Whether field is required          |
| options     | string[]?                                    | Select options (for type="select") |
| placeholder | string                                       | Translation key for placeholder    |
| maxLength   | number?                                      | Max input length                   |

---

### OutputConfig

Result configuration for tools.

| Field  | Type                                | Description                                |
| ------ | ----------------------------------- | ------------------------------------------ |
| type   | "single" \| "array" \| "structured" | Output format                              |
| count  | number?                             | Number of results (for array type)         |
| schema | object?                             | Structure definition (for structured type) |

---

### Generation (Appwrite Collection)

Records each AI content generation for analytics.

| Field        | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| platform     | string   | Platform id                  |
| tool         | string   | Tool slug                    |
| requestData  | object   | Input parameters (sanitized) |
| responseData | object   | Generated content            |
| userIp       | string   | Hashed user IP               |
| language     | string   | Output language code         |
| createdAt    | datetime | Timestamp                    |

---

## Tool Specifications

### Medium Tools

#### 1. Article Title Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| topic | text | ✅ | - |
| tone | select | ✅ | insightful, provocative, practical, storytelling, listicle |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 headlines (each ~60-70 chars optimal)

#### 2. Article Intro Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| topic | text | ✅ | - |
| keyPoints | textarea | ✅ | - |
| tone | select | ✅ | personal, professional, conversational, dramatic |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Single hook paragraph (100-200 words)

#### 3. Bio Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| expertise | textarea | ✅ | - |
| style | select | ✅ | professional, casual, witty, authoritative |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 bios (each ≤160 chars)

---

### Etsy Tools

#### 1. Product Title Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| product | textarea | ✅ | - |
| category | select | ✅ | jewelry, clothing, home, art, craft, vintage, digital |
| keywords | text | ❌ | - |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 SEO titles (each ≤140 chars)

#### 2. Product Description Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| product | text | ✅ | - |
| features | textarea | ✅ | - |
| materials | text | ❌ | - |
| dimensions | text | ❌ | - |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Single formatted description with sections

#### 3. Shop Announcement Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| shopName | text | ✅ | - |
| story | textarea | ✅ | - |
| specialty | textarea | ✅ | - |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Single announcement (≤5000 chars)

---

### OnlyFans Tools

#### 1. Bio Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| niche | text | ✅ | - |
| personality | textarea | ✅ | - |
| style | select | ✅ | playful, mysterious, direct, friendly |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 bios (each ≤1000 chars, SFW)

#### 2. Post Caption Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| content | textarea | ✅ | - |
| mood | select | ✅ | teasing, excited, casual, exclusive |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 captions (SFW)

#### 3. Promo Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| platform | select | ✅ | twitter, instagram, tiktok, reddit |
| niche | text | ✅ | - |
| offer | text | ❌ | - |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Array of 5 promo texts (platform-safe, SFW)

---

### Patreon Tools

#### 1. Tier Description Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| creatorType | select | ✅ | artist, musician, writer, podcaster, educator, other |
| benefits | textarea | ✅ | - |
| tierCount | number | ❌ | 3-5, default 3 |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Structured object with tiers array:

```typescript
{
  tiers: Array<{
    name: string;
    price: string;
    description: string;
    benefits: string[];
  }>;
}
```

#### 2. About Page Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| name | text | ✅ | - |
| story | textarea | ✅ | - |
| mission | textarea | ✅ | - |
| style | select | ✅ | heartfelt, professional, casual, inspiring |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Single formatted about page content

#### 3. Post Generator

**Inputs**:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| type | select | ✅ | update, announcement, thank-you, milestone, behind-scenes |
| content | textarea | ✅ | - |
| tier | select | ❌ | all, paid, specific |
| language | select | ❌ | en, es, pt, fr, de, it |

**Output**: Single formatted post with heading and body

---

## State Transitions

Tools follow a simple stateless request/response pattern:

```
[User Input] → [Turnstile Validation] → [API Route] → [DeepSeek Generation] → [Appwrite Log] → [Response]
```

No persistent state between requests. Each generation is independent.

## Validation Rules

### Input Validation

| Field Type                   | Min Length | Max Length |
| ---------------------------- | ---------- | ---------- |
| topic, story, mission        | 10         | 1000       |
| product, niche, content      | 3          | 500        |
| keywords, benefits, features | 3          | 300        |
| name, shopName               | 2          | 100        |

### Output Validation

| Platform | Tool              | Max Chars    |
| -------- | ----------------- | ------------ |
| Medium   | Bio Generator     | 160          |
| Etsy     | Product Title     | 140          |
| Etsy     | Shop Announcement | 5000         |
| OnlyFans | Bio Generator     | 1000         |
| Patreon  | Tier Description  | 500 per tier |

### Content Safety (OnlyFans)

All OnlyFans tool outputs must be validated for SFW content:

- No explicit language
- No adult content references
- Focus on personality, exclusivity, value proposition
