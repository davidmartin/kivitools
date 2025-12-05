import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Outils Telegram",
    "telegram.page.description": "Outils IA gratuits pour tes chaînes et groupes Telegram. Annonces, descriptions et messages de bienvenue qui font grandir ta communauté.",
    "telegram.info.title": "Pourquoi Telegram ?",
    "telegram.info.description": "Telegram est la plateforme de messagerie avec plus de 800 millions d'utilisateurs. Que tu gères une chaîne, un groupe ou une communauté, nos outils t'aident à communiquer de manière professionnelle et à faire grandir ton audience.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
