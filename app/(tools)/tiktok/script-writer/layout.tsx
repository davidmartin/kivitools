import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Script Writer",
  title: "TikTok Script Writer - Generate Viral Scripts with AI",
  description:
    "Create engaging TikTok scripts in seconds with AI. Choose your tone, duration, and language. Free viral content generator for TikTok creators.",
  englishSlug: "script-writer",
  spanishSlug: "escritor-de-guiones",
  keywords: [
    "tiktok script",
    "ai script writer",
    "viral tiktok",
    "content generator",
    "tiktok creator",
  ],
});

// Generate JSON-LD structured data for AEO
const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Script Writer",
  title: "TikTok Script Writer",
  description: "Create engaging TikTok scripts in seconds with AI. Choose your tone, duration, and language. Free viral content generator for TikTok creators.",
  englishSlug: "script-writer",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Script Writer",
  englishSlug: "script-writer",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "TikTok Script Writer",
  description: "Generate viral TikTok scripts with AI assistance",
  steps: [
    { title: "Enter Your Topic", description: "Type in what your TikTok video will be about - a trend, product, story, or any content idea." },
    { title: "Select Tone and Duration", description: "Choose the tone (funny, educational, dramatic) and video duration (15s, 30s, 60s, 3min)." },
    { title: "Generate and Copy", description: "Click generate to get your AI-written script, then copy it for your TikTok video." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the TikTok Script Writer free?", answer: "Yes, completely free with no signup required. Generate unlimited scripts." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian for script generation." },
  { question: "How long should my TikTok script be?", answer: "It depends on your video length. We offer presets for 15 seconds, 30-60 seconds, 1-3 minutes, and 3+ minutes." },
  { question: "Can I customize the tone of my script?", answer: "Yes! Choose from funny, educational, dramatic, inspirational, and other tones to match your content style." },
  { question: "Will my scripts be unique?", answer: "Yes, each script is AI-generated fresh based on your specific topic and preferences." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "TikTok Script Writer",
  url: "https://kivitools.com/tiktok/script-writer",
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
