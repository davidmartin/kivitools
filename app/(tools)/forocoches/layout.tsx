import { Metadata } from "next";
import { generateCollectionPageJsonLd } from "@/lib/aeo/collection-page-generator";
import { generateBreadcrumbJsonLd } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Herramientas Forocoches - Generadores de Hilos y Poles | KiviTools",
  description: "Herramientas gratuitas para Forocoches: generador de poles, respuestas troll, creador de hilos épicos. Domina el foro.",
  keywords: ["forocoches","generador pole","foro español","hilos forocoches"],
  openGraph: {
    title: "Herramientas Forocoches - Generadores de Hilos y Poles",
    description: "Herramientas gratuitas para Forocoches: generador de poles, respuestas troll, creador de hilos épicos. Domina el foro.",
    url: `https://kivitools.com/forocoches`,
    siteName: "KiviTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herramientas Forocoches - Generadores de Hilos y Poles",
    description: "Herramientas gratuitas para Forocoches: generador de poles, respuestas troll, creador de hilos épicos. Domina el foro.",
  },
  alternates: {
    canonical: `https://kivitools.com/forocoches`,
  },
};

// CollectionPage schema for platform hub (uses static tool mappings)
const collectionPageJsonLd = generateCollectionPageJsonLd({
  platformName: "Forocoches",
  description: "Herramientas gratuitas para Forocoches: generador de poles, respuestas troll, creador de hilos épicos. Domina el foro.",
  url: "https://kivitools.com/forocoches",
});

// Breadcrumb for platform page
const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "forocoches",
  toolName: "Forocoches Tools",
  englishSlug: "",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
