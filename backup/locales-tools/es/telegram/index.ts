import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Herramientas Telegram",
    "telegram.page.description": "Herramientas IA gratuitas para canales y grupos de Telegram. Anuncios, descripciones y mensajes de bienvenida que hacen crecer tu comunidad.",
    "telegram.info.title": "¿Por qué Telegram?",
    "telegram.info.description": "Telegram es la plataforma de mensajería con más de 800 millones de usuarios. Ya sea que administres un canal, grupo o comunidad, nuestras herramientas te ayudan a comunicarte profesionalmente y hacer crecer tu audiencia.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
