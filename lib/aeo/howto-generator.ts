/**
 * HowTo Schema Generator
 *
 * Generates HowTo structured data from translation keys for featured snippet eligibility.
 * Every tool page has a "How It Works" section with 3 steps that maps to this schema.
 *
 * Schema.org Reference: https://schema.org/HowTo
 * Google Rich Results: https://developers.google.com/search/docs/appearance/structured-data/how-to
 */

import type { HowToStep, SupportedLanguage } from './schemas';

// =============================================================================
// HowTo Schema Generator
// =============================================================================

/**
 * Generate HowTo schema from existing "How It Works" translation keys
 *
 * Used for: All tool pages
 * Purpose: Enables featured snippets with step-by-step instructions
 *
 * @example
 * ```tsx
 * const howToJsonLd = generateHowToJsonLd({
 *   toolName: t('scriptWriter.title'),
 *   description: t('scriptWriter.description'),
 *   steps: [
 *     { title: t('scriptWriter.howItWorks.step1.title'), description: t('scriptWriter.howItWorks.step1.description') },
 *     { title: t('scriptWriter.howItWorks.step2.title'), description: t('scriptWriter.howItWorks.step2.description') },
 *     { title: t('scriptWriter.howItWorks.step3.title'), description: t('scriptWriter.howItWorks.step3.description') },
 *   ],
 *   language: 'en'
 * });
 * ```
 */
export function generateHowToJsonLd({
  toolName,
  description,
  steps,
  language = 'en',
  totalTime = 'PT2M', // Default: 2 minutes
}: {
  toolName: string;
  description: string;
  steps: HowToStep[];
  language?: SupportedLanguage;
  totalTime?: string; // ISO 8601 duration format
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: generateHowToName(toolName, language),
    description,
    inLanguage: language,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

/**
 * Generate localized "How to use [Tool]" name
 */
function generateHowToName(toolName: string, language: SupportedLanguage): string {
  const templates: Record<SupportedLanguage, string> = {
    en: `How to use ${toolName}`,
    es: `Cómo usar ${toolName}`,
    pt: `Como usar ${toolName}`,
    fr: `Comment utiliser ${toolName}`,
    de: `Wie man ${toolName} benutzt`,
    it: `Come usare ${toolName}`,
  };
  return templates[language] || templates.en;
}

/**
 * Helper to build steps array from translation function
 *
 * @example
 * ```tsx
 * const steps = buildHowToSteps(t, 'scriptWriter');
 * ```
 */
export function buildHowToSteps(
  t: (key: string) => string,
  toolKey: string,
  stepCount: number = 3
): HowToStep[] {
  const steps: HowToStep[] = [];
  for (let i = 1; i <= stepCount; i++) {
    steps.push({
      title: t(`${toolKey}.howItWorks.step${i}.title`),
      description: t(`${toolKey}.howItWorks.step${i}.description`),
    });
  }
  return steps;
}
