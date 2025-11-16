import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Description Generator",
  title: "YouTube Description Generator - SEO Video Descriptions",
  description:
    "Generate SEO-optimized YouTube descriptions with AI. Create descriptions with keywords and timestamps. Free description generator.",
  englishSlug: "description-generator",
  spanishSlug: "generador-de-descripciones",
  keywords: [
    "youtube description",
    "video description",
    "seo description",
    "youtube seo",
    "description template",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
