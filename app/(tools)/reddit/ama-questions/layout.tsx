import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "reddit",
  toolName: "AMA Questions Generator",
  title: "Reddit AMA Questions Generator - Best AMA Questions",
  description:
    "Generate interesting AMA questions with AI. Create thought-provoking questions for Ask Me Anything threads. Free AMA question generator.",
  englishSlug: "ama-questions",
  spanishSlug: "generador-de-preguntas-ama",
  keywords: [
    "reddit ama",
    "ama questions",
    "ask me anything",
    "ama ideas",
    "question generator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
