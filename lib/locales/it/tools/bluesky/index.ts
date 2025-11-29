import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    "bluesky.page.title": "Strumenti Bluesky",
    "bluesky.page.description": "Skeet così potenti che l'algoritmo non sa cosa fare (decentralizzato e delizioso)",
    "bluesky.info.title": "Perché Usare gli Strumenti Bluesky?",
    "bluesky.info.description": "Bluesky è il social network decentralizzato basato sul protocollo AT. È dove stanno i tech-savvy, gli amanti dell'open-source e quelli che hanno lasciato Twitter senza voltarsi. I nostri strumenti IA creano contenuti nativi per la piattaforma - niente tweet riciclati.",

    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
