import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "pinterest",
  toolName: "Pin Description Generator",
  title: "Pinterest Pin Description Generator - SEO Optimized Pins",
  description: "Create engaging Pinterest pin descriptions with AI. Optimized for search and engagement.",
  englishSlug: "pin-description",
  spanishSlug: "descripcion-pin",
  keywords: ["pinterest description","pin seo","pinterest marketing"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "pinterest",
  toolName: "Pin Description Generator",
  title: "Pinterest Pin Description Generator",
  description: "Create engaging Pinterest pin descriptions with AI. Optimized for search and engagement.",
  englishSlug: "pin-description",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "pinterest",
  toolName: "Pin Description Generator",
  englishSlug: "pin-description",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Pinterest Pin Description Generator",
  description: "Create engaging Pinterest pin descriptions with AI. Optimized for search and engagement.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your pinterest content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered pin description generator. Copy and use it on pinterest."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the pinterest Pin Description Generator free?",
      "answer": "Yes, completely free with no signup required. Generate unlimited content."
    },
    {
      "question": "What languages are supported?",
      "answer": "We support English, Spanish, Portuguese, French, German, and Italian."
    },
    {
      "question": "How does the AI generate content?",
      "answer": "Our AI analyzes your input and generates optimized content based on best practices and trends."
    },
    {
      "question": "Can I customize the output?",
      "answer": "Yes! You can select different tones, styles, and options to match your needs."
    },
    {
      "question": "Will my content be unique?",
      "answer": "Yes, each generation is unique and tailored to your specific input."
    }
  ], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Pinterest Pin Description Generator",
  url: "https://kivitools.com/pinterest/pin-description",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      {children}
    </>
  );
}
