import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free Twitch Tools - AI Stream & Panel Generators | KiviTools",
  description: "Free AI Twitch tools: bio generator, panel description writer, stream title creator. Level up your stream.",
  keywords: ["twitch tools","twitch generator","streamer tools","twitch bio"],
  openGraph: {
    title: "Free Twitch Tools - AI Stream & Panel Generators",
    description: "Free AI Twitch tools: bio generator, panel description writer, stream title creator. Level up your stream.",
    url: `https://kivitools.com/twitch`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Twitch Tools - AI Stream & Panel Generators",
    description: "Free AI Twitch tools: bio generator, panel description writer, stream title creator. Level up your stream.",
  },
  alternates: {
    canonical: `https://kivitools.com/twitch`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Twitch",
  description: "Free AI Twitch tools: bio generator, panel description writer, stream title creator. Level up your stream.",
  url: "https://kivitools.com/twitch",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitch",
  toolName: "Twitch Tools",
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
