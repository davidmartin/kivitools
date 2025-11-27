import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Threads Tools - AI Post & Bio Generators | KiviTools",
  description: "Free AI Threads tools: post generator, bio writer, reply creator. Grow on Meta Threads platform.",
  keywords: ["threads tools","threads generator","meta threads","threads post"],
  openGraph: {
    title: "Free Threads Tools - AI Post & Bio Generators",
    description: "Free AI Threads tools: post generator, bio writer, reply creator. Grow on Meta Threads platform.",
    url: `https://kivitools.com/threads`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Threads Tools - AI Post & Bio Generators",
    description: "Free AI Threads tools: post generator, bio writer, reply creator. Grow on Meta Threads platform.",
  },
  alternates: {
    canonical: `https://kivitools.com/threads`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Threads",
  description: "Free AI Threads tools: post generator, bio writer, reply creator. Grow on Meta Threads platform.",
  url: "https://kivitools.com/threads",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "threads",
  toolName: "Threads Tools",
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
