import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Suno AI Tools - Music Prompt & Lyric Generators | KiviTools",
  description: "Free AI tools for Suno: music prompt generator, lyric writer, song description creator. Create amazing AI music.",
  keywords: ["suno tools","suno ai","music prompt","ai lyrics"],
  openGraph: {
    title: "Free Suno AI Tools - Music Prompt & Lyric Generators",
    description: "Free AI tools for Suno: music prompt generator, lyric writer, song description creator. Create amazing AI music.",
    url: `https://kivitools.com/suno`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Suno AI Tools - Music Prompt & Lyric Generators",
    description: "Free AI tools for Suno: music prompt generator, lyric writer, song description creator. Create amazing AI music.",
  },
  alternates: {
    canonical: `https://kivitools.com/suno`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Suno",
  description: "Free AI tools for Suno: music prompt generator, lyric writer, song description creator. Create amazing AI music.",
  url: "https://kivitools.com/suno",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "suno",
  toolName: "Suno Tools",
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
