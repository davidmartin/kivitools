import { about_generator } from "./about-generator";
import { headline_generator } from "./headline-generator";
import { post_generator } from "./post-generator";

export const linkedin = {
  ...about_generator,
  ...headline_generator,
  ...post_generator,
};