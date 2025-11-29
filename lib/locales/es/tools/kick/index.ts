import { streamTitle } from "./stream-title";
import { bioGenerator } from "./bio-generator";
import { chatRules } from "./chat-rules";

export const kick = {
    // Page level translations
    "kick.page.title": "Herramientas Kick",
    "kick.page.description": "Herramientas IA gratuitas para streamers de Kick. Títulos de stream, bios y reglas de chat que te ayudan a crecer tu canal.",
    "kick.info.title": "¿Por qué Kick?",
    "kick.info.description": "Kick es la plataforma de streaming que ofrece mejores condiciones a los creadores. Con un split de ingresos 95/5 y una comunidad en crecimiento, es el momento de construir tu presencia. Nuestras herramientas te ayudan a destacar.",

    // Spread tool translations
    ...streamTitle,
    ...bioGenerator,
    ...chatRules,
};
