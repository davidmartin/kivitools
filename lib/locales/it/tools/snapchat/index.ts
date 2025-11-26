import { caption_generator } from './caption-generator';
import { lens_ideas } from './lens-ideas';
import { story_ideas } from './story-ideas';

export const snapchat = {
    ...caption_generator,
    ...lens_ideas,
    ...story_ideas,
};
