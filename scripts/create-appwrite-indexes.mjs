#!/usr/bin/env node

/**
 * Script para crear los índices de la collection generation_logs
 * Ejecutar DESPUÉS de que los atributos estén listos en Appwrite
 */

import { Client, Databases } from "node-appwrite";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer .env.local manualmente
const envPath = join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};

envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        envVars[key] = value;
    }
});

const client = new Client();
client
    .setEndpoint(envVars.APPWRITE_ENDPOINT || "")
    .setProject(envVars.APPWRITE_PROJECT_ID || "")
    .setKey(envVars.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = envVars.APPWRITE_DATABASE_ID || "";
const COLLECTION_ID = envVars.APPWRITE_COLLECTION_ID || "";

async function createIndexes() {
    console.log("🔍 Creando índices para generation_logs...\n");

    try {
        // Índice por platform
        try {
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                "idx_platform",
                "key",
                ["platform"],
                ["ASC"]
            );
            console.log("  ✓ Índice: platform");
        } catch (e) {
            if (e.code === 409) {
                console.log("  ⚠️  Índice 'platform' ya existe");
            } else {
                throw e;
            }
        }

        // Índice por tool
        try {
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                "idx_tool",
                "key",
                ["tool"],
                ["ASC"]
            );
            console.log("  ✓ Índice: tool");
        } catch (e) {
            if (e.code === 409) {
                console.log("  ⚠️  Índice 'tool' ya existe");
            } else {
                throw e;
            }
        }

        // Índice por timestamp
        try {
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                "idx_timestamp",
                "key",
                ["timestamp"],
                ["DESC"]
            );
            console.log("  ✓ Índice: timestamp");
        } catch (e) {
            if (e.code === 409) {
                console.log("  ⚠️  Índice 'timestamp' ya existe");
            } else {
                throw e;
            }
        }

        // Índice compuesto: platform + tool
        try {
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                "idx_platform_tool",
                "key",
                ["platform", "tool"],
                ["ASC", "ASC"]
            );
            console.log("  ✓ Índice compuesto: platform + tool");
        } catch (e) {
            if (e.code === 409) {
                console.log("  ⚠️  Índice 'platform_tool' ya existe");
            } else {
                throw e;
            }
        }

        console.log("\n✅ ¡Índices creados con éxito!\n");

    } catch (error) {
        console.error("\n❌ Error al crear índices:", error.message);
        console.log("\n💡 Si el error es 'Attribute not available':");
        console.log("  - Ve a Appwrite Console → Database → generation_logs");
        console.log("  - Verifica que todos los atributos tengan estado 'available'");
        console.log("  - Espera unos minutos y vuelve a ejecutar este script\n");
        process.exit(1);
    }
}

createIndexes();
