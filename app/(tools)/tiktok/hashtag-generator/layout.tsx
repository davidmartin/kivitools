import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Hashtag Generator",
  title: "TikTok Hashtag Generator - Best Hashtags for Viral Growth",
  description:
    "Generate trending TikTok hashtags with AI. Get relevant hashtags to boost your reach and go viral. Free hashtag research tool.",
  englishSlug: "hashtag-generator",
  spanishSlug: "generador-de-hashtags",
  keywords: [
    "tiktok hashtags",
    "trending hashtags",
    "viral hashtags",
    "hashtag generator",
    "grow tiktok",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Hashtag Generator",
  title: "TikTok Hashtag Generator",
  description: "Generate trending TikTok hashtags with AI. Get relevant hashtags to boost your reach and go viral. Free hashtag research tool.",
  englishSlug: "hashtag-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Hashtag Generator",
  englishSlug: "hashtag-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "TikTok Hashtag Generator",
  description: "Find the best hashtags to boost your TikTok reach",
  steps: [
    { title: "Describe Your Content", description: "Enter what your video is about - the topic, niche, or theme." },
    { title: "Add Your Niche", description: "Specify your content niche for more targeted hashtag suggestions." },
    { title: "Copy Hashtags", description: "Get an optimized mix of trending and niche hashtags ready to paste into TikTok." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "How many hashtags should I use on TikTok?", answer: "We recommend 3-5 highly relevant hashtags. Our generator provides an optimized mix for maximum reach." },
  { question: "Does using hashtags help TikTok videos go viral?", answer: "Yes, relevant hashtags help TikTok categorize your content and show it to interested viewers." },
  { question: "Are these hashtags trending?", answer: "Our AI analyzes current TikTok trends to suggest a mix of trending and niche-specific hashtags." },
  { question: "Can I generate hashtags for any niche?", answer: "Absolutely! Enter any topic and get relevant hashtags for your specific content area." },
  { question: "Should I use the same hashtags every time?", answer: "No, vary your hashtags based on content. Our tool generates fresh suggestions each time." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "TikTok Hashtag Generator",
  url: "https://kivitools.com/tiktok/hashtag-generator",
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
