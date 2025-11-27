"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations, type Language } from "@/lib/translations";

// Only include languages that have complete translations
const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'pt', 'fr', 'de', 'it'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'en' for SSR consistency
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // After hydration, sync with what the blocking script detected
  useEffect(() => {
    // Read from localStorage first (user preference), then from what script detected
    const savedLang = localStorage.getItem('language') as Language;
    const htmlLang = document.documentElement.dataset.lang as Language;
    
    const detectedLang = savedLang && SUPPORTED_LANGUAGES.includes(savedLang) 
      ? savedLang 
      : (htmlLang && SUPPORTED_LANGUAGES.includes(htmlLang) ? htmlLang : 'en');
    
    setLanguageState(detectedLang);
    setIsHydrated(true);
    
    // Mark as hydrated to show content (removes opacity: 0)
    requestAnimationFrame(() => {
      document.documentElement.dataset.hydrated = 'true';
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
      // Update HTML attributes for consistency
      document.documentElement.lang = lang;
      document.documentElement.dataset.lang = lang;
    }
  }, []);

  const t = useCallback((key: string): string => {
    return (translations[language][key as keyof typeof translations.en] as string) || key;
  }, [language]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    isHydrated
  }), [language, setLanguage, t, isHydrated]);

  return (
    <LanguageContext.Provider value={value}>
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
