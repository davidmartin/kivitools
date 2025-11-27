import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "spotify",
  toolName: "Artist Bio Generator",
  title: "Spotify Artist Bio Generator - Professional Artist Bios",
  description: "Generate professional Spotify artist bios with AI. Perfect for musicians and bands.",
  englishSlug: "artist-bio",
  spanishSlug: "bio-artista",
  keywords: ["spotify bio","artist bio","musician bio"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "spotify",
  toolName: "Artist Bio Generator",
  title: "Spotify Artist Bio Generator",
  description: "Generate professional Spotify artist bios with AI. Perfect for musicians and bands.",
  englishSlug: "artist-bio",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "spotify",
  toolName: "Artist Bio Generator",
  englishSlug: "artist-bio",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Spotify Artist Bio Generator",
  description: "Generate professional Spotify artist bios with AI. Perfect for musicians and bands.",
  steps: [
    {
      "title": "Enter Your Details",
      "description": "Provide the necessary information about your spotify content or product."
    },
    {
      "title": "Customize Options",
      "description": "Select your preferred tone, style, and language for the generated content."
    },
    {
      "title": "Generate and Use",
      "description": "Click generate to get your AI-powered artist bio generator. Copy and use it on spotify."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the spotify Artist Bio Generator free?",
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
  pageName: "Spotify Artist Bio Generator",
  url: "https://kivitools.com/spotify/artist-bio",
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
