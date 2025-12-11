import { lyrics_generator } from "./lyrics-generator";
import { prompt_generator } from "./prompt-generator";
import { description_generator } from "./description-generator";
import { title_generator } from "./title-generator";
import { tag_generator } from "./tag-generator";
import { album_name_generator } from "./album-name-generator";
import { cover_art_prompt_generator } from "./cover-art-prompt-generator";
import { remix_idea_generator } from "./remix-idea-generator";

export const suno = {
    ...lyrics_generator,
    ...prompt_generator,
    ...description_generator,
    ...title_generator,
    ...tag_generator,
    ...album_name_generator,
    ...cover_art_prompt_generator,
    ...remix_idea_generator,
};
