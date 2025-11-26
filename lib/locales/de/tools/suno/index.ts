import { lyrics_generator } from "./lyrics-generator";
import { prompt_generator } from "./prompt-generator";
import { description_generator } from "./description-generator";

export const suno = {
    ...lyrics_generator,
    ...prompt_generator,
    ...description_generator,
};
