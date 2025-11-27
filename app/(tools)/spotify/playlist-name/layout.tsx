import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "spotify",
  toolName: "Playlist Name Generator",
  title: "Spotify Playlist Name Generator - Creative Playlist Names",
  description: "Generate creative Spotify playlist names with AI. Stand out with unique playlist titles.",
  englishSlug: "playlist-name",
  spanishSlug: "nombre-playlist",
  keywords: ["spotify playlist","playlist name","spotify curator"],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "spotify",
  toolName: "Playlist Name Generator",
  title: "Spotify Playlist Name Generator",
  description: "Generate creative Spotify playlist names with AI. Stand out with unique playlist titles.",
  englishSlug: "playlist-name",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "spotify",
  toolName: "Playlist Name Generator",
  englishSlug: "playlist-name",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Spotify Playlist Name Generator",
  description: "Generate creative Spotify playlist names with AI. Stand out with unique playlist titles.",
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
      "description": "Click generate to get your AI-powered playlist name generator. Copy and use it on spotify."
    }
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
    {
      "question": "Is the spotify Playlist Name Generator free?",
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
  pageName: "Spotify Playlist Name Generator",
  url: "https://kivitools.com/spotify/playlist-name",
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
