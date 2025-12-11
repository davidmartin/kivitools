import { bio_generator } from "./bio-generator";
import { caption_generator } from "./caption-generator";
import { reel_script } from "./reel-script";

import { instagramHashtagGenerator } from "./hashtag-generator";
import { instagramStoryIdeas } from "./story-ideas";
import { instagramContentCalendar } from "./content-calendar";
import { instagramAdCopyGenerator } from "./ad-copy-generator";
import { instagramCarouselGenerator } from "./carousel-generator";
import { instagramEngagementCalculator } from "./engagement-calculator";

export const instagram = {
  ...bio_generator,
  ...caption_generator,
  ...reel_script,
  ...instagramEngagementCalculator,
  ...instagramHashtagGenerator,
  ...instagramStoryIdeas,
  ...instagramContentCalendar,
  ...instagramAdCopyGenerator,
  ...instagramCarouselGenerator,

  // Alias for compatibility with tools-index.ts
  "instagramBioGenerator.title": "Instagram Bio Generator",
  "instagramBioGenerator.description": "Create bios that convert visitors into followers",
  "instagramCaptionGenerator.title": "Instagram Caption Generator",
  "instagramCaptionGenerator.description": "Captions that get likes faster than you can say 'aesthetic'",
  "instagramReelScript.title": "Instagram Reel Script Generator",
  "instagramReelScript.description": "Viral Reel scripts with hooks and CTAs that actually work",
};