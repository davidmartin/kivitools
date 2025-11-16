import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Announcement Generator",
  title: "Discord Announcement Generator - Create Server Announcements",
  description:
    "Generate professional Discord announcements with AI. Create engaging server announcements that grab attention. Free announcement generator.",
  englishSlug: "announcement-generator",
  spanishSlug: "generador-de-anuncios",
  keywords: [
    "discord announcement",
    "server announcement",
    "discord message",
    "announcement template",
    "discord bot",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
