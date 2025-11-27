import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free LinkedIn Tools - AI Profile & Post Generators | KiviTools",
  description: "Free AI LinkedIn tools: headline generator, about section writer, post creator. Build your professional brand.",
  keywords: ["linkedin tools","linkedin generator","linkedin profile","linkedin post"],
  openGraph: {
    title: "Free LinkedIn Tools - AI Profile & Post Generators",
    description: "Free AI LinkedIn tools: headline generator, about section writer, post creator. Build your professional brand.",
    url: `https://kivitools.com/linkedin`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LinkedIn Tools - AI Profile & Post Generators",
    description: "Free AI LinkedIn tools: headline generator, about section writer, post creator. Build your professional brand.",
  },
  alternates: {
    canonical: `https://kivitools.com/linkedin`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "LinkedIn",
  description: "Free AI LinkedIn tools: headline generator, about section writer, post creator. Build your professional brand.",
  url: "https://kivitools.com/linkedin",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "linkedin",
  toolName: "LinkedIn Tools",
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
