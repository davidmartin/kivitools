import { announcementGenerator } from "./announcement-generator";
import { channelDescription } from "./channel-description";
import { welcomeMessage } from "./welcome-message";

export const telegram = {
    // Page level translations
    "telegram.page.title": "Telegram Tools",
    "telegram.page.description": "Free AI tools for Telegram channels and groups. Announcements, descriptions, and welcome messages that grow your community.",
    "telegram.info.title": "Why Telegram?",
    "telegram.info.description": "Telegram is the messaging platform with over 800 million users. Whether you run a channel, group, or community, our tools help you communicate professionally and grow your audience.",

    // Spread tool translations
    ...announcementGenerator,
    ...channelDescription,
    ...welcomeMessage,
};
