import { bioGenerator } from "./bio-generator";
import { rulesGenerator } from "./rules-generator";
import { streamPlanGenerator } from "./stream-plan-generator";

export const twitch = {
  ...bioGenerator,
  ...rulesGenerator,
  ...streamPlanGenerator,
};
