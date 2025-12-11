import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Breadcrumbs from "./components/breadcrumbs";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { ToolsProvider } from "@/contexts/ToolsContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "./components/google-analytics";
import CookieBanner from "./components/cookie-banner";
import CookiePreferencesModal from "./components/cookie-preferences-modal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kivitools.com"),
  title: {
    default: "KiviTools - Crea Contenido Viral con IA Gratis | TikTok, Instagram, YouTube",
    template: "%s | KiviTools",
  },
  description:
    "Genera contenido viral para TikTok, Instagram, YouTube y +25 redes sociales con IA. Scripts, captions, hashtags, bios. 100% gratis, sin registro.",
  keywords: [
    "KiviTools",
    "crear contenido viral con IA",
    "generador de contenido IA gratis",
    "AI text generation",
    "TikTok script generator",
    "Instagram caption generator",
    "contenido viral IA",
    "herramientas IA creadores",
    "AI content creator",
    "social media AI tools",
    "generador de scripts TikTok",
    "generador de hashtags IA",
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
    title: "KiviTools - Crea Contenido Viral con IA Gratis",
    description:
      "Genera scripts, captions, hashtags y bios virales para TikTok, Instagram, YouTube y +25 plataformas. 100% gratis.",
    siteName: "KiviTools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KiviTools - Crea Contenido Viral con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KiviTools - Crea Contenido Viral con IA Gratis",
    description:
      "Genera scripts, captions, hashtags y bios virales para TikTok, Instagram, YouTube y +25 plataformas. 100% gratis.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme & Language initialization - runs before page render to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,s=['en','es','pt','fr','de','it'];try{var t=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches,c=t||(p?'dark':'light');d.classList.add(c);d.style.colorScheme=c;var l=localStorage.getItem('language');if(!l||s.indexOf(l)<0){var n=navigator.languages||[navigator.language||'en'];for(var i=0;i<n.length;i++){var b=n[i].toLowerCase().split('-')[0];if(s.indexOf(b)>=0){l=b;break}}l=l||'en'}d.lang=l;d.dataset.lang=l}catch(e){d.classList.add('light');d.style.colorScheme='light';d.lang='en'}})()`,
          }}
        />
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
        suppressHydrationWarning
        className={`${inter.variable} antialiased flex flex-col min-h-screen bg-mesh text-foreground selection:bg-accent selection:text-accent-foreground`}
      >
        <LanguageProvider>
          <CookieConsentProvider>
            <GoogleAnalytics />
            <AuthProvider>
              <ToolsProvider>
                <Navigation />
                <Breadcrumbs />
                <main className="flex-1">{children}</main>
                <Footer />
                <CookieBanner />
                <CookiePreferencesModal />
              </ToolsProvider>
            </AuthProvider>
          </CookieConsentProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
