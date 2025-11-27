import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Stream Plan Generator",
  title: "Twitch Stream Plan Generator - Plan Your Streams",
  description: "Generate stream plans and schedules for Twitch. Organize your content strategy.",
  englishSlug: "stream-plan-generator",
  spanishSlug: "generador-plan-stream",
  keywords: ["stream plan","twitch schedule","content planning"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "twitch",
  toolName: "Stream Plan Generator",
  title: "Twitch Stream Plan Generator",
  description: "Generate stream plans and schedules for Twitch. Organize your content strategy.",
  englishSlug: "stream-plan-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitch",
  toolName: "Stream Plan Generator",
  englishSlug: "stream-plan-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Twitch Stream Plan Generator",
  description: "Generate stream plans and schedules for Twitch. Organize your content strategy.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your twitch content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered stream plan generator. Copy and use it on twitch."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the twitch Stream Plan Generator free?",
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
  pageName: "Twitch Stream Plan Generator",
  url: "https://kivitools.com/twitch/stream-plan-generator",
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
