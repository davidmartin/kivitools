import { script_generator } from "./script-generator";
import { title_generator } from "./title-generator";
import { description_generator } from "./description-generator";
import { youtubeTagGenerator } from "./tag-generator";
import { youtubeVideoIdeas } from "./video-ideas";
import { youtubeCommunityPostGenerator } from "./community-post-generator";

export const youtube = {
  ...title_generator,
  ...description_generator,
  ...script_generator,
  ...youtubeTagGenerator,
  ...youtubeVideoIdeas,
  ...youtubeCommunityPostGenerator,
};