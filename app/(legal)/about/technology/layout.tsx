import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Stack | KiviTools - Powered by DeepSeek AI",
  description:
    "Discover how KiviTools uses DeepSeek AI to power 100+ free content creation tools for creators worldwide.",
  keywords: [
    "DeepSeek",
    "DeepSeek AI",
    "AI tools",
    "content creation",
    "KiviTools technology",
    "AI-powered tools",
    "free AI tools",
  ],
  alternates: {
    canonical: "https://kivitools.com/about/technology",
    languages: {
      en: "https://kivitools.com/about/technology",
      es: "https://kivitools.com/sobre/tecnologia",
    },
  },
  openGraph: {
    title: "Technology Stack | KiviTools - Powered by DeepSeek AI",
    description:
      "Discover how KiviTools uses DeepSeek AI to power 100+ free content creation tools for creators worldwide.",
    url: "https://kivitools.com/about/technology",
    siteName: "KiviTools",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Stack | KiviTools - Powered by DeepSeek AI",
    description:
      "Discover how KiviTools uses DeepSeek AI to power 100+ free content creation tools for creators worldwide.",
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
