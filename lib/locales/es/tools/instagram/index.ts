import { bio_generator } from "./bio-generator";
import { caption_generator } from "./caption-generator";
import { reel_script } from "./reel-script";

export const instagram = {
  ...bio_generator,
  ...caption_generator,
  ...reel_script,
};