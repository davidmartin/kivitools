#!/usr/bin/env node
/**
 * Optimiza una sola imagen PNG o SVG
 * Uso: npm run optimize:single -- path/to/image.png
 */
import { readFile, writeFile, stat } from "fs/promises";
import { extname } from "path";
import sharp from "sharp";
import { optimize } from "svgo";

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
};

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function optimizePNG(filePath) {
    const originalSize = (await stat(filePath)).size;
    const buffer = await readFile(filePath);

    const optimized = await sharp(buffer)
        .png({
            compressionLevel: 9,
            palette: true,
            quality: 100,
            effort: 10,
        })
        .toBuffer();

    const optimizedSize = optimized.length;
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    if (savedBytes > 0) {
        await writeFile(filePath, optimized);
        console.log(`${colors.green}✓${colors.reset} Optimizado exitosamente`);
        console.log(
            `  ${formatBytes(originalSize)} → ${formatBytes(
                optimizedSize
            )} ${colors.cyan}(-${savedPercent}%)${colors.reset}`
        );
    } else {
        console.log(`${colors.yellow}○${colors.reset} Ya está optimizado`);
    }
}

async function optimizeSVG(filePath) {
    const originalContent = await readFile(filePath, "utf-8");
    const originalSize = Buffer.byteLength(originalContent, "utf-8");

    const result = optimize(originalContent, {
        path: filePath,
        multipass: true,
        plugins: [
            {
                name: "preset-default",
                params: {
                    overrides: {
                        cleanupIds: false,
                    },
                },
            },
            "removeDimensions",
            {
                name: "removeViewBox",
                active: false,
            },
        ],
    });

    const optimizedContent = result.data;
    const optimizedSize = Buffer.byteLength(optimizedContent, "utf-8");
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    if (savedBytes > 0) {
        await writeFile(filePath, optimizedContent, "utf-8");
        console.log(`${colors.green}✓${colors.reset} Optimizado exitosamente`);
        console.log(
            `  ${formatBytes(originalSize)} → ${formatBytes(
                optimizedSize
            )} ${colors.cyan}(-${savedPercent}%)${colors.reset}`
        );
    } else {
        console.log(`${colors.yellow}○${colors.reset} Ya está optimizado`);
    }
}

async function main() {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error(`${colors.red}Error:${colors.reset} Debes proporcionar una ruta de archivo`);
        console.log(`\nUso: npm run optimize:single -- path/to/image.png`);
        console.log(`\nEjemplos:`);
        console.log(`  npm run optimize:single -- public/logo.png`);
        console.log(`  npm run optimize:single -- public/platforms/tiktok.svg`);
        process.exit(1);
    }

    const ext = extname(filePath).toLowerCase();

    if (ext !== ".png" && ext !== ".svg") {
        console.error(
            `${colors.red}Error:${colors.reset} Solo se admiten archivos .png y .svg`
        );
        process.exit(1);
    }

    try {
        console.log(`\n${colors.bold}🖼️  Optimizando:${colors.reset} ${filePath}\n`);

        if (ext === ".png") {
            await optimizePNG(filePath);
        } else {
            await optimizeSVG(filePath);
        }

        console.log("");
    } catch (error) {
        console.error(`\n${colors.red}Error:${colors.reset}`, error.message);
        process.exit(1);
    }
}

main();
