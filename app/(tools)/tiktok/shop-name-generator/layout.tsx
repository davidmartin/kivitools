import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Shop Name Generator",
  title: "TikTok Shop Name Generator - Business Name Ideas",
  description:
    "Generate catchy TikTok Shop names with AI. Find the perfect business name for your TikTok store. Free shop name generator.",
  englishSlug: "shop-name-generator",
  spanishSlug: "generador-de-nombres-de-tienda",
  keywords: [
    "tiktok shop",
    "shop name",
    "business name",
    "store name generator",
    "tiktok business",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Shop Name Generator",
  title: "Shop Name Generator",
  description: "Generate catchy TikTok Shop names with AI. Find the perfect business name for your TikTok store. Free shop name generator.",
  englishSlug: "shop-name-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Shop Name Generator",
  englishSlug: "shop-name-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Shop Name Generator",
  description: "Generate catchy TikTok Shop names with AI. Find the perfect business name for your TikTok store. Free shop name generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your tiktok content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your shop name generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Shop Name Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Shop Name Generator work?", answer: "Our AI analyzes your input and generates optimized tiktok content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Shop Name Generator",
  url: "https://kivitools.com/tiktok/shop-name-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      {children}
    </>
  );
}
