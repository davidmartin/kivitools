import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Reel Script Generator",
  title: "Instagram Reel Script Generator - Viral Reel Scripts",
  description:
    "Create viral Instagram Reel scripts with AI. Generate engaging scripts for short videos. Free script generator for Instagram Reels.",
  englishSlug: "reel-script",
  spanishSlug: "generador-de-scripts-reels",
  keywords: [
    "instagram reels",
    "reel script",
    "viral reels",
    "reels ideas",
    "short video script",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
