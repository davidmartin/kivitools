import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Video Ideas Generator",
  title: "TikTok Video Ideas Generator - AI Content Ideas",
  description:
    "Generate unlimited TikTok video ideas with AI. Get creative concepts for any niche. Free video idea generator for content creators.",
  englishSlug: "video-ideas",
  spanishSlug: "generador-de-ideas",
  keywords: [
    "tiktok ideas",
    "video ideas",
    "content ideas",
    "tiktok inspiration",
    "viral ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "tiktok",
  toolName: "Video Ideas Generator",
  title: "TikTok Video Ideas Generator",
  description: "Generate unlimited TikTok video ideas with AI. Get creative concepts for any niche. Free video idea generator for content creators.",
  englishSlug: "video-ideas",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "tiktok",
  toolName: "Video Ideas Generator",
  englishSlug: "video-ideas",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "TikTok Video Ideas Generator",
  description: "Get creative TikTok video concepts with AI",
  steps: [
    { title: "Enter Your Niche", description: "Describe your content niche or the type of videos you create (cooking, fitness, comedy, etc.)." },
    { title: "Add Details", description: "Optionally describe your target audience or specific themes you want to explore." },
    { title: "Generate Ideas", description: "Click generate to receive 10 unique video ideas tailored to your niche." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "How many video ideas can I generate?", answer: "You get 10 unique video ideas per generation, and you can generate unlimited times for free." },
  { question: "Are the ideas unique to me?", answer: "Yes, each generation creates fresh AI-generated ideas based on your specific niche and preferences." },
  { question: "Can I get ideas for any niche?", answer: "Absolutely! Our AI works with any content niche - from fitness to cooking to comedy to education." },
  { question: "Do I need to sign up?", answer: "No signup required. Just enter your niche and start generating ideas immediately." },
  { question: "Can these ideas help me go viral?", answer: "Our AI analyzes trending content patterns to suggest ideas with viral potential for your niche." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "TikTok Video Ideas Generator",
  url: "https://kivitools.com/tiktok/video-ideas",
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
