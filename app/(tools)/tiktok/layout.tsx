import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free TikTok Tools - AI Content Generators & Calculators | KiviTools",
  description: "Free AI-powered TikTok tools: script writer, video ideas, hashtag generator, coins calculator, and more. Create viral content.",
  keywords: ["tiktok tools","tiktok generator","tiktok calculator","viral tiktok"],
  openGraph: {
    title: "Free TikTok Tools - AI Content Generators & Calculators",
    description: "Free AI-powered TikTok tools: script writer, video ideas, hashtag generator, coins calculator, and more. Create viral content.",
    url: `https://kivitools.com/tiktok`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free TikTok Tools - AI Content Generators & Calculators",
    description: "Free AI-powered TikTok tools: script writer, video ideas, hashtag generator, coins calculator, and more. Create viral content.",
  },
  alternates: {
    canonical: `https://kivitools.com/tiktok`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "TikTok",
  description: "Free AI-powered TikTok tools: script writer, video ideas, hashtag generator, coins calculator, and more. Create viral content.",
  url: "https://kivitools.com/tiktok",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "TikTok Tools",
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
