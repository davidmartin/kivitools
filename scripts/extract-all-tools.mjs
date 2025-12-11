#!/usr/bin/env node

/**
 * Script para extraer TODAS las tools estáticas de las 28 plataformas
 * 
 * Output: scripts/data/all-tools.json
 * Estructura: {
 *   "platforms": {
 *     "tiktok": {
 *       "tools": [ { baseSlug, icon, name, description, href, inputs, promptTemplate } ]
 *     },
 *     ...
 *   }
 * }
 * 
 * Run: node scripts/extract-all-tools.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TOOLS_DIR = path.join(ROOT, "app/(tools)");
const OUTPUT_DIR = path.join(__dirname, "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "all-tools.json");

// Crear directorio de output si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extraer tools de una página de plataforma
 * Busca el array `const tools = [...]` en page.tsx
 * Parsea objetos con name: t(...), description: t(...), href: "...", icon: "..."
 */
function extractToolsFromPlatform(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Buscar el patrón: const tools = [ ... ];
    const toolsMatch = content.match(/const\s+tools\s*=\s*\[([\s\S]*?)\];/);

    if (!toolsMatch) {
      return null;
    }

    const toolsContent = toolsMatch[1];
    const toolObjects = [];

    // Dividir por objetos individuales (cada { ... })
    // Encontrar todos los objetos separados por comas
    const objMatches = toolsContent.match(/\{[^{}]*name:[^{}]*href:[^{}]*icon:[^{}]*\}/g);

    if (!objMatches) {
      return null;
    }

    for (const objStr of objMatches) {
      // Extraer href (siempre es un string "...")
      const hrefMatch = objStr.match(/href:\s*"([^"]+)"/);
      if (!hrefMatch) continue;

      const href = hrefMatch[1];

      // Extraer icon (siempre es un emoji "...")
      const iconMatch = objStr.match(/icon:\s*"([^"]+)"/);
      const icon = iconMatch ? iconMatch[1] : "🛠️";

      // Extraer baseSlug del href
      const parts = href.split("/");
      const baseSlug = parts[parts.length - 1];

      // Extraer name y description (puede ser t(...) o string)
      const nameMatch = objStr.match(/name:\s*(.+?),/);
      const descriptionMatch = objStr.match(/description:\s*(.+?),/);

      const name = nameMatch ? nameMatch[1].trim() : "";
      const description = descriptionMatch ? descriptionMatch[1].trim() : "";

      toolObjects.push({
        baseSlug,
        icon,
        name,
        description,
        href,
        inputs: null,
        promptTemplate: null,
      });
    }

    return toolObjects.length > 0 ? toolObjects : null;
  } catch (error) {
    console.error(`Error extrayendo tools de ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Obtener información de inputs y prompt de la página individual de la tool
 */
function extractToolDetails(platform, baseSlug) {
  const possiblePaths = [
    path.join(TOOLS_DIR, platform, baseSlug, "page.tsx"),
    path.join(TOOLS_DIR, platform, baseSlug.replace(/-/g, "_"), "page.tsx"),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");

        // Buscar inputs
        const inputsMatch = content.match(/const\s+inputs\s*=\s*\[([\s\S]*?)\];/);
        const inputs = inputsMatch ? parseInputsArray(inputsMatch[1]) : null;

        // Buscar promptTemplate
        const promptMatch = content.match(/const\s+promptTemplate\s*=\s*`([\s\S]*?)`;/);
        const promptTemplate = promptMatch ? promptMatch[1] : null;

        return { inputs, promptTemplate };
      } catch (error) {
        console.warn(`  ⚠️  No se pudo extraer detalles de ${filePath}`);
        return { inputs: null, promptTemplate: null };
      }
    }
  }

  return { inputs: null, promptTemplate: null };
}

/**
 * Parsear el array de inputs
 * Intenta convertir la sintaxis literal a objeto JS
 */
function parseInputsArray(inputsStr) {
  try {
    // Convertir a sintaxis JSON válida
    let jsonStr = inputsStr
      .replace(/(\w+):/g, '"$1":') // Convertir keys a strings
      .replace(/'/g, '"')            // Convertir comillas simples a dobles
      .replace(/,\s*\]/g, ']')       // Eliminar comas finales
      .replace(/,\s*\}/g, '}');      // Eliminar comas finales en objetos

    // Parsear como JSON
    const parsed = JSON.parse(`[${jsonStr}]`);
    return parsed;
  } catch (error) {
    console.warn(`  ⚠️  No se pudo parsear inputs array`);
    return null;
  }
}

/**
 * Main: Extraer tools de todas las plataformas
 */
function main() {
  console.log("🔍 Extrayendo tools estáticas de todas las plataformas...\n");

  const platforms = {};
  const platformDirs = fs.readdirSync(TOOLS_DIR).filter(name => {
    const fullPath = path.join(TOOLS_DIR, name);
    return fs.statSync(fullPath).isDirectory() && !name.startsWith("[");
  });

  console.log(`📂 Plataformas encontradas: ${platformDirs.length}`);
  console.log("-".repeat(60));

  let totalTools = 0;
  let processedPlatforms = 0;

  for (const platformDir of platformDirs) {
    const platformPath = path.join(TOOLS_DIR, platformDir);
    const pageFile = path.join(platformPath, "page.tsx");

    if (!fs.existsSync(pageFile)) {
      continue; // Saltar si no hay page.tsx
    }

    const tools = extractToolsFromPlatform(pageFile);

    if (tools && tools.length > 0) {
      console.log(`\n✅ ${platformDir}`);
      console.log(`   📊 Tools encontrados: ${tools.length}`);

      // Enriquecer cada tool con detalles
      const enrichedTools = tools.map(tool => {
        const { inputs, promptTemplate } = extractToolDetails(platformDir, tool.baseSlug);
        return {
          ...tool,
          inputs: inputs || [],
          promptTemplate: promptTemplate || "",
        };
      });

      platforms[platformDir] = {
        tools: enrichedTools,
      };

      totalTools += tools.length;
      processedPlatforms++;
    }
  }

  // Guardar a JSON
  const output = {
    extractedAt: new Date().toISOString(),
    totalPlatforms: processedPlatforms,
    totalTools,
    platforms,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log("\n" + "=".repeat(60));
  console.log(`📊 Resumen de Extracción:`);
  console.log(`   ✅ Plataformas procesadas: ${processedPlatforms}`);
  console.log(`   📦 Tools totales extraídas: ${totalTools}`);
  console.log(`   💾 Guardado en: ${OUTPUT_FILE}`);
  console.log("=".repeat(60));
  console.log(`\n✨ Extracción completada!\n`);
}

main();
