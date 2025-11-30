import { Metadata } from "next";
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "AI Podcast Tools - Name & Description Generator | KiviTools",
  description: "Free AI-powered podcast tools. Generate catchy podcast names, compelling descriptions, and episode titles. Perfect for podcasters looking to grow their audience.",
  keywords: [
    "podcast name generator",
    "podcast description generator",
    "episode title generator",
    "podcast tools",
    "podcast name ideas",
    "AI podcast tools",
    "podcast branding",
    "podcast SEO",
    "generador de nombres para podcast",
    "herramientas para podcast",
  ],
  alternates: {
    canonical: "https://kivitools.com/podcast",
    languages: {
      "en": "https://kivitools.com/podcast",
      "es": "https://kivitools.com/podcast",
    },
  },
  openGraph: {
    title: "AI Podcast Tools - Name & Description Generator | KiviTools",
    description: "Free AI-powered podcast tools. Generate catchy podcast names, compelling descriptions, and episode titles.",
    url: "https://kivitools.com/podcast",
    siteName: "KiviTools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Podcast Tools - Name & Description Generator | KiviTools",
    description: "Free AI-powered podcast tools. Generate catchy podcast names, compelling descriptions, and episode titles.",
  },
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    platform: "podcast",
    tools: [
      { name: "Podcast Name Generator", slug: "name-generator" },
      { name: "Podcast Description Generator", slug: "description-generator" },
      { name: "Episode Title Generator", slug: "episode-title-generator" },
    ],
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "podcast",
    toolName: "Podcast Tools",
    englishSlug: "",
  });

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
