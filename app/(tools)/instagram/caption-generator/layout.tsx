import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Caption Generator",
  title: "Instagram Caption Generator - AI Captions for Posts",
  description:
    "Generate engaging Instagram captions with AI. Create captions with emojis and hashtags for any post. Free caption generator for Instagram.",
  englishSlug: "caption-generator",
  spanishSlug: "generador-de-captions",
  keywords: [
    "instagram caption",
    "caption ideas",
    "post caption",
    "instagram captions",
    "ai caption",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "instagram",
  toolName: "Caption Generator",
  title: "Instagram Caption Generator",
  description: "Generate engaging Instagram captions with AI. Create captions with emojis and hashtags for any post. Free caption generator for Instagram.",
  englishSlug: "caption-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Caption Generator",
  englishSlug: "caption-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Instagram Caption Generator",
  description: "Create engaging Instagram captions with AI",
  steps: [
    { title: "Describe Your Post", description: "Tell us what your photo or video is about - the theme, mood, or message." },
    { title: "Select Tone and Style", description: "Choose between casual, professional, inspirational, or funny tones." },
    { title: "Copy with Hashtags", description: "Get your caption complete with relevant emojis and hashtags ready to post." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "What makes a good Instagram caption?", answer: "A great caption hooks readers, adds context to your image, includes a CTA, and uses strategic hashtags." },
  { question: "How long should my Instagram caption be?", answer: "Captions can be up to 2,200 characters, but the first 125 are most important as they show before 'more'." },
  { question: "Should I include hashtags in my caption?", answer: "Yes! Our generator includes optimized hashtags. Use 5-15 relevant hashtags for best reach." },
  { question: "Can I generate captions for Reels?", answer: "Absolutely! Specify if it's for a Reel and we'll optimize the caption format accordingly." },
  { question: "How can captions improve engagement?", answer: "Good captions encourage comments, shares, and saves - all signals Instagram uses for reach." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Instagram Caption Generator",
  url: "https://kivitools.com/instagram/caption-generator",
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
