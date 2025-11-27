import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Snapchat Tools - AI Content & Story Generators | KiviTools",
  description: "Free AI Snapchat tools: lens ideas, story prompts, caption generator. Create engaging Snap content.",
  keywords: ["snapchat tools","snapchat generator","snap ideas","snapchat content"],
  openGraph: {
    title: "Free Snapchat Tools - AI Content & Story Generators",
    description: "Free AI Snapchat tools: lens ideas, story prompts, caption generator. Create engaging Snap content.",
    url: `https://kivitools.com/snapchat`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Snapchat Tools - AI Content & Story Generators",
    description: "Free AI Snapchat tools: lens ideas, story prompts, caption generator. Create engaging Snap content.",
  },
  alternates: {
    canonical: `https://kivitools.com/snapchat`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Snapchat",
  description: "Free AI Snapchat tools: lens ideas, story prompts, caption generator. Create engaging Snap content.",
  url: "https://kivitools.com/snapchat",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "snapchat",
  toolName: "Snapchat Tools",
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
