import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Script Writer",
  title: "TikTok Script Writer - Generate Viral Scripts with AI",
  description:
    "Create engaging TikTok scripts in seconds with AI. Choose your tone, duration, and language. Free viral content generator for TikTok creators.",
  englishSlug: "script-writer",
  spanishSlug: "escritor-de-guiones",
  keywords: [
    "tiktok script",
    "ai script writer",
    "viral tiktok",
    "content generator",
    "tiktok creator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
