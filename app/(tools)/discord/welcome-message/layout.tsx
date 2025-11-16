import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Welcome Message Generator",
  title: "Discord Welcome Message Generator - New Member Greetings",
  description:
    "Generate welcoming Discord messages with AI. Create friendly greetings for new server members. Free welcome message generator.",
  englishSlug: "welcome-message",
  spanishSlug: "generador-de-mensajes-bienvenida",
  keywords: [
    "discord welcome",
    "welcome message",
    "server greeting",
    "new member message",
    "discord bot",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
