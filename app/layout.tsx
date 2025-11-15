import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KiviTools - Free AI-Powered Social Media Tools",
  description:
    "Create engaging TikTok scripts, Instagram captions, and Twitter threads with AI. Free tools for content creators. No signup required.",
  keywords: [
    "TikTok script writer",
    "Instagram caption generator",
    "Twitter thread maker",
    "social media tools",
    "AI content creator",
    "free social media tools",
  ],
  authors: [{ name: "KiviTools" }],
  openGraph: {
    title: "KiviTools - Free AI Social Media Tools",
    description:
      "Create viral social media content with AI. TikTok scripts, Instagram captions, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Reemplaza con tu ID cuando tengas uno */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </head>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
