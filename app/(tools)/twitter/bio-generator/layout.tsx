import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Bio Generator",
  title: "Twitter Bio Generator - Create Witty Bios with AI",
  description:
    "Generate clever Twitter bios instantly with AI. Create professional or funny bios that stand out. Free bio generator for Twitter/X.",
  englishSlug: "bio-generator",
  spanishSlug: "generador-de-bio",
  keywords: [
    "twitter bio",
    "x bio",
    "bio generator",
    "twitter profile",
    "witty bio",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitter",
  toolName: "Bio Generator",
  title: "Twitter Bio Generator",
  description: "Generate clever Twitter bios instantly with AI. Create professional or funny bios that stand out. Free bio generator for Twitter/X.",
  englishSlug: "bio-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitter",
  toolName: "Bio Generator",
  englishSlug: "bio-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Twitter Bio Generator",
  description: "Create the perfect Twitter/X bio with AI",
  steps: [
    { title: "Enter Your Details", description: "Tell us about yourself - your interests, profession, or what you tweet about." },
    { title: "Select Your Vibe", description: "Choose a style - professional, witty, sarcastic, or minimal." },
    { title: "Copy Your Bio", description: "Get multiple bio options within the 160 character limit, ready to paste." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "How long can a Twitter bio be?", answer: "Twitter bios have a 160 character limit. Our generator creates bios optimized for this length." },
  { question: "What should I include in my Twitter bio?", answer: "Include who you are, what you do, and your unique personality. Emojis and humor work great." },
  { question: "Can I use this for X (formerly Twitter)?", answer: "Yes! It's the same platform, and our bios work perfectly for both Twitter and X profiles." },
  { question: "Should my bio be professional or funny?", answer: "It depends on your goals. Professional bios suit business accounts, while witty bios attract followers." },
  { question: "How often should I update my bio?", answer: "Update when your interests change or to reflect current projects, trends, or achievements." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Twitter Bio Generator",
  url: "https://kivitools.com/twitter/bio-generator",
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
