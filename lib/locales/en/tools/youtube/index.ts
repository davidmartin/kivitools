import { script_generator } from "./script-generator";
import { title_generator } from "./title-generator";
import { description_generator } from "./description-generator";

export const youtube = {
  ...script_generator,
  ...title_generator,
  ...description_generator,
};