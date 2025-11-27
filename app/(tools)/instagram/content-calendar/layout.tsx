import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Content Calendar Generator",
  title: "Instagram Content Calendar Generator - Plan Your Posts",
  description: "Generate a content calendar for Instagram. Plan your posts for maximum engagement.",
  englishSlug: "content-calendar",
  spanishSlug: "calendario-contenido",
  keywords: ["content calendar","instagram planning","content strategy"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "instagram",
  toolName: "Content Calendar Generator",
  title: "Instagram Content Calendar Generator",
  description: "Generate a content calendar for Instagram. Plan your posts for maximum engagement.",
  englishSlug: "content-calendar",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Content Calendar Generator",
  englishSlug: "content-calendar",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Instagram Content Calendar Generator",
  description: "Generate a content calendar for Instagram. Plan your posts for maximum engagement.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your instagram content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered content calendar generator. Copy and use it on instagram."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the instagram Content Calendar Generator free?",
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
  pageName: "Instagram Content Calendar Generator",
  url: "https://kivitools.com/instagram/content-calendar",
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
