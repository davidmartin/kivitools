"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CookiePreferences,
  CookieConsentContextType,
  COOKIE_POLICY_VERSION,
  CONSENT_EXPIRY_DAYS,
  STORAGE_KEY,
  CONSENT_COOKIE_NAME,
  DEFAULT_PREFERENCES,
  isConsentExpired,
  isConsentVersionOutdated,
  needsConsentRenewal,
} from "@/types/cookie-consent";

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

/**
 * Set a cookie with proper attributes
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secure}`;
}

/**
 * Remove a cookie
 */
function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Get a cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Save preferences to localStorage and set consent cookie
 */
function savePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  setCookie(CONSENT_COOKIE_NAME, "1", CONSENT_EXPIRY_DAYS);
}

/**
 * Load preferences from localStorage
 */
function loadPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as CookiePreferences;
    
    // Validate structure
    if (
      typeof parsed.essential !== "boolean" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.advertising !== "boolean" ||
      typeof parsed.consentDate !== "number" ||
      typeof parsed.version !== "string"
    ) {
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const loaded = loadPreferences();
    setPreferences(loaded);
    setIsLoaded(true);
  }, []);

  // Computed states
  const hasConsented = preferences !== null && preferences.consentDate > 0;
  const isExpired = preferences !== null && isConsentExpired(preferences.consentDate);
  // Don't show renewal banner until we've loaded preferences from localStorage
  const needsRenewal = isLoaded ? needsConsentRenewal(preferences) : false;

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      advertising: true,
      consentDate: Date.now(),
      version: COOKIE_POLICY_VERSION,
    };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  }, []);

  // Reject non-essential cookies
  const rejectNonEssential = useCallback(() => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      advertising: false,
      consentDate: Date.now(),
      version: COOKIE_POLICY_VERSION,
    };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  }, []);

  // Update specific preferences
  const updatePreferences = useCallback(
    (prefs: Partial<Pick<CookiePreferences, "analytics" | "advertising">>) => {
      const current = preferences || DEFAULT_PREFERENCES;
      const newPreferences: CookiePreferences = {
        essential: true,
        analytics: prefs.analytics !== undefined ? prefs.analytics : current.analytics,
        advertising: prefs.advertising !== undefined ? prefs.advertising : current.advertising,
        consentDate: Date.now(),
        version: COOKIE_POLICY_VERSION,
      };
      setPreferences(newPreferences);
      savePreferences(newPreferences);
    },
    [preferences]
  );

  // Open/close preferences modal
  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  // Don't render until loaded to avoid hydration mismatch
  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        isExpired,
        needsRenewal,
        acceptAll,
        rejectNonEssential,
        updatePreferences,
        openPreferences,
        closePreferences,
        isPreferencesOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

/**
 * Safe version of useCookieConsent that doesn't throw if outside provider.
 * Returns default values instead. Useful for components that may render
 * before the provider is ready (like GoogleAnalytics).
 */
export function useCookieConsentSafe(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    // Return safe defaults when context is not available
    return {
      preferences: null,
      hasConsented: false,
      isExpired: false,
      needsRenewal: true,
      acceptAll: () => {},
      rejectNonEssential: () => {},
      updatePreferences: () => {},
      openPreferences: () => {},
      closePreferences: () => {},
      isPreferencesOpen: false,
    };
  }
  return context;
}
