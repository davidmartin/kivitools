// Ejemplo de cómo añadir metadata SEO a una página de herramienta
// Copiar esta estructura a todas las páginas de herramientas

import { Metadata } from "next";
import Script from "next/script";
import {
  generateToolMetadata,
  generateToolJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo-metadata";

// ============================================
// METADATA SEO (para cada página)
// ============================================

export const metadata: Metadata = generateToolMetadata({
  platform: "tiktok",
  toolName: "Script Writer",
  title: "TikTok Script Writer",
  description:
    "Create engaging TikTok scripts with AI. Generate viral video scripts in seconds.",
  englishSlug: "script-writer",
  spanishSlug: "escritor-de-guiones",
  keywords: [
    "tiktok script",
    "video script generator",
    "ai script writer",
    "tiktok content",
    "video script template",
    "guion tiktok",
    "escritor de guiones ia",
  ],
});

// ============================================
// COMPONENTE DE PÁGINA
// ============================================

export default function TikTokScriptWriterPage() {
  // ... código existente de la página ...

  // FAQs para JSON-LD
  const faqs = [
    {
      question: "Is the TikTok Script Writer free?",
      answer:
        "Yes! Our TikTok Script Writer is 100% free to use. No registration, no credit card required.",
    },
    {
      question: "How long are the generated scripts?",
      answer:
        "You can choose script duration: 15-30 seconds, 30-60 seconds, or 60-90 seconds.",
    },
    {
      question: "Can I generate scripts in different languages?",
      answer:
        "Yes! We support English, Spanish, French, German, Italian, Portuguese, and Chinese.",
    },
    {
      question: "What tones are available?",
      answer:
        "You can choose from friendly, professional, humorous, educational, or inspirational tones.",
    },
    {
      question: "Can I edit the generated script?",
      answer:
        "Absolutely! You can copy and edit the script to match your style and needs.",
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld-tool"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateToolJsonLd({
              platform: "tiktok",
              toolName: "Script Writer",
              title: "TikTok Script Writer",
              description:
                "Create engaging TikTok scripts with AI. Generate viral video scripts in seconds.",
              englishSlug: "script-writer",
            })
          ),
        }}
      />

      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd({
              platform: "tiktok",
              toolName: "Script Writer",
              englishSlug: "script-writer",
            })
          ),
        }}
      />

      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqJsonLd(faqs)),
        }}
      />

      {/* Contenido de la página */}
      <div className="min-h-screen bg-background py-12 px-4">
        {/* ... resto del contenido ... */}
      </div>
    </>
  );
}
