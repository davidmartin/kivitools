import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Engagement Calculator",
  title: "TikTok Engagement Rate Calculator - Analyze Your Performance",
  description:
    "Calculate your TikTok engagement rate instantly. Analyze likes, comments, shares. Free engagement calculator for creators and brands.",
  englishSlug: "engagement-calculator",
  spanishSlug: "calculadora-de-engagement",
  keywords: [
    "tiktok engagement",
    "engagement rate",
    "tiktok analytics",
    "engagement calculator",
    "tiktok stats",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
