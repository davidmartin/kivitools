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
    ];
  },
};

export default nextConfig;
