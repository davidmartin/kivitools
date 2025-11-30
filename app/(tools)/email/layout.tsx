import { Metadata } from "next";
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "AI Email Marketing Tools - Subject Line & Newsletter Generator | KiviTools",
  description: "Free AI-powered email marketing tools. Generate compelling subject lines, engaging newsletters, and professional email signatures.",
  keywords: [
    "email subject line generator",
    "newsletter generator",
    "email signature generator",
    "email marketing tools",
    "AI email tools",
    "email open rate",
    "generador de asuntos email",
    "herramientas email marketing",
  ],
  alternates: {
    canonical: "https://kivitools.com/email",
    languages: {
      "en": "https://kivitools.com/email",
      "es": "https://kivitools.com/email",
    },
  },
  openGraph: {
    title: "AI Email Marketing Tools - Subject Line & Newsletter Generator | KiviTools",
    description: "Free AI-powered email marketing tools. Generate compelling subject lines, engaging newsletters, and professional signatures.",
    url: "https://kivitools.com/email",
    siteName: "KiviTools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Email Marketing Tools - Subject Line & Newsletter Generator | KiviTools",
    description: "Free AI-powered email marketing tools. Generate compelling subject lines, engaging newsletters, and professional signatures.",
  },
};

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    platform: "email",
    tools: [
      { name: "Email Subject Line Generator", slug: "subject-generator" },
      { name: "Newsletter Generator", slug: "newsletter-generator" },
      { name: "Email Signature Generator", slug: "signature-generator" },
    ],
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "email",
    toolName: "Email Marketing Tools",
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
