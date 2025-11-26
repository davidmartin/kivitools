# API Contracts: Multi-Language Expansion

**Feature**: 002-multi-language-expansion  
**Date**: 2025-11-26

## Overview

This feature primarily affects client-side code and does not introduce new API endpoints.
However, the following contracts define the TypeScript interfaces that must be implemented.

## TypeScript Contracts

### Language Type Contract

**File**: `lib/translations.ts`

```typescript
// BEFORE
export type Language = "es" | "en";

// AFTER
export type Language = "en" | "es" | "pt" | "fr" | "de" | "it";

export const translations: Record<Language, TranslationKeys> = {
  en,
  es,
  pt,
  fr,
  de,
  it,
};
```

---

### LanguageContext Contract

**File**: `contexts/LanguageContext.tsx`

```typescript
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Browser detection must support all 6 languages
const SUPPORTED_LANGUAGES: Language[] = ["en", "es", "pt", "fr", "de", "it"];

function detectBrowserLanguage(): Language {
  const browserLangs = navigator.languages || [navigator.language || "en"];

  for (const browserLang of browserLangs) {
    const lang = browserLang.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as Language)) {
      return lang as Language;
    }
  }
  return "en";
}
```

---

### UI_LANGUAGES Contract

**File**: `types/index.ts`

```typescript
export interface LanguageConfig {
  code: Language;
  name: string; // English name
  nativeName: string; // Native name
  flag: string; // Emoji flag
}

export const UI_LANGUAGES: readonly LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
] as const;
```

---

### Translation File Contract

**Each translation file must export an object with string keys and string values.**

**File**: `lib/locales/{lang}/common.ts` (example)

```typescript
export const common = {
  // Navigation
  "nav.title": string,
  "nav.home": string,
  "nav.platforms": string,
  // ... all keys from en/common.ts

  // Languages (must include all 6)
  "languages.en": string,
  "languages.es": string,
  "languages.pt": string,
  "languages.fr": string,
  "languages.de": string,
  "languages.it": string,
};
```

---

### URL Rewrite Contract

**File**: `next.config.ts`

```typescript
async rewrites() {
  return [
    // Existing Spanish aliases...

    // Language prefix rewrites
    { source: '/pt/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/:path*' },
    { source: '/de/:path*', destination: '/:path*' },
    { source: '/it/:path*', destination: '/:path*' },
  ];
}
```

---

## Validation Contract

A translation file is valid if:

1. ✅ It exports a single object with string keys and string values
2. ✅ All keys match the corresponding `en/` file exactly
3. ✅ No keys are missing compared to `en/`
4. ✅ No extra keys exist that don't exist in `en/`
5. ✅ All values are non-empty strings
6. ✅ TypeScript compiles without errors

**Validation Script** (for CI/CD):

```bash
# Check translation file count matches across all languages
for lang in en es pt fr de it; do
  echo "$lang: $(find lib/locales/$lang -name '*.ts' | wc -l) files"
done
```

---

## SEO Contract

### hreflang Tags

Each page must include hreflang tags for all supported languages:

```html
<link
  rel="alternate"
  hreflang="en"
  href="https://kivitools.com/tiktok/script-writer"
/>
<link
  rel="alternate"
  hreflang="es"
  href="https://kivitools.com/tiktok/escritor-guiones"
/>
<link
  rel="alternate"
  hreflang="pt"
  href="https://kivitools.com/pt/tiktok/script-writer"
/>
<link
  rel="alternate"
  hreflang="fr"
  href="https://kivitools.com/fr/tiktok/script-writer"
/>
<link
  rel="alternate"
  hreflang="de"
  href="https://kivitools.com/de/tiktok/script-writer"
/>
<link
  rel="alternate"
  hreflang="it"
  href="https://kivitools.com/it/tiktok/script-writer"
/>
<link
  rel="alternate"
  hreflang="x-default"
  href="https://kivitools.com/tiktok/script-writer"
/>
```

### Sitemap Contract

**File**: `app/sitemap.ts`

Must generate entries for all language variations:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ['', 'pt', 'fr', 'de', 'it']; // '' = default (en/es)
  const tools = [...]; // existing tool list

  return tools.flatMap(tool =>
    languages.map(lang => ({
      url: `https://kivitools.com${lang ? `/${lang}` : ''}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  );
}
```
