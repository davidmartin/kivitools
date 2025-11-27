import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Description Generator",
  title: "YouTube Description Generator - SEO Video Descriptions",
  description:
    "Generate SEO-optimized YouTube descriptions with AI. Create descriptions with keywords and timestamps. Free description generator.",
  englishSlug: "description-generator",
  spanishSlug: "generador-de-descripciones",
  keywords: [
    "youtube description",
    "video description",
    "seo description",
    "youtube seo",
    "description template",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "youtube",
  toolName: "Description Generator",
  title: "Description Generator",
  description: "Generate SEO-optimized YouTube descriptions with AI. Create descriptions with keywords and timestamps. Free description generator.",
  englishSlug: "description-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "Description Generator",
  englishSlug: "description-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Description Generator",
  description: "Generate SEO-optimized YouTube descriptions with AI. Create descriptions with keywords and timestamps. Free description generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your youtube content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your description generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Description Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Description Generator work?", answer: "Our AI analyzes your input and generates optimized youtube content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Description Generator",
  url: "https://kivitools.com/youtube/description-generator",
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
