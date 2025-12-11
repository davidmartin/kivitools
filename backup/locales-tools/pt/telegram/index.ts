import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Ferramentas Telegram",
    "telegram.page.description": "Ferramentas IA gratuitas para canais e grupos do Telegram. Anúncios, descrições e mensagens de boas-vindas que fazem sua comunidade crescer.",
    "telegram.info.title": "Por que Telegram?",
    "telegram.info.description": "O Telegram é a plataforma de mensagens com mais de 800 milhões de usuários. Seja você administrador de um canal, grupo ou comunidade, nossas ferramentas te ajudam a se comunicar profissionalmente e crescer sua audiência.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
