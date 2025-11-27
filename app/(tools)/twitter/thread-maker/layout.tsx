import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Thread Maker",
  title: "Twitter Thread Maker - Create Engaging Threads with AI",
  description:
    "Generate compelling Twitter threads with AI. Create multi-tweet stories that keep readers engaged. Free thread generator for Twitter/X.",
  englishSlug: "thread-maker",
  spanishSlug: "generador-de-hilos",
  keywords: [
    "twitter thread",
    "thread maker",
    "tweet thread",
    "x thread",
    "thread generator",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitter",
  toolName: "Thread Maker",
  title: "Thread Maker",
  description: "Generate compelling Twitter threads with AI. Create multi-tweet stories that keep readers engaged. Free thread generator for Twitter/X.",
  englishSlug: "thread-maker",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitter",
  toolName: "Thread Maker",
  englishSlug: "thread-maker",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Thread Maker",
  description: "Generate compelling Twitter threads with AI. Create multi-tweet stories that keep readers engaged. Free thread generator for Twitter/X.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your twitter content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your thread maker, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Thread Maker free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Thread Maker work?", answer: "Our AI analyzes your input and generates optimized twitter content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Thread Maker",
  url: "https://kivitools.com/twitter/thread-maker",
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
