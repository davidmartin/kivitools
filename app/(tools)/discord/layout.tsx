import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Discord Tools - AI Bot & Server Generators | KiviTools",
  description: "Free AI Discord tools: welcome message generator, rules creator, bot command writer. Build better communities.",
  keywords: ["discord tools","discord generator","discord bot","discord server"],
  openGraph: {
    title: "Free Discord Tools - AI Bot & Server Generators",
    description: "Free AI Discord tools: welcome message generator, rules creator, bot command writer. Build better communities.",
    url: `https://kivitools.com/discord`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Discord Tools - AI Bot & Server Generators",
    description: "Free AI Discord tools: welcome message generator, rules creator, bot command writer. Build better communities.",
  },
  alternates: {
    canonical: `https://kivitools.com/discord`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Discord",
  description: "Free AI Discord tools: welcome message generator, rules creator, bot command writer. Build better communities.",
  url: "https://kivitools.com/discord",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "discord",
  toolName: "Discord Tools",
  englishSlug: "",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
