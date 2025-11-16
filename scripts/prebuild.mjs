#!/usr/bin/env node
/**
 * Pre-build hook: Optimiza imágenes automáticamente antes del build
 * Se ejecuta con: npm run prebuild
 */
import { execSync } from "child_process";

console.log("\n🖼️  Optimizando imágenes antes del build...\n");

try {
    execSync("node scripts/optimize-images.mjs", {
        stdio: "inherit",
        cwd: process.cwd(),
    });
    console.log("\n✅ Imágenes optimizadas correctamente\n");
} catch (error) {
    console.error("\n⚠️  Error al optimizar imágenes:", error.message);
    console.log("⚠️  Continuando con el build...\n");
    // No fallar el build si hay error en optimización
    process.exit(0);
}
