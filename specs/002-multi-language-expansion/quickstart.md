# Quickstart: Multi-Language Expansion

**Feature**: 002-multi-language-expansion  
**Date**: 2025-11-26  
**Purpose**: Step-by-step guide to implement multi-language support

## Prerequisites

- Node.js 18+
- Access to KiviTools repository on branch `002-multi-language-expansion`
- Understanding of current translation system (`lib/locales/`)

## Implementation Phases

### Phase 1: Core Infrastructure (P0)

**Goal**: Enable 6-language support in the codebase without translations.

#### Step 1.1: Update Type Definitions

**File**: `types/index.ts`

Add at the end of the file:

```typescript
// UI Language Configuration
export type Language = "en" | "es" | "pt" | "fr" | "de" | "it";

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
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

#### Step 1.2: Update translations.ts

**File**: `lib/translations.ts`

```typescript
import { es } from "./locales/es";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { it } from "./locales/it";

export type Language = "en" | "es" | "pt" | "fr" | "de" | "it";

export const translations = {
  en,
  es,
  pt,
  fr,
  de,
  it,
} as const;

export type TranslationKeys = typeof translations.en;
```

#### Step 1.3: Update LanguageContext

**File**: `contexts/LanguageContext.tsx`

Replace browser detection logic:

```typescript
const SUPPORTED_LANGUAGES = ["en", "es", "pt", "fr", "de", "it"] as const;

// In useEffect:
const detectBrowserLanguage = (): Language => {
  const browserLangs = navigator.languages || [navigator.language || "en"];

  for (const browserLang of browserLangs) {
    const lang = browserLang.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as Language)) {
      return lang as Language;
    }
  }
  return "en";
};
```

---

### Phase 2: Language Selector UI (P0)

**Goal**: Replace toggle button with Select dropdown.

#### Step 2.1: Update Navigation Component

**File**: `app/components/navigation.tsx`

Replace the language toggle button with:

```tsx
import { Select } from "@heroui/react";
import { UI_LANGUAGES, type Language } from "@/types";

// In the desktop menu section, replace the language button with:
<Select
  aria-label={t("nav.selectLanguage")}
  selectedKeys={[language]}
  onSelectionChange={(keys) => {
    const selected = Array.from(keys)[0] as Language;
    setLanguage(selected);
  }}
  className="min-w-20"
  size="sm"
>
  <Select.Trigger>
    <Select.Value>
      {UI_LANGUAGES.find((l) => l.code === language)?.flag}{" "}
      {language.toUpperCase()}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    {UI_LANGUAGES.map((lang) => (
      <Select.Item key={lang.code} textValue={lang.name}>
        {lang.flag} {lang.code.toUpperCase()} - {lang.nativeName}
      </Select.Item>
    ))}
  </Select.Content>
</Select>;
```

#### Step 2.2: Update Mobile Menu Language Selector

Similar pattern but adjusted for mobile:

```tsx
<Select
  aria-label={t("nav.selectLanguage")}
  selectedKeys={[language]}
  onSelectionChange={(keys) => {
    const selected = Array.from(keys)[0] as Language;
    setLanguage(selected);
  }}
  size="sm"
  className="w-full"
>
  {/* Same content as desktop */}
</Select>
```

---

### Phase 3: Create Translation Files (P1)

**Goal**: Create folder structure for 4 new languages.

#### Step 3.1: Create Directory Structure

```bash
# From repository root
mkdir -p lib/locales/{pt,fr,de,it}/tools/{tiktok,instagram,twitter,youtube,reddit,snapchat,linkedin,forocoches,suno,twitch,elevenlabs,facebook,pinterest,spotify,amazon}
```

#### Step 3.2: Copy English Files as Templates

```bash
# Copy all English files to new languages
for lang in pt fr de it; do
  cp -r lib/locales/en/* lib/locales/$lang/
done
```

#### Step 3.3: Update Index Files

For each new language, update `lib/locales/{lang}/index.ts`:

```typescript
// Example: lib/locales/pt/index.ts
import { common } from "./common";
import { home } from "./home";
// ... all imports same as en/index.ts

export const pt = {
  ...common,
  ...home,
  // ... all spreads same as en/index.ts
};
```

---

### Phase 4: Translate Core UI (P1)

**Goal**: Translate essential files first.

**Priority order**:

1. `common.ts` - Navigation, footer, shared UI
2. `home.ts` - Homepage
3. `platforms.ts` - Platform hub pages

#### Translation Guidelines

1. **Tone**: Maintain comedic/fun tone in all languages
2. **Formality**:
   - German: Use formal "Sie" form
   - French: Use informal "tu" for creator audience
   - Portuguese: Use informal "você" (Brazilian style)
   - Italian: Use informal "tu"
3. **Emojis**: Keep same emoji usage as English
4. **Length**: Keep translations similar length to avoid UI overflow

#### Example Translation (Portuguese common.ts)

```typescript
export const common = {
  // Navigation
  "nav.title": "KiviTools",
  "nav.home": "Início",
  "nav.platforms": "Plataformas",
  "nav.selectLanguage": "Selecionar idioma",
  // ... continue with all keys
};
```

---

### Phase 5: URL Rewrites for SEO (P2)

**File**: `next.config.ts`

Add to the rewrites function:

```typescript
async rewrites() {
  return [
    // Existing Spanish aliases...

    // Language prefix rewrites for new languages
    { source: '/pt/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/:path*' },
    { source: '/de/:path*', destination: '/:path*' },
    { source: '/it/:path*', destination: '/:path*' },
  ];
}
```

---

### Phase 6: Update Sitemap & SEO (P2)

**File**: `app/sitemap.ts`

Update to include all language variations:

```typescript
const LANGUAGE_PREFIXES = ["", "pt", "fr", "de", "it"];

// In sitemap generation:
return tools.flatMap((tool) =>
  LANGUAGE_PREFIXES.map((lang) => ({
    url: `https://kivitools.com${lang ? `/${lang}` : ""}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
);
```

**File**: `lib/seo-metadata.ts`

Add hreflang generation for all 6 languages.

---

## Verification Checklist

After implementation, verify:

- [ ] Language selector shows all 6 languages
- [ ] Selecting a language updates all UI text
- [ ] Language preference persists after page reload
- [ ] Browser language detection works for all 6 languages
- [ ] URL prefixes work (`/pt/tiktok/script-writer`)
- [ ] No TypeScript errors
- [ ] No missing translation warnings in console
- [ ] Mobile language selector works correctly
- [ ] Dark mode works with language selector

## Common Issues

### Issue: TypeScript error "Property X does not exist"

**Cause**: New translation key added to one language but not others.
**Fix**: Add the key to all 6 language files.

### Issue: Select component not showing value

**Cause**: HeroUI Select needs proper selectedKeys format.
**Fix**: Ensure `selectedKeys={[language]}` uses array format.

### Issue: Translations not updating

**Cause**: translations.ts not importing new language.
**Fix**: Add import and add to translations object.

---

## Next Steps

After completing core infrastructure:

1. **Translate Tool Pages**: Start with TikTok (highest traffic)
2. **Add Missing Translation Keys**: Run validation script
3. **Native Speaker Review**: Prioritize PT and FR (P1 languages)
4. **Performance Testing**: Verify bundle size impact
5. **SEO Verification**: Check hreflang tags in production
