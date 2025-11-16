#!/usr/bin/env node

/**
 * Script para añadir metadata SEO a todas las páginas de herramientas
 * Ejecutar: node scripts/add-metadata-to-tools.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definición de herramientas por plataforma
const tools = {
  tiktok: [
    {
      slug: "script-writer",
      spanishSlug: "escritor-de-guiones",
      name: "Script Writer",
      description:
        "Create engaging TikTok scripts with AI. Generate viral video scripts in seconds.",
      keywords: ["tiktok script", "video script generator", "ai script writer"],
    },
    {
      slug: "video-ideas",
      spanishSlug: "ideas-de-videos",
      name: "Video Ideas Generator",
      description:
        "Get creative TikTok video ideas instantly. Generate trending content ideas with AI.",
      keywords: ["tiktok ideas", "video ideas", "content ideas"],
    },
    {
      slug: "hook-generator",
      spanishSlug: "generador-de-ganchos",
      name: "Hook Generator",
      description:
        "Create attention-grabbing TikTok hooks. Generate viral opening lines with AI.",
      keywords: ["tiktok hook", "video hook", "attention grabber"],
    },
    {
      slug: "hashtag-generator",
      spanishSlug: "generador-de-hashtags",
      name: "Hashtag Generator",
      description:
        "Generate trending TikTok hashtags. Boost your reach with AI-powered hashtag suggestions.",
      keywords: ["tiktok hashtags", "trending hashtags", "hashtag generator"],
    },
    {
      slug: "username-generator",
      spanishSlug: "generador-de-nombres",
      name: "Username Generator",
      description:
        "Create unique TikTok usernames. Generate catchy, available usernames with AI.",
      keywords: ["tiktok username", "username ideas", "username generator"],
    },
  ],
  instagram: [
    {
      slug: "bio-generator",
      spanishSlug: "generador-bio",
      name: "Bio Generator",
      description:
        "Create engaging Instagram bios with AI. Generate catchy bio text in seconds.",
      keywords: ["instagram bio", "bio generator", "profile bio"],
    },
    {
      slug: "caption-generator",
      spanishSlug: "generador-subtitulos",
      name: "Caption Generator",
      description:
        "Generate Instagram captions with AI. Create engaging post captions instantly.",
      keywords: ["instagram caption", "post caption", "caption ideas"],
    },
    {
      slug: "reel-script",
      spanishSlug: "guion-reel",
      name: "Reel Script Generator",
      description:
        "Create viral Instagram Reel scripts. Generate engaging video scripts with AI.",
      keywords: ["instagram reel", "reel script", "video script"],
    },
  ],
  twitter: [
    {
      slug: "bio-generator",
      spanishSlug: "generador-bio",
      name: "Bio Generator",
      description:
        "Create compelling Twitter bios with AI. Generate profile bios that stand out.",
      keywords: ["twitter bio", "profile bio", "bio generator"],
    },
    {
      slug: "tweet-generator",
      spanishSlug: "generador-tweets",
      name: "Tweet Generator",
      description:
        "Generate engaging tweets with AI. Create viral tweet content instantly.",
      keywords: ["twitter tweet", "tweet generator", "viral tweets"],
    },
    {
      slug: "thread-maker",
      spanishSlug: "creador-hilos",
      name: "Thread Maker",
      description:
        "Create Twitter threads with AI. Generate engaging thread content that gets retweeted.",
      keywords: ["twitter thread", "thread maker", "thread generator"],
    },
  ],
};

// Generar código de metadata
function generateMetadataCode(platform, tool) {
  return `import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = generateToolMetadata({
  platform: "${platform}",
  toolName: "${tool.name}",
  title: "${platform.charAt(0).toUpperCase() + platform.slice(1)} ${tool.name
    }",
  description: "${tool.description}",
  englishSlug: "${tool.slug}",
  spanishSlug: "${tool.spanishSlug}",
  keywords: ${JSON.stringify(tool.keywords)},
});

`;
}

// Añadir metadata a un archivo
function addMetadataToFile(filePath, platform, tool) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Si ya tiene metadata, skip
    if (content.includes("export const metadata")) {
      console.log(`⏭️  Skip: ${filePath} (ya tiene metadata)`);
      return false;
    }

    // Si ya tiene el import de generateToolMetadata, skip
    if (content.includes("generateToolMetadata")) {
      console.log(`⏭️  Skip: ${filePath} (ya configurado)`);
      return false;
    }

    // Generar código de metadata
    const metadataCode = generateMetadataCode(platform, tool);

    // Insertar después de los imports
    const lines = content.split("\n");
    let insertIndex = 0;

    // Encontrar el último import
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("import ") || lines[i].startsWith('import"')) {
        insertIndex = i + 1;
      }
    }

    // Si es "use client", insertar antes
    if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
      console.log(
        `⚠️  Warning: ${filePath} es client component, necesita metadata en route.ts o layout.ts padre`
      );
      return false;
    }

    // Insertar metadata
    lines.splice(insertIndex, 0, "", metadataCode);
    const newContent = lines.join("\n");

    // Escribir archivo
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`✅ Added metadata to: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Procesar todas las herramientas
function processAllTools() {
  console.log("🚀 Añadiendo metadata SEO a todas las páginas de herramientas...\n");

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const [platform, platformTools] of Object.entries(tools)) {
    console.log(`\n📱 Procesando ${platform}...`);

    for (const tool of platformTools) {
      const filePath = path.join(
        __dirname,
        "..",
        "app",
        "(tools)",
        platform,
        tool.slug,
        "page.tsx"
      );

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        skipped++;
        continue;
      }

      const result = addMetadataToFile(filePath, platform, tool);
      if (result === true) {
        processed++;
      } else if (result === false) {
        skipped++;
      } else {
        errors++;
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMEN");
  console.log("=".repeat(60));
  console.log(`✅ Procesados: ${processed}`);
  console.log(`⏭️  Saltados: ${skipped}`);
  console.log(`❌ Errores: ${errors}`);
  console.log("\n💡 Nota: Las páginas con 'use client' necesitan metadata en su layout padre");
}

// Ejecutar
processAllTools();
