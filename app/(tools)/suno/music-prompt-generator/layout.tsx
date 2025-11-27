import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "suno",
  toolName: "Music Prompt Generator",
  title: "Suno Music Prompt Generator - AI Music Prompts",
  description: "Generate creative prompts for Suno AI music generation. Create unique songs.",
  englishSlug: "music-prompt-generator",
  spanishSlug: "generador-prompts-musica",
  keywords: ["suno prompts","ai music","music generation"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "suno",
  toolName: "Music Prompt Generator",
  title: "Suno Music Prompt Generator",
  description: "Generate creative prompts for Suno AI music generation. Create unique songs.",
  englishSlug: "music-prompt-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "suno",
  toolName: "Music Prompt Generator",
  englishSlug: "music-prompt-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Suno Music Prompt Generator",
  description: "Generate creative prompts for Suno AI music generation. Create unique songs.",
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
      "description": "Click generate to get your AI-powered music prompt generator. Copy and use it on suno."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the suno Music Prompt Generator free?",
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
  pageName: "Suno Music Prompt Generator",
  url: "https://kivitools.com/suno/music-prompt-generator",
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
