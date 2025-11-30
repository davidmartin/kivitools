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
};