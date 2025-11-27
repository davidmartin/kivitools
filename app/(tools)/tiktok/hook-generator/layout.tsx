import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Hook Generator",
  title: "TikTok Hook Generator - Create Viral Hooks with AI",
  description:
    "Generate attention-grabbing TikTok hooks instantly. AI-powered hook creator for viral videos. Make viewers stop scrolling in seconds.",
  englishSlug: "hook-generator",
  spanishSlug: "generador-de-ganchos",
  keywords: [
    "tiktok hook",
    "viral hook",
    "attention grabber",
    "video hook",
    "opening line",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Hook Generator",
  title: "TikTok Hook Generator",
  description: "Generate attention-grabbing TikTok hooks instantly. AI-powered hook creator for viral videos. Make viewers stop scrolling in seconds.",
  englishSlug: "hook-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Hook Generator",
  englishSlug: "hook-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "TikTok Hook Generator",
  description: "Create attention-grabbing hooks for TikTok videos",
  steps: [
    { title: "Enter Your Topic", description: "Describe what your video is about - the subject, theme, or main message." },
    { title: "Choose Hook Style", description: "Select between question hooks, statement hooks, challenge hooks, or story hooks." },
    { title: "Get Your Hooks", description: "Generate 5 unique hooks and pick the one that best captures attention." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "What makes a good TikTok hook?", answer: "A great hook captures attention in the first 1-3 seconds using curiosity, emotion, or a bold statement." },
  { question: "How many hooks can I generate?", answer: "Each generation gives you 5 unique hooks, and you can generate unlimited times for free." },
  { question: "What types of hooks work best?", answer: "Question hooks, controversial statements, and 'you won't believe' openers tend to perform best on TikTok." },
  { question: "Can I use these hooks for any video?", answer: "Yes, our AI generates hooks adaptable to any niche - from educational content to entertainment." },
  { question: "Do hooks really affect video performance?", answer: "Absolutely! TikTok's algorithm heavily weights watch time - a good hook keeps viewers watching longer." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "TikTok Hook Generator",
  url: "https://kivitools.com/tiktok/hook-generator",
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
