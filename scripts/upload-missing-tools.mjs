#!/usr/bin/env node

/**
 * Script para subir las 11 tools faltantes a Appwrite
 * y generar los redirects 301
 * 
 * Run: node scripts/upload-missing-tools.mjs
 */

import { Client, Databases, ID, Query } from "node-appwrite";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

// Las 11 tools faltantes con sus traducciones
const MISSING_TOOLS = [
  // TikTok
  {
    platform: "tiktok",
    slug: "content-calendar-generator",
    names: {
      en: "Content Calendar Generator",
      es: "Generador de Calendario de Contenido",
      pt: "Gerador de Calendário de Conteúdo",
      fr: "Générateur de Calendrier de Contenu",
      de: "Inhaltskalender-Generator",
      it: "Generatore di Calendario dei Contenuti"
    },
    descriptions: {
      en: "Plan your TikTok content strategy with AI-generated posting schedules and content ideas",
      es: "Planifica tu estrategia de contenido en TikTok con calendarios y sugerencias generadas por IA",
      pt: "Planeje sua estratégia de conteúdo TikTok com cronogramas e ideias geradas por IA",
      fr: "Planifiez votre stratégie de contenu TikTok avec des calendriers et idées générés par l'IA",
      de: "Planen Sie Ihre TikTok-Inhaltsstrategie mit KI-generierten Zeitplänen und Ideen",
      it: "Pianifica la tua strategia di contenuti TikTok con calendari e idee generate dall'IA"
    }
  },
  {
    platform: "tiktok",
    slug: "ad-copy-generator",
    names: {
      en: "Ad Copy Generator",
      es: "Generador de Textos para Anuncios",
      pt: "Gerador de Textos de Anúncios",
      fr: "Générateur de Textes Publicitaires",
      de: "Anzeigentexte-Generator",
      it: "Generatore di Testi Pubblicitari"
    },
    descriptions: {
      en: "Create compelling ad copy for TikTok Ads that converts viewers into customers",
      es: "Crea textos publicitarios persuasivos para TikTok Ads que convierten espectadores en clientes",
      pt: "Crie textos publicitários persuasivos para TikTok Ads que convertem espectadores em clientes",
      fr: "Créez des textes publicitaires convaincants pour TikTok Ads qui convertissent les spectateurs en clients",
      de: "Erstellen Sie überzeugende Anzeigentexte für TikTok Ads, die Zuschauer in Kunden verwandeln",
      it: "Crea testi pubblicitari persuasivi per TikTok Ads che convertono gli spettatori in clienti"
    }
  },
  {
    platform: "tiktok",
    slug: "song-recommendations",
    names: {
      en: "Song Recommendations",
      es: "Recomendaciones de Canciones",
      pt: "Recomendações de Músicas",
      fr: "Recommandations de Chansons",
      de: "Lied-Empfehlungen",
      it: "Raccomandazioni di Canzoni"
    },
    descriptions: {
      en: "Get trending song suggestions for your TikTok videos based on your content type",
      es: "Obtén sugerencias de canciones trending para tus videos de TikTok según tu tipo de contenido",
      pt: "Obtenha sugestões de músicas em tendência para seus vídeos TikTok com base no seu tipo de conteúdo",
      fr: "Obtenez des suggestions de chansons tendance pour vos vidéos TikTok selon votre type de contenu",
      de: "Erhalten Sie trendige Liedvorschläge für Ihre TikTok-Videos basierend auf Ihrem Inhaltstyp",
      it: "Ottieni suggerimenti di canzoni di tendenza per i tuoi video TikTok in base al tipo di contenuto"
    }
  },
  {
    platform: "tiktok",
    slug: "thumbnail-text-generator",
    names: {
      en: "Thumbnail Text Generator",
      es: "Generador de Texto para Miniaturas",
      pt: "Gerador de Texto para Miniaturas",
      fr: "Générateur de Texte pour Miniatures",
      de: "Vorschaubild-Text-Generator",
      it: "Generatore di Testo per Miniature"
    },
    descriptions: {
      en: "Generate attention-grabbing text overlays for your TikTok video thumbnails",
      es: "Genera textos llamativos para las miniaturas de tus videos de TikTok",
      pt: "Gere textos chamativos para as miniaturas dos seus vídeos TikTok",
      fr: "Générez des textes accrocheurs pour les miniatures de vos vidéos TikTok",
      de: "Erstellen Sie aufmerksamkeitsstarke Textüberlagerungen für Ihre TikTok-Video-Thumbnails",
      it: "Genera testi accattivanti per le miniature dei tuoi video TikTok"
    }
  },
  // Instagram
  {
    platform: "instagram",
    slug: "hashtag-generator",
    names: {
      en: "Hashtag Generator",
      es: "Generador de Hashtags",
      pt: "Gerador de Hashtags",
      fr: "Générateur de Hashtags",
      de: "Hashtag-Generator",
      it: "Generatore di Hashtag"
    },
    descriptions: {
      en: "Generate relevant and trending hashtags to boost your Instagram post reach",
      es: "Genera hashtags relevantes y trending para aumentar el alcance de tus posts de Instagram",
      pt: "Gere hashtags relevantes e em tendência para aumentar o alcance das suas publicações no Instagram",
      fr: "Générez des hashtags pertinents et tendance pour augmenter la portée de vos posts Instagram",
      de: "Generieren Sie relevante und trendige Hashtags, um die Reichweite Ihrer Instagram-Posts zu erhöhen",
      it: "Genera hashtag rilevanti e di tendenza per aumentare la copertura dei tuoi post Instagram"
    }
  },
  {
    platform: "instagram",
    slug: "story-ideas",
    names: {
      en: "Story Ideas Generator",
      es: "Generador de Ideas para Historias",
      pt: "Gerador de Ideias para Stories",
      fr: "Générateur d'Idées de Stories",
      de: "Story-Ideen-Generator",
      it: "Generatore di Idee per le Storie"
    },
    descriptions: {
      en: "Get creative story ideas to keep your Instagram audience engaged every day",
      es: "Obtén ideas creativas para historias que mantengan a tu audiencia de Instagram enganchada",
      pt: "Obtenha ideias criativas para stories que mantenham seu público do Instagram engajado",
      fr: "Obtenez des idées créatives de stories pour garder votre audience Instagram engagée",
      de: "Erhalten Sie kreative Story-Ideen, um Ihr Instagram-Publikum täglich zu begeistern",
      it: "Ottieni idee creative per le storie per mantenere il tuo pubblico Instagram coinvolto"
    }
  },
  {
    platform: "instagram",
    slug: "carousel-generator",
    names: {
      en: "Carousel Post Generator",
      es: "Generador de Carruseles",
      pt: "Gerador de Carrossel",
      fr: "Générateur de Carrousels",
      de: "Karussell-Generator",
      it: "Generatore di Caroselli"
    },
    descriptions: {
      en: "Create engaging multi-slide carousel posts that tell a story and drive engagement",
      es: "Crea carruseles con múltiples slides que cuenten una historia y aumenten el engagement",
      pt: "Crie posts de carrossel envolventes com múltiplos slides que contam uma história",
      fr: "Créez des carrousels engageants à plusieurs slides qui racontent une histoire",
      de: "Erstellen Sie ansprechende Karussell-Posts mit mehreren Slides, die eine Geschichte erzählen",
      it: "Crea post carosello coinvolgenti con più slide che raccontano una storia"
    }
  },
  {
    platform: "instagram",
    slug: "content-calendar",
    names: {
      en: "Content Calendar",
      es: "Calendario de Contenido",
      pt: "Calendário de Conteúdo",
      fr: "Calendrier de Contenu",
      de: "Inhaltskalender",
      it: "Calendario dei Contenuti"
    },
    descriptions: {
      en: "Plan your Instagram content strategy with AI-generated posting schedules",
      es: "Planifica tu estrategia de contenido en Instagram con calendarios generados por IA",
      pt: "Planeje sua estratégia de conteúdo Instagram com cronogramas gerados por IA",
      fr: "Planifiez votre stratégie de contenu Instagram avec des calendriers générés par l'IA",
      de: "Planen Sie Ihre Instagram-Inhaltsstrategie mit KI-generierten Zeitplänen",
      it: "Pianifica la tua strategia di contenuti Instagram con calendari generati dall'IA"
    }
  },
  {
    platform: "instagram",
    slug: "ad-copy-generator",
    names: {
      en: "Ad Copy Generator",
      es: "Generador de Textos para Anuncios",
      pt: "Gerador de Textos de Anúncios",
      fr: "Générateur de Textes Publicitaires",
      de: "Anzeigentexte-Generator",
      it: "Generatore di Testi Pubblicitari"
    },
    descriptions: {
      en: "Create compelling ad copy for Instagram Ads that converts viewers into customers",
      es: "Crea textos publicitarios persuasivos para Instagram Ads que convierten espectadores en clientes",
      pt: "Crie textos publicitários persuasivos para Instagram Ads que convertem espectadores em clientes",
      fr: "Créez des textes publicitaires convaincants pour Instagram Ads qui convertissent",
      de: "Erstellen Sie überzeugende Anzeigentexte für Instagram Ads",
      it: "Crea testi pubblicitari persuasivi per Instagram Ads"
    }
  },
  // Suno
  {
    platform: "suno",
    slug: "music-prompt-generator",
    names: {
      en: "Music Prompt Generator",
      es: "Generador de Prompts de Música",
      pt: "Gerador de Prompts de Música",
      fr: "Générateur de Prompts Musicaux",
      de: "Musik-Prompt-Generator",
      it: "Generatore di Prompt Musicali"
    },
    descriptions: {
      en: "Generate detailed music prompts to create unique songs with Suno AI",
      es: "Genera prompts detallados para crear canciones únicas con Suno AI",
      pt: "Gere prompts detalhados para criar músicas únicas com Suno AI",
      fr: "Générez des prompts détaillés pour créer des chansons uniques avec Suno AI",
      de: "Generieren Sie detaillierte Musik-Prompts, um einzigartige Songs mit Suno AI zu erstellen",
      it: "Genera prompt dettagliati per creare canzoni uniche con Suno AI"
    }
  },
  {
    platform: "suno",
    slug: "song-description-generator",
    names: {
      en: "Song Description Generator",
      es: "Generador de Descripciones de Canciones",
      pt: "Gerador de Descrições de Músicas",
      fr: "Générateur de Descriptions de Chansons",
      de: "Lied-Beschreibung-Generator",
      it: "Generatore di Descrizioni di Canzoni"
    },
    descriptions: {
      en: "Create compelling descriptions for your Suno AI-generated songs",
      es: "Crea descripciones atractivas para tus canciones generadas con Suno AI",
      pt: "Crie descrições atraentes para suas músicas geradas com Suno AI",
      fr: "Créez des descriptions attrayantes pour vos chansons générées par Suno AI",
      de: "Erstellen Sie überzeugende Beschreibungen für Ihre mit Suno AI generierten Songs",
      it: "Crea descrizioni accattivanti per le tue canzoni generate con Suno AI"
    }
  }
];

const LANGUAGES = ["en", "es", "pt", "fr", "de", "it"];

// Inputs y prompts genéricos
function getGenericInputs(lang) {
  const inputs = {
    en: [{ name: "topic", label: "Topic or Theme", type: "text", placeholder: "Enter your topic...", required: true }],
    es: [{ name: "topic", label: "Tema", type: "text", placeholder: "Ingresa tu tema...", required: true }],
    pt: [{ name: "topic", label: "Tema", type: "text", placeholder: "Digite seu tema...", required: true }],
    fr: [{ name: "topic", label: "Sujet", type: "text", placeholder: "Entrez votre sujet...", required: true }],
    de: [{ name: "topic", label: "Thema", type: "text", placeholder: "Geben Sie Ihr Thema ein...", required: true }],
    it: [{ name: "topic", label: "Argomento", type: "text", placeholder: "Inserisci il tuo argomento...", required: true }]
  };
  return inputs[lang] || inputs.en;
}

function getGenericPrompt(toolName, platform) {
  return `You are an expert ${platform} content creator. Generate high-quality ${toolName} content based on the user's input. Be creative, engaging, and optimized for the platform.`;
}

async function checkExists(platform, slug, language) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TOOLS_COLLECTION_ID,
      [
        Query.equal("platform", platform),
        Query.equal("slug", slug),
        Query.equal("language", language),
        Query.limit(1)
      ]
    );
    return response.documents.length > 0;
  } catch (error) {
    return false;
  }
}

async function uploadMissingTools() {
  console.log("\n" + "═".repeat(60));
  console.log("📤 SUBIENDO 11 TOOLS FALTANTES A APPWRITE");
  console.log("═".repeat(60) + "\n");

  const results = { created: 0, skipped: 0, errors: 0 };
  const createdTools = []; // Para guardar los IDs para redirects

  for (const tool of MISSING_TOOLS) {
    console.log(`\n📦 ${tool.platform}/${tool.slug}`);

    for (const lang of LANGUAGES) {
      const exists = await checkExists(tool.platform, tool.slug, lang);

      if (exists) {
        console.log(`   ⏭️  [${lang}] Ya existe`);
        results.skipped++;
        continue;
      }

      try {
        const docId = ID.unique();
        const document = {
          name: tool.names[lang],
          description: tool.descriptions[lang],
          platform: tool.platform,
          slug: tool.slug,
          language: lang,
          status: "approved",
          author_name: "KiviTools",
          author_id: "system",
          inputs: JSON.stringify(getGenericInputs(lang)),
          prompt_template: getGenericPrompt(tool.names.en, tool.platform)
        };

        await databases.createDocument(
          DATABASE_ID,
          TOOLS_COLLECTION_ID,
          docId,
          document
        );

        console.log(`   ✅ [${lang}] Creada (${docId})`);
        results.created++;

        // Guardar solo el ID de inglés para los redirects
        if (lang === "en") {
          createdTools.push({
            platform: tool.platform,
            slug: tool.slug,
            id: docId
          });
        }

      } catch (error) {
        console.log(`   ❌ [${lang}] Error: ${error.message}`);
        results.errors++;
      }
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log(`📊 Resumen:`);
  console.log(`   ✅ Creadas: ${results.created}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Errores: ${results.errors}`);
  console.log("═".repeat(60));

  // Generar código de redirects
  if (createdTools.length > 0) {
    console.log("\n\n📋 REDIRECTS PARA next.config.ts:\n");
    console.log("// Missing tools redirects (add to redirects array)");
    for (const tool of createdTools) {
      console.log(`{ source: "/${tool.platform}/${tool.slug}", destination: "/${tool.platform}/${tool.slug}-${tool.id}", permanent: true },`);
    }
  }

  return createdTools;
}

uploadMissingTools().catch(console.error);
