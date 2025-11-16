import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Panel Description Generator",
  title: "Twitch Panel Description Generator - Professional Panels",
  description:
    "Generate professional Twitch panel descriptions with AI. Create About, Schedule, and Donation panel text. Free panel generator for streamers.",
  englishSlug: "panel-description",
  spanishSlug: "generador-de-descripciones-paneles",
  keywords: [
    "twitch panel",
    "panel description",
    "about panel",
    "twitch bio",
    "stream panels",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
