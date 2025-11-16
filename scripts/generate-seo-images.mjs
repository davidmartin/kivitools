#!/usr/bin/env node

/**
 * Script para generar todas las imágenes SEO necesarias
 * Ejecutar: node scripts/generate-seo-images.mjs
 * 
 * Genera:
 * - OpenGraph images (1200x630) para cada plataforma
 * - Twitter Card images (1200x675)
 * - Favicons (16x16, 32x32, 180x180)
 * - PWA Icons (192x192, 512x512, maskable)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const LOGO_PATH = path.join(PUBLIC_DIR, "logo.png");
const LOGO_TITLE_PATH = path.join(PUBLIC_DIR, "logo-title.png");

// Colores por plataforma (marca de agua/fondo)
const platformColors = {
  tiktok: { bg: "#000000", accent: "#00f2ea" },
  instagram: { bg: "#E4405F", accent: "#ffffff" },
  twitter: { bg: "#1DA1F2", accent: "#ffffff" },
  snapchat: { bg: "#FFFC00", accent: "#000000" },
  youtube: { bg: "#FF0000", accent: "#ffffff" },
  reddit: { bg: "#FF4500", accent: "#ffffff" },
  discord: { bg: "#5865F2", accent: "#ffffff" },
  twitch: { bg: "#9146FF", accent: "#ffffff" },
};

// Nombres de plataformas
const platformNames = {
  tiktok: "TikTok",
  instagram: "Instagram",
  twitter: "Twitter",
  snapchat: "Snapchat",
  youtube: "YouTube",
  reddit: "Reddit",
  discord: "Discord",
  twitch: "Twitch",
};

/**
 * Crear imagen OpenGraph (1200x630)
 */
async function createOpenGraphImage(platform, outputPath) {
  const config = platformColors[platform];
  const name = platformNames[platform];

  try {
    // Crear SVG con fondo de color y logo
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${config.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${config.bg};stop-opacity:0.8" />
          </linearGradient>
        </defs>
        
        <!-- Fondo con gradiente -->
        <rect width="1200" height="630" fill="url(#grad)"/>
        
        <!-- Texto del título -->
        <text x="600" y="400" 
              font-family="Arial, sans-serif" 
              font-size="72" 
              font-weight="bold" 
              fill="${config.accent}" 
              text-anchor="middle">
          ${name} Tools
        </text>
        
        <text x="600" y="480" 
              font-family="Arial, sans-serif" 
              font-size="36" 
              fill="${config.accent}" 
              opacity="0.9"
              text-anchor="middle">
          Free AI-Powered Content Generator
        </text>
      </svg>
    `;

    // Cargar logo
    const logoBuffer = await sharp(LOGO_TITLE_PATH)
      .resize(600, 200, { fit: "inside" })
      .toBuffer();

    // Crear imagen final
    await sharp(Buffer.from(svg))
      .composite([
        {
          input: logoBuffer,
          top: 100,
          left: 300,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`✅ Created: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error creating ${outputPath}:`, error.message);
  }
}

/**
 * Crear imagen principal OpenGraph (sin plataforma específica)
 */
async function createMainOpenGraphImage(outputPath) {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#a3e635;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#84cc16;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#65a30d;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      
      <!-- Fondo con gradiente verde (brand color) -->
      <rect width="1200" height="630" fill="url(#mainGrad)"/>
      
      <!-- Texto -->
      <text x="600" y="420" 
            font-family="Arial, sans-serif" 
            font-size="48" 
            font-weight="bold" 
            fill="#ffffff" 
            text-anchor="middle">
        Free AI-Powered Social Media Tools
      </text>
      
      <text x="600" y="500" 
            font-family="Arial, sans-serif" 
            font-size="32" 
            fill="#ffffff" 
            opacity="0.95"
            text-anchor="middle">
        TikTok - Instagram - Twitter - YouTube and More
      </text>
    </svg>
  `;

  try {
    const logoBuffer = await sharp(LOGO_TITLE_PATH)
      .resize(700, 250, { fit: "inside" })
      .toBuffer();

    await sharp(Buffer.from(svg))
      .composite([
        {
          input: logoBuffer,
          top: 80,
          left: 250,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`✅ Created: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error creating ${outputPath}:`, error.message);
  }
}

/**
 * Crear favicons
 * Usa SOLO logo.png (sin texto) para que se vea bien en pestañas pequeñas
 */
async function createFavicons() {
  const sizes = [
    { size: 16, name: "favicon-16x16.png" },
    { size: 32, name: "favicon-32x32.png" },
    { size: 180, name: "apple-touch-icon.png" },
  ];

  for (const { size, name } of sizes) {
    try {
      await sharp(LOGO_PATH) // Usa logo.png sin texto
        .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(path.join(PUBLIC_DIR, name));

      console.log(`✅ Created: ${name}`);
    } catch (error) {
      console.error(`❌ Error creating ${name}:`, error.message);
    }
  }

  // Crear favicon.ico (multi-size)
  try {
    await sharp(LOGO_PATH)
      .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFormat("png")
      .toFile(path.join(PUBLIC_DIR, "favicon.ico"));

    console.log(`✅ Created: favicon.ico`);
  } catch (error) {
    console.error(`❌ Error creating favicon:`, error.message);
  }
}

/**
 * Crear iconos PWA
 * Usa logo.png (sin texto) con fondo verde
 */
async function createPWAIcons() {
  const icons = [
    { size: 192, name: "icon-192.png", maskable: false },
    { size: 512, name: "icon-512.png", maskable: false },
    { size: 192, name: "icon-maskable-192.png", maskable: true },
    { size: 512, name: "icon-maskable-512.png", maskable: true },
  ];

  for (const { size, name, maskable } of icons) {
    try {
      const padding = maskable ? Math.floor(size * 0.15) : 0; // 15% padding para maskable
      const logoSize = size - padding * 2;

      // Crear fondo verde con logo centrado (usa logo.png sin texto)
      const background = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 163, g: 230, b: 53, alpha: 1 },
        },
      })
        .png()
        .toBuffer();

      const logo = await sharp(LOGO_PATH) // Usa logo.png sin texto
        .resize(logoSize, logoSize, { fit: "contain", background: { r: 163, g: 230, b: 53, alpha: 0 } })
        .toBuffer();

      await sharp(background)
        .composite([
          {
            input: logo,
            top: padding,
            left: padding,
          },
        ])
        .png()
        .toFile(path.join(PUBLIC_DIR, name));

      console.log(`✅ Created: ${name}`);
    } catch (error) {
      console.error(`❌ Error creating ${name}:`, error.message);
    }
  }
}

/**
 * Crear todas las imágenes Twitter (mismo que OG pero 1200x675)
 */
async function createTwitterImages() {
  // Twitter principal
  const svg = `
    <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="twitterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#a3e635;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#65a30d;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#twitterGrad)"/>
      <text x="600" y="450" 
            font-family="Arial, sans-serif" 
            font-size="42" 
            font-weight="bold" 
            fill="#ffffff" 
            text-anchor="middle">
        Free AI Social Media Tools
      </text>
    </svg>
  `;

  try {
    const logoBuffer = await sharp(LOGO_TITLE_PATH)
      .resize(700, 250, { fit: "inside" })
      .toBuffer();

    await sharp(Buffer.from(svg))
      .composite([{ input: logoBuffer, top: 100, left: 250 }])
      .png()
      .toFile(path.join(PUBLIC_DIR, "twitter-image.png"));

    console.log(`✅ Created: twitter-image.png`);
  } catch (error) {
    console.error(`❌ Error creating twitter-image.png:`, error.message);
  }

  // Twitter por plataforma (copiar desde OG pero redimensionar)
  for (const platform of Object.keys(platformColors)) {
    try {
      await sharp(path.join(PUBLIC_DIR, `og-${platform}.png`))
        .resize(1200, 675, { fit: "cover" })
        .toFile(path.join(PUBLIC_DIR, `twitter-${platform}.png`));

      console.log(`✅ Created: twitter-${platform}.png`);
    } catch (error) {
      console.error(`❌ Error creating twitter-${platform}.png:`, error.message);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🎨 Generando imágenes SEO para KiviTools...\n");

  // Verificar que existen los logos
  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`❌ Error: No se encuentra ${LOGO_PATH}`);
    process.exit(1);
  }

  if (!fs.existsSync(LOGO_TITLE_PATH)) {
    console.error(`❌ Error: No se encuentra ${LOGO_TITLE_PATH}`);
    process.exit(1);
  }

  console.log("📸 1. Creando imagen OpenGraph principal...");
  await createMainOpenGraphImage(path.join(PUBLIC_DIR, "og-image.png"));

  console.log("\n📸 2. Creando imágenes OpenGraph por plataforma...");
  for (const platform of Object.keys(platformColors)) {
    await createOpenGraphImage(platform, path.join(PUBLIC_DIR, `og-${platform}.png`));
  }

  console.log("\n🐦 3. Creando imágenes Twitter...");
  await createTwitterImages();

  console.log("\n⭐ 4. Creando favicons...");
  await createFavicons();

  console.log("\n📱 5. Creando iconos PWA...");
  await createPWAIcons();

  console.log("\n" + "=".repeat(60));
  console.log("✅ ¡Todas las imágenes SEO generadas exitosamente!");
  console.log("=".repeat(60));
  console.log("\n📂 Archivos generados en /public/:");
  console.log("   - og-image.png (principal)");
  console.log("   - og-[platform].png (8 plataformas)");
  console.log("   - twitter-image.png");
  console.log("   - twitter-[platform].png (8 plataformas)");
  console.log("   - favicon-16x16.png, favicon-32x32.png");
  console.log("   - apple-touch-icon.png");
  console.log("   - icon-192.png, icon-512.png");
  console.log("   - icon-maskable-192.png, icon-maskable-512.png");
  console.log("\n💡 Próximo paso: Verifica las imágenes y ejecuta el script de metadata");
  console.log("   → node scripts/add-metadata-to-tools.mjs");
}

main().catch(console.error);
