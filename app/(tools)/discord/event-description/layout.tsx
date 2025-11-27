import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Event Description Generator",
  title: "Discord Event Description Generator - Create Event Details",
  description:
    "Generate compelling Discord event descriptions with AI. Create detailed event info that attracts participants. Free event description generator.",
  englishSlug: "event-description",
  spanishSlug: "generador-de-descripciones-eventos",
  keywords: [
    "discord event",
    "event description",
    "server event",
    "discord activity",
    "event details",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "discord",
  toolName: "Event Description Generator",
  title: "Event Description Generator",
  description: "Generate compelling Discord event descriptions with AI. Create detailed event info that attracts participants. Free event description generator.",
  englishSlug: "event-description",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "discord",
  toolName: "Event Description Generator",
  englishSlug: "event-description",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Event Description Generator",
  description: "Generate compelling Discord event descriptions with AI. Create detailed event info that attracts participants. Free event description generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your discord content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your event description generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Event Description Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Event Description Generator work?", answer: "Our AI analyzes your input and generates optimized discord content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Event Description Generator",
  url: "https://kivitools.com/discord/event-description",
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
