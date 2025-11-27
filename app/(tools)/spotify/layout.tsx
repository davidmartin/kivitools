import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Spotify Tools - AI Playlist & Artist Bio Generators | KiviTools",
  description: "Free AI Spotify tools: playlist name generator, description writer, artist bio creator. Enhance your music presence.",
  keywords: ["spotify tools","playlist generator","spotify bio","music tools"],
  openGraph: {
    title: "Free Spotify Tools - AI Playlist & Artist Bio Generators",
    description: "Free AI Spotify tools: playlist name generator, description writer, artist bio creator. Enhance your music presence.",
    url: `https://kivitools.com/spotify`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Spotify Tools - AI Playlist & Artist Bio Generators",
    description: "Free AI Spotify tools: playlist name generator, description writer, artist bio creator. Enhance your music presence.",
  },
  alternates: {
    canonical: `https://kivitools.com/spotify`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Spotify",
  description: "Free AI Spotify tools: playlist name generator, description writer, artist bio creator. Enhance your music presence.",
  url: "https://kivitools.com/spotify",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "spotify",
  toolName: "Spotify Tools",
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
