import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "reddit",
  toolName: "Comment Generator",
  title: "Reddit Comment Generator - AI-Powered Comment Ideas",
  description:
    "Generate thoughtful Reddit comments with AI. Create engaging responses that add value to discussions. Free comment generator for Reddit.",
  englishSlug: "comment-generator",
  spanishSlug: "generador-de-comentarios",
  keywords: [
    "reddit comment",
    "comment ideas",
    "reddit reply",
    "discussion comment",
    "comment generator",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "reddit",
  toolName: "Comment Generator",
  title: "Comment Generator",
  description: "Generate thoughtful Reddit comments with AI. Create engaging responses that add value to discussions. Free comment generator for Reddit.",
  englishSlug: "comment-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "reddit",
  toolName: "Comment Generator",
  englishSlug: "comment-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Comment Generator",
  description: "Generate thoughtful Reddit comments with AI. Create engaging responses that add value to discussions. Free comment generator for Reddit.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your reddit content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your comment generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Comment Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Comment Generator work?", answer: "Our AI analyzes your input and generates optimized reddit content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Comment Generator",
  url: "https://kivitools.com/reddit/comment-generator",
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
