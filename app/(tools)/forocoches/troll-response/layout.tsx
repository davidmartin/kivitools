import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "forocoches",
  toolName: "Troll Response Generator",
  title: "Forocoches Troll Response Generator - Respuestas Épicas",
  description: "Genera respuestas ingeniosas para trollear en Forocoches. Humor forero garantizado.",
  englishSlug: "troll-response",
  spanishSlug: "respuesta-troll",
  keywords: ["forocoches troll","respuestas","humor forero"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "forocoches",
  toolName: "Troll Response Generator",
  title: "Forocoches Troll Response Generator",
  description: "Genera respuestas ingeniosas para trollear en Forocoches. Humor forero garantizado.",
  englishSlug: "troll-response",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "forocoches",
  toolName: "Troll Response Generator",
  englishSlug: "troll-response",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Forocoches Troll Response Generator",
  description: "Genera respuestas ingeniosas para trollear en Forocoches. Humor forero garantizado.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your forocoches content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered troll response generator. Copy and use it on forocoches."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the forocoches Troll Response Generator free?",
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
  pageName: "Forocoches Troll Response Generator",
  url: "https://kivitools.com/forocoches/troll-response",
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
