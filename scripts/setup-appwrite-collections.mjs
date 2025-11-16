#!/usr/bin/env node

/**
 * Script para crear las collections necesarias en Appwrite
 * Este script se ejecuta una sola vez para configurar la base de datos
 * 
 * Uso: node scripts/setup-appwrite-collections.mjs
 */

import { Client, Databases, ID, Permission, Role } from "node-appwrite";
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

// Función de espera
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function setupCollections() {
    console.log("🚀 Configurando Appwrite Collections...\n");

    try {
        // 1. Crear Collection: generation_logs
        console.log("📝 Creando collection 'generation_logs'...");
        
        const collectionId = ID.unique();
        
        const collection = await databases.createCollection(
            DATABASE_ID,
            collectionId,
            "generation_logs",
            [
                Permission.read(Role.any()),
                Permission.create(Role.any()),
                Permission.update(Role.any()),
                Permission.delete(Role.any()),
            ]
        );

        console.log(`✅ Collection creada con ID: ${collectionId}\n`);

        // 2. Crear atributos de la collection
        console.log("📋 Creando atributos...\n");

        // platform (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "platform",
            50,
            true
        );
        console.log("  ✓ platform (string, 50)");

        // tool (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "tool",
            100,
            true
        );
        console.log("  ✓ tool (string, 100)");

        // requestData (string, required, large)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "requestData",
            10000,
            true
        );
        console.log("  ✓ requestData (string, 10000)");

        // responseData (string, required, very large)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "responseData",
            50000,
            true
        );
        console.log("  ✓ responseData (string, 50000)");

        // userId (string, optional)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "userId",
            100,
            false
        );
        console.log("  ✓ userId (string, 100, optional)");

        // userIp (string, optional)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "userIp",
            50,
            false
        );
        console.log("  ✓ userIp (string, 50, optional)");

        // language (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "language",
            10,
            true
        );
        console.log("  ✓ language (string, 10)");

        // timestamp (datetime, required)
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            collectionId,
            "timestamp",
            true
        );
        console.log("  ✓ timestamp (datetime)");

        // Esperar a que los atributos estén disponibles
        console.log("\n⏳ Esperando a que los atributos estén disponibles...");
        await sleep(5000); // 5 segundos

        // 3. Crear índices para búsquedas eficientes
        console.log("\n🔍 Creando índices...\n");

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_platform",
            "key",
            ["platform"],
            ["ASC"]
        );
        console.log("  ✓ Índice: platform");

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_tool",
            "key",
            ["tool"],
            ["ASC"]
        );
        console.log("  ✓ Índice: tool");

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_timestamp",
            "key",
            ["timestamp"],
            ["DESC"]
        );
        console.log("  ✓ Índice: timestamp");

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_platform_tool",
            "key",
            ["platform", "tool"],
            ["ASC", "ASC"]
        );
        console.log("  ✓ Índice compuesto: platform + tool");

        // 4. Mostrar resumen y actualizar .env.local
        console.log("\n" + "=".repeat(60));
        console.log("✅ ¡Configuración completada con éxito!");
        console.log("=".repeat(60));
        console.log("\n📊 Resumen:\n");
        console.log(`  Database ID:   ${DATABASE_ID}`);
        console.log(`  Collection ID: ${collectionId}`);
        console.log(`  Collection:    generation_logs`);
        console.log(`  Atributos:     8 campos`);
        console.log(`  Índices:       4 índices`);
        console.log("\n📝 IMPORTANTE:");
        console.log("  Actualiza tu .env.local con esta línea:\n");
        console.log(`  APPWRITE_COLLECTION_ID=${collectionId}\n`);
        console.log("=".repeat(60) + "\n");

    } catch (error) {
        console.error("\n❌ Error al configurar collections:", error.message);
        
        if (error.code === 409) {
            console.log("\n⚠️  La collection ya existe. Si quieres recrearla:");
            console.log("  1. Ve a Appwrite Console");
            console.log("  2. Elimina la collection 'generation_logs'");
            console.log("  3. Vuelve a ejecutar este script");
        }
        
        process.exit(1);
    }
}

// Ejecutar script
setupCollections();
