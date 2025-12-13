import type { Metadata } from "next";
import { Suspense } from "react";
import HomeClient from "./components/home-client";
import HomeStaticSections from "./components/home-static-sections";
import LatestToolsServer from "./components/latest-tools-server";
import AdSlot from "./components/ad-slot";
import { generateHomeJsonLd, generateSoftwareAppJsonLd, generateFaqJsonLd } from "@/lib/seo-metadata";

// Static metadata for the home page
export const metadata: Metadata = {
    title: "KiviTools - Crea Contenido Viral con IA Gratis | TikTok, Instagram, YouTube",
    description: "Genera contenido viral para TikTok, Instagram, YouTube y +25 redes sociales con IA. Scripts, captions, hashtags, bios. 100% gratis, sin registro.",
    openGraph: {
        title: "KiviTools - Crea Contenido Viral con IA Gratis",
        description: "Genera scripts, captions, hashtags y bios virales para TikTok, Instagram, YouTube y +25 plataformas. 100% gratis.",
    },
};

// FAQ data for JSON-LD
const FAQ_DATA = [
    { question: "¿KiviTools es realmente gratis?", answer: "¡Sí! Todas nuestras herramientas son 100% gratuitas. No necesitas tarjeta de crédito ni suscripción." },
    { question: "¿Necesito crear una cuenta?", answer: "No es obligatorio. Puedes usar todas las herramientas sin registrarte. La cuenta es opcional para guardar tu historial." },
    { question: "¿Qué plataformas soporta KiviTools?", answer: "Soportamos más de 25 plataformas: TikTok, Instagram, YouTube, Twitter, Reddit, Discord, Spotify, y muchas más." },
    { question: "¿El contenido generado es único?", answer: "Sí, nuestra IA genera contenido original basado en tus especificaciones. Cada resultado es único." },
    { question: "¿Puedo usar el contenido comercialmente?", answer: "Absolutamente. Todo el contenido generado es tuyo para usar como quieras, incluyendo fines comerciales." },
];

// Pre-generate JSON-LD at build time
const homeJsonLd = generateHomeJsonLd();
const softwareAppJsonLd = generateSoftwareAppJsonLd();
const faqJsonLd = generateFaqJsonLd(FAQ_DATA);

// Loading fallback for Latest Tools
function LatestToolsSkeleton() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="h-12 w-64 bg-foreground/10 rounded-lg mx-auto mb-6 animate-pulse" />
                    <div className="h-6 w-96 bg-foreground/5 rounded-lg mx-auto animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-foreground/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero & Platforms - Client Component for interactivity */}
            <HomeClient />

            {/* Ad Space - Top */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <AdSlot slotId="top-banner" format="horizontal" className="text-center" />
            </div>

            {/* Latest Tools - Server-rendered with Suspense */}
            <Suspense fallback={<LatestToolsSkeleton />}>
                <LatestToolsServer />
            </Suspense>

            {/* Ad Space - Bottom */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <AdSlot slotId="bottom-banner" format="horizontal" className="text-center" />
            </div>

            {/* Static Sections - Features, Stats, Testimonials, FAQ */}
            <HomeStaticSections />
        </div>
    );
}
