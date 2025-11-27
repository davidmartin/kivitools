import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "amazon",
  toolName: "Product Review Generator",
  title: "Amazon Product Review Generator - Create Authentic Reviews",
  description: "Generate authentic-sounding product reviews for Amazon. AI-powered review creation for better product listings.",
  englishSlug: "product-review-generator",
  spanishSlug: "generador-resenas-productos",
  keywords: ["amazon reviews","product review generator","amazon seller"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "amazon",
  toolName: "Product Review Generator",
  title: "Amazon Product Review Generator",
  description: "Generate authentic-sounding product reviews for Amazon. AI-powered review creation for better product listings.",
  englishSlug: "product-review-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "amazon",
  toolName: "Product Review Generator",
  englishSlug: "product-review-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Amazon Product Review Generator",
  description: "Generate authentic-sounding product reviews for Amazon. AI-powered review creation for better product listings.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your amazon content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered product review generator. Copy and use it on amazon."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the amazon Product Review Generator free?",
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
  pageName: "Amazon Product Review Generator",
  url: "https://kivitools.com/amazon/product-review-generator",
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
