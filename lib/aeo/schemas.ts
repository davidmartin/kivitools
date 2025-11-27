/**
 * AEO Schema Generators - Core Types and SoftwareApplication Schema
 *
 * This module provides TypeScript interfaces and generator functions for
 * structured data schemas used in Answer Engine Optimization (AEO).
 *
 * All schemas follow Schema.org vocabulary and are rendered as JSON-LD.
 */

// =============================================================================
// Types
// =============================================================================

export interface HowToStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolInfo {
  name: string;
  url: string;
  description: string;
}

export type SupportedLanguage = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it';

// =============================================================================
// SoftwareApplication Schema Generator
// =============================================================================

/**
 * Generate SoftwareApplication schema for tool pages
 *
 * Used for: Individual tool pages (e.g., /tiktok/script-writer)
 * Purpose: Enables rich results with star ratings and "Free" pricing in Google Search
 *
 * @example
 * ```tsx
 * const appJsonLd = generateSoftwareAppJsonLd({
 *   name: t('scriptWriter.title'),
 *   description: t('scriptWriter.description'),
 *   url: 'https://kivitools.com/tiktok/script-writer',
 *   language: 'en'
 * });
 * ```
 */
export function generateSoftwareAppJsonLd({
  name,
  description,
  url,
  ratingCount = 1250,
  ratingValue = '4.8',
  language = 'en',
}: {
  name: string;
  description: string;
  url: string;
  ratingCount?: number;
  ratingValue?: string;
  language?: SupportedLanguage;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    url,
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount: ratingCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'KiviTools',
      url: 'https://kivitools.com',
    },
  };
}

/**
 * Generate SoftwareApplication schema for the homepage (KiviTools suite)
 *
 * Used for: Homepage only
 * Purpose: Describes KiviTools as a complete software suite
 */
export function generateSuiteAppJsonLd({
  description,
  language = 'en',
}: {
  description: string;
  language?: SupportedLanguage;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KiviTools',
    description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    url: 'https://kivitools.com',
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '5000',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'KiviTools',
      url: 'https://kivitools.com',
    },
  };
}

// =============================================================================
// BreadcrumbList Schema Generator
// =============================================================================

/**
 * Generate BreadcrumbList schema for navigation hierarchy
 *
 * Used for: All pages except homepage
 * Purpose: Shows navigation path in search results
 */
export function generateBreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
