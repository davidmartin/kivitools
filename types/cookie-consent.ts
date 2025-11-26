/**
 * Cookie Consent Types
 * Feature: 004-cookie-policy
 * 
 * These types define the contract for the cookie consent system.
 */

/**
 * Cookie policy version - increment when policy changes significantly
 * to require users to re-consent
 */
export const COOKIE_POLICY_VERSION = "1.0";

/**
 * Days until consent expires and user must re-consent
 * GDPR recommendation: 12 months maximum
 */
export const CONSENT_EXPIRY_DAYS = 365;

/**
 * localStorage key for storing full preferences
 */
export const STORAGE_KEY = "kivi_cookie_preferences";

/**
 * Cookie name for SSR detection of consent state
 */
export const CONSENT_COOKIE_NAME = "kivi_consent";

/**
 * User's cookie preferences
 * Stored in localStorage as JSON
 */
export interface CookiePreferences {
    /**
     * Essential cookies - always true, cannot be changed
     * Includes: consent cookie, Turnstile security
     */
    essential: true;

    /**
     * Analytics cookies - Google Analytics
     * Default: false (privacy by default)
     */
    analytics: boolean;

    /**
     * Advertising cookies - Google AdSense
     * Default: false (privacy by default)
     */
    advertising: boolean;

    /**
     * Unix timestamp (milliseconds) when consent was given
     * Used to calculate expiration
     */
    consentDate: number;

    /**
     * Policy version when consent was given
     * If this doesn't match COOKIE_POLICY_VERSION, consent is invalidated
     */
    version: string;
}

/**
 * Default preferences - used when no consent given yet
 * Privacy by default: all non-essential cookies are OFF
 */
export const DEFAULT_PREFERENCES: CookiePreferences = {
    essential: true,
    analytics: false,
    advertising: false,
    consentDate: 0,
    version: COOKIE_POLICY_VERSION,
};

/**
 * Context type for cookie consent state management
 */
export interface CookieConsentContextType {
    /**
     * Current user preferences (null if never consented)
     */
    preferences: CookiePreferences | null;

    /**
     * Whether user has made any consent decision
     */
    hasConsented: boolean;

    /**
     * Whether consent has expired (> 12 months)
     */
    isExpired: boolean;

    /**
     * Whether user needs to re-consent (expired or version mismatch)
     */
    needsRenewal: boolean;

    /**
     * Accept all cookie categories
     * Sets analytics: true, advertising: true
     */
    acceptAll: () => void;

    /**
     * Reject non-essential cookies
     * Sets analytics: false, advertising: false
     */
    rejectNonEssential: () => void;

    /**
     * Update specific preferences
     * Cannot modify: essential, consentDate, version
     */
    updatePreferences: (
        prefs: Partial<Pick<CookiePreferences, 'analytics' | 'advertising'>>
    ) => void;

    /**
     * Open the preferences modal
     */
    openPreferences: () => void;

    /**
     * Close the preferences modal
     */
    closePreferences: () => void;

    /**
     * Whether preferences modal is currently open
     */
    isPreferencesOpen: boolean;
}

/**
 * Cookie category definition for UI rendering
 */
export interface CookieCategory {
    /**
     * Unique identifier matching CookiePreferences key
     */
    id: 'essential' | 'analytics' | 'advertising';

    /**
     * Translation key for category title
     */
    titleKey: string;

    /**
     * Translation key for category description
     */
    descriptionKey: string;

    /**
     * Whether this category can be toggled by user
     */
    isEditable: boolean;

    /**
     * List of cookies in this category for display
     */
    cookies: CookieInfo[];
}

/**
 * Individual cookie information for policy page
 */
export interface CookieInfo {
    /**
     * Cookie name (e.g., "_ga", "cf_clearance")
     */
    name: string;

    /**
     * Provider/company (e.g., "Google", "Cloudflare")
     */
    provider: string;

    /**
     * Translation key for purpose description
     */
    purposeKey: string;

    /**
     * Human-readable duration (e.g., "2 years", "Session")
     */
    duration: string;
}

/**
 * Complete cookie categories configuration
 * Used by both banner and policy page
 */
export const COOKIE_CATEGORIES: CookieCategory[] = [
    {
        id: 'essential',
        titleKey: 'cookies.preferences.essential.title',
        descriptionKey: 'cookies.preferences.essential.description',
        isEditable: false,
        cookies: [
            {
                name: 'kivi_consent',
                provider: 'KiviTools',
                purposeKey: 'cookies.policy.cookie.consent',
                duration: '1 year',
            },
            {
                name: 'cf_clearance',
                provider: 'Cloudflare',
                purposeKey: 'cookies.policy.cookie.turnstile',
                duration: 'Session',
            },
        ],
    },
    {
        id: 'analytics',
        titleKey: 'cookies.preferences.analytics.title',
        descriptionKey: 'cookies.preferences.analytics.description',
        isEditable: true,
        cookies: [
            {
                name: '_ga',
                provider: 'Google Analytics',
                purposeKey: 'cookies.policy.cookie.ga',
                duration: '2 years',
            },
            {
                name: '_ga_*',
                provider: 'Google Analytics',
                purposeKey: 'cookies.policy.cookie.gaSession',
                duration: '2 years',
            },
            {
                name: '_gid',
                provider: 'Google Analytics',
                purposeKey: 'cookies.policy.cookie.gid',
                duration: '24 hours',
            },
        ],
    },
    {
        id: 'advertising',
        titleKey: 'cookies.preferences.advertising.title',
        descriptionKey: 'cookies.preferences.advertising.description',
        isEditable: true,
        cookies: [
            {
                name: 'Various',
                provider: 'Google AdSense',
                purposeKey: 'cookies.policy.cookie.adsense',
                duration: 'Various',
            },
        ],
    },
];

/**
 * Helper function to check if consent is expired
 */
export function isConsentExpired(consentDate: number): boolean {
    const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() > consentDate + expiryMs;
}

/**
 * Helper function to check if consent version is outdated
 */
export function isConsentVersionOutdated(version: string): boolean {
    return version !== COOKIE_POLICY_VERSION;
}

/**
 * Helper function to check if renewal is needed
 */
export function needsConsentRenewal(preferences: CookiePreferences | null): boolean {
    if (!preferences) return true;
    if (preferences.consentDate === 0) return true;
    if (isConsentExpired(preferences.consentDate)) return true;
    if (isConsentVersionOutdated(preferences.version)) return true;
    return false;
}
