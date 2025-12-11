import { bio_generator } from "./bio-generator";
import { post_caption_generator } from "./post-caption-generator";
import { promo_generator } from "./promo-generator";

export const onlyfans = {
    ...bio_generator,
    ...post_caption_generator,
    ...promo_generator,
};
