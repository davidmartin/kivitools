import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Facebook Tools - AI Ad Copy & Post Generators | KiviTools",
  description: "Free AI Facebook tools: ad copy generator, post creator, page bio writer. Boost your Facebook marketing.",
  keywords: ["facebook tools","facebook ads","facebook generator","facebook post"],
  openGraph: {
    title: "Free Facebook Tools - AI Ad Copy & Post Generators",
    description: "Free AI Facebook tools: ad copy generator, post creator, page bio writer. Boost your Facebook marketing.",
    url: `https://kivitools.com/facebook`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Facebook Tools - AI Ad Copy & Post Generators",
    description: "Free AI Facebook tools: ad copy generator, post creator, page bio writer. Boost your Facebook marketing.",
  },
  alternates: {
    canonical: `https://kivitools.com/facebook`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Facebook",
  description: "Free AI Facebook tools: ad copy generator, post creator, page bio writer. Boost your Facebook marketing.",
  url: "https://kivitools.com/facebook",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "facebook",
  toolName: "Facebook Tools",
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
