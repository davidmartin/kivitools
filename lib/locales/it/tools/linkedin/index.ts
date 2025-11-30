import { aboutGenerator } from "./about-generator";
import { headlineGenerator } from "./headline-generator";
import { postGenerator } from "./post-generator";

export const linkedin = {
    ...aboutGenerator,
    ...headlineGenerator,
    ...postGenerator,
};
