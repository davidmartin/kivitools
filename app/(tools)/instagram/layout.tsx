import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Instagram Tools - AI Bio, Caption & Hashtag Generators | KiviTools",
  description: "Free AI Instagram tools: bio generator, caption writer, hashtag finder, story ideas, and carousel creator. Grow your following.",
  keywords: ["instagram tools","instagram generator","instagram caption","instagram bio"],
  openGraph: {
    title: "Free Instagram Tools - AI Bio, Caption & Hashtag Generators",
    description: "Free AI Instagram tools: bio generator, caption writer, hashtag finder, story ideas, and carousel creator. Grow your following.",
    url: `https://kivitools.com/instagram`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Instagram Tools - AI Bio, Caption & Hashtag Generators",
    description: "Free AI Instagram tools: bio generator, caption writer, hashtag finder, story ideas, and carousel creator. Grow your following.",
  },
  alternates: {
    canonical: `https://kivitools.com/instagram`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Instagram",
  description: "Free AI Instagram tools: bio generator, caption writer, hashtag finder, story ideas, and carousel creator. Grow your following.",
  url: "https://kivitools.com/instagram",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Instagram Tools",
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
