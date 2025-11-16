import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Bio Generator",
  title: "Instagram Bio Generator - Create Perfect Bios with AI",
  description:
    "Generate captivating Instagram bios instantly with AI. Create professional, aesthetic, or funny bios with emojis. Free bio generator for Instagram.",
  englishSlug: "bio-generator",
  spanishSlug: "generador-de-bio",
  keywords: [
    "instagram bio",
    "bio generator",
    "aesthetic bio",
    "instagram profile",
    "bio ideas",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
