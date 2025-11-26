import { lens_ideas } from "./lens-ideas";
import { caption_generator } from "./caption-generator";
import { story_ideas } from "./story-ideas";

export const snapchat = {
  ...lens_ideas,
  ...caption_generator,
  ...story_ideas,
};