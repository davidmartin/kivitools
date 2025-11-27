import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Panel Description Generator",
  title: "Twitch Panel Description Generator - Professional Panels",
  description:
    "Generate professional Twitch panel descriptions with AI. Create About, Schedule, and Donation panel text. Free panel generator for streamers.",
  englishSlug: "panel-description",
  spanishSlug: "generador-de-descripciones-paneles",
  keywords: [
    "twitch panel",
    "panel description",
    "about panel",
    "twitch bio",
    "stream panels",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitch",
  toolName: "Panel Description Generator",
  title: "Panel Description Generator",
  description: "Generate professional Twitch panel descriptions with AI. Create About, Schedule, and Donation panel text. Free panel generator for streamers.",
  englishSlug: "panel-description",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitch",
  toolName: "Panel Description Generator",
  englishSlug: "panel-description",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Panel Description Generator",
  description: "Generate professional Twitch panel descriptions with AI. Create About, Schedule, and Donation panel text. Free panel generator for streamers.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your twitch content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your panel description generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Panel Description Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Panel Description Generator work?", answer: "Our AI analyzes your input and generates optimized twitch content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Panel Description Generator",
  url: "https://kivitools.com/twitch/panel-description",
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
