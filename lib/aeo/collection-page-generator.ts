/**
 * CollectionPage Schema Generator
 *
 * Generates CollectionPage structured data for platform hub pages.
 * Each platform hub (e.g., /tiktok) is a collection of related tools.
 *
 * Schema.org Reference: https://schema.org/CollectionPage
 */

import type { ToolInfo, SupportedLanguage } from './schemas';

// =============================================================================
// Platform Tool Mappings (Static)
// =============================================================================

const PLATFORM_TOOLS: Record<string, Array<{ slug: string; name: string; description: string }>> = {
    tiktok: [
        { slug: 'script-writer', name: 'TikTok Script Writer', description: 'Generate viral TikTok scripts with AI' },
        { slug: 'video-ideas', name: 'TikTok Video Ideas', description: 'Get trending video ideas for TikTok' },
        { slug: 'hook-generator', name: 'TikTok Hook Generator', description: 'Create attention-grabbing hooks' },
        { slug: 'hashtag-generator', name: 'TikTok Hashtag Generator', description: 'Find trending hashtags' },
        { slug: 'username-generator', name: 'TikTok Username Generator', description: 'Generate creative usernames' },
        { slug: 'bio-generator', name: 'TikTok Bio Generator', description: 'Create engaging profile bios' },
    ],
    instagram: [
        { slug: 'bio-generator', name: 'Instagram Bio Generator', description: 'Create engaging Instagram bios' },
        { slug: 'caption-generator', name: 'Instagram Caption Generator', description: 'Generate viral captions' },
        { slug: 'hashtag-generator', name: 'Instagram Hashtag Generator', description: 'Find trending hashtags' },
        { slug: 'story-ideas', name: 'Instagram Story Ideas', description: 'Get creative story ideas' },
        { slug: 'carousel-generator', name: 'Instagram Carousel Generator', description: 'Create engaging carousels' },
    ],
    youtube: [
        { slug: 'title-generator', name: 'YouTube Title Generator', description: 'Create click-worthy titles' },
        { slug: 'description-generator', name: 'YouTube Description Generator', description: 'Write SEO-optimized descriptions' },
        { slug: 'tag-generator', name: 'YouTube Tag Generator', description: 'Find relevant tags' },
        { slug: 'video-ideas', name: 'YouTube Video Ideas', description: 'Get trending video ideas' },
        { slug: 'script-generator', name: 'YouTube Script Generator', description: 'Write video scripts' },
    ],
    twitter: [
        { slug: 'tweet-generator', name: 'Tweet Generator', description: 'Create viral tweets' },
        { slug: 'thread-maker', name: 'Twitter Thread Maker', description: 'Write engaging threads' },
        { slug: 'bio-generator', name: 'Twitter Bio Generator', description: 'Create professional bios' },
    ],
    linkedin: [
        { slug: 'headline-generator', name: 'LinkedIn Headline Generator', description: 'Create professional headlines' },
        { slug: 'about-generator', name: 'LinkedIn About Generator', description: 'Write compelling about sections' },
        { slug: 'post-generator', name: 'LinkedIn Post Generator', description: 'Create engaging posts' },
    ],
    facebook: [
        { slug: 'ad-copy', name: 'Facebook Ad Copy Generator', description: 'Write high-converting ad copy' },
        { slug: 'page-bio', name: 'Facebook Page Bio Generator', description: 'Create professional page bios' },
        { slug: 'post-generator', name: 'Facebook Post Generator', description: 'Generate engaging posts' },
    ],
    snapchat: [
        { slug: 'lens-ideas', name: 'Snapchat Lens Ideas', description: 'Get creative lens ideas' },
        { slug: 'story-ideas', name: 'Snapchat Story Ideas', description: 'Create engaging stories' },
        { slug: 'caption-generator', name: 'Snapchat Caption Generator', description: 'Write fun captions' },
    ],
    pinterest: [
        { slug: 'profile-bio', name: 'Pinterest Profile Bio', description: 'Create engaging bios' },
        { slug: 'board-name', name: 'Pinterest Board Name Generator', description: 'Generate creative board names' },
        { slug: 'pin-description', name: 'Pinterest Pin Description', description: 'Write SEO-optimized descriptions' },
    ],
    reddit: [
        { slug: 'post-title', name: 'Reddit Post Title Generator', description: 'Create engaging post titles' },
        { slug: 'comment-generator', name: 'Reddit Comment Generator', description: 'Write relevant comments' },
    ],
    discord: [
        { slug: 'welcome-message', name: 'Discord Welcome Message', description: 'Create welcoming server messages' },
        { slug: 'channel-description', name: 'Discord Channel Description', description: 'Write channel descriptions' },
        { slug: 'rules-generator', name: 'Discord Rules Generator', description: 'Generate server rules' },
    ],
    twitch: [
        { slug: 'bio-generator', name: 'Twitch Bio Generator', description: 'Create streamer bios' },
        { slug: 'panel-description', name: 'Twitch Panel Description', description: 'Write panel descriptions' },
        { slug: 'stream-title', name: 'Twitch Stream Title Generator', description: 'Create catchy stream titles' },
    ],
    spotify: [
        { slug: 'artist-bio', name: 'Spotify Artist Bio', description: 'Write professional artist bios' },
        { slug: 'playlist-name', name: 'Spotify Playlist Name Generator', description: 'Generate creative playlist names' },
        { slug: 'playlist-description', name: 'Spotify Playlist Description', description: 'Create engaging descriptions' },
    ],
    suno: [
        { slug: 'music-prompt-generator', name: 'Suno Music Prompt Generator', description: 'Generate AI music prompts' },
        { slug: 'lyric-generator', name: 'Suno Lyric Generator', description: 'Write song lyrics' },
        { slug: 'song-description-generator', name: 'Suno Song Description', description: 'Create song descriptions' },
    ],
    elevenlabs: [
        { slug: 'voice-script-writer', name: 'ElevenLabs Voice Script Writer', description: 'Write voiceover scripts' },
        { slug: 'podcast-script', name: 'ElevenLabs Podcast Script', description: 'Generate podcast scripts' },
        { slug: 'audiobook-optimizer', name: 'ElevenLabs Audiobook Optimizer', description: 'Optimize text for TTS' },
    ],
    amazon: [
        { slug: 'product-description-generator', name: 'Amazon Product Description', description: 'Write product descriptions' },
        { slug: 'product-review-generator', name: 'Amazon Product Review', description: 'Generate product reviews' },
    ],
    threads: [
        { slug: 'bio-generator', name: 'Threads Bio Generator', description: 'Create profile bios' },
        { slug: 'post-generator', name: 'Threads Post Generator', description: 'Generate engaging posts' },
    ],
    forocoches: [
        { slug: 'pole-generator', name: 'Forocoches Pole Generator', description: 'Genera respuestas para el pole' },
        { slug: 'thread-generator', name: 'Forocoches Thread Generator', description: 'Crea hilos épicos' },
    ],
};

// =============================================================================
// CollectionPage Schema Generator
// =============================================================================

/**
 * Generate CollectionPage schema for platform hub pages (simplified version)
 * 
 * Uses static tool mappings for server-side rendering without translation context
 */
export function generateCollectionPageJsonLd({
    platformName,
    description,
    url,
    tools,
    language = 'en',
}: {
    platformName: string;
    description: string;
    url: string;
    tools?: ToolInfo[];
    language?: SupportedLanguage;
}) {
    // Use provided tools or get from static mapping
    const platformKey = platformName.toLowerCase().replace(/\s+/g, '');
    const toolsData = tools || PLATFORM_TOOLS[platformKey]?.map(t => ({
        name: t.name,
        url: `https://kivitools.com/${platformKey}/${t.slug}`,
        description: t.description,
    })) || [];

    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: generateCollectionName(platformName, language),
        description,
        url,
        inLanguage: language,
        isPartOf: {
            '@type': 'WebSite',
            name: 'KiviTools',
            url: 'https://kivitools.com',
        },
        hasPart: toolsData.map((tool) => ({
            '@type': 'SoftwareApplication',
            name: tool.name,
            url: tool.url,
            description: tool.description,
            applicationCategory: 'WebApplication',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
            },
        })),
    };
}

/**
 * Generate localized collection page name
 */
function generateCollectionName(platformName: string, language: SupportedLanguage): string {
    const templates: Record<SupportedLanguage, string> = {
        en: `${platformName} Tools - Free AI Content Generators`,
        es: `Herramientas de ${platformName} - Generadores de Contenido IA Gratis`,
        pt: `Ferramentas ${platformName} - Geradores de Conteúdo IA Grátis`,
        fr: `Outils ${platformName} - Générateurs de Contenu IA Gratuits`,
        de: `${platformName} Tools - Kostenlose KI-Inhaltsgeneratoren`,
        it: `Strumenti ${platformName} - Generatori di Contenuti IA Gratuiti`,
    };
    return templates[language] || templates.en;
}

/**
 * Helper to build tools array from platform data
 *
 * @example
 * ```tsx
 * const tools = buildToolsArray('tiktok', [
 *   { slug: 'script-writer', nameKey: 'scriptWriter.title', descKey: 'scriptWriter.description' },
 *   { slug: 'video-ideas', nameKey: 'videoIdeas.title', descKey: 'videoIdeas.description' },
 * ], t);
 * ```
 */
export function buildToolsArray(
    platform: string,
    toolConfigs: Array<{ slug: string; nameKey: string; descKey: string }>,
    t: (key: string) => string
): ToolInfo[] {
    return toolConfigs.map((config) => ({
        name: t(config.nameKey),
        url: `https://kivitools.com/${platform}/${config.slug}`,
        description: t(config.descKey),
    }));
}
