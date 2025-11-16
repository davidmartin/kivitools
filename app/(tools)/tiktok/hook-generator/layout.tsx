import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Hook Generator",
  title: "TikTok Hook Generator - Create Viral Hooks with AI",
  description:
    "Generate attention-grabbing TikTok hooks instantly. AI-powered hook creator for viral videos. Make viewers stop scrolling in seconds.",
  englishSlug: "hook-generator",
  spanishSlug: "generador-de-ganchos",
  keywords: [
    "tiktok hook",
    "viral hook",
    "attention grabber",
    "video hook",
    "opening line",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
