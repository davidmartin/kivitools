import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "elevenlabs",
  toolName: "Audiobook Optimizer",
  title: "ElevenLabs Audiobook Optimizer - Text to Speech Ready",
  description: "Optimize text for audiobook narration with ElevenLabs. Perfect formatting for AI voice.",
  englishSlug: "audiobook-optimizer",
  spanishSlug: "optimizador-audiolibro",
  keywords: ["audiobook","elevenlabs audiobook","tts optimization"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "elevenlabs",
  toolName: "Audiobook Optimizer",
  title: "ElevenLabs Audiobook Optimizer",
  description: "Optimize text for audiobook narration with ElevenLabs. Perfect formatting for AI voice.",
  englishSlug: "audiobook-optimizer",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "elevenlabs",
  toolName: "Audiobook Optimizer",
  englishSlug: "audiobook-optimizer",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "ElevenLabs Audiobook Optimizer",
  description: "Optimize text for audiobook narration with ElevenLabs. Perfect formatting for AI voice.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your elevenlabs content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered audiobook optimizer. Copy and use it on elevenlabs."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the elevenlabs Audiobook Optimizer free?",
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
  pageName: "ElevenLabs Audiobook Optimizer",
  url: "https://kivitools.com/elevenlabs/audiobook-optimizer",
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
