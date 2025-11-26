import { es } from "./locales/es";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { it } from "./locales/it";

// Available languages with complete translations
export type Language = "es" | "en" | "pt" | "fr" | "de" | "it";

export const translations = {
  es,
  en,
  pt,
  fr,
  de,
  it,
} as const;

export type TranslationKeys = typeof translations.en;
