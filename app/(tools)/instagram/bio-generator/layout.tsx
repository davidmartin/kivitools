import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";

export const metadata = generateToolMetadata({
  platform: "instagram",
  toolName: "Bio Generator",
  title: "Instagram Bio Generator - Create Perfect Bios with AI",
  description:
    "Generate captivating Instagram bios instantly with AI. Create professional, aesthetic, or funny bios with emojis. Free bio generator for Instagram.",
  englishSlug: "bio-generator",
  spanishSlug: "generador-de-bio",
  keywords: [
    "instagram bio",
    "bio generator",
    "aesthetic bio",
    "instagram profile",
    "bio ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "instagram",
  toolName: "Bio Generator",
  title: "Instagram Bio Generator",
  description: "Generate captivating Instagram bios instantly with AI. Create professional, aesthetic, or funny bios with emojis. Free bio generator for Instagram.",
  englishSlug: "bio-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "instagram",
  toolName: "Bio Generator",
  englishSlug: "bio-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Instagram Bio Generator",
  description: "Create the perfect Instagram bio with AI",
  steps: [
    { title: "Describe Yourself", description: "Enter keywords about your personality, interests, or brand identity." },
    { title: "Choose Your Style", description: "Select a bio style - professional, aesthetic, funny, or minimal." },
    { title: "Generate and Customize", description: "Get multiple bio options with emojis, then copy your favorite to Instagram." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "How long can an Instagram bio be?", answer: "Instagram bios have a 150 character limit. Our generator creates bios optimized for this length." },
  { question: "Can I include emojis in my bio?", answer: "Yes! Our generator suggests relevant emojis that enhance your bio and help it stand out." },
  { question: "What makes a good Instagram bio?", answer: "A good bio is concise, shows personality, includes a call-to-action, and uses relevant emojis." },
  { question: "Can I generate bios for business accounts?", answer: "Absolutely! Choose the professional style for business-appropriate bios with CTAs." },
  { question: "How often should I update my bio?", answer: "Update your bio when your focus changes, you have new achievements, or seasonally to stay fresh." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Instagram Bio Generator",
  url: "https://kivitools.com/instagram/bio-generator",
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
