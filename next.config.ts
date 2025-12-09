import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizar imports de HeroUI
  transpilePackages: ["@heroui/react", "@heroui/styles"],

  // Opcional: Optimizar tamaño del bundle
  experimental: {
    optimizePackageImports: ["@heroui/react"],
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
    ];
  },
};

export default nextConfig;
