import { ad_script_generator } from "./ad-script-generator";
import { audiobook_optimizer } from "./audiobook-optimizer";
import { podcast_script_generator } from "./podcast-script-generator";
import { video_voiceover_script } from "./video-voiceover-script";
import { voice_script_writer } from "./voice-script-writer";
import { voice_text_formatter } from "./voice-text-formatter";

export const elevenlabs = {
    ...ad_script_generator,
    ...audiobook_optimizer,
    ...podcast_script_generator,
    ...video_voiceover_script,
    ...voice_script_writer,
    ...voice_text_formatter,
};
