import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Reddit Tools - AI Post & Comment Generators | KiviTools",
  description: "Free AI Reddit tools: post title generator, comment writer, subreddit finder. Master Reddit engagement.",
  keywords: ["reddit tools","reddit generator","reddit post","reddit comment"],
  openGraph: {
    title: "Free Reddit Tools - AI Post & Comment Generators",
    description: "Free AI Reddit tools: post title generator, comment writer, subreddit finder. Master Reddit engagement.",
    url: `https://kivitools.com/reddit`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Reddit Tools - AI Post & Comment Generators",
    description: "Free AI Reddit tools: post title generator, comment writer, subreddit finder. Master Reddit engagement.",
  },
  alternates: {
    canonical: `https://kivitools.com/reddit`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Reddit",
  description: "Free AI Reddit tools: post title generator, comment writer, subreddit finder. Master Reddit engagement.",
  url: "https://kivitools.com/reddit",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "reddit",
  toolName: "Reddit Tools",
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
