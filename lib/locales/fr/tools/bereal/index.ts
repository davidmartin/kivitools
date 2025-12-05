import { bioGenerator } from "./bio-generator";
import { captionGenerator } from "./caption-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations
    "bereal.page.title": "Outils BeReal",
    "bereal.page.description": "Outils IA gratuits pour du contenu BeReal authentique. Légendes, bios et idées de RealMoji qui restent 100% vrais.",
    "bereal.info.title": "Pourquoi BeReal ?",
    "bereal.info.description": "BeReal c'est l'anti-Instagram - pas de filtres, pas de curation, juste des moments vrais. Nos outils t'aident à ajouter de la personnalité à tes posts authentiques sans perdre la vibe genuine.",

    // Tool translations
    ...bioGenerator,
    ...captionGenerator,
    ...realmojiIdeas,
};
