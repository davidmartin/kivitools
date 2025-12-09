import { ama_generator } from "./ama-generator";
import { comment_generator } from "./comment-generator";
import { post_generator } from "./post-generator";

export const reddit = {
  ...ama_generator,
  ...comment_generator,
  ...post_generator,

  // Alias for compatibility with tools-index.ts
  "redditPostGenerator.title": "Reddit Post Generator",
  "redditPostGenerator.description": "Posts that work on Reddit without getting downvoted to oblivion",
};