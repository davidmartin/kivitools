import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Twitter/X Tools - AI Tweet & Thread Generators | KiviTools",
  description: "Free AI Twitter tools: tweet generator, thread maker, bio writer, and engagement boosters. Create viral tweets.",
  keywords: ["twitter tools","tweet generator","twitter thread","x tools"],
  openGraph: {
    title: "Free Twitter/X Tools - AI Tweet & Thread Generators",
    description: "Free AI Twitter tools: tweet generator, thread maker, bio writer, and engagement boosters. Create viral tweets.",
    url: `https://kivitools.com/twitter`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Twitter/X Tools - AI Tweet & Thread Generators",
    description: "Free AI Twitter tools: tweet generator, thread maker, bio writer, and engagement boosters. Create viral tweets.",
  },
  alternates: {
    canonical: `https://kivitools.com/twitter`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Twitter",
  description: "Free AI Twitter tools: tweet generator, thread maker, bio writer, and engagement boosters. Create viral tweets.",
  url: "https://kivitools.com/twitter",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitter",
  toolName: "Twitter Tools",
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
