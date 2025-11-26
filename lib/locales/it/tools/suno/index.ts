import { description_generator } from './description-generator';
import { lyric_generator } from './lyric-generator';
import { lyrics_generator } from './lyrics-generator';
import { music_prompt_generator } from './music-prompt-generator';
import { prompt_generator } from './prompt-generator';
import { song_description_generator } from './song-description-generator';

export const suno = {
    ...description_generator,
    ...lyric_generator,
    ...lyrics_generator,
    ...music_prompt_generator,
    ...prompt_generator,
    ...song_description_generator,
};
