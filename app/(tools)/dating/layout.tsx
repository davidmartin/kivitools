import { Metadata } from "next";
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "AI Dating Profile Tools - Bio & First Message Generator | KiviTools",
  description: "Free AI-powered dating profile tools. Generate compelling dating bios, conversation openers, and get profile reviews for Tinder, Bumble, Hinge, and more.",
  keywords: [
    "dating bio generator",
    "tinder bio generator",
    "bumble bio generator",
    "first message generator",
    "dating profile tips",
    "dating app openers",
    "generador bio tinder",
    "herramientas para citas",
  ],
  alternates: {
    canonical: "https://kivitools.com/dating",
    languages: {
      "en": "https://kivitools.com/dating",
      "es": "https://kivitools.com/dating",
    },
  },
  openGraph: {
    title: "AI Dating Profile Tools - Bio & First Message Generator | KiviTools",
    description: "Free AI-powered dating profile tools. Generate compelling bios, conversation openers, and get profile reviews.",
    url: "https://kivitools.com/dating",
    siteName: "KiviTools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dating Profile Tools - Bio & First Message Generator | KiviTools",
    description: "Free AI-powered dating profile tools. Generate compelling bios, conversation openers, and get profile reviews.",
  },
};

export default function DatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    platform: "dating",
    tools: [
      { name: "Dating Bio Generator", slug: "bio-generator" },
      { name: "First Message Generator", slug: "opener-generator" },
      { name: "Profile Review & Tips", slug: "profile-review" },
    ],
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "dating",
    toolName: "Dating Profile Tools",
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
