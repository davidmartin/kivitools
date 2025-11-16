import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "snapchat",
  toolName: "Lens Ideas Generator",
  title: "Snapchat Lens Ideas Generator - Creative AR Filter Concepts",
  description:
    "Generate innovative Snapchat Lens ideas with AI. Create unique AR filter concepts for your brand. Free lens ideas generator.",
  englishSlug: "lens-ideas",
  spanishSlug: "generador-de-ideas-lentes",
  keywords: [
    "snapchat lens",
    "ar filter",
    "lens ideas",
    "snapchat filter",
    "ar concepts",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
