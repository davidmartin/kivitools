import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "pinterest",
  toolName: "Profile Bio Generator",
  title: "Pinterest Profile Bio Generator - Create Engaging Bios",
  description: "Generate creative Pinterest profile bios with AI. Stand out and attract more followers.",
  englishSlug: "profile-bio",
  spanishSlug: "bio-perfil",
  keywords: ["pinterest bio","profile bio","pinterest marketing"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "pinterest",
  toolName: "Profile Bio Generator",
  title: "Pinterest Profile Bio Generator",
  description: "Generate creative Pinterest profile bios with AI. Stand out and attract more followers.",
  englishSlug: "profile-bio",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "pinterest",
  toolName: "Profile Bio Generator",
  englishSlug: "profile-bio",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Pinterest Profile Bio Generator",
  description: "Generate creative Pinterest profile bios with AI. Stand out and attract more followers.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your pinterest content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered profile bio generator. Copy and use it on pinterest."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the pinterest Profile Bio Generator free?",
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
  pageName: "Pinterest Profile Bio Generator",
  url: "https://kivitools.com/pinterest/profile-bio",
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
