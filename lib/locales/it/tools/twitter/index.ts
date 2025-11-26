import { twitterBioGenerator } from './bio-generator';
import { tweetGenerator } from './tweet-generator';
import { thread_maker } from './thread-maker';

export const twitter = {
    ...twitterBioGenerator,
    ...tweetGenerator,
    ...thread_maker,
};
