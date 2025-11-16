import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Event Description Generator",
  title: "Discord Event Description Generator - Create Event Details",
  description:
    "Generate compelling Discord event descriptions with AI. Create detailed event info that attracts participants. Free event description generator.",
  englishSlug: "event-description",
  spanishSlug: "generador-de-descripciones-eventos",
  keywords: [
    "discord event",
    "event description",
    "server event",
    "discord activity",
    "event details",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
