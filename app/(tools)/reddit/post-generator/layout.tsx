import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";
import { generateHowToJsonLd } from "@/lib/aeo/howto-generator";
import { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";


export const metadata = generateToolMetadata({
  platform: "reddit",
  toolName: "Post Generator",
  title: "Reddit Post Generator - Create Engaging Posts with AI",
  description:
    "Generate engaging Reddit posts with AI. Create posts that spark discussions and get upvotes. Free post generator for Reddit.",
  englishSlug: "post-generator",
  spanishSlug: "generador-de-posts",
  keywords: [
    "reddit post",
    "post generator",
    "reddit content",
    "subreddit post",
    "reddit ideas",
  ],
});

const toolJsonLd = generateToolJsonLd({
  platform: "reddit",
  toolName: "Post Generator",
  title: "Post Generator",
  description: "Generate engaging Reddit posts with AI. Create posts that spark discussions and get upvotes. Free post generator for Reddit.",
  englishSlug: "post-generator",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "reddit",
  toolName: "Post Generator",
  englishSlug: "post-generator",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "Post Generator",
  description: "Generate engaging Reddit posts with AI. Create posts that spark discussions and get upvotes. Free post generator for Reddit.",
  steps: [
    { title: "Enter Your Details", description: "Provide the necessary information for your reddit content." },
    { title: "Customize Options", description: "Select your preferred style, tone, or other customization options." },
    { title: "Generate and Copy", description: "Click generate to create your post generator, then copy the result." },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "Is the Post Generator free?", answer: "Yes, completely free with no signup required. Generate unlimited content." },
  { question: "What languages are supported?", answer: "We support English, Spanish, Portuguese, French, German, and Italian." },
  { question: "How does the Post Generator work?", answer: "Our AI analyzes your input and generates optimized reddit content based on best practices." },
  { question: "Can I use this for business?", answer: "Absolutely! All generated content is yours to use for personal or commercial purposes." },
  { question: "How often can I generate content?", answer: "There are no limits - generate as much content as you need, completely free." },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "Post Generator",
  url: "https://kivitools.com/reddit/post-generator",
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
