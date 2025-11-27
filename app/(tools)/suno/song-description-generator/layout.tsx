import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "suno",
  toolName: "Song Description Generator",
  title: "Suno Song Description Generator - Describe Your Music",
  description: "Generate song descriptions for Suno AI. Better descriptions, better music.",
  englishSlug: "song-description-generator",
  spanishSlug: "generador-descripcion-cancion",
  keywords: ["suno description","song description","ai music"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "suno",
  toolName: "Song Description Generator",
  title: "Suno Song Description Generator",
  description: "Generate song descriptions for Suno AI. Better descriptions, better music.",
  englishSlug: "song-description-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "suno",
  toolName: "Song Description Generator",
  englishSlug: "song-description-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Suno Song Description Generator",
  description: "Generate song descriptions for Suno AI. Better descriptions, better music.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your suno content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered song description generator. Copy and use it on suno."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the suno Song Description Generator free?",
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
  pageName: "Suno Song Description Generator",
  url: "https://kivitools.com/suno/song-description-generator",
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
