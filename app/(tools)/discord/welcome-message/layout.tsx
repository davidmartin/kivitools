import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "discord",
  toolName: "Welcome Message Generator",
  title: "Discord Welcome Message Generator - New Member Greetings",
  description:
    "Generate welcoming Discord messages with AI. Create friendly greetings for new server members. Free welcome message generator.",
  englishSlug: "welcome-message",
  spanishSlug: "generador-de-mensajes-bienvenida",
  keywords: [
    "discord welcome",
    "welcome message",
    "server greeting",
    "new member message",
    "discord bot",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "discord",
  toolName: "Welcome Message Generator",
  title: "Welcome Message Generator",
  description: "Generate welcoming Discord messages with AI. Create friendly greetings for new server members. Free welcome message generator.",
  englishSlug: "welcome-message",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "discord",
  toolName: "Welcome Message Generator",
  englishSlug: "welcome-message",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Welcome Message Generator",
  description: "Generate welcoming Discord messages with AI. Create friendly greetings for new server members. Free welcome message generator.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your discord content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your welcome message generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Welcome Message Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Welcome Message Generator work?", answer: "Our AI analyzes your input and generates optimized discord content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Welcome Message Generator",
  url: "https://kivitools.com/discord/welcome-message",
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
