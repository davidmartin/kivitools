import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Strumenti Telegram",
    "telegram.page.description": "Strumenti IA gratuiti per canali e gruppi Telegram. Annunci, descrizioni e messaggi di benvenuto che fanno crescere la tua community.",
    "telegram.info.title": "Perché Telegram?",
    "telegram.info.description": "Telegram è la piattaforma di messaggistica con oltre 800 milioni di utenti. Che tu gestisca un canale, gruppo o community, i nostri strumenti ti aiutano a comunicare professionalmente e far crescere il tuo pubblico.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
