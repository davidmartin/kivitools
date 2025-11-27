import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "forocoches",
  toolName: "Pole Generator",
  title: "Forocoches Pole Generator - Consigue el Pole",
  description: "Genera respuestas perfectas para conseguir el pole en Forocoches. Sé el primero en responder.",
  englishSlug: "pole-generator",
  spanishSlug: "generador-pole",
  keywords: ["forocoches","pole","foro"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "forocoches",
  toolName: "Pole Generator",
  title: "Forocoches Pole Generator",
  description: "Genera respuestas perfectas para conseguir el pole en Forocoches. Sé el primero en responder.",
  englishSlug: "pole-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "forocoches",
  toolName: "Pole Generator",
  englishSlug: "pole-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Forocoches Pole Generator",
  description: "Genera respuestas perfectas para conseguir el pole en Forocoches. Sé el primero en responder.",
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
      "description": "Click generate to get your AI-powered pole generator. Copy and use it on forocoches."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the forocoches Pole Generator free?",
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
  pageName: "Forocoches Pole Generator",
  url: "https://kivitools.com/forocoches/pole-generator",
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
