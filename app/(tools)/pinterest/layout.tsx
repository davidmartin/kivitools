import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Pinterest Tools - AI Pin & Board Generators | KiviTools",
  description: "Free AI Pinterest tools: pin description writer, board name generator, profile bio creator. Grow your Pinterest presence.",
  keywords: ["pinterest tools","pinterest seo","pin description","pinterest generator"],
  openGraph: {
    title: "Free Pinterest Tools - AI Pin & Board Generators",
    description: "Free AI Pinterest tools: pin description writer, board name generator, profile bio creator. Grow your Pinterest presence.",
    url: `https://kivitools.com/pinterest`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pinterest Tools - AI Pin & Board Generators",
    description: "Free AI Pinterest tools: pin description writer, board name generator, profile bio creator. Grow your Pinterest presence.",
  },
  alternates: {
    canonical: `https://kivitools.com/pinterest`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Pinterest",
  description: "Free AI Pinterest tools: pin description writer, board name generator, profile bio creator. Grow your Pinterest presence.",
  url: "https://kivitools.com/pinterest",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "pinterest",
  toolName: "Pinterest Tools",
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
