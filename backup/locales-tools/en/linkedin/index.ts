import { postGenerator } from "./post-generator";
import { headlineGenerator } from "./headline-generator";
import { aboutGenerator } from "./about-generator";

export const linkedin = {
    ...postGenerator,
    ...headlineGenerator,
    ...aboutGenerator,
};
