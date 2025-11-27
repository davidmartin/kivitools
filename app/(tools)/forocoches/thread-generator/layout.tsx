import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "forocoches",
  toolName: "Thread Generator",
  title: "Forocoches Thread Generator - Hilos Virales",
  description: "Genera hilos épicos para Forocoches. Crea contenido que se vuelva viral en el foro.",
  englishSlug: "thread-generator",
  spanishSlug: "generador-hilos",
  keywords: ["forocoches hilos","thread","foro español"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "forocoches",
  toolName: "Thread Generator",
  title: "Forocoches Thread Generator",
  description: "Genera hilos épicos para Forocoches. Crea contenido que se vuelva viral en el foro.",
  englishSlug: "thread-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "forocoches",
  toolName: "Thread Generator",
  englishSlug: "thread-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Forocoches Thread Generator",
  description: "Genera hilos épicos para Forocoches. Crea contenido que se vuelva viral en el foro.",
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
      "description": "Click generate to get your AI-powered thread generator. Copy and use it on forocoches."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the forocoches Thread Generator free?",
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
  pageName: "Forocoches Thread Generator",
  url: "https://kivitools.com/forocoches/thread-generator",
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
