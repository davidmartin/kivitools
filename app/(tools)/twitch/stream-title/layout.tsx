import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Stream Title Generator",
  title: "Twitch Stream Title Generator - Catchy Stream Titles",
  description:
    "Generate catchy Twitch stream titles with AI. Create titles that attract viewers and boost discoverability. Free title generator for streamers.",
  englishSlug: "stream-title",
  spanishSlug: "generador-de-titulos-stream",
  keywords: [
    "twitch title",
    "stream title",
    "twitch stream",
    "stream name",
    "title ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitch",
  toolName: "Stream Title Generator",
  title: "Stream Title Generator",
  description: "Generate catchy Twitch stream titles with AI. Create titles that attract viewers and boost discoverability. Free title generator for streamers.",
  englishSlug: "stream-title",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitch",
  toolName: "Stream Title Generator",
  englishSlug: "stream-title",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Stream Title Generator",
  description: "Generate catchy Twitch stream titles with AI. Create titles that attract viewers and boost discoverability. Free title generator for streamers.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your twitch content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your stream title generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Stream Title Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Stream Title Generator work?", answer: "Our AI analyzes your input and generates optimized twitch content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Stream Title Generator",
  url: "https://kivitools.com/twitch/stream-title",
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
