import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Engagement Calculator",
  title: "TikTok Engagement Rate Calculator - Analyze Your Performance",
  description:
    "Calculate your TikTok engagement rate instantly. Analyze likes, comments, shares. Free engagement calculator for creators and brands.",
  englishSlug: "engagement-calculator",
  spanishSlug: "calculadora-de-engagement",
  keywords: [
    "tiktok engagement",
    "engagement rate",
    "tiktok analytics",
    "engagement calculator",
    "tiktok stats",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Engagement Calculator",
  title: "Engagement Calculator",
  description: "Calculate your TikTok engagement rate instantly. Analyze likes, comments, shares. Free engagement calculator for creators and brands.",
  englishSlug: "engagement-calculator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Engagement Calculator",
  englishSlug: "engagement-calculator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Engagement Calculator",
  description: "Calculate your TikTok engagement rate instantly. Analyze likes, comments, shares. Free engagement calculator for creators and brands.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your tiktok content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your engagement calculator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Engagement Calculator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Engagement Calculator work?", answer: "Our AI analyzes your input and generates optimized tiktok content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Engagement Calculator",
  url: "https://kivitools.com/tiktok/engagement-calculator",
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
