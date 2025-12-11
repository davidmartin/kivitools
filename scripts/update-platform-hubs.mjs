#!/usr/bin/env node

/**
 * Script para actualizar TODAS las páginas hub de plataformas
 * Reemplaza los arrays hardcodeados por el componente AppwriteToolsList
 * 
 * Run: node scripts/update-platform-hubs.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TOOLS_DIR = path.join(ROOT, "app/(tools)");

// Colores de cada plataforma (gradientFrom, gradientTo)
const PLATFORM_COLORS = {
  tiktok: { from: "cyan-500", to: "fuchsia-500" },
  instagram: { from: "pink-500", to: "orange-500" },
  youtube: { from: "red-500", to: "red-600" },
  twitter: { from: "sky-400", to: "blue-500" },
  twitch: { from: "purple-500", to: "purple-600" },
  snapchat: { from: "yellow-400", to: "yellow-500" },
  reddit: { from: "orange-500", to: "orange-600" },
  discord: { from: "indigo-500", to: "purple-500" },
  linkedin: { from: "blue-600", to: "blue-700" },
  pinterest: { from: "red-500", to: "red-600" },
  telegram: { from: "sky-500", to: "blue-500" },
  suno: { from: "violet-500", to: "purple-600" },
  elevenlabs: { from: "emerald-500", to: "teal-500" },
  amazon: { from: "orange-400", to: "yellow-500" },
  etsy: { from: "orange-500", to: "orange-600" },
  onlyfans: { from: "sky-400", to: "blue-500" },
  patreon: { from: "orange-500", to: "red-500" },
  medium: { from: "gray-700", to: "gray-900" },
  bluesky: { from: "sky-400", to: "blue-500" },
  bereal: { from: "gray-800", to: "gray-900" },
  kick: { from: "green-400", to: "green-500" },
  forocoches: { from: "blue-600", to: "blue-800" },
  threads: { from: "gray-800", to: "gray-900" },
  facebook: { from: "blue-500", to: "blue-600" },
};

// Plataformas que ya fueron migradas a Appwrite
const MIGRATED_PLATFORMS = [
  "amazon", "bereal", "bluesky", "discord", "elevenlabs", "etsy",
  "forocoches", "instagram", "kick", "linkedin", "medium", "onlyfans",
  "patreon", "pinterest", "reddit", "snapchat", "suno", "telegram",
  "tiktok", "twitch", "twitter", "youtube"
];

/**
 * Actualizar una página hub de plataforma
 */
function updatePlatformHub(platform) {
  const pageFile = path.join(TOOLS_DIR, platform, "page.tsx");

  if (!fs.existsSync(pageFile)) {
    console.log(`   ⚠️  No existe: ${pageFile}`);
    return false;
  }

  const content = fs.readFileSync(pageFile, "utf-8");

  // Verificar si ya está actualizada
  if (content.includes("AppwriteToolsList")) {
    console.log(`   ✅ Ya actualizada: ${platform}`);
    return true;
  }

  // Verificar si tiene el patrón de tools hardcodeadas
  if (!content.includes("const tools = [")) {
    console.log(`   ⚠️  No tiene tools hardcodeadas: ${platform}`);
    return false;
  }

  const colors = PLATFORM_COLORS[platform] || { from: "purple-500", to: "pink-500" };

  // Reemplazar imports
  let newContent = content;

  // Añadir import de AppwriteToolsList si no existe
  if (!newContent.includes("AppwriteToolsList")) {
    // Encontrar la línea de imports y añadir
    const importMatch = newContent.match(/import CustomToolsList from .*?;/);
    if (importMatch) {
      newContent = newContent.replace(
        importMatch[0],
        `${importMatch[0]}\nimport AppwriteToolsList from "@/app/components/appwrite-tools-list";`
      );
    }
  }

  // Eliminar import de Link si ya no se usa
  if (!newContent.includes("<Link") || newContent.match(/<Link.*?href=\{tool\.href\}/)) {
    newContent = newContent.replace(/import Link from "next\/link";\n?/, "");
  }

  // Eliminar import de Card si ya no se usa directamente
  if (newContent.includes("AppwriteToolsList") && !newContent.match(/<Card[\s>]/)) {
    newContent = newContent.replace(/import \{ Card \} from "@heroui\/react";\n?/, "");
  }

  // Eliminar el array de tools hardcodeado
  newContent = newContent.replace(
    /const tools = \[\s*\{[\s\S]*?\}\s*,?\s*\];\s*/,
    ""
  );

  // Reemplazar el grid de tools por AppwriteToolsList
  // Buscar el patrón: {/* Tools Grid */} ... </div> (que contiene tools.map)
  const toolsGridPattern = /\{\/\*\s*Tools Grid[^*]*\*\/\}\s*<div[^>]*>\s*\{tools\.map[\s\S]*?\}\s*<\/div>/;

  if (toolsGridPattern.test(newContent)) {
    newContent = newContent.replace(
      toolsGridPattern,
      `{/* Tools Grid - From Appwrite */}
        <AppwriteToolsList 
          platform="${platform}" 
          gradientFrom="${colors.from}" 
          gradientTo="${colors.to}" 
        />`
    );
  }

  // Guardar
  fs.writeFileSync(pageFile, newContent);
  console.log(`   ✅ Actualizada: ${platform}`);
  return true;
}

// Main
console.log("\n" + "═".repeat(60));
console.log("🔄 ACTUALIZANDO PÁGINAS HUB DE PLATAFORMAS");
console.log("═".repeat(60));

let updated = 0;
let skipped = 0;

for (const platform of MIGRATED_PLATFORMS) {
  console.log(`\n📱 ${platform}`);
  const success = updatePlatformHub(platform);
  if (success) {
    updated++;
  } else {
    skipped++;
  }
}

console.log("\n" + "═".repeat(60));
console.log(`📊 Resumen:`);
console.log(`   ✅ Actualizadas: ${updated}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log("═".repeat(60) + "\n");
