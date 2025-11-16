import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kivitools.com";

  // Static pages
  const routes = [
    "",
    "/tiktok",
    "/instagram",
    "/twitter",
    "/snapchat",
    "/youtube",
    "/reddit",
    "/discord",
    "/twitch",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
    "/contact-us",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog posts
  const blogPosts = [
    "/blog/como-escribir-guiones-virales-tiktok-2025",
    "/blog/mejores-hashtags-tiktok-2025",
    "/blog/caption-generator-instagram-guia-completa",
    "/blog/como-crear-hilos-virales-twitter",
    "/blog/herramientas-ia-redes-sociales-gratis",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // TikTok tools (English + Spanish aliases)
  const tiktokTools = [
    "/tiktok/script-writer",
    "/tiktok/escritor-de-guiones", // Spanish alias
    "/tiktok/video-ideas",
    "/tiktok/ideas-de-videos", // Spanish alias
    "/tiktok/hook-generator",
    "/tiktok/generador-de-ganchos", // Spanish alias
    "/tiktok/hashtag-generator",
    "/tiktok/generador-de-hashtags", // Spanish alias
    "/tiktok/username-generator",
    "/tiktok/generador-de-nombres", // Spanish alias
    "/tiktok/shop-name-generator",
    "/tiktok/generador-nombre-tienda", // Spanish alias
    "/tiktok/coins-calculator",
    "/tiktok/calculadora-monedas", // Spanish alias
    "/tiktok/money-calculator",
    "/tiktok/calculadora-dinero", // Spanish alias
    "/tiktok/engagement-calculator",
    "/tiktok/calculadora-engagement", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Instagram tools (English + Spanish aliases)
  const instagramTools = [
    "/instagram/bio-generator",
    "/instagram/generador-bio", // Spanish alias
    "/instagram/caption-generator",
    "/instagram/generador-subtitulos", // Spanish alias
    "/instagram/reel-script",
    "/instagram/guion-reel", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Twitter tools (English + Spanish aliases)
  const twitterTools = [
    "/twitter/bio-generator",
    "/twitter/generador-bio", // Spanish alias
    "/twitter/tweet-generator",
    "/twitter/generador-tweets", // Spanish alias
    "/twitter/thread-maker",
    "/twitter/creador-hilos", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Snapchat tools (English + Spanish aliases)
  const snapchatTools = [
    "/snapchat/story-ideas",
    "/snapchat/ideas-historias", // Spanish alias
    "/snapchat/caption-generator",
    "/snapchat/generador-subtitulos", // Spanish alias
    "/snapchat/lens-ideas",
    "/snapchat/ideas-lentes", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // YouTube tools (English + Spanish aliases)
  const youtubeTools = [
    "/youtube/title-generator",
    "/youtube/generador-titulos", // Spanish alias
    "/youtube/description-generator",
    "/youtube/generador-descripciones", // Spanish alias
    "/youtube/script-generator",
    "/youtube/generador-guiones", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Reddit tools (English + Spanish aliases)
  const redditTools = [
    "/reddit/post-generator",
    "/reddit/generador-publicaciones", // Spanish alias
    "/reddit/comment-generator",
    "/reddit/generador-comentarios", // Spanish alias
    "/reddit/ama-questions",
    "/reddit/preguntas-ama", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Discord tools (English + Spanish aliases)
  const discordTools = [
    "/discord/announcement-generator",
    "/discord/generador-anuncios", // Spanish alias
    "/discord/welcome-message",
    "/discord/mensaje-bienvenida", // Spanish alias
    "/discord/event-description",
    "/discord/descripcion-eventos", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Twitch tools (English + Spanish aliases)
  const twitchTools = [
    "/twitch/stream-title",
    "/twitch/titulo-stream", // Spanish alias
    "/twitch/panel-description",
    "/twitch/descripcion-panel", // Spanish alias
    "/twitch/chat-command",
    "/twitch/comando-chat", // Spanish alias
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    ...routes,
    ...blogPosts,
    ...tiktokTools,
    ...instagramTools,
    ...twitterTools,
    ...snapchatTools,
    ...youtubeTools,
    ...redditTools,
    ...discordTools,
    ...twitchTools,
  ];
}
