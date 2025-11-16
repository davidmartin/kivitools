import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Title Generator",
  title: "YouTube Title Generator - Create Clickable Titles with AI",
  description:
    "Generate compelling YouTube titles with AI. Create SEO-optimized, clickable titles that get views. Free title generator for YouTube.",
  englishSlug: "title-generator",
  spanishSlug: "generador-de-titulos",
  keywords: [
    "youtube title",
    "video title",
    "clickbait title",
    "seo title",
    "title ideas",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
