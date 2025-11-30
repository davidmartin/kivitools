import { bioGenerator } from "./bio-generator";
import { captionGenerator } from "./caption-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations (using English as fallback)
    "bereal.page.title": "BeReal Tools",
    "bereal.page.description": "Free AI tools for authentic BeReal content. Captions, bios, and RealMoji ideas that keep it 100% real.",
    "bereal.info.title": "Why BeReal?",
    "bereal.info.description": "BeReal is the anti-Instagram - no filters, no curating, just real moments. Our tools help you add personality to your authentic posts without losing the genuine vibe.",

    // Tool translations
    ...bioGenerator,
    ...captionGenerator,
    ...realmojiIdeas,
};
