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

  // Alias para compatibilidad con tools-index.ts
  "instagramBioGenerator.title": "Generador de Bio para Instagram",
  "instagramBioGenerator.description": "Crea bios atractivas que conviertan visitantes en seguidores",
  "instagramCaptionGenerator.title": "Generador de Captions para Instagram",
  "instagramCaptionGenerator.description": "Captions que consiguen likes más rápido que puedes decir 'aesthetic'",
  "instagramReelScript.title": "Generador de Guiones para Reels",
  "instagramReelScript.description": "Guiones virales para Reels con ganchos y CTAs que realmente funcionan",
};