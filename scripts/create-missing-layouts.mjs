#!/usr/bin/env node

/**
 * Script to create layout.tsx files for tools that don't have one
 * This enables AEO schemas (SoftwareApplication, HowTo, FAQ, Speakable)
 * 
 * Run: node scripts/create-missing-layouts.mjs
 */

import fs from 'fs';
import path from 'path';

const TOOLS_DIR = 'app/(tools)';

// Tool metadata mapping - we'll extract this from page.tsx or define defaults
const TOOL_METADATA = {
  // Amazon
  'amazon/product-comparison-generator': {
    toolName: 'Product Comparison Generator',
    title: 'Amazon Product Comparison Generator - Compare Products with AI',
    description: 'Generate detailed product comparisons for Amazon listings. AI-powered comparison tool for sellers and marketers.',
    englishSlug: 'product-comparison-generator',
    spanishSlug: 'generador-comparacion-productos',
    keywords: ['amazon comparison', 'product comparison', 'amazon seller tools'],
  },
  'amazon/product-review-generator': {
    toolName: 'Product Review Generator',
    title: 'Amazon Product Review Generator - Create Authentic Reviews',
    description: 'Generate authentic-sounding product reviews for Amazon. AI-powered review creation for better product listings.',
    englishSlug: 'product-review-generator',
    spanishSlug: 'generador-resenas-productos',
    keywords: ['amazon reviews', 'product review generator', 'amazon seller'],
  },
  'amazon/product-description-generator': {
    toolName: 'Product Description Generator',
    title: 'Amazon Product Description Generator - SEO Optimized Descriptions',
    description: 'Create compelling Amazon product descriptions with AI. Optimized for conversions and SEO.',
    englishSlug: 'product-description-generator',
    spanishSlug: 'generador-descripcion-productos',
    keywords: ['amazon description', 'product listing', 'amazon seo'],
  },
  
  // Pinterest
  'pinterest/profile-bio': {
    toolName: 'Profile Bio Generator',
    title: 'Pinterest Profile Bio Generator - Create Engaging Bios',
    description: 'Generate creative Pinterest profile bios with AI. Stand out and attract more followers.',
    englishSlug: 'profile-bio',
    spanishSlug: 'bio-perfil',
    keywords: ['pinterest bio', 'profile bio', 'pinterest marketing'],
  },
  'pinterest/board-name': {
    toolName: 'Board Name Generator',
    title: 'Pinterest Board Name Generator - Creative Board Names',
    description: 'Generate creative and SEO-friendly Pinterest board names with AI.',
    englishSlug: 'board-name',
    spanishSlug: 'nombre-tablero',
    keywords: ['pinterest board', 'board names', 'pinterest seo'],
  },
  'pinterest/pin-description': {
    toolName: 'Pin Description Generator',
    title: 'Pinterest Pin Description Generator - SEO Optimized Pins',
    description: 'Create engaging Pinterest pin descriptions with AI. Optimized for search and engagement.',
    englishSlug: 'pin-description',
    spanishSlug: 'descripcion-pin',
    keywords: ['pinterest description', 'pin seo', 'pinterest marketing'],
  },
  
  // Spotify
  'spotify/artist-bio': {
    toolName: 'Artist Bio Generator',
    title: 'Spotify Artist Bio Generator - Professional Artist Bios',
    description: 'Generate professional Spotify artist bios with AI. Perfect for musicians and bands.',
    englishSlug: 'artist-bio',
    spanishSlug: 'bio-artista',
    keywords: ['spotify bio', 'artist bio', 'musician bio'],
  },
  'spotify/playlist-name': {
    toolName: 'Playlist Name Generator',
    title: 'Spotify Playlist Name Generator - Creative Playlist Names',
    description: 'Generate creative Spotify playlist names with AI. Stand out with unique playlist titles.',
    englishSlug: 'playlist-name',
    spanishSlug: 'nombre-playlist',
    keywords: ['spotify playlist', 'playlist name', 'spotify curator'],
  },
  'spotify/playlist-description': {
    toolName: 'Playlist Description Generator',
    title: 'Spotify Playlist Description Generator - Engaging Descriptions',
    description: 'Create engaging Spotify playlist descriptions with AI. Attract more listeners.',
    englishSlug: 'playlist-description',
    spanishSlug: 'descripcion-playlist',
    keywords: ['spotify description', 'playlist description', 'spotify seo'],
  },
  
  // YouTube (missing ones)
  'youtube/video-ideas': {
    toolName: 'Video Ideas Generator',
    title: 'YouTube Video Ideas Generator - Never Run Out of Content',
    description: 'Generate viral YouTube video ideas with AI. Get trending content suggestions for your channel.',
    englishSlug: 'video-ideas',
    spanishSlug: 'ideas-videos',
    keywords: ['youtube ideas', 'video ideas', 'content ideas'],
  },
  'youtube/tag-generator': {
    toolName: 'Tag Generator',
    title: 'YouTube Tag Generator - SEO Optimized Tags',
    description: 'Generate SEO-optimized YouTube tags with AI. Improve video discoverability and rankings.',
    englishSlug: 'tag-generator',
    spanishSlug: 'generador-etiquetas',
    keywords: ['youtube tags', 'video seo', 'youtube optimization'],
  },
  'youtube/community-post-generator': {
    toolName: 'Community Post Generator',
    title: 'YouTube Community Post Generator - Engage Your Audience',
    description: 'Create engaging YouTube community posts with AI. Keep your audience engaged between videos.',
    englishSlug: 'community-post-generator',
    spanishSlug: 'generador-posts-comunidad',
    keywords: ['youtube community', 'community post', 'youtube engagement'],
  },
  
  // ElevenLabs
  'elevenlabs/video-voiceover-script': {
    toolName: 'Video Voiceover Script',
    title: 'ElevenLabs Video Voiceover Script Generator',
    description: 'Generate professional voiceover scripts optimized for ElevenLabs AI voice synthesis.',
    englishSlug: 'video-voiceover-script',
    spanishSlug: 'guion-voz-video',
    keywords: ['voiceover script', 'elevenlabs', 'ai voice'],
  },
  'elevenlabs/voice-script-writer': {
    toolName: 'Voice Script Writer',
    title: 'ElevenLabs Voice Script Writer - AI Voice Scripts',
    description: 'Write scripts optimized for AI voice synthesis with ElevenLabs. Natural-sounding scripts.',
    englishSlug: 'voice-script-writer',
    spanishSlug: 'escritor-guiones-voz',
    keywords: ['voice script', 'elevenlabs script', 'tts script'],
  },
  'elevenlabs/podcast-script': {
    toolName: 'Podcast Script Generator',
    title: 'ElevenLabs Podcast Script Generator - AI Podcast Scripts',
    description: 'Generate podcast scripts optimized for ElevenLabs voice synthesis. Professional podcast content.',
    englishSlug: 'podcast-script',
    spanishSlug: 'guion-podcast',
    keywords: ['podcast script', 'elevenlabs podcast', 'ai podcast'],
  },
  'elevenlabs/audiobook-optimizer': {
    toolName: 'Audiobook Optimizer',
    title: 'ElevenLabs Audiobook Optimizer - Text to Speech Ready',
    description: 'Optimize text for audiobook narration with ElevenLabs. Perfect formatting for AI voice.',
    englishSlug: 'audiobook-optimizer',
    spanishSlug: 'optimizador-audiolibro',
    keywords: ['audiobook', 'elevenlabs audiobook', 'tts optimization'],
  },
  'elevenlabs/voice-text-formatter': {
    toolName: 'Voice Text Formatter',
    title: 'ElevenLabs Voice Text Formatter - TTS Optimization',
    description: 'Format text for optimal text-to-speech output with ElevenLabs. Better pronunciation and flow.',
    englishSlug: 'voice-text-formatter',
    spanishSlug: 'formateador-texto-voz',
    keywords: ['text formatter', 'tts formatting', 'elevenlabs'],
  },
  'elevenlabs/ad-script': {
    toolName: 'Ad Script Generator',
    title: 'ElevenLabs Ad Script Generator - Voice Ad Scripts',
    description: 'Generate compelling ad scripts for AI voice synthesis. Perfect for audio ads and commercials.',
    englishSlug: 'ad-script',
    spanishSlug: 'guion-anuncio',
    keywords: ['ad script', 'voice ad', 'audio commercial'],
  },
  
  // Facebook
  'facebook/ad-copy': {
    toolName: 'Ad Copy Generator',
    title: 'Facebook Ad Copy Generator - High Converting Ads',
    description: 'Generate high-converting Facebook ad copy with AI. Boost your ad performance.',
    englishSlug: 'ad-copy',
    spanishSlug: 'texto-anuncio',
    keywords: ['facebook ads', 'ad copy', 'facebook marketing'],
  },
  'facebook/page-bio': {
    toolName: 'Page Bio Generator',
    title: 'Facebook Page Bio Generator - Professional Page Descriptions',
    description: 'Create professional Facebook page bios with AI. Attract more followers and engagement.',
    englishSlug: 'page-bio',
    spanishSlug: 'bio-pagina',
    keywords: ['facebook bio', 'page description', 'facebook page'],
  },
  'facebook/post-generator': {
    toolName: 'Post Generator',
    title: 'Facebook Post Generator - Engaging Social Posts',
    description: 'Generate engaging Facebook posts with AI. Increase reach and engagement.',
    englishSlug: 'post-generator',
    spanishSlug: 'generador-posts',
    keywords: ['facebook post', 'social media', 'facebook content'],
  },
  
  // Forocoches
  'forocoches/pole-generator': {
    toolName: 'Pole Generator',
    title: 'Forocoches Pole Generator - Consigue el Pole',
    description: 'Genera respuestas perfectas para conseguir el pole en Forocoches. Sé el primero en responder.',
    englishSlug: 'pole-generator',
    spanishSlug: 'generador-pole',
    keywords: ['forocoches', 'pole', 'foro'],
  },
  'forocoches/troll-response': {
    toolName: 'Troll Response Generator',
    title: 'Forocoches Troll Response Generator - Respuestas Épicas',
    description: 'Genera respuestas ingeniosas para trollear en Forocoches. Humor forero garantizado.',
    englishSlug: 'troll-response',
    spanishSlug: 'respuesta-troll',
    keywords: ['forocoches troll', 'respuestas', 'humor forero'],
  },
  'forocoches/thread-generator': {
    toolName: 'Thread Generator',
    title: 'Forocoches Thread Generator - Hilos Virales',
    description: 'Genera hilos épicos para Forocoches. Crea contenido que se vuelva viral en el foro.',
    englishSlug: 'thread-generator',
    spanishSlug: 'generador-hilos',
    keywords: ['forocoches hilos', 'thread', 'foro español'],
  },
  
  // TikTok (missing ones)
  'tiktok/caption-generator': {
    toolName: 'Caption Generator',
    title: 'TikTok Caption Generator - Viral Captions with AI',
    description: 'Generate viral TikTok captions with AI. Boost engagement with compelling descriptions.',
    englishSlug: 'caption-generator',
    spanishSlug: 'generador-subtitulos',
    keywords: ['tiktok caption', 'viral caption', 'tiktok description'],
  },
  'tiktok/song-recommendations': {
    toolName: 'Song Recommendations',
    title: 'TikTok Song Recommendations - Trending Music Finder',
    description: 'Find trending TikTok songs for your videos. AI-powered music recommendations.',
    englishSlug: 'song-recommendations',
    spanishSlug: 'recomendaciones-canciones',
    keywords: ['tiktok songs', 'trending music', 'tiktok audio'],
  },
  'tiktok/bio-generator': {
    toolName: 'Bio Generator',
    title: 'TikTok Bio Generator - Stand Out Profile Bios',
    description: 'Generate creative TikTok bios with AI. Make your profile stand out.',
    englishSlug: 'bio-generator',
    spanishSlug: 'generador-bio',
    keywords: ['tiktok bio', 'profile bio', 'tiktok profile'],
  },
  'tiktok/content-calendar-generator': {
    toolName: 'Content Calendar Generator',
    title: 'TikTok Content Calendar Generator - Plan Your Content',
    description: 'Generate a content calendar for TikTok. Plan your posts for maximum engagement.',
    englishSlug: 'content-calendar-generator',
    spanishSlug: 'generador-calendario-contenido',
    keywords: ['content calendar', 'tiktok planning', 'content strategy'],
  },
  'tiktok/thumbnail-text-generator': {
    toolName: 'Thumbnail Text Generator',
    title: 'TikTok Thumbnail Text Generator - Eye-Catching Covers',
    description: 'Generate compelling thumbnail text for TikTok videos. Increase click-through rates.',
    englishSlug: 'thumbnail-text-generator',
    spanishSlug: 'generador-texto-miniatura',
    keywords: ['tiktok thumbnail', 'cover text', 'video thumbnail'],
  },
  'tiktok/ad-copy-generator': {
    toolName: 'Ad Copy Generator',
    title: 'TikTok Ad Copy Generator - High Converting Ads',
    description: 'Generate high-converting TikTok ad copy with AI. Boost your ad performance.',
    englishSlug: 'ad-copy-generator',
    spanishSlug: 'generador-texto-anuncios',
    keywords: ['tiktok ads', 'ad copy', 'tiktok marketing'],
  },
  
  // Twitch (missing ones)
  'twitch/bio-generator': {
    toolName: 'Bio Generator',
    title: 'Twitch Bio Generator - Professional Streamer Bios',
    description: 'Generate professional Twitch bios with AI. Make your channel stand out.',
    englishSlug: 'bio-generator',
    spanishSlug: 'generador-bio',
    keywords: ['twitch bio', 'streamer bio', 'twitch profile'],
  },
  'twitch/stream-plan-generator': {
    toolName: 'Stream Plan Generator',
    title: 'Twitch Stream Plan Generator - Plan Your Streams',
    description: 'Generate stream plans and schedules for Twitch. Organize your content strategy.',
    englishSlug: 'stream-plan-generator',
    spanishSlug: 'generador-plan-stream',
    keywords: ['stream plan', 'twitch schedule', 'content planning'],
  },
  'twitch/rules-generator': {
    toolName: 'Rules Generator',
    title: 'Twitch Chat Rules Generator - Channel Rules',
    description: 'Generate chat rules for your Twitch channel. Keep your community positive.',
    englishSlug: 'rules-generator',
    spanishSlug: 'generador-reglas',
    keywords: ['twitch rules', 'chat rules', 'channel moderation'],
  },
  
  // Suno
  'suno/music-prompt-generator': {
    toolName: 'Music Prompt Generator',
    title: 'Suno Music Prompt Generator - AI Music Prompts',
    description: 'Generate creative prompts for Suno AI music generation. Create unique songs.',
    englishSlug: 'music-prompt-generator',
    spanishSlug: 'generador-prompts-musica',
    keywords: ['suno prompts', 'ai music', 'music generation'],
  },
  'suno/song-description-generator': {
    toolName: 'Song Description Generator',
    title: 'Suno Song Description Generator - Describe Your Music',
    description: 'Generate song descriptions for Suno AI. Better descriptions, better music.',
    englishSlug: 'song-description-generator',
    spanishSlug: 'generador-descripcion-cancion',
    keywords: ['suno description', 'song description', 'ai music'],
  },
  'suno/lyric-generator': {
    toolName: 'Lyric Generator',
    title: 'Suno Lyric Generator - AI Song Lyrics',
    description: 'Generate song lyrics for Suno AI music. Create complete songs with AI.',
    englishSlug: 'lyric-generator',
    spanishSlug: 'generador-letras',
    keywords: ['suno lyrics', 'song lyrics', 'ai lyrics'],
  },
  
  // Instagram (missing ones)
  'instagram/story-ideas': {
    toolName: 'Story Ideas Generator',
    title: 'Instagram Story Ideas Generator - Creative Story Content',
    description: 'Generate creative Instagram story ideas with AI. Keep your audience engaged.',
    englishSlug: 'story-ideas',
    spanishSlug: 'ideas-historias',
    keywords: ['instagram stories', 'story ideas', 'instagram content'],
  },
  'instagram/carousel-generator': {
    toolName: 'Carousel Generator',
    title: 'Instagram Carousel Generator - Multi-Slide Posts',
    description: 'Generate engaging Instagram carousel content with AI. Create viral multi-slide posts.',
    englishSlug: 'carousel-generator',
    spanishSlug: 'generador-carrusel',
    keywords: ['instagram carousel', 'carousel post', 'instagram slides'],
  },
  'instagram/content-calendar': {
    toolName: 'Content Calendar Generator',
    title: 'Instagram Content Calendar Generator - Plan Your Posts',
    description: 'Generate a content calendar for Instagram. Plan your posts for maximum engagement.',
    englishSlug: 'content-calendar',
    spanishSlug: 'calendario-contenido',
    keywords: ['content calendar', 'instagram planning', 'content strategy'],
  },
  'instagram/ad-copy-generator': {
    toolName: 'Ad Copy Generator',
    title: 'Instagram Ad Copy Generator - High Converting Ads',
    description: 'Generate high-converting Instagram ad copy with AI. Boost your ad performance.',
    englishSlug: 'ad-copy-generator',
    spanishSlug: 'generador-texto-anuncios',
    keywords: ['instagram ads', 'ad copy', 'instagram marketing'],
  },
  'instagram/hashtag-generator': {
    toolName: 'Hashtag Generator',
    title: 'Instagram Hashtag Generator - Trending Hashtags',
    description: 'Generate trending Instagram hashtags with AI. Increase your reach and visibility.',
    englishSlug: 'hashtag-generator',
    spanishSlug: 'generador-hashtags',
    keywords: ['instagram hashtags', 'trending hashtags', 'instagram seo'],
  },
  
  // LinkedIn
  'linkedin/headline-generator': {
    toolName: 'Headline Generator',
    title: 'LinkedIn Headline Generator - Professional Headlines',
    description: 'Generate professional LinkedIn headlines with AI. Stand out to recruiters.',
    englishSlug: 'headline-generator',
    spanishSlug: 'generador-titular',
    keywords: ['linkedin headline', 'professional headline', 'job search'],
  },
  'linkedin/about-generator': {
    toolName: 'About Section Generator',
    title: 'LinkedIn About Generator - Professional Summaries',
    description: 'Generate compelling LinkedIn about sections with AI. Tell your professional story.',
    englishSlug: 'about-generator',
    spanishSlug: 'generador-acerca-de',
    keywords: ['linkedin about', 'linkedin summary', 'professional bio'],
  },
  'linkedin/post-generator': {
    toolName: 'Post Generator',
    title: 'LinkedIn Post Generator - Professional Content',
    description: 'Generate engaging LinkedIn posts with AI. Build your professional brand.',
    englishSlug: 'post-generator',
    spanishSlug: 'generador-posts',
    keywords: ['linkedin post', 'professional content', 'linkedin marketing'],
  },
  
  // Threads
  'threads/bio-generator': {
    toolName: 'Bio Generator',
    title: 'Threads Bio Generator - Creative Profile Bios',
    description: 'Generate creative Threads bios with AI. Make your profile stand out.',
    englishSlug: 'bio-generator',
    spanishSlug: 'generador-bio',
    keywords: ['threads bio', 'profile bio', 'threads profile'],
  },
  'threads/post-generator': {
    toolName: 'Post Generator',
    title: 'Threads Post Generator - Engaging Posts',
    description: 'Generate engaging Threads posts with AI. Grow your audience on Threads.',
    englishSlug: 'post-generator',
    spanishSlug: 'generador-posts',
    keywords: ['threads post', 'threads content', 'meta threads'],
  },
  'threads/reply-generator': {
    toolName: 'Reply Generator',
    title: 'Threads Reply Generator - Engaging Responses',
    description: 'Generate engaging Threads replies with AI. Build connections through conversations.',
    englishSlug: 'reply-generator',
    spanishSlug: 'generador-respuestas',
    keywords: ['threads reply', 'threads response', 'engagement'],
  },
};

// Generic HowTo steps based on tool type
function getHowToSteps(toolName, platform) {
  return [
    { title: 'Enter Your Details', description: `Provide the necessary information about your ${platform} content or product.` },
    { title: 'Customize Options', description: 'Select your preferred tone, style, and language for the generated content.' },
    { title: 'Generate and Use', description: `Click generate to get your AI-powered ${toolName.toLowerCase()}. Copy and use it on ${platform}.` },
  ];
}

// Generic FAQ based on tool type
function getFAQs(toolName, platform) {
  return [
    { question: `Is the ${platform} ${toolName} free?`, answer: 'Yes, completely free with no signup required. Generate unlimited content.' },
    { question: 'What languages are supported?', answer: 'We support English, Spanish, Portuguese, French, German, and Italian.' },
    { question: 'How does the AI generate content?', answer: 'Our AI analyzes your input and generates optimized content based on best practices and trends.' },
    { question: 'Can I customize the output?', answer: 'Yes! You can select different tones, styles, and options to match your needs.' },
    { question: 'Will my content be unique?', answer: 'Yes, each generation is unique and tailored to your specific input.' },
  ];
}

function generateLayoutContent(platform, toolPath, metadata) {
  const howToSteps = getHowToSteps(metadata.toolName, platform);
  const faqs = getFAQs(metadata.toolName, platform);
  
  return `import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "${platform}",
  toolName: "${metadata.toolName}",
  title: "${metadata.title}",
  description: "${metadata.description}",
  englishSlug: "${metadata.englishSlug}",
  spanishSlug: "${metadata.spanishSlug}",
  keywords: ${JSON.stringify(metadata.keywords)},
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "${platform}",
  toolName: "${metadata.toolName}",
  title: "${metadata.title.split(' - ')[0]}",
  description: "${metadata.description}",
  englishSlug: "${metadata.englishSlug}",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "${platform}",
  toolName: "${metadata.toolName}",
  englishSlug: "${metadata.englishSlug}",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "${metadata.title.split(' - ')[0]}",
  description: "${metadata.description}",
  steps: ${JSON.stringify(howToSteps, null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')},
  language: "en",
});

const faqJsonLd = generateFaqJsonLd(${JSON.stringify(faqs, null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')}, "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "${metadata.title.split(' - ')[0]}",
  url: "https://kivitools.com/${platform}/${metadata.englishSlug}",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      {children}
    </>
  );
}
`;
}

async function main() {
  console.log('🔍 Finding tools without layout.tsx...\n');
  
  const platforms = fs.readdirSync(TOOLS_DIR).filter(f => {
    const stat = fs.statSync(path.join(TOOLS_DIR, f));
    return stat.isDirectory() && !f.startsWith('[');
  });
  
  let created = 0;
  let skipped = 0;
  let noMetadata = 0;
  
  for (const platform of platforms) {
    const platformDir = path.join(TOOLS_DIR, platform);
    const tools = fs.readdirSync(platformDir).filter(f => {
      const toolPath = path.join(platformDir, f);
      return fs.statSync(toolPath).isDirectory() && !f.startsWith('[');
    });
    
    for (const tool of tools) {
      const toolDir = path.join(platformDir, tool);
      const layoutPath = path.join(toolDir, 'layout.tsx');
      const pagePath = path.join(toolDir, 'page.tsx');
      
      // Skip if layout already exists
      if (fs.existsSync(layoutPath)) {
        continue;
      }
      
      // Skip if no page.tsx
      if (!fs.existsSync(pagePath)) {
        continue;
      }
      
      const toolKey = `${platform}/${tool}`;
      const metadata = TOOL_METADATA[toolKey];
      
      if (!metadata) {
        console.log(`⚠️  No metadata defined for: ${toolKey}`);
        noMetadata++;
        continue;
      }
      
      const layoutContent = generateLayoutContent(platform, tool, metadata);
      fs.writeFileSync(layoutPath, layoutContent);
      console.log(`✅ Created: ${layoutPath}`);
      created++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Created: ${created} files`);
  console.log(`   No metadata: ${noMetadata} files`);
}

main().catch(console.error);
