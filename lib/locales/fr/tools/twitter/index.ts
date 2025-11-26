import { thread_maker } from "./thread-maker";
import { bio_generator } from "./bio-generator";
import { tweet_generator } from "./tweet-generator";

export const twitter = {
  ...thread_maker,
  ...bio_generator,
  ...tweet_generator,
};