import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Hashtag Generator",
  title: "TikTok Hashtag Generator - Best Hashtags for Viral Growth",
  description:
    "Generate trending TikTok hashtags with AI. Get relevant hashtags to boost your reach and go viral. Free hashtag research tool.",
  englishSlug: "hashtag-generator",
  spanishSlug: "generador-de-hashtags",
  keywords: [
    "tiktok hashtags",
    "trending hashtags",
    "viral hashtags",
    "hashtag generator",
    "grow tiktok",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
