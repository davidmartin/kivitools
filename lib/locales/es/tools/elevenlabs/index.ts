import { podcast_script_generator } from "./podcast-script-generator";
import { ad_script_generator } from "./ad-script-generator";
import { audiobook_optimizer } from "./audiobook-optimizer";
import { video_voiceover_script } from "./video-voiceover-script";
import { voice_text_formatter } from "./voice-text-formatter";
import { voice_script_writer } from "./voice-script-writer";

export const elevenlabs = {
  ...podcast_script_generator,
  ...ad_script_generator,
  ...audiobook_optimizer,
  ...video_voiceover_script,
  ...voice_text_formatter,
  ...voice_script_writer,
};