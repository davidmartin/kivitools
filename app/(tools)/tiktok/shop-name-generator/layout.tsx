import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Shop Name Generator",
  title: "TikTok Shop Name Generator - Business Name Ideas",
  description:
    "Generate catchy TikTok Shop names with AI. Find the perfect business name for your TikTok store. Free shop name generator.",
  englishSlug: "shop-name-generator",
  spanishSlug: "generador-de-nombres-de-tienda",
  keywords: [
    "tiktok shop",
    "shop name",
    "business name",
    "store name generator",
    "tiktok business",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
