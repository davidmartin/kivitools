/**
 * Layout for /tools page
 * Feature: 017-homepage-tools-feed
 * 
 * Provides SEO metadata for the centralized tools page.
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All AI Tools - Free Content Creation Tools | KiviTools",
  description: "Browse 100+ free AI-powered tools for TikTok, Instagram, Twitter, YouTube, and more. Generate scripts, captions, ideas, and optimize your content.",
  keywords: [
    "ai tools",
    "content creation",
    "tiktok tools",
    "instagram tools",
    "twitter tools",
    "free ai generator",
    "social media tools",
    "content generator",
  ],
  openGraph: {
    title: "All AI Tools - KiviTools",
    description: "Browse 100+ free AI tools for content creators",
    type: "website",
    url: "https://kivitools.com/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "All AI Tools - KiviTools",
    description: "Browse 100+ free AI tools for content creators",
  },
  alternates: {
    canonical: "https://kivitools.com/tools",
    languages: {
      en: "https://kivitools.com/tools",
      es: "https://kivitools.com/herramientas",
    },
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
