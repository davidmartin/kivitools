import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Coins Calculator",
  title: "TikTok Coins Calculator - Convert Coins to Real Money",
  description:
    "Calculate TikTok coins value in real money. Convert coins to USD, EUR, and other currencies. Free TikTok coins converter.",
  englishSlug: "coins-calculator",
  spanishSlug: "calculadora-de-monedas",
  keywords: [
    "tiktok coins",
    "coins value",
    "coins to money",
    "tiktok gifts",
    "coins calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
