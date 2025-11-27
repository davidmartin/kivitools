import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "snapchat",
  toolName: "Story Ideas Generator",
  title: "Snapchat Story Ideas Generator - Creative Story Concepts",
  description:
    "Generate creative Snapchat Story ideas with AI. Get unique concepts to engage your audience. Free story ideas generator for Snapchat.",
  englishSlug: "story-ideas",
  spanishSlug: "generador-de-ideas-historias",
  keywords: [
    "snapchat story",
    "story ideas",
    "snap ideas",
    "snapchat content",
    "story concepts",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "snapchat",
  toolName: "Story Ideas Generator",
  title: "Story Ideas Generator",
  description: "Generate creative Snapchat Story ideas with AI. Get unique concepts to engage your audience. Free story ideas generator for Snapchat.",
  englishSlug: "story-ideas",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "snapchat",
  toolName: "Story Ideas Generator",
  englishSlug: "story-ideas",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Story Ideas Generator",
  description: "Generate creative Snapchat Story ideas with AI. Get unique concepts to engage your audience. Free story ideas generator for Snapchat.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your snapchat content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your story ideas generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Story Ideas Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Story Ideas Generator work?", answer: "Our AI analyzes your input and generates optimized snapchat content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Story Ideas Generator",
  url: "https://kivitools.com/snapchat/story-ideas",
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
