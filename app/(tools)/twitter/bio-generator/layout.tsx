import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Bio Generator",
  title: "Twitter Bio Generator - Create Witty Bios with AI",
  description:
    "Generate clever Twitter bios instantly with AI. Create professional or funny bios that stand out. Free bio generator for Twitter/X.",
  englishSlug: "bio-generator",
  spanishSlug: "generador-de-bio",
  keywords: [
    "twitter bio",
    "x bio",
    "bio generator",
    "twitter profile",
    "witty bio",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
