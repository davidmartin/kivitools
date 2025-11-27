import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Free ElevenLabs Tools - AI Voice Script Generators | KiviTools",
  description: "Free AI tools for ElevenLabs: voiceover scripts, podcast scripts, audiobook optimizer. Perfect text for AI voices.",
  keywords: ["elevenlabs tools","voice script","tts tools","ai voice"],
  openGraph: {
    title: "Free ElevenLabs Tools - AI Voice Script Generators",
    description: "Free AI tools for ElevenLabs: voiceover scripts, podcast scripts, audiobook optimizer. Perfect text for AI voices.",
    url: `https://kivitools.com/elevenlabs`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ElevenLabs Tools - AI Voice Script Generators",
    description: "Free AI tools for ElevenLabs: voiceover scripts, podcast scripts, audiobook optimizer. Perfect text for AI voices.",
  },
  alternates: {
    canonical: `https://kivitools.com/elevenlabs`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "ElevenLabs",
  description: "Free AI tools for ElevenLabs: voiceover scripts, podcast scripts, audiobook optimizer. Perfect text for AI voices.",
  url: "https://kivitools.com/elevenlabs",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "elevenlabs",
  toolName: "ElevenLabs Tools",
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
