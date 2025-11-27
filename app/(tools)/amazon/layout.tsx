import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Amazon Tools - AI Product Description Generators | KiviTools",
  description: "Free AI Amazon seller tools: product description writer, review generator, comparison creator. Boost your listings.",
  keywords: ["amazon tools","amazon seller","product description","amazon listing"],
  openGraph: {
    title: "Free Amazon Tools - AI Product Description Generators",
    description: "Free AI Amazon seller tools: product description writer, review generator, comparison creator. Boost your listings.",
    url: `https://kivitools.com/amazon`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Amazon Tools - AI Product Description Generators",
    description: "Free AI Amazon seller tools: product description writer, review generator, comparison creator. Boost your listings.",
  },
  alternates: {
    canonical: `https://kivitools.com/amazon`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Amazon",
  description: "Free AI Amazon seller tools: product description writer, review generator, comparison creator. Boost your listings.",
  url: "https://kivitools.com/amazon",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "amazon",
  toolName: "Amazon Tools",
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
