import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Stream Title Generator",
  title: "Twitch Stream Title Generator - Catchy Stream Titles",
  description:
    "Generate catchy Twitch stream titles with AI. Create titles that attract viewers and boost discoverability. Free title generator for streamers.",
  englishSlug: "stream-title",
  spanishSlug: "generador-de-titulos-stream",
  keywords: [
    "twitch title",
    "stream title",
    "twitch stream",
    "stream name",
    "title ideas",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
