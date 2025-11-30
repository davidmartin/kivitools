import { bioGenerator } from "./bio-generator";
import { chatRules } from "./chat-rules";
import { streamTitle } from "./stream-title";

export const kick = {
    // Page level translations
    "kick.page.title": "Kick Tools",
    "kick.page.description": "Free AI tools for Kick streamers. Stream titles, bios, and chat rules that help you grow your channel.",
    "kick.info.title": "Why Kick?",
    "kick.info.description": "Kick is the streaming platform giving creators a better deal. With a 95/5 revenue split and growing community, now's the time to build your presence. Our tools help you stand out.",

    ...bioGenerator,
    ...chatRules,
    ...streamTitle,
};
