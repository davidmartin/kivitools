import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    // Bluesky Page
    "bluesky.page.title": "Bluesky Tools",
    "bluesky.page.description": "Skeets so fire the algorithm doesn't even know what to do with you (decentralized and delicious)",
    "bluesky.info.title": "Why Use Bluesky Tools?",
    "bluesky.info.description": "Bluesky is the decentralized social network built on the AT Protocol. It's where the tech-savvy, open-source-loving, 'I left Twitter and never looked back' crowd hangs out. Our AI tools help you create content that feels native to the platform - not recycled tweets or corporate fluff. Generate posts, craft the perfect bio, and compose threads that make people actually read to the end.",

    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
