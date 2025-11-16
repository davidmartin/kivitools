#!/usr/bin/env node
import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, extname } from "path";
import sharp from "sharp";
import { optimize } from "svgo";

// Colores para terminal
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
};

// Configuración de SVGO (optimización agresiva pero segura)
const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    cleanupIds: false, // No limpiar IDs (puede romper referencias)
                },
            },
        },
        "removeDimensions", // Quitar width/height si hay viewBox
        "removeComments",
        "removeEmptyAttrs",
        "removeEmptyContainers",
        "cleanupEnableBackground",
        "minifyStyles",
        "convertStyleToAttrs",
        {
            name: "removeViewBox",
            active: false, // Mantener viewBox para responsive
        },
    ],
};

// Estadísticas globales
const stats = {
    pngProcessed: 0,
    svgProcessed: 0,
    pngSaved: 0,
    svgSaved: 0,
    totalOriginal: 0,
    totalOptimized: 0,
};

/**
 * Optimiza archivos PNG usando sharp con compresión lossless
 */
async function optimizePNG(filePath) {
    try {
        const originalSize = (await stat(filePath)).size;
        const buffer = await readFile(filePath);

        // Usar sharp para compresión PNG lossless
        const optimized = await sharp(buffer)
            .png({
                compressionLevel: 9, // Máxima compresión (0-9)
                palette: true, // Intentar convertir a palette si es posible
                quality: 100, // Sin pérdida de calidad
                effort: 10, // Máximo esfuerzo de compresión (1-10)
            })
            .toBuffer();

        const optimizedSize = optimized.length;
        const savedBytes = originalSize - optimizedSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        // Solo escribir si hay ahorro significativo (>1%)
        if (savedBytes > originalSize * 0.01) {
            await writeFile(filePath, optimized);
            stats.pngSaved += savedBytes;
            console.log(
                `  ${colors.green}✓${colors.reset} ${filePath.replace(
                    process.cwd() + "/",
                    ""
                )}`
            );
            console.log(
                `    ${formatBytes(originalSize)} → ${formatBytes(
                    optimizedSize
                )} ${colors.cyan}(-${savedPercent}%)${colors.reset}`
            );
        } else {
            console.log(
                `  ${colors.yellow}○${colors.reset} ${filePath.replace(
                    process.cwd() + "/",
                    ""
                )} ${colors.yellow}(ya optimizado)${colors.reset}`
            );
        }

        stats.pngProcessed++;
        stats.totalOriginal += originalSize;
        stats.totalOptimized += optimizedSize;
    } catch (error) {
        console.error(`  ${colors.yellow}⚠${colors.reset} Error en ${filePath}:`, error.message);
    }
}

/**
 * Optimiza archivos SVG usando SVGO
 */
async function optimizeSVG(filePath) {
    try {
        const originalContent = await readFile(filePath, "utf-8");
        const originalSize = Buffer.byteLength(originalContent, "utf-8");

        const result = optimize(originalContent, {
            path: filePath,
            ...svgoConfig,
        });

        const optimizedContent = result.data;
        const optimizedSize = Buffer.byteLength(optimizedContent, "utf-8");
        const savedBytes = originalSize - optimizedSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        // Solo escribir si hay ahorro
        if (savedBytes > 0) {
            await writeFile(filePath, optimizedContent, "utf-8");
            stats.svgSaved += savedBytes;
            console.log(
                `  ${colors.green}✓${colors.reset} ${filePath.replace(
                    process.cwd() + "/",
                    ""
                )}`
            );
            console.log(
                `    ${formatBytes(originalSize)} → ${formatBytes(
                    optimizedSize
                )} ${colors.cyan}(-${savedPercent}%)${colors.reset}`
            );
        } else {
            console.log(
                `  ${colors.yellow}○${colors.reset} ${filePath.replace(
                    process.cwd() + "/",
                    ""
                )} ${colors.yellow}(ya optimizado)${colors.reset}`
            );
        }

        stats.svgProcessed++;
        stats.totalOriginal += originalSize;
        stats.totalOptimized += optimizedSize;
    } catch (error) {
        console.error(`  ${colors.yellow}⚠${colors.reset} Error en ${filePath}:`, error.message);
    }
}

/**
 * Formatea bytes a formato legible
 */
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * Escanea recursivamente un directorio y optimiza imágenes
 */
async function scanDirectory(dirPath) {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Recursión en subdirectorios
            await scanDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = extname(entry.name).toLowerCase();

            if (ext === ".png") {
                await optimizePNG(fullPath);
            } else if (ext === ".svg") {
                await optimizeSVG(fullPath);
            }
        }
    }
}

/**
 * Main
 */
async function main() {
    console.log(
        `\n${colors.bold}${colors.blue}🖼️  Optimizador de Imágenes${colors.reset}\n`
    );

    const publicDir = join(process.cwd(), "public");

    console.log(`📁 Escaneando: ${publicDir}\n`);

    const startTime = Date.now();
    await scanDirectory(publicDir);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Resumen final
    console.log(`\n${colors.bold}${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}📊 Resumen de Optimización${colors.reset}\n`);
    console.log(`  ${colors.cyan}PNG procesados:${colors.reset}  ${stats.pngProcessed} archivos`);
    console.log(`  ${colors.cyan}SVG procesados:${colors.reset}  ${stats.svgProcessed} archivos`);
    console.log(``);
    console.log(`  ${colors.cyan}Tamaño original:${colors.reset}   ${formatBytes(stats.totalOriginal)}`);
    console.log(`  ${colors.cyan}Tamaño optimizado:${colors.reset} ${formatBytes(stats.totalOptimized)}`);
    console.log(``);
    const totalSaved = stats.pngSaved + stats.svgSaved;
    const totalPercent = ((totalSaved / stats.totalOriginal) * 100).toFixed(1);
    console.log(
        `  ${colors.bold}${colors.green}✨ Ahorrado:${colors.reset}        ${colors.bold}${formatBytes(totalSaved)} (${totalPercent}%)${colors.reset}`
    );
    console.log(``);
    console.log(`  ⏱️  Tiempo: ${duration}s`);
    console.log(`${colors.bold}${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

main().catch(console.error);
