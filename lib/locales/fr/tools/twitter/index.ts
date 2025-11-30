import { bio_generator } from "./bio-generator";
import { thread_maker } from "./thread-maker";
import { tweet_generator } from "./tweet-generator";

export const twitter = {
    ...bio_generator,
    ...thread_maker,
    ...tweet_generator,
};
