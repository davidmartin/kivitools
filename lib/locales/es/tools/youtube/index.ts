import { script_generator } from "./script-generator";
import { title_generator } from "./title-generator";
import { description_generator } from "./description-generator";
import { youtubeTagGenerator } from "./tag-generator";
import { youtubeVideoIdeas } from "./video-ideas";
import { youtubeCommunityPostGenerator } from "./community-post-generator";
import { youtubeChannelNameGenerator } from "./channel-name-generator";

export const youtube = {
  ...title_generator,
  ...description_generator,
  ...script_generator,
  ...youtubeTagGenerator,
  ...youtubeVideoIdeas,
  ...youtubeCommunityPostGenerator,
  ...youtubeChannelNameGenerator,

  // Alias para compatibilidad con tools-index.ts
  "youtubeTitleGenerator.title": "Generador de Títulos para YouTube",
  "youtubeTitleGenerator.description": "Títulos que hacen click sin parecer clickbait (bueno, un poquito sí)",
  "youtubeDescriptionGenerator.title": "Generador de Descripciones para YouTube",
  "youtubeDescriptionGenerator.description": "Descripciones optimizadas con keywords y timestamps que YouTube adora",
};