import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Coins Calculator",
  title: "TikTok Coins Calculator - Convert Coins to Real Money",
  description:
    "Calculate TikTok coins value in real money. Convert coins to USD, EUR, and other currencies. Free TikTok coins converter.",
  englishSlug: "coins-calculator",
  spanishSlug: "calculadora-de-monedas",
  keywords: [
    "tiktok coins",
    "coins value",
    "coins to money",
    "tiktok gifts",
    "coins calculator",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Coins Calculator",
  title: "Coins Calculator",
  description: "Calculate TikTok coins value in real money. Convert coins to USD, EUR, and other currencies. Free TikTok coins converter.",
  englishSlug: "coins-calculator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Coins Calculator",
  englishSlug: "coins-calculator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Coins Calculator",
  description: "Calculate TikTok coins value in real money. Convert coins to USD, EUR, and other currencies. Free TikTok coins converter.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your tiktok content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your coins calculator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Coins Calculator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Coins Calculator work?", answer: "Our AI analyzes your input and generates optimized tiktok content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Coins Calculator",
  url: "https://kivitools.com/tiktok/coins-calculator",
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
