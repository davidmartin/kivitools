import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "youtube",
  toolName: "Title Generator",
  title: "YouTube Title Generator - Create Clickable Titles with AI",
  description:
    "Generate compelling YouTube titles with AI. Create SEO-optimized, clickable titles that get views. Free title generator for YouTube.",
  englishSlug: "title-generator",
  spanishSlug: "generador-de-titulos",
  keywords: [
    "youtube title",
    "video title",
    "clickbait title",
    "seo title",
    "title ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "youtube",
  toolName: "Title Generator",
  title: "YouTube Title Generator",
  description: "Generate compelling YouTube titles with AI. Create SEO-optimized, clickable titles that get views. Free title generator for YouTube.",
  englishSlug: "title-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "youtube",
  toolName: "Title Generator",
  englishSlug: "title-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "YouTube Title Generator",
  description: "Create SEO-optimized YouTube titles that get clicks",
  steps: [
    { title: "Enter Video Topic", description: "Describe what your video is about - the main subject, keyword, or theme." },
    { title: "Choose Title Style", description: "Select between how-to, listicle, question, or curiosity-driven title formats." },
    { title: "Pick Your Title", description: "Get 5 title options optimized for CTR and SEO, then copy your favorite." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "How long should a YouTube title be?", answer: "Keep titles under 60 characters to avoid truncation. Our generator optimizes for this length." },
  { question: "What makes a clickable YouTube title?", answer: "Great titles use power words, numbers, create curiosity, and include your main keyword." },
  { question: "Should I include keywords in my title?", answer: "Yes! Include your target keyword near the beginning for better SEO and discoverability." },
  { question: "Is clickbait bad for YouTube?", answer: "Misleading clickbait hurts watch time. Our titles are curiosity-driven but deliver on their promise." },
  { question: "How do titles affect YouTube algorithm?", answer: "Titles impact CTR which is a major ranking factor. Better titles = more clicks = better rankings." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "YouTube Title Generator",
  url: "https://kivitools.com/youtube/title-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      {children}
    </>
  );
}
