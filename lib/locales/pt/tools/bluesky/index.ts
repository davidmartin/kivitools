import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    "bluesky.page.title": "Ferramentas Bluesky",
    "bluesky.page.description": "Skeets tão quentes que o algoritmo não sabe o que fazer com você",
    "bluesky.info.title": "Por Que Usar Ferramentas Bluesky?",
    "bluesky.info.description": "Bluesky é a rede social descentralizada construída no Protocolo AT. Nossas ferramentas de IA ajudam você a criar conteúdo que parece nativo da plataforma.",
    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
