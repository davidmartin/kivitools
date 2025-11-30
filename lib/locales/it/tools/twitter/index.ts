import { twitterBioGenerator } from "./bio-generator";
import { thread_maker } from "./thread-maker";
import { tweetGenerator } from "./tweet-generator";

export const twitter = {
    ...twitterBioGenerator,
    ...thread_maker,
    ...tweetGenerator,
};
