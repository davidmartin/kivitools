import { instagramAdCopyGenerator } from "./ad-copy-generator";
import { bio_generator } from "./bio-generator";
import { caption_generator } from "./caption-generator";
import { instagramCarouselGenerator } from "./carousel-generator";
import { instagramContentCalendar } from "./content-calendar";
import { instagramEngagementCalculator } from "./engagement-calculator";
import { instagramHashtagGenerator } from "./hashtag-generator";
import { reel_script } from "./reel-script";
import { instagramStoryIdeas } from "./story-ideas";

export const instagram = {
    ...instagramAdCopyGenerator,
    ...bio_generator,
    ...caption_generator,
    ...instagramCarouselGenerator,
    ...instagramContentCalendar,
    ...instagramEngagementCalculator,
    ...instagramHashtagGenerator,
    ...reel_script,
    ...instagramStoryIdeas,
};
