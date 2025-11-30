# API Contracts: Creator & Commerce Platforms

**Feature**: 008-creator-platforms  
**Date**: November 30, 2025  
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

## Medium Endpoints

### POST /api/tools/medium/article-title-generator

Generate compelling Medium article titles optimized for the feed.

**Request:**

```typescript
{
  topic: string;           // Required - Article topic/subject
  tone: string;            // Required - insightful | provocative | practical | storytelling | listicle
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 headline options
}
```

---

### POST /api/tools/medium/article-intro-generator

Generate engaging article introductions/hooks.

**Request:**

```typescript
{
  topic: string;           // Required - Article topic
  keyPoints: string;       // Required - Main points to cover (comma-separated)
  tone: string;            // Required - personal | professional | conversational | dramatic
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Hook paragraph (100-200 words)
}
```

---

### POST /api/tools/medium/bio-generator

Generate Medium author profile bio.

**Request:**

```typescript
{
  expertise: string;       // Required - User's area of expertise/niche
  style: string;           // Required - professional | casual | witty | authoritative
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤160 chars)
}
```

---

## Etsy Endpoints

### POST /api/tools/etsy/product-title-generator

Generate SEO-optimized Etsy product titles.

**Request:**

```typescript
{
  product: string;         // Required - Product description
  category: string;        // Required - jewelry | clothing | home | art | craft | vintage | digital
  keywords: string;        // Optional - Specific keywords to include
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 SEO titles (each ≤140 chars)
}
```

---

### POST /api/tools/etsy/product-description-generator

Generate formatted Etsy product descriptions.

**Request:**

```typescript
{
  product: string;         // Required - Product name/type
  features: string;        // Required - Key features (comma-separated)
  materials: string;       // Optional - Materials used
  dimensions: string;      // Optional - Size/dimensions
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted description with sections
}
```

---

### POST /api/tools/etsy/shop-announcement-generator

Generate Etsy shop announcement/about section.

**Request:**

```typescript
{
  shopName: string;        // Required - Name of the shop
  story: string;           // Required - Brief background/story
  specialty: string;       // Required - What makes the shop unique
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Shop announcement (≤5000 chars)
}
```

---

## OnlyFans Endpoints

### POST /api/tools/onlyfans/bio-generator

Generate OnlyFans profile bio (SFW marketing focus).

**Request:**

```typescript
{
  niche: string;           // Required - Content niche/category
  personality: string;     // Required - Brief personality description
  style: string;           // Required - playful | mysterious | direct | friendly
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 bio options (each ≤1000 chars)
}
```

---

### POST /api/tools/onlyfans/post-caption-generator

Generate engaging post captions.

**Request:**

```typescript
{
  content: string;         // Required - Description of post content
  mood: string;            // Required - teasing | excited | casual | exclusive
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 caption options
}
```

---

### POST /api/tools/onlyfans/promo-generator

Generate cross-platform promotional text (SFW).

**Request:**

```typescript
{
  platform: string;        // Required - twitter | instagram | tiktok | reddit
  offer: string;           // Optional - Special offer (e.g., "50% off")
  niche: string;           // Required - Content niche
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string[];        // Array of 5 promo options (platform-safe)
}
```

---

## Patreon Endpoints

### POST /api/tools/patreon/tier-description-generator

Generate membership tier descriptions.

**Request:**

```typescript
{
  creatorType: string;     // Required - artist | musician | writer | podcaster | educator | other
  benefits: string;        // Required - Benefits offered (comma-separated)
  tierCount: number;       // Optional - Number of tiers (3-5), default 3
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: {
    tiers: Array<{
      name: string;
      price: string; // Suggested price range
      description: string;
      benefits: string[];
    }>;
  }
}
```

---

### POST /api/tools/patreon/about-page-generator

Generate Patreon creator about page.

**Request:**

```typescript
{
  name: string;            // Required - Creator name/brand
  story: string;           // Required - Creator's background/journey
  mission: string;         // Required - What the creator does and why
  style: string;           // Required - heartfelt | professional | casual | inspiring
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted about page content
}
```

---

### POST /api/tools/patreon/post-generator

Generate patron update posts.

**Request:**

```typescript
{
  type: string;            // Required - update | announcement | thank-you | milestone | behind-scenes
  content: string;         // Required - What to announce/share
  tier: string;            // Optional - Which tier(s) can see this: all | paid | specific
  turnstileToken: string;
  language?: string;
}
```

**Response:**

```typescript
{
  success: true;
  result: string; // Formatted post with heading and body
}
```

---

## Validation Rules

### All Endpoints

- `turnstileToken` - Required, validated via Cloudflare API
- `language` - Optional, must be one of: en, es, pt, fr, de, it

### String Length Validations

- `topic`, `story`, `mission` - Min 10 chars, max 1000 chars
- `product`, `niche`, `content` - Min 3 chars, max 500 chars
- `keywords`, `benefits`, `features` - Min 3 chars, max 300 chars

### Enum Validations

Each endpoint validates tone/style/type/category against allowed values (documented above).

### Platform-Specific Rules

- **Medium**: Bio must be ≤160 characters
- **Etsy**: Product title must be ≤140 characters
- **OnlyFans**: All content must be SFW (no explicit language)
- **Patreon**: Tier descriptions should reflect increasing value
