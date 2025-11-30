import { Metadata } from "next";
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Engagement Calculator",
  title: "Instagram Engagement Rate Calculator",
  description: "Calculate your Instagram engagement rate instantly. Enter your followers, likes, and comments to get your engagement percentage and performance rating.",
  englishSlug: "engagement-calculator",
  spanishSlug: "calculadora-engagement",
  keywords: [
    "instagram engagement rate",
    "instagram calculator",
    "engagement rate calculator",
    "instagram analytics",
    "social media engagement",
    "calculadora engagement instagram",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolJsonLd = generateToolJsonLd({
    platform: "instagram",
    toolName: "Engagement Calculator",
    title: "Instagram Engagement Rate Calculator",
    description: "Calculate your Instagram engagement rate instantly with our free calculator.",
    englishSlug: "engagement-calculator",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd({
    platform: "instagram",
    toolName: "Engagement Calculator",
    englishSlug: "engagement-calculator",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
