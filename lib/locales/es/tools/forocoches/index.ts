import { pole_generator } from "./pole-generator";
import { troll_response } from "./troll-response";
import { thread_generator } from "./thread-generator";

export const forocoches = {
  ...pole_generator,
  ...troll_response,
  ...thread_generator,
};