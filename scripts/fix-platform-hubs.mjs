#!/usr/bin/env node

/**
 * Script para limpiar el código residual de las páginas hub
 * y regenerarlas correctamente
 * 
 * Run: node scripts/fix-platform-hubs.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TOOLS_DIR = path.join(ROOT, "app/(tools)");

// Configuración de plataformas
const PLATFORMS = {
  amazon: { from: "orange-400", to: "yellow-500", bg1: "orange-500", bg2: "yellow-500" },
  bereal: { from: "gray-800", to: "gray-900", bg1: "gray-500", bg2: "black" },
  bluesky: { from: "sky-400", to: "blue-500", bg1: "sky-400", bg2: "blue-500" },
  discord: { from: "indigo-500", to: "purple-500", bg1: "indigo-500", bg2: "purple-500" },
  elevenlabs: { from: "emerald-500", to: "teal-500", bg1: "emerald-500", bg2: "teal-500" },
  etsy: { from: "orange-500", to: "orange-600", bg1: "orange-500", bg2: "orange-600" },
  forocoches: { from: "blue-600", to: "blue-800", bg1: "blue-600", bg2: "blue-800" },
  instagram: { from: "pink-500", to: "orange-500", bg1: "pink-500", bg2: "orange-500" },
  kick: { from: "green-400", to: "green-500", bg1: "green-400", bg2: "green-500" },
  linkedin: { from: "blue-600", to: "blue-700", bg1: "blue-600", bg2: "blue-700" },
  medium: { from: "gray-700", to: "gray-900", bg1: "gray-500", bg2: "gray-700" },
  onlyfans: { from: "sky-400", to: "blue-500", bg1: "sky-400", bg2: "blue-500" },
  patreon: { from: "orange-500", to: "red-500", bg1: "orange-500", bg2: "red-500" },
  pinterest: { from: "red-500", to: "red-600", bg1: "red-500", bg2: "red-600" },
  reddit: { from: "orange-500", to: "orange-600", bg1: "orange-500", bg2: "orange-600" },
  snapchat: { from: "yellow-400", to: "yellow-500", bg1: "yellow-400", bg2: "yellow-500" },
  suno: { from: "violet-500", to: "purple-600", bg1: "purple-500", bg2: "blue-500" },
  telegram: { from: "sky-500", to: "blue-500", bg1: "sky-400", bg2: "blue-500" },
  tiktok: { from: "cyan-500", to: "fuchsia-500", bg1: "cyan-500", bg2: "fuchsia-500" },
  twitch: { from: "purple-500", to: "purple-600", bg1: "purple-500", bg2: "purple-600" },
  twitter: { from: "sky-400", to: "blue-500", bg1: "sky-400", bg2: "blue-500" },
  youtube: { from: "red-500", to: "red-600", bg1: "red-500", bg2: "red-600" },
};

function generatePlatformPage(platform) {
  const config = PLATFORMS[platform];
  const platformCapitalized = platform.charAt(0).toUpperCase() + platform.slice(1);

  return `"use client";

import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomToolsList from "@/app/components/custom-tools-list";
import AppwriteToolsList from "@/app/components/appwrite-tools-list";

export default function ${platformCapitalized}ToolsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-${config.bg1}/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-${config.bg2}/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-${config.from} to-${config.to} blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <PlatformLogo platform="${platform}" size="xl" className="relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.${platform}")} <span className="text-transparent bg-clip-text bg-linear-to-r from-${config.from} to-${config.to}">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("${platform}.page.description")}
          </p>
        </div>

        {/* Tools Grid - From Appwrite */}
        <AppwriteToolsList 
          platform="${platform}" 
          gradientFrom="${config.from}" 
          gradientTo="${config.to}" 
        />

        {/* Custom User Tools */}
        <CustomToolsList platform="${platform}" />
      </div>
    </div>
  );
}
`;
}

// Main
console.log("\n" + "═".repeat(60));
console.log("🔧 REGENERANDO PÁGINAS HUB DE PLATAFORMAS");
console.log("═".repeat(60));

let fixed = 0;

for (const platform of Object.keys(PLATFORMS)) {
  const pageFile = path.join(TOOLS_DIR, platform, "page.tsx");

  if (!fs.existsSync(pageFile)) {
    console.log(`   ⚠️  No existe: ${platform}`);
    continue;
  }

  const newContent = generatePlatformPage(platform);
  fs.writeFileSync(pageFile, newContent);
  console.log(`   ✅ Regenerada: ${platform}`);
  fixed++;
}

console.log("\n" + "═".repeat(60));
console.log(`📊 Resumen: ${fixed} páginas regeneradas`);
console.log("═".repeat(60) + "\n");
