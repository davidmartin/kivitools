import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Script Generator",
  title: "YouTube Script Generator - Create Video Scripts with AI",
  description:
    "Generate engaging YouTube scripts with AI. Create structured video scripts with intro, body, and outro. Free script generator for YouTubers.",
  englishSlug: "script-generator",
  spanishSlug: "generador-de-scripts",
  keywords: [
    "youtube script",
    "video script",
    "script writer",
    "youtube content",
    "script template",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
