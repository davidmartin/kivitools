import { Metadata } from "next";
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

const toolConfig = {
  platform: "podcast" as const,
  toolName: "Podcast Name Generator",
  title: "Podcast Name Generator - Create Catchy Show Names",
  description: "Generate memorable podcast names that listeners will remember. Our AI creates catchy, SEO-friendly names for your show in seconds.",
  englishSlug: "name-generator",
  spanishSlug: "generador-nombres",
  keywords: ["podcast name generator", "show name ideas", "podcast naming", "podcast branding", "podcast title generator"],
};

export const metadata: Metadata = generateToolMetadata(toolConfig);

export default function PodcastNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const toolJsonLd = generateToolJsonLd(toolConfig);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(toolConfig);
  const faqJsonLd = generateFaqJsonLd([
    { question: "How do I choose a good podcast name?", answer: "A good podcast name should be memorable, easy to spell, descriptive of your content, and unique enough to stand out. Our generator considers all these factors." },
    { question: "Should my podcast name include the topic?", answer: "It depends! Including your topic helps with discoverability, but creative names can build stronger brands. We generate both types." },
    { question: "How long should a podcast name be?", answer: "Ideally 1-4 words. Shorter names are easier to remember and look better on podcast apps and social media." },
    { question: "Can I use these names commercially?", answer: "Yes! Generated names are yours to use. We recommend checking trademark availability before finalizing." },
    { question: "What makes a podcast name searchable?", answer: "Names that include relevant keywords, are properly spelled, and aren't overly generic perform best in podcast directory searches." },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
