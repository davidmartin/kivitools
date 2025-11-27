import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Announcement Generator",
  title: "Discord Announcement Generator - Create Server Announcements",
  description:
    "Generate professional Discord announcements with AI. Create engaging server announcements that grab attention. Free announcement generator.",
  englishSlug: "announcement-generator",
  spanishSlug: "generador-de-anuncios",
  keywords: [
    "discord announcement",
    "server announcement",
    "discord message",
    "announcement template",
    "discord bot",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "discord",
  toolName: "Announcement Generator",
  title: "Announcement Generator",
  description: "Generate professional Discord announcements with AI. Create engaging server announcements that grab attention. Free announcement generator.",
  englishSlug: "announcement-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "discord",
  toolName: "Announcement Generator",
  englishSlug: "announcement-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Announcement Generator",
  description: "Generate professional Discord announcements with AI. Create engaging server announcements that grab attention. Free announcement generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your discord content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your announcement generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Announcement Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Announcement Generator work?", answer: "Our AI analyzes your input and generates optimized discord content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Announcement Generator",
  url: "https://kivitools.com/discord/announcement-generator",
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
