import { postGenerator } from "./post-generator";
import { bioGenerator } from "./bio-generator";
import { threadComposer } from "./thread-composer";

export const bluesky = {
    "bluesky.page.title": "Outils Bluesky",
    "bluesky.page.description": "Des skeets tellement feu que l'algorithme ne sait plus quoi faire (décentralisé et délicieux)",
    "bluesky.info.title": "Pourquoi Utiliser les Outils Bluesky ?",
    "bluesky.info.description": "Bluesky est le réseau social décentralisé basé sur le protocole AT. C'est là que traînent les tech-savvy, les fans d'open-source et ceux qui ont quitté Twitter sans regret. Nos outils IA créent du contenu natif pour la plateforme - pas des tweets recyclés.",

    ...postGenerator,
    ...bioGenerator,
    ...threadComposer,
};
