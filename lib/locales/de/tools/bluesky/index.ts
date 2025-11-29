import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    "bluesky.page.title": "Bluesky Tools",
    "bluesky.page.description": "Skeets so heiß, dass der Algorithmus nicht weiß was passiert (dezentral und lecker)",
    "bluesky.info.title": "Warum Bluesky Tools nutzen?",
    "bluesky.info.description": "Bluesky ist das dezentrale soziale Netzwerk auf dem AT Protocol. Hier hängen die Tech-Affinen, Open-Source-Fans und 'Hab Twitter verlassen ohne zurückzuschauen'-Crowd ab. Unsere KI-Tools erstellen Content der sich nativ anfühlt - keine recycelten Tweets.",

    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
