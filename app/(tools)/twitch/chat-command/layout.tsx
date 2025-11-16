import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Chat Command Generator",
  title: "Twitch Chat Command Generator - Custom Bot Commands",
  description:
    "Generate custom Twitch chat commands with AI. Create fun and useful bot commands for your stream. Free command generator for Twitch.",
  englishSlug: "chat-command",
  spanishSlug: "generador-de-comandos-chat",
  keywords: [
    "twitch command",
    "chat command",
    "bot command",
    "nightbot",
    "stream commands",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
