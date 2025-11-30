import { Metadata } from "next";
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Channel Name Generator",
  title: "YouTube Channel Name Generator - Free AI Tool",
  description: "Generate creative, memorable YouTube channel names with AI. Get unique name ideas for your niche that viewers will remember and click subscribe.",
  englishSlug: "channel-name-generator",
  spanishSlug: "generador-nombre-canal",
  keywords: [
    "youtube channel name generator",
    "youtube name ideas",
    "channel name generator",
    "youtube branding",
    "youtube handle generator",
    "generador nombre canal youtube",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolJsonLd = generateToolJsonLd({
    platform: "youtube",
    toolName: "Channel Name Generator",
    title: "YouTube Channel Name Generator",
    description: "Generate creative, memorable YouTube channel names with our free AI tool.",
    englishSlug: "channel-name-generator",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "youtube",
    toolName: "Channel Name Generator",
    englishSlug: "channel-name-generator",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
