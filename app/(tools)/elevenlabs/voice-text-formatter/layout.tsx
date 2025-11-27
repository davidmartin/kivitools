import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "elevenlabs",
  toolName: "Voice Text Formatter",
  title: "ElevenLabs Voice Text Formatter - TTS Optimization",
  description: "Format text for optimal text-to-speech output with ElevenLabs. Better pronunciation and flow.",
  englishSlug: "voice-text-formatter",
  spanishSlug: "formateador-texto-voz",
  keywords: ["text formatter","tts formatting","elevenlabs"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "elevenlabs",
  toolName: "Voice Text Formatter",
  title: "ElevenLabs Voice Text Formatter",
  description: "Format text for optimal text-to-speech output with ElevenLabs. Better pronunciation and flow.",
  englishSlug: "voice-text-formatter",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "elevenlabs",
  toolName: "Voice Text Formatter",
  englishSlug: "voice-text-formatter",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "ElevenLabs Voice Text Formatter",
  description: "Format text for optimal text-to-speech output with ElevenLabs. Better pronunciation and flow.",
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
      "description": "Click generate to get your AI-powered voice text formatter. Copy and use it on elevenlabs."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the elevenlabs Voice Text Formatter free?",
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
  pageName: "ElevenLabs Voice Text Formatter",
  url: "https://kivitools.com/elevenlabs/voice-text-formatter",
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
