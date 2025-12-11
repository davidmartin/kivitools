import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    // Bluesky Page
    "bluesky.page.title": "Herramientas Bluesky",
    "bluesky.page.description": "Skeets tan fuego que el algoritmo no sabe qué hacer contigo (descentralizado y delicioso)",
    "bluesky.info.title": "¿Por Qué Usar Herramientas de Bluesky?",
    "bluesky.info.description": "Bluesky es la red social descentralizada construida sobre el Protocolo AT. Es donde la gente tech-savvy, amante del open-source, 'dejé Twitter y nunca miré atrás' pasa el rato. Nuestras herramientas de IA te ayudan a crear contenido que se siente nativo de la plataforma - no tweets reciclados ni contenido corporativo. Genera posts, crea la bio perfecta, y compone hilos que hacen que la gente realmente lea hasta el final.",

    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
