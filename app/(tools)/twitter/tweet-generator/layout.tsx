import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Tweet Generator",
  title: "Twitter Tweet Generator - Create Viral Tweets with AI",
  description:
    "Generate engaging tweets with AI. Create viral-worthy content in seconds. Free tweet generator for Twitter/X creators.",
  englishSlug: "tweet-generator",
  spanishSlug: "generador-de-tweets",
  keywords: [
    "twitter tweet",
    "tweet generator",
    "viral tweet",
    "x post",
    "tweet ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitter",
  toolName: "Tweet Generator",
  title: "Tweet Generator",
  description: "Generate engaging tweets with AI. Create viral-worthy content in seconds. Free tweet generator for Twitter/X creators.",
  englishSlug: "tweet-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitter",
  toolName: "Tweet Generator",
  englishSlug: "tweet-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Tweet Generator",
  description: "Generate engaging tweets with AI. Create viral-worthy content in seconds. Free tweet generator for Twitter/X creators.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your twitter content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your tweet generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Tweet Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Tweet Generator work?", answer: "Our AI analyzes your input and generates optimized twitter content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Tweet Generator",
  url: "https://kivitools.com/twitter/tweet-generator",
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
