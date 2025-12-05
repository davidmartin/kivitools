import { bioGenerator } from "./bio-generator";
import { captionGenerator } from "./caption-generator";
import { realmojiIdeas } from "./realmoji-ideas";

export const bereal = {
    // Page level translations
    "bereal.page.title": "Ferramentas BeReal",
    "bereal.page.description": "Ferramentas de IA grátis pra conteúdo BeReal autêntico. Legendas, bios e ideias de RealMoji que mantêm 100% real.",
    "bereal.info.title": "Por que BeReal?",
    "bereal.info.description": "BeReal é o anti-Instagram - sem filtros, sem curadoria, só momentos reais. Nossas ferramentas ajudam você a adicionar personalidade aos seus posts autênticos sem perder a vibe genuína.",

    // Tool translations
    ...bioGenerator,
    ...captionGenerator,
    ...realmojiIdeas,
};
