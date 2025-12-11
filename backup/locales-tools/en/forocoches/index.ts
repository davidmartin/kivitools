import { threadGenerator } from "./thread-generator";
import { poleGenerator } from "./pole-generator";
import { trollResponse } from "./troll-response";

export const forocoches = {
    ...threadGenerator,
    ...poleGenerator,
    ...trollResponse,
};
