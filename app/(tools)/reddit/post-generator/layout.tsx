import { generateToolMetadata } from "@/lib/seo-metadata";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
