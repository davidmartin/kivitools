#!/usr/bin/env node

/**
 * Script para generar redirects 301 de tools estáticas a dinámicas
 * Las tools dinámicas usan el formato: /[platform]/[slug]-[appwriteId]
 * 
 * Run: node scripts/generate-redirects.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools"; // Hardcoded - la colección de tools

// Mapeo de slugs estáticos a platform + baseSlug para matching
const STATIC_TOOLS = {
  // TikTok
  "tiktok/script-writer": { platform: "tiktok", slug: "script-writer" },
  "tiktok/video-ideas": { platform: "tiktok", slug: "video-ideas" },
  "tiktok/hook-generator": { platform: "tiktok", slug: "hook-generator" },
  "tiktok/hashtag-generator": { platform: "tiktok", slug: "hashtag-generator" },
  "tiktok/caption-generator": { platform: "tiktok", slug: "caption-generator" },
  "tiktok/username-generator": { platform: "tiktok", slug: "username-generator" },
  "tiktok/shop-name-generator": { platform: "tiktok", slug: "shop-name-generator" },
  "tiktok/coins-calculator": { platform: "tiktok", slug: "coins-calculator" },
  "tiktok/money-calculator": { platform: "tiktok", slug: "money-calculator" },
  "tiktok/engagement-calculator": { platform: "tiktok", slug: "engagement-calculator" },
  "tiktok/bio-generator": { platform: "tiktok", slug: "bio-generator" },
  "tiktok/content-calendar-generator": { platform: "tiktok", slug: "content-calendar-generator" },
  "tiktok/ad-copy-generator": { platform: "tiktok", slug: "ad-copy-generator" },
  "tiktok/song-recommendations": { platform: "tiktok", slug: "song-recommendations" },
  "tiktok/thumbnail-text-generator": { platform: "tiktok", slug: "thumbnail-text-generator" },
  
  // Instagram
  "instagram/bio-generator": { platform: "instagram", slug: "bio-generator" },
  "instagram/caption-generator": { platform: "instagram", slug: "caption-generator" },
  "instagram/reel-script": { platform: "instagram", slug: "reel-script" },
  "instagram/engagement-calculator": { platform: "instagram", slug: "engagement-calculator" },
  "instagram/hashtag-generator": { platform: "instagram", slug: "hashtag-generator" },
  "instagram/story-ideas": { platform: "instagram", slug: "story-ideas" },
  "instagram/carousel-generator": { platform: "instagram", slug: "carousel-generator" },
  "instagram/content-calendar": { platform: "instagram", slug: "content-calendar" },
  "instagram/ad-copy-generator": { platform: "instagram", slug: "ad-copy-generator" },
  
  // Twitter
  "twitter/bio-generator": { platform: "twitter", slug: "bio-generator" },
  "twitter/tweet-generator": { platform: "twitter", slug: "tweet-generator" },
  "twitter/thread-maker": { platform: "twitter", slug: "thread-maker" },
  
  // Snapchat
  "snapchat/story-ideas": { platform: "snapchat", slug: "story-ideas" },
  "snapchat/caption-generator": { platform: "snapchat", slug: "caption-generator" },
  "snapchat/lens-ideas": { platform: "snapchat", slug: "lens-ideas" },
  
  // YouTube
  "youtube/title-generator": { platform: "youtube", slug: "title-generator" },
  "youtube/description-generator": { platform: "youtube", slug: "description-generator" },
  "youtube/script-generator": { platform: "youtube", slug: "script-generator" },
  "youtube/channel-name-generator": { platform: "youtube", slug: "channel-name-generator" },
  "youtube/tag-generator": { platform: "youtube", slug: "tag-generator" },
  "youtube/video-ideas": { platform: "youtube", slug: "video-ideas" },
  "youtube/community-post-generator": { platform: "youtube", slug: "community-post-generator" },
  
  // Reddit
  "reddit/post-generator": { platform: "reddit", slug: "post-generator" },
  "reddit/comment-generator": { platform: "reddit", slug: "comment-generator" },
  "reddit/ama-questions": { platform: "reddit", slug: "ama-questions" },
  
  // Discord
  "discord/announcement-generator": { platform: "discord", slug: "announcement-generator" },
  "discord/welcome-message": { platform: "discord", slug: "welcome-message" },
  "discord/event-description": { platform: "discord", slug: "event-description" },
  
  // Twitch
  "twitch/stream-title": { platform: "twitch", slug: "stream-title" },
  "twitch/panel-description": { platform: "twitch", slug: "panel-description" },
  "twitch/chat-command": { platform: "twitch", slug: "chat-command" },
  "twitch/bio-generator": { platform: "twitch", slug: "bio-generator" },
  "twitch/rules-generator": { platform: "twitch", slug: "rules-generator" },
  "twitch/stream-plan-generator": { platform: "twitch", slug: "stream-plan-generator" },
  
  // ElevenLabs
  "elevenlabs/voice-script-writer": { platform: "elevenlabs", slug: "voice-script-writer" },
  "elevenlabs/video-voiceover-script": { platform: "elevenlabs", slug: "video-voiceover-script" },
  "elevenlabs/voice-text-formatter": { platform: "elevenlabs", slug: "voice-text-formatter" },
  "elevenlabs/podcast-script": { platform: "elevenlabs", slug: "podcast-script" },
  "elevenlabs/ad-script": { platform: "elevenlabs", slug: "ad-script" },
  "elevenlabs/audiobook-optimizer": { platform: "elevenlabs", slug: "audiobook-optimizer" },
  
  // Pinterest
  "pinterest/pin-description": { platform: "pinterest", slug: "pin-description" },
  "pinterest/board-name": { platform: "pinterest", slug: "board-name" },
  "pinterest/profile-bio": { platform: "pinterest", slug: "profile-bio" },
  
  // Suno
  "suno/song-title-generator": { platform: "suno", slug: "song-title-generator" },
  "suno/song-tag-generator": { platform: "suno", slug: "song-tag-generator" },
  "suno/album-name-generator": { platform: "suno", slug: "album-name-generator" },
  "suno/cover-art-prompt-generator": { platform: "suno", slug: "cover-art-prompt-generator" },
  "suno/remix-idea-generator": { platform: "suno", slug: "remix-idea-generator" },
  "suno/lyric-generator": { platform: "suno", slug: "lyric-generator" },
  "suno/music-prompt-generator": { platform: "suno", slug: "music-prompt-generator" },
  "suno/song-description-generator": { platform: "suno", slug: "song-description-generator" },
  
  // LinkedIn
  "linkedin/post-generator": { platform: "linkedin", slug: "post-generator" },
  "linkedin/headline-generator": { platform: "linkedin", slug: "headline-generator" },
  "linkedin/about-generator": { platform: "linkedin", slug: "about-generator" },
  
  // Forocoches
  "forocoches/thread-generator": { platform: "forocoches", slug: "thread-generator" },
  "forocoches/pole-generator": { platform: "forocoches", slug: "pole-generator" },
  "forocoches/troll-response": { platform: "forocoches", slug: "troll-response" },
  
  // Amazon
  "amazon/product-description-generator": { platform: "amazon", slug: "product-description-generator" },
  "amazon/product-review-generator": { platform: "amazon", slug: "product-review-generator" },
  "amazon/product-comparison-generator": { platform: "amazon", slug: "product-comparison-generator" },
  
  // BeReal
  "bereal/bio-generator": { platform: "bereal", slug: "bio-generator" },
  "bereal/caption-generator": { platform: "bereal", slug: "caption-generator" },
  "bereal/realmoji-ideas": { platform: "bereal", slug: "realmoji-ideas" },
  
  // Bluesky
  "bluesky/post-generator": { platform: "bluesky", slug: "post-generator" },
  "bluesky/bio-generator": { platform: "bluesky", slug: "bio-generator" },
  "bluesky/thread-composer": { platform: "bluesky", slug: "thread-composer" },
  
  // Medium
  "medium/article-title-generator": { platform: "medium", slug: "article-title-generator" },
  "medium/article-intro-generator": { platform: "medium", slug: "article-intro-generator" },
  "medium/bio-generator": { platform: "medium", slug: "bio-generator" },
  
  // Etsy
  "etsy/product-title-generator": { platform: "etsy", slug: "product-title-generator" },
  "etsy/product-description-generator": { platform: "etsy", slug: "product-description-generator" },
  "etsy/shop-announcement-generator": { platform: "etsy", slug: "shop-announcement-generator" },
  
  // OnlyFans
  "onlyfans/bio-generator": { platform: "onlyfans", slug: "bio-generator" },
  "onlyfans/post-caption-generator": { platform: "onlyfans", slug: "post-caption-generator" },
  "onlyfans/promo-generator": { platform: "onlyfans", slug: "promo-generator" },
  
  // Patreon
  "patreon/tier-description-generator": { platform: "patreon", slug: "tier-description-generator" },
  "patreon/about-page-generator": { platform: "patreon", slug: "about-page-generator" },
  "patreon/post-generator": { platform: "patreon", slug: "post-generator" },
  
  // Telegram
  "telegram/announcement-generator": { platform: "telegram", slug: "announcement-generator" },
  "telegram/channel-description": { platform: "telegram", slug: "channel-description" },
  "telegram/welcome-message": { platform: "telegram", slug: "welcome-message" },
  
  // Kick
  "kick/stream-title": { platform: "kick", slug: "stream-title" },
  "kick/bio-generator": { platform: "kick", slug: "bio-generator" },
  "kick/chat-rules": { platform: "kick", slug: "chat-rules" },
};

async function getAppwriteToolId(platform, slug) {
  try {
    // Buscar en inglés (slug base)
    const response = await databases.listDocuments(
      DATABASE_ID,
      TOOLS_COLLECTION_ID,
      [
        Query.equal("platform", platform),
        Query.equal("slug", slug),
        Query.equal("language", "en"),
        Query.limit(1)
      ]
    );
    
    if (response.documents.length > 0) {
      return response.documents[0].$id;
    }
    return null;
  } catch (error) {
    console.error(`Error buscando ${platform}/${slug}:`, error.message);
    return null;
  }
}

async function generateRedirects() {
  console.log("\n" + "═".repeat(60));
  console.log("🔄 GENERANDO REDIRECTS 301");
  console.log("═".repeat(60) + "\n");

  const redirects = [];
  const notFound = [];

  for (const [staticPath, { platform, slug }] of Object.entries(STATIC_TOOLS)) {
    const appwriteId = await getAppwriteToolId(platform, slug);
    
    if (appwriteId) {
      // Redirect de URL estática a URL dinámica
      redirects.push({
        source: `/${staticPath}`,
        destination: `/${platform}/${slug}-${appwriteId}`,
        permanent: true
      });
      console.log(`   ✅ ${staticPath} → ${platform}/${slug}-${appwriteId}`);
    } else {
      notFound.push(staticPath);
      console.log(`   ⚠️  No encontrado: ${staticPath}`);
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log(`📊 Resumen:`);
  console.log(`   ✅ Redirects generados: ${redirects.length}`);
  console.log(`   ⚠️  No encontrados: ${notFound.length}`);
  console.log("═".repeat(60) + "\n");

  // Generar código para next.config.ts
  const redirectCode = `
// 301 Redirects: Static tools → Dynamic tools (Appwrite)
// Generated by: node scripts/generate-redirects.mjs
const staticToolRedirects = [
${redirects.map(r => `  { source: "${r.source}", destination: "${r.destination}", permanent: true },`).join("\n")}
];
`;

  // Guardar en archivo para copiar
  const outputPath = path.join(__dirname, "data", "static-tool-redirects.ts");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, redirectCode);
  
  console.log(`📄 Código guardado en: ${outputPath}`);
  console.log("\nNo encontrados:");
  notFound.forEach(nf => console.log(`   - ${nf}`));
  
  return redirects;
}

generateRedirects().catch(console.error);
