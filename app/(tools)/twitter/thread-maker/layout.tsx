import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "twitter",
  toolName: "Thread Maker",
  title: "Twitter Thread Maker - Create Engaging Threads with AI",
  description:
    "Generate compelling Twitter threads with AI. Create multi-tweet stories that keep readers engaged. Free thread generator for Twitter/X.",
  englishSlug: "thread-maker",
  spanishSlug: "generador-de-hilos",
  keywords: [
    "twitter thread",
    "thread maker",
    "tweet thread",
    "x thread",
    "thread generator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
