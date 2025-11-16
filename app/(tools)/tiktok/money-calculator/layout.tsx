import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Money Calculator",
  title: "TikTok Money Calculator - Estimate Your Earnings",
  description:
    "Calculate how much you can earn on TikTok. Estimate earnings from views, followers, and engagement. Free TikTok revenue calculator.",
  englishSlug: "money-calculator",
  spanishSlug: "calculadora-de-ingresos",
  keywords: [
    "tiktok money",
    "tiktok earnings",
    "creator fund",
    "tiktok revenue",
    "how much tiktok pay",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
