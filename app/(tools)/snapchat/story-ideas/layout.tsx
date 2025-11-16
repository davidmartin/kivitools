import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "snapchat",
  toolName: "Story Ideas Generator",
  title: "Snapchat Story Ideas Generator - Creative Story Concepts",
  description:
    "Generate creative Snapchat Story ideas with AI. Get unique concepts to engage your audience. Free story ideas generator for Snapchat.",
  englishSlug: "story-ideas",
  spanishSlug: "generador-de-ideas-historias",
  keywords: [
    "snapchat story",
    "story ideas",
    "snap ideas",
    "snapchat content",
    "story concepts",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
