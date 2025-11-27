#!/usr/bin/env node

/**
 * Script to create layout.tsx files for platform hub pages
 * Adds CollectionPage schema for AEO optimization
 * 
 * Run: node scripts/create-platform-layouts.mjs
 */

import fs from 'fs';
import path from 'path';

const TOOLS_DIR = 'app/(tools)';

// Platform metadata
const PLATFORMS = {
  tiktok: {
    name: 'TikTok',
    title: 'Free TikTok Tools - AI Content Generators & Calculators',
    description: 'Free AI-powered TikTok tools: script writer, video ideas, hashtag generator, coins calculator, and more. Create viral content.',
    keywords: ['tiktok tools', 'tiktok generator', 'tiktok calculator', 'viral tiktok'],
    color: '#00f2ea',
  },
  instagram: {
    name: 'Instagram',
    title: 'Free Instagram Tools - AI Bio, Caption & Hashtag Generators',
    description: 'Free AI Instagram tools: bio generator, caption writer, hashtag finder, story ideas, and carousel creator. Grow your following.',
    keywords: ['instagram tools', 'instagram generator', 'instagram caption', 'instagram bio'],
    color: '#E1306C',
  },
  twitter: {
    name: 'Twitter',
    title: 'Free Twitter/X Tools - AI Tweet & Thread Generators',
    description: 'Free AI Twitter tools: tweet generator, thread maker, bio writer, and engagement boosters. Create viral tweets.',
    keywords: ['twitter tools', 'tweet generator', 'twitter thread', 'x tools'],
    color: '#1DA1F2',
  },
  youtube: {
    name: 'YouTube',
    title: 'Free YouTube Tools - AI Title, Description & Tag Generators',
    description: 'Free AI YouTube tools: title generator, description writer, tag finder, and video ideas. Optimize your videos for growth.',
    keywords: ['youtube tools', 'youtube seo', 'youtube generator', 'video title'],
    color: '#FF0000',
  },
  linkedin: {
    name: 'LinkedIn',
    title: 'Free LinkedIn Tools - AI Profile & Post Generators',
    description: 'Free AI LinkedIn tools: headline generator, about section writer, post creator. Build your professional brand.',
    keywords: ['linkedin tools', 'linkedin generator', 'linkedin profile', 'linkedin post'],
    color: '#0077B5',
  },
  facebook: {
    name: 'Facebook',
    title: 'Free Facebook Tools - AI Ad Copy & Post Generators',
    description: 'Free AI Facebook tools: ad copy generator, post creator, page bio writer. Boost your Facebook marketing.',
    keywords: ['facebook tools', 'facebook ads', 'facebook generator', 'facebook post'],
    color: '#1877F2',
  },
  snapchat: {
    name: 'Snapchat',
    title: 'Free Snapchat Tools - AI Content & Story Generators',
    description: 'Free AI Snapchat tools: lens ideas, story prompts, caption generator. Create engaging Snap content.',
    keywords: ['snapchat tools', 'snapchat generator', 'snap ideas', 'snapchat content'],
    color: '#FFFC00',
  },
  pinterest: {
    name: 'Pinterest',
    title: 'Free Pinterest Tools - AI Pin & Board Generators',
    description: 'Free AI Pinterest tools: pin description writer, board name generator, profile bio creator. Grow your Pinterest presence.',
    keywords: ['pinterest tools', 'pinterest seo', 'pin description', 'pinterest generator'],
    color: '#E60023',
  },
  reddit: {
    name: 'Reddit',
    title: 'Free Reddit Tools - AI Post & Comment Generators',
    description: 'Free AI Reddit tools: post title generator, comment writer, subreddit finder. Master Reddit engagement.',
    keywords: ['reddit tools', 'reddit generator', 'reddit post', 'reddit comment'],
    color: '#FF4500',
  },
  discord: {
    name: 'Discord',
    title: 'Free Discord Tools - AI Bot & Server Generators',
    description: 'Free AI Discord tools: welcome message generator, rules creator, bot command writer. Build better communities.',
    keywords: ['discord tools', 'discord generator', 'discord bot', 'discord server'],
    color: '#5865F2',
  },
  twitch: {
    name: 'Twitch',
    title: 'Free Twitch Tools - AI Stream & Panel Generators',
    description: 'Free AI Twitch tools: bio generator, panel description writer, stream title creator. Level up your stream.',
    keywords: ['twitch tools', 'twitch generator', 'streamer tools', 'twitch bio'],
    color: '#9146FF',
  },
  spotify: {
    name: 'Spotify',
    title: 'Free Spotify Tools - AI Playlist & Artist Bio Generators',
    description: 'Free AI Spotify tools: playlist name generator, description writer, artist bio creator. Enhance your music presence.',
    keywords: ['spotify tools', 'playlist generator', 'spotify bio', 'music tools'],
    color: '#1DB954',
  },
  suno: {
    name: 'Suno',
    title: 'Free Suno AI Tools - Music Prompt & Lyric Generators',
    description: 'Free AI tools for Suno: music prompt generator, lyric writer, song description creator. Create amazing AI music.',
    keywords: ['suno tools', 'suno ai', 'music prompt', 'ai lyrics'],
    color: '#8B5CF6',
  },
  elevenlabs: {
    name: 'ElevenLabs',
    title: 'Free ElevenLabs Tools - AI Voice Script Generators',
    description: 'Free AI tools for ElevenLabs: voiceover scripts, podcast scripts, audiobook optimizer. Perfect text for AI voices.',
    keywords: ['elevenlabs tools', 'voice script', 'tts tools', 'ai voice'],
    color: '#000000',
  },
  amazon: {
    name: 'Amazon',
    title: 'Free Amazon Tools - AI Product Description Generators',
    description: 'Free AI Amazon seller tools: product description writer, review generator, comparison creator. Boost your listings.',
    keywords: ['amazon tools', 'amazon seller', 'product description', 'amazon listing'],
    color: '#FF9900',
  },
  threads: {
    name: 'Threads',
    title: 'Free Threads Tools - AI Post & Bio Generators',
    description: 'Free AI Threads tools: post generator, bio writer, reply creator. Grow on Meta Threads platform.',
    keywords: ['threads tools', 'threads generator', 'meta threads', 'threads post'],
    color: '#000000',
  },
  forocoches: {
    name: 'Forocoches',
    title: 'Herramientas Forocoches - Generadores de Hilos y Poles',
    description: 'Herramientas gratuitas para Forocoches: generador de poles, respuestas troll, creador de hilos épicos. Domina el foro.',
    keywords: ['forocoches', 'generador pole', 'foro español', 'hilos forocoches'],
    color: '#2E5090',
  },
};

function generateLayoutContent(platform, metadata) {
  return `import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "${metadata.title} | KiviTools",
  description: "${metadata.description}",
  keywords: ${JSON.stringify(metadata.keywords)},
  openGraph: {
    title: "${metadata.title}",
    description: "${metadata.description}",
    url: \`https://kivitools.com/${platform}\`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${metadata.title}",
    description: "${metadata.description}",
  },
  alternates: {
    canonical: \`https://kivitools.com/${platform}\`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "${metadata.name}",
  description: "${metadata.description}",
  url: "https://kivitools.com/${platform}",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "${platform}",
  toolName: "${metadata.name} Tools",
  englishSlug: "",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
`;
}

async function main() {
  console.log('🔍 Creating platform layout.tsx files with CollectionPage schema...\n');
  
  let created = 0;
  let skipped = 0;
  
  for (const [platform, metadata] of Object.entries(PLATFORMS)) {
    const platformDir = path.join(TOOLS_DIR, platform);
    const layoutPath = path.join(platformDir, 'layout.tsx');
    
    // Check if platform directory exists
    if (!fs.existsSync(platformDir)) {
      console.log(`⚠️  Platform directory not found: ${platformDir}`);
      continue;
    }
    
    // Check if layout already exists
    if (fs.existsSync(layoutPath)) {
      console.log(`⏭️  Skipped (exists): ${layoutPath}`);
      skipped++;
      continue;
    }
    
    const layoutContent = generateLayoutContent(platform, metadata);
    fs.writeFileSync(layoutPath, layoutContent);
    console.log(`✅ Created: ${layoutPath}`);
    created++;
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Created: ${created} files`);
  console.log(`   Skipped: ${skipped} files`);
}

main().catch(console.error);
