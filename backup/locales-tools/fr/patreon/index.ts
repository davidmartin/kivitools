import { tier_description_generator } from "./tier-description-generator";
import { about_page_generator } from "./about-page-generator";
import { post_generator } from "./post-generator";

export const patreon = {
    ...tier_description_generator,
    ...about_page_generator,
    ...post_generator,
};
