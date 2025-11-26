import { youtubeCommunityPostGenerator } from './community-post-generator';
import { description_generator } from './description-generator';
import { script_generator } from './script-generator';
import { youtubeTagGenerator } from './tag-generator';
import { title_generator } from './title-generator';
import { youtubeVideoIdeas } from './video-ideas';

export const youtube = {
    ...youtubeCommunityPostGenerator,
    ...description_generator,
    ...script_generator,
    ...youtubeTagGenerator,
    ...title_generator,
    ...youtubeVideoIdeas,
};
