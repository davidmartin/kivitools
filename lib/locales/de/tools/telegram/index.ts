import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Telegram Tools",
    "telegram.page.description": "Kostenlose KI-Tools für Telegram-Kanäle und -Gruppen. Ankündigungen, Beschreibungen und Willkommensnachrichten, die deine Community wachsen lassen.",
    "telegram.info.title": "Warum Telegram?",
    "telegram.info.description": "Telegram ist die Messaging-Plattform mit über 800 Millionen Nutzern. Egal ob du einen Kanal, eine Gruppe oder Community betreibst - unsere Tools helfen dir, professionell zu kommunizieren und dein Publikum zu vergrößern.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
