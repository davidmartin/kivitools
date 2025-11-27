import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Money Calculator",
  title: "TikTok Money Calculator - Estimate Your Earnings",
  description:
    "Calculate how much you can earn on TikTok. Estimate earnings from views, followers, and engagement. Free TikTok revenue calculator.",
  englishSlug: "money-calculator",
  spanishSlug: "calculadora-de-ingresos",
  keywords: [
    "tiktok money",
    "tiktok earnings",
    "creator fund",
    "tiktok revenue",
    "how much tiktok pay",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Money Calculator",
  title: "Money Calculator",
  description: "Calculate how much you can earn on TikTok. Estimate earnings from views, followers, and engagement. Free TikTok revenue calculator.",
  englishSlug: "money-calculator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Money Calculator",
  englishSlug: "money-calculator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Money Calculator",
  description: "Calculate how much you can earn on TikTok. Estimate earnings from views, followers, and engagement. Free TikTok revenue calculator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your tiktok content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your money calculator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Money Calculator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Money Calculator work?", answer: "Our AI analyzes your input and generates optimized tiktok content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Money Calculator",
  url: "https://kivitools.com/tiktok/money-calculator",
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
