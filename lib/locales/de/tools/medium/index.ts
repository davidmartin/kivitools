import { article_title_generator } from "./article-title-generator";
import { article_intro_generator } from "./article-intro-generator";
import { bio_generator } from "./bio-generator";

export const medium = {
    ...article_title_generator,
    ...article_intro_generator,
    ...bio_generator,
};
