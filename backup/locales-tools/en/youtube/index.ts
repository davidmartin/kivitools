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

  // Alias for compatibility with tools-index.ts
  "youtubeTitleGenerator.title": "YouTube Title Generator",
  "youtubeTitleGenerator.description": "Titles that get clicks without looking like clickbait (well, maybe a little)",
  "youtubeDescriptionGenerator.title": "YouTube Description Generator",
  "youtubeDescriptionGenerator.description": "SEO-optimized descriptions with keywords and timestamps YouTube loves",
};