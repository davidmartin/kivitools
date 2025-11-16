import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Caption Generator",
  title: "Instagram Caption Generator - AI Captions for Posts",
  description:
    "Generate engaging Instagram captions with AI. Create captions with emojis and hashtags for any post. Free caption generator for Instagram.",
  englishSlug: "caption-generator",
  spanishSlug: "generador-de-captions",
  keywords: [
    "instagram caption",
    "caption ideas",
    "post caption",
    "instagram captions",
    "ai caption",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
