import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Social Media Tips & AI Tools Guides",
  description:
    "Learn how to create viral content with our social media guides. Tips, strategies and tutorials for TikTok, Instagram, Twitter and more.",
  keywords: [
    "social media blog",
    "TikTok tips",
    "Instagram guide",
    "Twitter threads tutorial",
    "AI tools for social media",
    "content creation guide",
    "viral content tips",
    "social media strategy",
  ],
  openGraph: {
    title: "KiviTools Blog - Social Media Guides & Tips",
    description:
      "Master social media with our expert guides. Learn to create viral content with AI tools.",
    type: "website",
    url: "https://kivitools.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "KiviTools Blog - Social Media Guides",
    description: "Master social media with expert guides and AI tools.",
  },
  alternates: {
    canonical: "https://kivitools.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
