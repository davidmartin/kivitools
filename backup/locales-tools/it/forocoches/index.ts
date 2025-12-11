import { poleGenerator } from "./pole-generator";
import { threadGenerator } from "./thread-generator";
import { trollResponse } from "./troll-response";

export const forocoches = {
    ...poleGenerator,
    ...threadGenerator,
    ...trollResponse,
};
