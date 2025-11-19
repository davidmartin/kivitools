import { es } from "./locales/es";
import { en } from "./locales/en";

export type Language = "es" | "en";

export const translations = {
  es,
  en,
} as const;

export type TranslationKeys = typeof translations.es;
