import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "snapchat",
  toolName: "Caption Generator",
  title: "Snapchat Caption Generator - Creative Snap Captions",
  description:
    "Generate creative Snapchat captions with AI. Create fun, engaging captions for your Snaps. Free caption generator for Snapchat.",
  englishSlug: "caption-generator",
  spanishSlug: "generador-de-captions",
  keywords: [
    "snapchat caption",
    "snap caption",
    "snapchat text",
    "snap ideas",
    "caption generator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
