import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Tag Generator",
  title: "YouTube Tag Generator - SEO Optimized Tags",
  description: "Generate SEO-optimized YouTube tags with AI. Improve video discoverability and rankings.",
  englishSlug: "tag-generator",
  spanishSlug: "generador-etiquetas",
  keywords: ["youtube tags","video seo","youtube optimization"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "youtube",
  toolName: "Tag Generator",
  title: "YouTube Tag Generator",
  description: "Generate SEO-optimized YouTube tags with AI. Improve video discoverability and rankings.",
  englishSlug: "tag-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "Tag Generator",
  englishSlug: "tag-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "YouTube Tag Generator",
  description: "Generate SEO-optimized YouTube tags with AI. Improve video discoverability and rankings.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your youtube content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered tag generator. Copy and use it on youtube."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the youtube Tag Generator free?",
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
  pageName: "YouTube Tag Generator",
  url: "https://kivitools.com/youtube/tag-generator",
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
