"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

// Only include languages that have complete translations
const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'pt', 'fr', 'de', 'it'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Detect browser language and map to supported language
function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLangs = navigator.languages || [navigator.language || 'en'];
  
  for (const browserLang of browserLangs) {
    const lang = browserLang.toLowerCase().split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(lang as Language)) {
      return lang as Language;
    }
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Cargar idioma guardado o detectar automáticamente
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;

    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      // Si hay un idioma guardado válido, usarlo
      setLanguageState(saved);
    } else {
      // Detectar idioma del navegador
      const detectedLang = detectBrowserLanguage();
      setLanguageState(detectedLang);
      // No guardamos en localStorage para permitir que cambie si el usuario cambia su idioma del navegador
      // Solo guardamos cuando el usuario selecciona manualmente
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return (translations[language][key as keyof typeof translations.en] as string) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
