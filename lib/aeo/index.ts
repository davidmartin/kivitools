/**
 * AEO (Answer Engine Optimization) Schema Generators
 *
 * This module provides all schema generators for structured data used
 * to optimize KiviTools for AI assistants, voice search, and featured snippets.
 *
 * Usage:
 * ```tsx
 * import {
 *   generateSoftwareAppJsonLd,
 *   generateHowToJsonLd,
 *   generateSpeakableJsonLd,
 *   generateCollectionPageJsonLd
 * } from '@/lib/aeo';
 * ```
 *
 * @module lib/aeo
 */

// Core schemas and types
export {
  generateSoftwareAppJsonLd,
  generateSuiteAppJsonLd,
  generateBreadcrumbJsonLd,
  type HowToStep,
  type FAQ,
  type ToolInfo,
  type SupportedLanguage,
} from './schemas';

// HowTo schema for featured snippets
export { generateHowToJsonLd, buildHowToSteps } from './howto-generator';

// Speakable schema for voice assistants
export {
  generateSpeakableJsonLd,
  generateSpeakableWithXPathJsonLd,
  DEFAULT_SPEAKABLE_SELECTORS,
} from './speakable-generator';

// CollectionPage schema for platform hubs
export { generateCollectionPageJsonLd, buildToolsArray } from './collection-page-generator';
