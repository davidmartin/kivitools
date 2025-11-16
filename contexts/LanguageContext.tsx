"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Cargar idioma guardado o detectar automáticamente
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    
    if (saved && (saved === "es" || saved === "en")) {
      // Si hay un idioma guardado, usarlo
      setLanguageState(saved);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language || navigator.languages?.[0] || "en";
      const detectedLang = browserLang.toLowerCase().startsWith("es") ? "es" : "en";
      setLanguageState(detectedLang);
      // No guardamos en localStorage para permitir que cambie si el usuario cambia su idioma del navegador
      // Solo guardamos cuando el usuario selecciona manualmente
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
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
