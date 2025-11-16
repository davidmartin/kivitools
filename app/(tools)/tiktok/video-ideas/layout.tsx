import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Video Ideas Generator",
  title: "TikTok Video Ideas Generator - AI Content Ideas",
  description:
    "Generate unlimited TikTok video ideas with AI. Get creative concepts for any niche. Free video idea generator for content creators.",
  englishSlug: "video-ideas",
  spanishSlug: "generador-de-ideas",
  keywords: [
    "tiktok ideas",
    "video ideas",
    "content ideas",
    "tiktok inspiration",
    "viral ideas",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
