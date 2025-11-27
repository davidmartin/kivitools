import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Reel Script Generator",
  title: "Instagram Reel Script Generator - Viral Reel Scripts",
  description:
    "Create viral Instagram Reel scripts with AI. Generate engaging scripts for short videos. Free script generator for Instagram Reels.",
  englishSlug: "reel-script",
  spanishSlug: "generador-de-scripts-reels",
  keywords: [
    "instagram reels",
    "reel script",
    "viral reels",
    "reels ideas",
    "short video script",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "instagram",
  toolName: "Reel Script Generator",
  title: "Reel Script Generator",
  description: "Create viral Instagram Reel scripts with AI. Generate engaging scripts for short videos. Free script generator for Instagram Reels.",
  englishSlug: "reel-script",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Reel Script Generator",
  englishSlug: "reel-script",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Reel Script Generator",
  description: "Create viral Instagram Reel scripts with AI. Generate engaging scripts for short videos. Free script generator for Instagram Reels.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your instagram content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your reel script generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Reel Script Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Reel Script Generator work?", answer: "Our AI analyzes your input and generates optimized instagram content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Reel Script Generator",
  url: "https://kivitools.com/instagram/reel-script",
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
