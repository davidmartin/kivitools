import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "snapchat",
  toolName: "Lens Ideas Generator",
  title: "Snapchat Lens Ideas Generator - Creative AR Filter Concepts",
  description:
    "Generate innovative Snapchat Lens ideas with AI. Create unique AR filter concepts for your brand. Free lens ideas generator.",
  englishSlug: "lens-ideas",
  spanishSlug: "generador-de-ideas-lentes",
  keywords: [
    "snapchat lens",
    "ar filter",
    "lens ideas",
    "snapchat filter",
    "ar concepts",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "snapchat",
  toolName: "Lens Ideas Generator",
  title: "Lens Ideas Generator",
  description: "Generate innovative Snapchat Lens ideas with AI. Create unique AR filter concepts for your brand. Free lens ideas generator.",
  englishSlug: "lens-ideas",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "snapchat",
  toolName: "Lens Ideas Generator",
  englishSlug: "lens-ideas",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Lens Ideas Generator",
  description: "Generate innovative Snapchat Lens ideas with AI. Create unique AR filter concepts for your brand. Free lens ideas generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your snapchat content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your lens ideas generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Lens Ideas Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Lens Ideas Generator work?", answer: "Our AI analyzes your input and generates optimized snapchat content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Lens Ideas Generator",
  url: "https://kivitools.com/snapchat/lens-ideas",
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
