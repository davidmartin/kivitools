import { bioGenerator } from "./bio-generator";
import { captionGenerator } from "./caption-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations
    "bereal.page.title": "BeReal Tools",
    "bereal.page.description": "Kostenlose KI-Tools für authentischen BeReal Content. Captions, Bios und RealMoji Ideen, die es 100% echt halten.",
    "bereal.info.title": "Warum BeReal?",
    "bereal.info.description": "BeReal ist das Anti-Instagram - keine Filter, kein Kuratieren, nur echte Momente. Unsere Tools helfen dir, Persönlichkeit zu deinen authentischen Posts hinzuzufügen, ohne die genuine Vibe zu verlieren.",

    // Tool translations
    ...bioGenerator,
    ...captionGenerator,
    ...realmojiIdeas,
};
