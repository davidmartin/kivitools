#!/usr/bin/env node

/**
 * Script para corregir tools sin labels en sus inputs
 * Añade labels y placeholders apropiados
 * 
 * Run: node scripts/fix-missing-labels.mjs
 */

import { Client, Databases, Query } from "node-appwrite";
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

const LANGUAGES = ["en", "es", "pt", "fr", "de", "it"];

// Labels y placeholders por idioma
const INPUT_TRANSLATIONS = {
  topic: {
    en: { label: "Topic", placeholder: "e.g., What topic do you want to create content about?" },
    es: { label: "Tema", placeholder: "ej., ¿Sobre qué tema quieres crear contenido?" },
    pt: { label: "Tema", placeholder: "ex., Sobre qual tema você quer criar conteúdo?" },
    fr: { label: "Sujet", placeholder: "ex., Sur quel sujet voulez-vous créer du contenu?" },
    de: { label: "Thema", placeholder: "z.B., Über welches Thema möchten Sie Inhalt erstellen?" },
    it: { label: "Argomento", placeholder: "es., Su quale argomento vuoi creare contenuti?" }
  },
  tone: {
    en: { 
      label: "Tone", 
      placeholder: "Select a tone",
      options: "Professional,Casual,Creative"
    },
    es: { 
      label: "Tono", 
      placeholder: "Selecciona un tono",
      options: "Profesional,Casual,Creativo"
    },
    pt: { 
      label: "Tom", 
      placeholder: "Selecione um tom",
      options: "Profissional,Casual,Criativo"
    },
    fr: { 
      label: "Ton", 
      placeholder: "Sélectionnez un ton",
      options: "Professionnel,Décontracté,Créatif"
    },
    de: { 
      label: "Ton", 
      placeholder: "Ton auswählen",
      options: "Professionell,Locker,Kreativ"
    },
    it: { 
      label: "Tono", 
      placeholder: "Seleziona un tono",
      options: "Professionale,Casual,Creativo"
    }
  }
};

// IDs de tools que necesitan corrección (de la auditoría)
const TOOLS_TO_FIX = [
  { platform: "content", slug: "blog-intro-generator" },
  { platform: "content", slug: "article-outline-generator" },
  { platform: "content", slug: "paragraph-rewriter" },
  { platform: "content", slug: "sentence-expander" },
  { platform: "seo", slug: "meta-title-generator" },
  { platform: "seo", slug: "keyword-cluster-generator" },
  { platform: "seo", slug: "faq-schema-generator" },
  { platform: "presentation", slug: "slide-content-generator" },
  { platform: "presentation", slug: "presentation-outline-generator" },
  { platform: "presentation", slug: "pitch-deck-generator" },
  { platform: "email", slug: "meeting-request-email" },
  { platform: "email", slug: "thank-you-email" },
  { platform: "email", slug: "apology-email" },
  { platform: "career", slug: "cover-letter-generator" },
  { platform: "career", slug: "resume-bullet-generator" },
  { platform: "career", slug: "resignation-letter-generator" },
  { platform: "youtube", slug: "video-intro-script" },
  { platform: "youtube", slug: "video-outro-script" },
  { platform: "youtube", slug: "youtube-shorts-script" },
  { platform: "ai-art", slug: "midjourney-prompt-generator" },
  { platform: "ai-art", slug: "stable-diffusion-prompt" },
  { platform: "ai-art", slug: "dall-e-prompt-generator" },
  { platform: "instagram", slug: "instagram-reel-script" },
  { platform: "instagram", slug: "carousel-content-generator" },
  { platform: "marketing", slug: "product-description-generator" },
  { platform: "marketing", slug: "landing-page-copy" },
  { platform: "marketing", slug: "testimonial-request-email" },
  { platform: "ai-art", slug: "chatgpt-prompt-generator" },
  { platform: "voice", slug: "podcast-intro-script" },
  { platform: "voice", slug: "podcast-episode-outline" }
];

function getFixedInputs(lang) {
  const topic = INPUT_TRANSLATIONS.topic[lang];
  const tone = INPUT_TRANSLATIONS.tone[lang];
  
  return [
    {
      name: "topic",
      label: topic.label,
      type: "text",
      placeholder: topic.placeholder,
      required: true
    },
    {
      name: "tone",
      label: tone.label,
      type: "select",
      placeholder: tone.placeholder,
      options: tone.options,
      required: false
    }
  ];
}

async function fixMissingLabels() {
  console.log("\n" + "═".repeat(60));
  console.log("🔧 CORRIGIENDO TOOLS SIN LABELS");
  console.log("═".repeat(60) + "\n");

  let fixed = 0;
  let errors = 0;

  for (const { platform, slug } of TOOLS_TO_FIX) {
    console.log(`\n📦 ${platform}/${slug}`);

    for (const lang of LANGUAGES) {
      try {
        // Buscar el documento
        const response = await databases.listDocuments(
          DATABASE_ID,
          TOOLS_COLLECTION_ID,
          [
            Query.equal("platform", platform),
            Query.equal("slug", slug),
            Query.equal("language", lang),
            Query.limit(1)
          ]
        );

        if (response.documents.length === 0) {
          console.log(`   ⏭️  [${lang}] No existe`);
          continue;
        }

        const doc = response.documents[0];
        const newInputs = getFixedInputs(lang);

        // Actualizar el documento
        await databases.updateDocument(
          DATABASE_ID,
          TOOLS_COLLECTION_ID,
          doc.$id,
          {
            inputs: JSON.stringify(newInputs)
          }
        );

        console.log(`   ✅ [${lang}] Corregido`);
        fixed++;
      } catch (error) {
        console.log(`   ❌ [${lang}] Error: ${error.message}`);
        errors++;
      }
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log(`🏁 COMPLETADO: ${fixed} corregidos, ${errors} errores`);
  console.log("═".repeat(60) + "\n");
}

fixMissingLabels().catch(console.error);
