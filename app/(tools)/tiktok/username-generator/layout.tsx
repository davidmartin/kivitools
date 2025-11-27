import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Username Generator",
  title: "TikTok Username Generator - Find Your Perfect Handle",
  description:
    "Generate unique TikTok usernames instantly with AI. Find creative, available handles for your brand. Free username ideas generator.",
  englishSlug: "username-generator",
  spanishSlug: "generador-de-nombres",
  keywords: [
    "tiktok username",
    "username ideas",
    "handle generator",
    "tiktok name",
    "creative usernames",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Username Generator",
  title: "Username Generator",
  description: "Generate unique TikTok usernames instantly with AI. Find creative, available handles for your brand. Free username ideas generator.",
  englishSlug: "username-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Username Generator",
  englishSlug: "username-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Username Generator",
  description: "Generate unique TikTok usernames instantly with AI. Find creative, available handles for your brand. Free username ideas generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your tiktok content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your username generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Username Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Username Generator work?", answer: "Our AI analyzes your input and generates optimized tiktok content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Username Generator",
  url: "https://kivitools.com/tiktok/username-generator",
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
