import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Username Generator",
  title: "TikTok Username Generator - Find Your Perfect Handle",
  description:
    "Generate unique TikTok usernames instantly with AI. Find creative, available handles for your brand. Free username ideas generator.",
  englishSlug: "username-generator",
  spanishSlug: "generador-de-nombres",
  keywords: [
    "tiktok username",
    "username ideas",
    "handle generator",
    "tiktok name",
    "creative usernames",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
