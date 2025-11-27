import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "twitch",
  toolName: "Chat Command Generator",
  title: "Twitch Chat Command Generator - Custom Bot Commands",
  description:
    "Generate custom Twitch chat commands with AI. Create fun and useful bot commands for your stream. Free command generator for Twitch.",
  englishSlug: "chat-command",
  spanishSlug: "generador-de-comandos-chat",
  keywords: [
    "twitch command",
    "chat command",
    "bot command",
    "nightbot",
    "stream commands",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "twitch",
  toolName: "Chat Command Generator",
  title: "Chat Command Generator",
  description: "Generate custom Twitch chat commands with AI. Create fun and useful bot commands for your stream. Free command generator for Twitch.",
  englishSlug: "chat-command",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "twitch",
  toolName: "Chat Command Generator",
  englishSlug: "chat-command",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Chat Command Generator",
  description: "Generate custom Twitch chat commands with AI. Create fun and useful bot commands for your stream. Free command generator for Twitch.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your twitch content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your chat command generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Chat Command Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Chat Command Generator work?", answer: "Our AI analyzes your input and generates optimized twitch content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Chat Command Generator",
  url: "https://kivitools.com/twitch/chat-command",
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
