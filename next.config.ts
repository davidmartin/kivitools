import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizar imports de HeroUI
  transpilePackages: ["@heroui/react", "@heroui/styles"],

  // Performance optimizations
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ["@heroui/react", "lucide-react"],
  },

  // Image optimization for better LCP
  images: {
    // Enable AVIF for better compression
    formats: ["image/avif", "image/webp"],
    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Smaller sizes for icons/logos
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Rutas alias en español (SEO multilingüe)
  async rewrites() {
    return [
      // Centralized Tools Page (Feature 017)
      { source: "/herramientas", destination: "/tools" },

      // Amazon - Rutas en español
      { source: "/amazon/generador-descripcion-producto", destination: "/amazon/product-description-generator" },
      { source: "/amazon/generador-resenas-producto", destination: "/amazon/product-review-generator" },
      { source: "/amazon/generador-comparativa-productos", destination: "/amazon/product-comparison-generator" },

      // TikTok - Rutas en español
      { source: "/tiktok/escritor-de-guiones", destination: "/tiktok/script-writer" },
      { source: "/tiktok/ideas-de-videos", destination: "/tiktok/video-ideas" },
      { source: "/tiktok/generador-de-ganchos", destination: "/tiktok/hook-generator" },
      { source: "/tiktok/generador-de-hashtags", destination: "/tiktok/hashtag-generator" },
      { source: "/tiktok/generador-subtitulos", destination: "/tiktok/caption-generator" },
      { source: "/tiktok/generador-de-nombres", destination: "/tiktok/username-generator" },
      { source: "/tiktok/generador-nombre-tienda", destination: "/tiktok/shop-name-generator" },
      { source: "/tiktok/calculadora-monedas", destination: "/tiktok/coins-calculator" },
      { source: "/tiktok/calculadora-dinero", destination: "/tiktok/money-calculator" },
      { source: "/tiktok/calculadora-engagement", destination: "/tiktok/engagement-calculator" },

      // Instagram - Rutas en español
      { source: "/instagram/generador-bio", destination: "/instagram/bio-generator" },
      { source: "/instagram/generador-subtitulos", destination: "/instagram/caption-generator" },
      { source: "/instagram/guion-reel", destination: "/instagram/reel-script" },
      { source: "/instagram/calculadora-engagement", destination: "/instagram/engagement-calculator" },

      // Twitter - Rutas en español
      { source: "/twitter/generador-bio", destination: "/twitter/bio-generator" },
      { source: "/twitter/generador-tweets", destination: "/twitter/tweet-generator" },
      { source: "/twitter/creador-hilos", destination: "/twitter/thread-maker" },

      // Snapchat - Rutas en español
      { source: "/snapchat/ideas-historias", destination: "/snapchat/story-ideas" },
      { source: "/snapchat/generador-subtitulos", destination: "/snapchat/caption-generator" },
      { source: "/snapchat/ideas-lentes", destination: "/snapchat/lens-ideas" },

      // YouTube - Rutas en español
      { source: "/youtube/generador-titulos", destination: "/youtube/title-generator" },
      { source: "/youtube/generador-descripciones", destination: "/youtube/description-generator" },
      { source: "/youtube/generador-guiones", destination: "/youtube/script-generator" },
      { source: "/youtube/generador-nombre-canal", destination: "/youtube/channel-name-generator" },

      // Reddit - Rutas en español
      { source: "/reddit/generador-publicaciones", destination: "/reddit/post-generator" },
      { source: "/reddit/generador-comentarios", destination: "/reddit/comment-generator" },
      { source: "/reddit/preguntas-ama", destination: "/reddit/ama-questions" },

      // Discord - Rutas en español
      { source: "/discord/generador-anuncios", destination: "/discord/announcement-generator" },
      { source: "/discord/mensaje-bienvenida", destination: "/discord/welcome-message" },
      { source: "/discord/descripcion-eventos", destination: "/discord/event-description" },

      // Twitch - Rutas en español
      { source: "/twitch/titulo-stream", destination: "/twitch/stream-title" },
      { source: "/twitch/descripcion-panel", destination: "/twitch/panel-description" },
      { source: "/twitch/comando-chat", destination: "/twitch/chat-command" },
      { source: "/twitch/generador-bio", destination: "/twitch/bio-generator" },
      { source: "/twitch/generador-reglas", destination: "/twitch/rules-generator" },
      { source: "/twitch/planificador-stream", destination: "/twitch/stream-plan-generator" },

      // ElevenLabs - Rutas en español
      { source: "/elevenlabs/escritor-de-guiones-voz", destination: "/elevenlabs/voice-script-writer" },
      { source: "/elevenlabs/guion-de-video-voz", destination: "/elevenlabs/video-voiceover-script" },
      { source: "/elevenlabs/formateador-texto-voz", destination: "/elevenlabs/voice-text-formatter" },
      { source: "/elevenlabs/guion-podcast", destination: "/elevenlabs/podcast-script" },
      { source: "/elevenlabs/guion-anuncio", destination: "/elevenlabs/ad-script" },
      { source: "/elevenlabs/optimizador-audiolibro", destination: "/elevenlabs/audiobook-optimizer" },

      // Pinterest - Rutas en español
      { source: "/pinterest/generador-descripcion-pin", destination: "/pinterest/pin-description" },
      { source: "/pinterest/generador-nombres-tablero", destination: "/pinterest/board-name" },
      { source: "/pinterest/generador-bio-perfil", destination: "/pinterest/profile-bio" },

      // Spotify - Rutas en español
      { source: "/spotify/generador-nombres-playlist", destination: "/spotify/playlist-name" },
      { source: "/spotify/generador-descripcion-playlist", destination: "/spotify/playlist-description" },
      { source: "/spotify/generador-bio-artista", destination: "/spotify/artist-bio" },

      // Facebook - Rutas en español
      { source: "/facebook/generador-publicaciones", destination: "/facebook/post-generator" },
      { source: "/facebook/bio-pagina", destination: "/facebook/page-bio" },
      { source: "/facebook/texto-anuncio", destination: "/facebook/ad-copy" },

      // Bluesky - Rutas en español
      { source: "/bluesky/generador-publicaciones", destination: "/bluesky/post-generator" },
      { source: "/bluesky/generador-bio", destination: "/bluesky/bio-generator" },
      { source: "/bluesky/compositor-hilos", destination: "/bluesky/thread-composer" },

      // Medium - Rutas en español
      { source: "/medium/generador-titulos-articulo", destination: "/medium/article-title-generator" },
      { source: "/medium/generador-intro-articulo", destination: "/medium/article-intro-generator" },
      { source: "/medium/generador-bio", destination: "/medium/bio-generator" },

      // Etsy - Rutas en español
      { source: "/etsy/generador-titulo-producto", destination: "/etsy/product-title-generator" },
      { source: "/etsy/generador-descripcion-producto", destination: "/etsy/product-description-generator" },
      { source: "/etsy/generador-anuncio-tienda", destination: "/etsy/shop-announcement-generator" },

      // OnlyFans - Rutas en español
      { source: "/onlyfans/generador-bio", destination: "/onlyfans/bio-generator" },
      { source: "/onlyfans/generador-caption-post", destination: "/onlyfans/post-caption-generator" },
      { source: "/onlyfans/generador-promo", destination: "/onlyfans/promo-generator" },

      // Patreon - Rutas en español
      { source: "/patreon/generador-descripcion-tier", destination: "/patreon/tier-description-generator" },
      { source: "/patreon/generador-pagina-about", destination: "/patreon/about-page-generator" },
      { source: "/patreon/generador-post", destination: "/patreon/post-generator" },

      // Blog - Rutas en español (bilingual posts)
      { source: "/blog/guia-crecer-twitter-2025", destination: "/blog/twitter-growth-guide-2025" },
      { source: "/blog/guia-perfil-linkedin-2025", destination: "/blog/linkedin-profile-guide-2025" },
      { source: "/blog/guia-calendario-contenido-2025", destination: "/blog/content-calendar-guide-2025" },
      { source: "/blog/guia-empezar-twitch-2025", destination: "/blog/twitch-streaming-guide-2025" },
      { source: "/blog/guia-reddit-portada-2025", destination: "/blog/reddit-front-page-guide-2025" },
      { source: "/blog/estrategia-playlist-spotify-2025", destination: "/blog/spotify-playlist-strategy-2025" },

      // Suno - Rutas en español
      { source: "/suno/generador-titulos-canciones", destination: "/suno/song-title-generator" },
      { source: "/suno/generador-tags-canciones", destination: "/suno/song-tag-generator" },
      { source: "/suno/generador-nombres-album", destination: "/suno/album-name-generator" },
      { source: "/suno/generador-prompts-portada", destination: "/suno/cover-art-prompt-generator" },
      { source: "/suno/generador-ideas-remix", destination: "/suno/remix-idea-generator" },

      // About/Legal - Rutas en español
      { source: "/sobre/tecnologia", destination: "/about/technology" },
    ];
  },

  // 301 Redirects: Platform hub pages → /tools?platform=X (SEO preservation)
  async redirects() {
    return [
      // ═══════════════════════════════════════════════════════════════
      // Platform Hub Redirects → /tools?platform=X
      // ═══════════════════════════════════════════════════════════════
      { source: "/tiktok", destination: "/tools?platform=tiktok", permanent: true },
      { source: "/instagram", destination: "/tools?platform=instagram", permanent: true },
      { source: "/twitter", destination: "/tools?platform=twitter", permanent: true },
      { source: "/snapchat", destination: "/tools?platform=snapchat", permanent: true },
      { source: "/youtube", destination: "/tools?platform=youtube", permanent: true },
      { source: "/reddit", destination: "/tools?platform=reddit", permanent: true },
      { source: "/discord", destination: "/tools?platform=discord", permanent: true },
      { source: "/twitch", destination: "/tools?platform=twitch", permanent: true },
      { source: "/spotify", destination: "/tools?platform=spotify", permanent: true },
      { source: "/suno", destination: "/tools?platform=suno", permanent: true },
      { source: "/elevenlabs", destination: "/tools?platform=elevenlabs", permanent: true },
      { source: "/forocoches", destination: "/tools?platform=forocoches", permanent: true },
      { source: "/amazon", destination: "/tools?platform=amazon", permanent: true },
      { source: "/facebook", destination: "/tools?platform=facebook", permanent: true },
      { source: "/linkedin", destination: "/tools?platform=linkedin", permanent: true },
      { source: "/threads", destination: "/tools?platform=threads", permanent: true },
      { source: "/bluesky", destination: "/tools?platform=bluesky", permanent: true },
      { source: "/kick", destination: "/tools?platform=kick", permanent: true },
      { source: "/telegram", destination: "/tools?platform=telegram", permanent: true },
      { source: "/bereal", destination: "/tools?platform=bereal", permanent: true },
      { source: "/podcast", destination: "/tools?platform=podcast", permanent: true },
      { source: "/email", destination: "/tools?platform=email", permanent: true },
      { source: "/dating", destination: "/tools?platform=dating", permanent: true },
      { source: "/medium", destination: "/tools?platform=medium", permanent: true },
      { source: "/etsy", destination: "/tools?platform=etsy", permanent: true },
      { source: "/onlyfans", destination: "/tools?platform=onlyfans", permanent: true },
      { source: "/patreon", destination: "/tools?platform=patreon", permanent: true },
      { source: "/pinterest", destination: "/tools?platform=pinterest", permanent: true },
      { source: "/shopify", destination: "/tools?platform=shopify", permanent: true },
      { source: "/vimeo", destination: "/tools?platform=vimeo", permanent: true },
      { source: "/whatsapp", destination: "/tools?platform=whatsapp", permanent: true },
      { source: "/wordpress", destination: "/tools?platform=wordpress", permanent: true },
      { source: "/mastodon", destination: "/tools?platform=mastodon", permanent: true },
      // New platforms added in June 2025
      { source: "/ai-art", destination: "/tools?platform=ai-art", permanent: true },
      { source: "/career", destination: "/tools?platform=career", permanent: true },
      { source: "/seo", destination: "/tools?platform=seo", permanent: true },
      { source: "/marketing", destination: "/tools?platform=marketing", permanent: true },

      // ═══════════════════════════════════════════════════════════════
      // Static Tools → Dynamic Appwrite Tools (301 SEO Redirects)
      // Generated by: node scripts/generate-redirects.mjs
      // ═══════════════════════════════════════════════════════════════
      // TikTok
      { source: "/tiktok/script-writer", destination: "/tiktok/script-writer-69393a110015f6018447", permanent: true },
      { source: "/tiktok/video-ideas", destination: "/tiktok/video-ideas-69393a130014670c9857", permanent: true },
      { source: "/tiktok/hook-generator", destination: "/tiktok/hook-generator-69393a15000a2848f1a9", permanent: true },
      { source: "/tiktok/hashtag-generator", destination: "/tiktok/hashtag-generator-69393a16003d977731a6", permanent: true },
      { source: "/tiktok/caption-generator", destination: "/tiktok/caption-generator-69393a180038ff7185ce", permanent: true },
      { source: "/tiktok/username-generator", destination: "/tiktok/username-generator-69393a1a002ec08af64c", permanent: true },
      { source: "/tiktok/shop-name-generator", destination: "/tiktok/shop-name-generator-69394144002a28e696d8", permanent: true },
      { source: "/tiktok/coins-calculator", destination: "/tiktok/coins-calculator-6939414900024eae58ef", permanent: true },
      { source: "/tiktok/money-calculator", destination: "/tiktok/money-calculator-693941460036e0a06b93", permanent: true },
      { source: "/tiktok/engagement-calculator", destination: "/tiktok/engagement-calculator-6939414b000f8981384a", permanent: true },
      { source: "/tiktok/bio-generator", destination: "/tiktok/bio-generator-69393a1c00221989fc67", permanent: true },
      { source: "/tiktok/content-calendar-generator", destination: "/tiktok/content-calendar-generator-6939460d00390718b8e1", permanent: true },
      { source: "/tiktok/ad-copy-generator", destination: "/tiktok/ad-copy-generator-6939460f001cc9b3a3ba", permanent: true },
      { source: "/tiktok/song-recommendations", destination: "/tiktok/song-recommendations-69394610003c148ac5c4", permanent: true },
      { source: "/tiktok/thumbnail-text-generator", destination: "/tiktok/thumbnail-text-generator-6939461200221edb59c0", permanent: true },
      // Instagram
      { source: "/instagram/bio-generator", destination: "/instagram/bio-generator-693940e600126c33eeae", permanent: true },
      { source: "/instagram/caption-generator", destination: "/instagram/caption-generator-693940e4000c1bd83961", permanent: true },
      { source: "/instagram/reel-script", destination: "/instagram/reel-script-693940e8001cc7c2f643", permanent: true },
      { source: "/instagram/engagement-calculator", destination: "/instagram/engagement-calculator-693940ea0025b0b8e3cc", permanent: true },
      { source: "/instagram/hashtag-generator", destination: "/instagram/hashtag-generator-69394614000a822c4d37", permanent: true },
      { source: "/instagram/story-ideas", destination: "/instagram/story-ideas-69394615002eec571d75", permanent: true },
      { source: "/instagram/carousel-generator", destination: "/instagram/carousel-generator-693946170011b8ea1742", permanent: true },
      { source: "/instagram/content-calendar", destination: "/instagram/content-calendar-69394618003297a9603f", permanent: true },
      { source: "/instagram/ad-copy-generator", destination: "/instagram/ad-copy-generator-6939461a00126deba028", permanent: true },
      // Twitter
      { source: "/twitter/bio-generator", destination: "/twitter/bio-generator-6939415c00211f81d082", permanent: true },
      { source: "/twitter/tweet-generator", destination: "/twitter/tweet-generator-6939415e002d62459b26", permanent: true },
      { source: "/twitter/thread-maker", destination: "/twitter/thread-maker-6939415a0017a9b94b86", permanent: true },
      // Snapchat
      { source: "/snapchat/story-ideas", destination: "/snapchat/story-ideas-6939411d000d115fbf52", permanent: true },
      { source: "/snapchat/caption-generator", destination: "/snapchat/caption-generator-6939411a003ae0f8e309", permanent: true },
      { source: "/snapchat/lens-ideas", destination: "/snapchat/lens-ideas-6939411f001b08136549", permanent: true },
      // YouTube
      { source: "/youtube/title-generator", destination: "/youtube/title-generator-69394163001806e30ea0", permanent: true },
      { source: "/youtube/description-generator", destination: "/youtube/description-generator-693941650021bdb8a253", permanent: true },
      { source: "/youtube/script-generator", destination: "/youtube/script-generator-6939416100075a3719e4", permanent: true },
      { source: "/youtube/channel-name-generator", destination: "/youtube/channel-name-generator-6939416e0007a222562a", permanent: true },
      { source: "/youtube/tag-generator", destination: "/youtube/tag-generator-6939416700289b1ffb89", permanent: true },
      { source: "/youtube/video-ideas", destination: "/youtube/video-ideas-693941690032947a8583", permanent: true },
      { source: "/youtube/community-post-generator", destination: "/youtube/community-post-generator-6939416b003b2fc66e92", permanent: true },
      // Reddit
      { source: "/reddit/post-generator", destination: "/reddit/post-generator-69394114002370c97993", permanent: true },
      { source: "/reddit/comment-generator", destination: "/reddit/comment-generator-69394116002b12c40e9c", permanent: true },
      { source: "/reddit/ama-questions", destination: "/reddit/ama-questions-693941180034d80ec2dd", permanent: true },
      // Discord
      { source: "/discord/announcement-generator", destination: "/discord/announcement-generator-693940c4000067e2b3d2", permanent: true },
      { source: "/discord/welcome-message", destination: "/discord/welcome-message-693940c60002847828f1", permanent: true },
      { source: "/discord/event-description", destination: "/discord/event-description-693940c8000b9238b83d", permanent: true },
      // Twitch
      { source: "/twitch/stream-title", destination: "/twitch/stream-title-6939414d0019a0b122d5", permanent: true },
      { source: "/twitch/panel-description", destination: "/twitch/panel-description-69394151002c5d0ee308", permanent: true },
      { source: "/twitch/chat-command", destination: "/twitch/chat-command-6939414f0026a80e3cf3", permanent: true },
      { source: "/twitch/bio-generator", destination: "/twitch/bio-generator-69394153003370b46233", permanent: true },
      { source: "/twitch/rules-generator", destination: "/twitch/rules-generator-69394155003d0e407309", permanent: true },
      { source: "/twitch/stream-plan-generator", destination: "/twitch/stream-plan-generator-69394158000880b2d8f7", permanent: true },
      // ElevenLabs
      { source: "/elevenlabs/voice-script-writer", destination: "/elevenlabs/voice-script-writer-693940ca00144ce1d4d2", permanent: true },
      { source: "/elevenlabs/video-voiceover-script", destination: "/elevenlabs/video-voiceover-script-693940cc001c86f19897", permanent: true },
      { source: "/elevenlabs/voice-text-formatter", destination: "/elevenlabs/voice-text-formatter-693940ce002337269fb8", permanent: true },
      { source: "/elevenlabs/podcast-script", destination: "/elevenlabs/podcast-script-693940d0002a785f4415", permanent: true },
      { source: "/elevenlabs/ad-script", destination: "/elevenlabs/ad-script-693940d2003241ffd303", permanent: true },
      { source: "/elevenlabs/audiobook-optimizer", destination: "/elevenlabs/audiobook-optimizer-693940d40039b4aa9ed2", permanent: true },
      // Pinterest
      { source: "/pinterest/pin-description", destination: "/pinterest/pin-description-6939410e00029203fa6a", permanent: true },
      { source: "/pinterest/board-name", destination: "/pinterest/board-name-69394110000b90caf294", permanent: true },
      { source: "/pinterest/profile-bio", destination: "/pinterest/profile-bio-693941120014044c730b", permanent: true },
      // Suno
      { source: "/suno/song-title-generator", destination: "/suno/song-title-generator-69394128001d2b2e1a33", permanent: true },
      { source: "/suno/song-tag-generator", destination: "/suno/song-tag-generator-6939412a0028fbab73b9", permanent: true },
      { source: "/suno/album-name-generator", destination: "/suno/album-name-generator-6939412c003abd34b0d2", permanent: true },
      { source: "/suno/cover-art-prompt-generator", destination: "/suno/cover-art-prompt-generator-6939412f000455b841c9", permanent: true },
      { source: "/suno/remix-idea-generator", destination: "/suno/remix-idea-generator-6939413100134c7cd371", permanent: true },
      { source: "/suno/lyric-generator", destination: "/suno/lyric-generator-6939412100281495772f", permanent: true },
      { source: "/suno/music-prompt-generator", destination: "/suno/music-prompt-generator-6939461b00354320161b", permanent: true },
      { source: "/suno/song-description-generator", destination: "/suno/song-description-generator-6939461d001623496f99", permanent: true },
      // LinkedIn
      { source: "/linkedin/post-generator", destination: "/linkedin/post-generator-693940f3001a4dd8ad4d", permanent: true },
      { source: "/linkedin/headline-generator", destination: "/linkedin/headline-generator-693940f50034c6c52e2b", permanent: true },
      { source: "/linkedin/about-generator", destination: "/linkedin/about-generator-693940f80000fd7bb4c8", permanent: true },
      // Forocoches
      { source: "/forocoches/thread-generator", destination: "/forocoches/thread-generator-693940dd002f5693e0c2", permanent: true },
      { source: "/forocoches/pole-generator", destination: "/forocoches/pole-generator-693940e0000100a3c27b", permanent: true },
      { source: "/forocoches/troll-response", destination: "/forocoches/troll-response-693940e2000596a25638", permanent: true },
      // Amazon
      { source: "/amazon/product-description-generator", destination: "/amazon/product-description-generator-693940b0002e0bb46992", permanent: true },
      { source: "/amazon/product-review-generator", destination: "/amazon/product-review-generator-693940b200386823564d", permanent: true },
      { source: "/amazon/product-comparison-generator", destination: "/amazon/product-comparison-generator-693940b50002b9df39e5", permanent: true },
      // BeReal
      { source: "/bereal/bio-generator", destination: "/bereal/bio-generator-693940b900188e2dc2b3", permanent: true },
      { source: "/bereal/caption-generator", destination: "/bereal/caption-generator-693940b7000b0a5a779c", permanent: true },
      { source: "/bereal/realmoji-ideas", destination: "/bereal/realmoji-ideas-693940bb001e38760647", permanent: true },
      // Bluesky
      { source: "/bluesky/post-generator", destination: "/bluesky/post-generator-693940bd002448fca263", permanent: true },
      { source: "/bluesky/bio-generator", destination: "/bluesky/bio-generator-693940bf002c9e0b3697", permanent: true },
      { source: "/bluesky/thread-composer", destination: "/bluesky/thread-composer-693940c1003230d3aefa", permanent: true },
      // Medium
      { source: "/medium/article-title-generator", destination: "/medium/article-title-generator-693940fa000d57cd18d0", permanent: true },
      { source: "/medium/article-intro-generator", destination: "/medium/article-intro-generator-693940fc0018f85291dc", permanent: true },
      { source: "/medium/bio-generator", destination: "/medium/bio-generator-693940fe0029c21225b9", permanent: true },
      // Etsy
      { source: "/etsy/product-title-generator", destination: "/etsy/product-title-generator-693940d7000dce4bcca4", permanent: true },
      { source: "/etsy/product-description-generator", destination: "/etsy/product-description-generator-693940d900145db5fd88", permanent: true },
      { source: "/etsy/shop-announcement-generator", destination: "/etsy/shop-announcement-generator-693940db00252403f1aa", permanent: true },
      // OnlyFans
      { source: "/onlyfans/bio-generator", destination: "/onlyfans/bio-generator-6939410000343d182826", permanent: true },
      { source: "/onlyfans/post-caption-generator", destination: "/onlyfans/post-caption-generator-69394102003e19d752c0", permanent: true },
      { source: "/onlyfans/promo-generator", destination: "/onlyfans/promo-generator-69394105000c8ceb3124", permanent: true },
      // Patreon
      { source: "/patreon/tier-description-generator", destination: "/patreon/tier-description-generator-6939410700178768bba8", permanent: true },
      { source: "/patreon/about-page-generator", destination: "/patreon/about-page-generator-6939410900270ccb8911", permanent: true },
      { source: "/patreon/post-generator", destination: "/patreon/post-generator-6939410b002f73c05852", permanent: true },
      // Telegram
      { source: "/telegram/announcement-generator", destination: "/telegram/announcement-generator-693941330020e97efa8a", permanent: true },
      { source: "/telegram/channel-description", destination: "/telegram/channel-description-69394135002c4e96bb28", permanent: true },
      { source: "/telegram/welcome-message", destination: "/telegram/welcome-message-69394137003611ea93b9", permanent: true },
      // Kick
      { source: "/kick/stream-title", destination: "/kick/stream-title-693940ec00352bb0a7c9", permanent: true },
      { source: "/kick/bio-generator", destination: "/kick/bio-generator-693940ef000876c1a352", permanent: true },
      { source: "/kick/chat-rules", destination: "/kick/chat-rules-693940f100137cfe389f", permanent: true },
    ];
  },
};

export default nextConfig;
