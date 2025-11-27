import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Script Generator",
  title: "YouTube Script Generator - Create Video Scripts with AI",
  description:
    "Generate engaging YouTube scripts with AI. Create structured video scripts with intro, body, and outro. Free script generator for YouTubers.",
  englishSlug: "script-generator",
  spanishSlug: "generador-de-scripts",
  keywords: [
    "youtube script",
    "video script",
    "script writer",
    "youtube content",
    "script template",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "youtube",
  toolName: "Script Generator",
  title: "Script Generator",
  description: "Generate engaging YouTube scripts with AI. Create structured video scripts with intro, body, and outro. Free script generator for YouTubers.",
  englishSlug: "script-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "Script Generator",
  englishSlug: "script-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Script Generator",
  description: "Generate engaging YouTube scripts with AI. Create structured video scripts with intro, body, and outro. Free script generator for YouTubers.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your youtube content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your script generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Script Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Script Generator work?", answer: "Our AI analyzes your input and generates optimized youtube content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Script Generator",
  url: "https://kivitools.com/youtube/script-generator",
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
