import { generateToolMetadata } from "@/lib/seo-metadata";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
