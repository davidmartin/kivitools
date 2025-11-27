import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Community Post Generator",
  title: "YouTube Community Post Generator - Engage Your Audience",
  description: "Create engaging YouTube community posts with AI. Keep your audience engaged between videos.",
  englishSlug: "community-post-generator",
  spanishSlug: "generador-posts-comunidad",
  keywords: ["youtube community","community post","youtube engagement"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "youtube",
  toolName: "Community Post Generator",
  title: "YouTube Community Post Generator",
  description: "Create engaging YouTube community posts with AI. Keep your audience engaged between videos.",
  englishSlug: "community-post-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "Community Post Generator",
  englishSlug: "community-post-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "YouTube Community Post Generator",
  description: "Create engaging YouTube community posts with AI. Keep your audience engaged between videos.",
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
      "description": "Click generate to get your AI-powered community post generator. Copy and use it on youtube."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the youtube Community Post Generator free?",
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
  pageName: "YouTube Community Post Generator",
  url: "https://kivitools.com/youtube/community-post-generator",
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
