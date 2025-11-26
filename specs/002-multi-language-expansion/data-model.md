# Data Model: Multi-Language Expansion

**Feature**: 002-multi-language-expansion  
**Date**: 2025-11-26  
**Purpose**: Define entities and relationships for multi-language support

## Entities

### Language

Represents a supported UI language in the application.

| Field      | Type      | Description                  | Example                     |
| ---------- | --------- | ---------------------------- | --------------------------- |
| code       | `string`  | ISO 639-1 language code      | `"pt"`, `"fr"`              |
| name       | `string`  | English display name         | `"Portuguese"`              |
| nativeName | `string`  | Native language name         | `"Português"`               |
| flag       | `string`  | Emoji flag for UI            | `"🇧🇷"`, `"🇫🇷"`              |
| isRTL      | `boolean` | Right-to-left text direction | `false` (all current langs) |

**Supported Languages**:

| Code | Name       | Native Name | Flag | Region Focus                  |
| ---- | ---------- | ----------- | ---- | ----------------------------- |
| `en` | English    | English     | 🇺🇸   | Global                        |
| `es` | Spanish    | Español     | 🇪🇸   | LATAM, Spain                  |
| `pt` | Portuguese | Português   | 🇧🇷   | Brazil, Portugal              |
| `fr` | French     | Français    | 🇫🇷   | France, Canada, Africa        |
| `de` | German     | Deutsch     | 🇩🇪   | Germany, Austria, Switzerland |
| `it` | Italian    | Italiano    | 🇮🇹   | Italy                         |

---

### Translation

Represents a key-value pair for UI text in a specific language.

| Field    | Type            | Description                          | Example           |
| -------- | --------------- | ------------------------------------ | ----------------- |
| key      | `string`        | Dot-notation identifier              | `"nav.platforms"` |
| value    | `string`        | Translated text                      | `"Plataformas"`   |
| language | `Language.code` | Language this translation belongs to | `"es"`            |

**Key Structure Convention**:

```
{section}.{subsection}.{element}

Examples:
- nav.platforms         → Navigation "Platforms" link
- home.hero.title       → Homepage hero section title
- scriptWriter.form.topic → Script writer form topic field
- scriptWriter.faq.q1   → Script writer FAQ question 1
```

---

### TranslationFile

Represents a TypeScript module containing translations for a specific domain.

| Field    | Type     | Description                          | Example                              |
| -------- | -------- | ------------------------------------ | ------------------------------------ |
| path     | `string` | File path relative to `lib/locales/` | `"en/tools/tiktok/script-writer.ts"` |
| domain   | `string` | Feature/section this file covers     | `"scriptWriter"`                     |
| keyCount | `number` | Number of translation keys           | `~45`                                |

**File Categories**:

| Category             | Files                                    | Keys (approx) | Priority |
| -------------------- | ---------------------------------------- | ------------- | -------- |
| Core UI              | `common.ts`, `home.ts`, `platforms.ts`   | ~150          | P0       |
| Legal/Info           | `legal.ts`, `contact.ts`, `blog.ts`      | ~50           | P1       |
| Auth/Dashboard       | `admin.ts`, `dashboard.ts`, `builder.ts` | ~60           | P1       |
| Tools (per platform) | `tools/{platform}/*.ts`                  | ~40/tool      | P2       |

---

### LocalizedURL

Represents URL variations for SEO purposes.

| Field         | Type            | Description                       | Example                    |
| ------------- | --------------- | --------------------------------- | -------------------------- |
| basePath      | `string`        | Original English path             | `/tiktok/script-writer`    |
| language      | `Language.code` | Target language                   | `"pt"`                     |
| localizedPath | `string`        | Language-prefixed path            | `/pt/tiktok/script-writer` |
| spanishAlias  | `string?`       | Spanish-specific alias (existing) | `/tiktok/escritor-guiones` |

**URL Patterns**:

```
English (canonical):    /tiktok/script-writer
Spanish (alias):        /tiktok/escritor-guiones
Portuguese (prefix):    /pt/tiktok/script-writer
French (prefix):        /fr/tiktok/script-writer
German (prefix):        /de/tiktok/script-writer
Italian (prefix):       /it/tiktok/script-writer
```

---

## Type Definitions

### TypeScript Types (types/index.ts additions)

```typescript
// Supported UI languages
export type Language = "en" | "es" | "pt" | "fr" | "de" | "it";

// Language configuration for selector UI
export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

// Language selector options
export const UI_LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
];
```

### Translation Module Structure (lib/locales/{lang}/index.ts)

```typescript
// Each language follows this aggregation pattern
import { common } from "./common";
import { home } from "./home";
import { platforms } from "./platforms";
import { legal } from "./legal";
import { blog } from "./blog";
import { contact } from "./contact";
import { builder } from "./builder";
import { dashboard } from "./dashboard";
import { admin } from "./admin";
// ... tool imports

export const { lang } = {
  ...common,
  ...home,
  ...platforms,
  ...legal,
  ...blog,
  ...contact,
  ...builder,
  ...dashboard,
  ...admin,
  // ... tool spreads
};
```

---

## Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                        translations.ts                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  translations: Record<Language, TranslationKeys>         │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                                                      │
│   ┌───────┼───────┬───────┬───────┬───────┬───────┐            │
│   ↓       ↓       ↓       ↓       ↓       ↓       ↓            │
│  en/     es/     pt/     fr/     de/     it/                   │
│   │       │       │       │       │       │                     │
│   └──┬────┴──┬────┴──┬────┴──┬────┴──┬────┴──┬────┘            │
│      │       │       │       │       │       │                  │
│   index.ts (aggregates all domain files)                        │
│      │                                                          │
│   ┌──┴──────────────────────────────────────────────┐          │
│   │ common.ts | home.ts | platforms.ts | tools/...  │          │
│   └─────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘

LanguageContext
     │
     ├── language: Language (current selected)
     ├── setLanguage(lang: Language): void
     └── t(key: string): string → translations[language][key]
```

---

## State Management

### LanguageContext State

```typescript
interface LanguageContextType {
  language: Language; // Current UI language
  setLanguage: (lang: Language) => void; // Change language + persist
  t: (key: string) => string; // Get translation by key
}
```

### Persistence

- **Storage**: `localStorage.getItem('language')`
- **Default**: Browser language detection → fallback to 'en'
- **Sync**: URL language prefix overrides stored preference (for SEO landing)

---

## Validation Rules

1. **Translation Completeness**: Every key in `en/` MUST exist in all other language folders
2. **Key Format**: Dot-notation, lowercase, no special characters except dots
3. **Value Format**: UTF-8 string, may include:
   - Emojis (per tone guidelines)
   - `\n` for line breaks in descriptions
   - No HTML tags (use React components for formatting)
4. **File Naming**: Lowercase, hyphen-separated, `.ts` extension
5. **Language Code**: ISO 639-1 two-letter codes only
