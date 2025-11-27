/**
 * Speakable Schema Generator
 *
 * Generates Speakable structured data to identify voice-readable content
 * for voice assistants (Google Assistant, Siri, Alexa).
 *
 * Schema.org Reference: https://schema.org/speakable
 * Google Guidelines: https://developers.google.com/search/docs/appearance/structured-data/speakable
 */

// =============================================================================
// Speakable Schema Generator
// =============================================================================

/**
 * Default CSS selectors for speakable content
 *
 * These classes should be added to:
 * - .tool-description: Main tool description paragraph (what the tool does)
 * - .faq-answer-1: First FAQ answer (usually "What is X?")
 */
export const DEFAULT_SPEAKABLE_SELECTORS = ['.tool-description', '.faq-answer-1'];

/**
 * Generate Speakable schema within WebPage
 *
 * Used for: All tool pages
 * Purpose: Identifies content suitable for text-to-speech by voice assistants
 *
 * @example
 * ```tsx
 * const speakableJsonLd = generateSpeakableJsonLd({
 *   pageName: t('scriptWriter.title'),
 *   url: 'https://kivitools.com/tiktok/script-writer'
 * });
 * ```
 */
export function generateSpeakableJsonLd({
    pageName,
    url,
    cssSelectors = DEFAULT_SPEAKABLE_SELECTORS,
}: {
    pageName: string;
    url: string;
    cssSelectors?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageName,
        url,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: cssSelectors,
        },
    };
}

/**
 * Generate Speakable schema using XPath (alternative to CSS selectors)
 *
 * Use this if CSS selectors are not sufficient for targeting content.
 * Note: CSS selectors are preferred for simplicity.
 */
export function generateSpeakableWithXPathJsonLd({
    pageName,
    url,
    xpaths,
}: {
    pageName: string;
    url: string;
    xpaths: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageName,
        url,
        speakable: {
            '@type': 'SpeakableSpecification',
            xpath: xpaths,
        },
    };
}
