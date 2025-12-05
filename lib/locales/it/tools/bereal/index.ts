import { bioGenerator } from "./bio-generator";
import { captionGenerator } from "./caption-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations
    "bereal.page.title": "Strumenti BeReal",
    "bereal.page.description": "Strumenti IA gratuiti per contenuti BeReal autentici. Didascalie, bio e idee RealMoji che restano 100% vere.",
    "bereal.info.title": "Perché BeReal?",
    "bereal.info.description": "BeReal è l'anti-Instagram - niente filtri, niente curation, solo momenti veri. I nostri strumenti ti aiutano ad aggiungere personalità ai tuoi post autentici senza perdere la vibe genuina.",

    // Tool translations
    ...bioGenerator,
    ...captionGenerator,
    ...realmojiIdeas,
};
