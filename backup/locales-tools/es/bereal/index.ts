import { captionGenerator } from "./caption-generator";
import { bioGenerator } from "./bio-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations
    "bereal.page.title": "Herramientas BeReal",
    "bereal.page.description": "Herramientas IA gratuitas para contenido auténtico de BeReal. Captions, bios e ideas de RealMoji que lo mantienen 100% real.",
    "bereal.info.title": "¿Por qué BeReal?",
    "bereal.info.description": "BeReal es el anti-Instagram - sin filtros, sin curar, solo momentos reales. Nuestras herramientas te ayudan a añadir personalidad a tus posts auténticos sin perder el vibe genuino.",

    // Spread tool translations
    ...captionGenerator,
    ...bioGenerator,
    ...realmojiIdeas,
};
