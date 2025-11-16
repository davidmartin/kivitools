import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Tweet Generator",
  title: "Twitter Tweet Generator - Create Viral Tweets with AI",
  description:
    "Generate engaging tweets with AI. Create viral-worthy content in seconds. Free tweet generator for Twitter/X creators.",
  englishSlug: "tweet-generator",
  spanishSlug: "generador-de-tweets",
  keywords: [
    "twitter tweet",
    "tweet generator",
    "viral tweet",
    "x post",
    "tweet ideas",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
