import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Thumbnail Text Generator",
  title: "TikTok Thumbnail Text Generator - Eye-Catching Covers",
  description: "Generate compelling thumbnail text for TikTok videos. Increase click-through rates.",
  englishSlug: "thumbnail-text-generator",
  spanishSlug: "generador-texto-miniatura",
  keywords: ["tiktok thumbnail","cover text","video thumbnail"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Thumbnail Text Generator",
  title: "TikTok Thumbnail Text Generator",
  description: "Generate compelling thumbnail text for TikTok videos. Increase click-through rates.",
  englishSlug: "thumbnail-text-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Thumbnail Text Generator",
  englishSlug: "thumbnail-text-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "TikTok Thumbnail Text Generator",
  description: "Generate compelling thumbnail text for TikTok videos. Increase click-through rates.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your tiktok content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered thumbnail text generator. Copy and use it on tiktok."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the tiktok Thumbnail Text Generator free?",
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
  pageName: "TikTok Thumbnail Text Generator",
  url: "https://kivitools.com/tiktok/thumbnail-text-generator",
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
