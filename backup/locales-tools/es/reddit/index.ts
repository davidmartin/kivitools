import { ama_generator } from "./ama-generator";
import { comment_generator } from "./comment-generator";
import { post_generator } from "./post-generator";

export const reddit = {
  ...ama_generator,
  ...comment_generator,
  ...post_generator,

  // Alias para compatibilidad con tools-index.ts
  "redditPostGenerator.title": "Generador de Posts para Reddit",
  "redditPostGenerator.description": "Posts que funcionan en Reddit sin que te lluevan los downvotes",
};