import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Breadcrumbs from "./components/breadcrumbs";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "./components/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kivitools.com"),
  title: {
    default: "KiviTools - Free AI-Powered Social Media Tools",
    template: "%s | KiviTools",
  },
  description:
    "Create engaging TikTok scripts, Instagram captions, and Twitter threads with AI. Free tools for content creators. No signup required.",
  keywords: [
    "KiviTools",
    "TikTok script writer",
    "Instagram caption generator",
    "Twitter thread maker",
    "social media tools",
    "AI content creator",
    "free social media tools",
    "generador de contenido IA",
    "herramientas redes sociales gratis",
  ],
  authors: [{ name: "KiviTools", url: "https://kivitools.com" }],
  creator: "KiviTools",
  publisher: "KiviTools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: "https://kivitools.com",
    title: "KiviTools - Free AI Social Media Tools",
    description:
      "Create viral social media content with AI. TikTok scripts, Instagram captions, and more.",
    siteName: "KiviTools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KiviTools - AI Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KiviTools - Free AI Social Media Tools",
    description:
      "Create viral social media content with AI. TikTok scripts, Instagram captions, and more.",
    images: ["/twitter-image.png"],
    creator: "@kivitools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kivitools.com",
    languages: {
      "en-US": "https://kivitools.com",
      "es-ES": "https://kivitools.com",
    },
  },
  verification: {
    google: "your-google-verification-code", // Reemplazar con código real
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" data-theme="light">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="en" href="https://kivitools.com" />
        <link rel="alternate" hrefLang="es" href="https://kivitools.com" />
        <link rel="alternate" hrefLang="x-default" href="https://kivitools.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Mobile optimization */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="google-adsense-account" content="ca-pub-2958996148094482"></meta>
        {/* Prevent auto-detection of phone numbers, emails */}
        <meta name="format-detection" content="telephone=no, email=no, address=no" />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Google AdSense - Reemplaza con tu ID cuando tengas uno */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2958996148094482"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KiviTools",
              url: "https://kivitools.com",
              logo: "https://kivitools.com/logo.png",
              description:
                "Free AI-powered social media content generation tools for TikTok, Instagram, Twitter, and more.",
              sameAs: [
                "https://twitter.com/kivitools",
                // Añadir más redes sociales cuando estén disponibles
              ],
            }),
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KiviTools",
              url: "https://kivitools.com",
              description:
                "Free AI-powered social media tools for content creators",
              inLanguage: ["en", "es"],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://kivitools.com/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen bg-mesh text-foreground selection:bg-accent selection:text-accent-foreground`}
      >
        <GoogleAnalytics />
        <LanguageProvider>
          <Navigation />
          <Breadcrumbs />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
