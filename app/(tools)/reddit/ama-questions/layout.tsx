import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "reddit",
  toolName: "AMA Questions Generator",
  title: "Reddit AMA Questions Generator - Best AMA Questions",
  description:
    "Generate interesting AMA questions with AI. Create thought-provoking questions for Ask Me Anything threads. Free AMA question generator.",
  englishSlug: "ama-questions",
  spanishSlug: "generador-de-preguntas-ama",
  keywords: [
    "reddit ama",
    "ama questions",
    "ask me anything",
    "ama ideas",
    "question generator",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "reddit",
  toolName: "AMA Questions Generator",
  title: "AMA Questions Generator",
  description: "Generate interesting AMA questions with AI. Create thought-provoking questions for Ask Me Anything threads. Free AMA question generator.",
  englishSlug: "ama-questions",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "reddit",
  toolName: "AMA Questions Generator",
  englishSlug: "ama-questions",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "AMA Questions Generator",
  description: "Generate interesting AMA questions with AI. Create thought-provoking questions for Ask Me Anything threads. Free AMA question generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your reddit content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your ama questions generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the AMA Questions Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the AMA Questions Generator work?", answer: "Our AI analyzes your input and generates optimized reddit content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "AMA Questions Generator",
  url: "https://kivitools.com/reddit/ama-questions",
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
