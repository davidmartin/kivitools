import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free YouTube Tools - AI Title, Description & Tag Generators | KiviTools",
  description: "Free AI YouTube tools: title generator, description writer, tag finder, and video ideas. Optimize your videos for growth.",
  keywords: ["youtube tools","youtube seo","youtube generator","video title"],
  openGraph: {
    title: "Free YouTube Tools - AI Title, Description & Tag Generators",
    description: "Free AI YouTube tools: title generator, description writer, tag finder, and video ideas. Optimize your videos for growth.",
    url: `https://kivitools.com/youtube`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Tools - AI Title, Description & Tag Generators",
    description: "Free AI YouTube tools: title generator, description writer, tag finder, and video ideas. Optimize your videos for growth.",
  },
  alternates: {
    canonical: `https://kivitools.com/youtube`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "YouTube",
  description: "Free AI YouTube tools: title generator, description writer, tag finder, and video ideas. Optimize your videos for growth.",
  url: "https://kivitools.com/youtube",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "YouTube Tools",
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
