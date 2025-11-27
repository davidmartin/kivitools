import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Story Ideas Generator",
  title: "Instagram Story Ideas Generator - Creative Story Content",
  description: "Generate creative Instagram story ideas with AI. Keep your audience engaged.",
  englishSlug: "story-ideas",
  spanishSlug: "ideas-historias",
  keywords: ["instagram stories","story ideas","instagram content"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "instagram",
  toolName: "Story Ideas Generator",
  title: "Instagram Story Ideas Generator",
  description: "Generate creative Instagram story ideas with AI. Keep your audience engaged.",
  englishSlug: "story-ideas",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Story Ideas Generator",
  englishSlug: "story-ideas",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Instagram Story Ideas Generator",
  description: "Generate creative Instagram story ideas with AI. Keep your audience engaged.",
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
      "description": "Click generate to get your AI-powered story ideas generator. Copy and use it on instagram."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the instagram Story Ideas Generator free?",
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
  pageName: "Instagram Story Ideas Generator",
  url: "https://kivitools.com/instagram/story-ideas",
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
