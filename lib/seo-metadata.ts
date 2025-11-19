import { Metadata } from "next";

type Platform = "tiktok" | "instagram" | "twitter" | "snapchat" | "youtube" | "reddit" | "discord" | "twitch" | "suno" | "elevenlabs";

interface GenerateToolMetadataProps {
  platform: Platform;
  toolName: string;
  title: string;
  description: string;
  spanishSlug?: string; // Spanish URL slug for alternate
  englishSlug: string;
  keywords?: string[];
}

const platformColors: Record<Platform, string> = {
  tiktok: "#000000",
  instagram: "#E4405F",
  twitter: "#1DA1F2",
  snapchat: "#FFFC00",
  youtube: "#FF0000",
  reddit: "#FF4500",
  discord: "#5865F2",
  twitch: "#9146FF",
  suno: "#9f7aea",
  elevenlabs: "#8B5CF6",
};

const platformNames: Record<Platform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  twitter: "Twitter",
  snapchat: "Snapchat",
  youtube: "YouTube",
  reddit: "Reddit",
  discord: "Discord",
  twitch: "Twitch",
  suno: "Suno",
  elevenlabs: "ElevenLabs",
};

/**
 * Generate complete SEO metadata for tool pages
 */
export function generateToolMetadata({
  platform,
  toolName,
  title,
  description,
  spanishSlug,
  englishSlug,
  keywords = [],
}: GenerateToolMetadataProps): Metadata {
  const baseUrl = "https://kivitools.com";
  const platformName = platformNames[platform];
  const canonicalUrl = `${baseUrl}/${platform}/${englishSlug}`;
  const spanishUrl = spanishSlug
    ? `${baseUrl}/${platform}/${spanishSlug}`
    : canonicalUrl;

  const fullTitle = `${title} - Free ${platformName} Tool | KiviTools`;
  const fullDescription = `${description} Generate ${platformName} content with AI. 100% free, no signup required.`;

  const defaultKeywords = [
    toolName,
    `${platformName} ${toolName}`,
    `${platformName} tool`,
    `AI ${platformName}`,
    `free ${platformName} generator`,
    `${platformName} content creator`,
    "social media tools",
    "AI content generator",
  ];

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: "KiviTools", url: baseUrl }],
    creator: "KiviTools",
    publisher: "KiviTools",
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["es_ES"],
      url: canonicalUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: "KiviTools",
      images: [
        {
          url: `/og-${platform}.png`,
          width: 1200,
          height: 630,
          alt: `${platformName} ${toolName} - KiviTools`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [`/twitter-${platform}.png`],
      creator: "@kivitools",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "es-ES": spanishUrl,
      },
    },
    other: {
      "theme-color": platformColors[platform],
    },
  };
}

/**
 * Generate JSON-LD structured data for tool pages
 */
export function generateToolJsonLd({
  platform,
  toolName,
  title,
  description,
  englishSlug,
}: Omit<GenerateToolMetadataProps, "spanishSlug">) {
  const baseUrl = "https://kivitools.com";
  const platformName = platformNames[platform];
  const url = `${baseUrl}/${platform}/${englishSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${platformName} ${toolName}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: description,
    url: url,
    author: {
      "@type": "Organization",
      name: "KiviTools",
      url: baseUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "AI-powered content generation",
      "Free to use",
      "No signup required",
      "Multiple language support",
      "Instant results",
    ],
  };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd({
  platform,
  toolName,
  englishSlug,
}: {
  platform: Platform;
  toolName: string;
  englishSlug: string;
}) {
  const baseUrl = "https://kivitools.com";
  const platformName = platformNames[platform];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: platformName,
        item: `${baseUrl}/${platform}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolName,
        item: `${baseUrl}/${platform}/${englishSlug}`,
      },
    ],
  };
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Home JSON-LD
 */
export function generateHomeJsonLd() {
  const baseUrl = "https://kivitools.com";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KiviTools",
    url: baseUrl,
    description: "Free AI tools for content creators on TikTok, Instagram, YouTube, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "KiviTools",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}

/**
 * Generate Software Application JSON-LD for Home
 */
export function generateSoftwareAppJsonLd() {
  const baseUrl = "https://kivitools.com";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KiviTools",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Suite of free AI tools to generate viral content for social media platforms.",
    url: baseUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "5000",
      bestRating: "5",
      worstRating: "1",
    },
  };
}
