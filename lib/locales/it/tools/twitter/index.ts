import { twitterBioGenerator } from './bio-generator';
import { tweetGenerator } from './tweet-generator';
import { threadMaker } from './thread-maker';

export const twitter = {
    ...twitterBioGenerator,
    ...tweetGenerator,
    ...threadMaker,
};
