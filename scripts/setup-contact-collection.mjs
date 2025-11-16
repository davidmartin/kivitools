#!/usr/bin/env node

/**
 * Script para crear la collection de Contact Messages en Appwrite
 * 
 * Uso: node scripts/setup-contact-collection.mjs
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

async function setupContactCollection() {
    console.log("🚀 Configurando Contact Messages Collection...\n");

    try {
        // 1. Crear Collection: contact_messages
        console.log("📝 Creando collection 'contact_messages'...");

        const collectionId = "contact_messages";

        const collection = await databases.createCollection(
            DATABASE_ID,
            collectionId,
            "contact_messages",
            [
                Permission.create(Role.any()), // Cualquiera puede crear (enviar mensaje)
                Permission.read(Role.users()),  // Solo usuarios autenticados pueden leer
            ]
        );

        console.log(`✅ Collection creada con ID: ${collectionId}\n`);

        // 2. Crear atributos de la collection
        console.log("📋 Creando atributos...\n");

        // name (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "name",
            255,
            true
        );
        console.log("  ✓ name (string, 255, required)");
        await sleep(1000);

        // email (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "email",
            255,
            true
        );
        console.log("  ✓ email (string, 255, required)");
        await sleep(1000);

        // subject (string, optional)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "subject",
            500,
            false
        );
        console.log("  ✓ subject (string, 500, optional)");
        await sleep(1000);

        // message (string, required, large)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "message",
            10000,
            true
        );
        console.log("  ✓ message (string, 10000, required)");
        await sleep(1000);

        // language (string, optional)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "language",
            10,
            false
        );
        console.log("  ✓ language (string, 10, optional)");
        await sleep(1000);

        // userIp (string, optional)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "userIp",
            50,
            false
        );
        console.log("  ✓ userIp (string, 50, optional)");
        await sleep(1000);

        // status (string, optional) - "new", "read", "replied", "archived"
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "status",
            50,
            false,
            "new" // default value
        );
        console.log("  ✓ status (string, 50, optional, default: 'new')");
        await sleep(1000);

        // createdAt (string, required)
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            "createdAt",
            50,
            true
        );
        console.log("  ✓ createdAt (string, 50, required)");

        // Esperar a que los atributos estén disponibles
        console.log("\n⏳ Esperando a que los atributos estén disponibles...");
        await sleep(8000); // 8 segundos

        // 3. Crear índices para búsquedas eficientes
        console.log("\n🔍 Creando índices...\n");

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_email",
            "key",
            ["email"],
            ["ASC"]
        );
        console.log("  ✓ Índice: email");
        await sleep(2000);

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_status",
            "key",
            ["status"],
            ["ASC"]
        );
        console.log("  ✓ Índice: status");
        await sleep(2000);

        await databases.createIndex(
            DATABASE_ID,
            collectionId,
            "idx_createdAt",
            "key",
            ["createdAt"],
            ["DESC"]
        );
        console.log("  ✓ Índice: createdAt (descendente)");

        // 4. Mostrar resumen
        console.log("\n" + "=".repeat(60));
        console.log("✅ ¡Configuración completada con éxito!");
        console.log("=".repeat(60));
        console.log("\n📊 Resumen:\n");
        console.log(`  Database ID:   ${DATABASE_ID}`);
        console.log(`  Collection ID: ${collectionId}`);
        console.log(`  Collection:    contact_messages`);
        console.log(`  Atributos:     8 campos (name, email, subject, message, language, userIp, status, createdAt)`);
        console.log(`  Índices:       3 índices (email, status, createdAt)`);
        console.log("\n📝 IMPORTANTE:");
        console.log("  Actualiza tu .env.local con esta línea:\n");
        console.log(`  APPWRITE_CONTACT_COLLECTION_ID=${collectionId}\n`);
        console.log("\n📬 Permisos configurados:");
        console.log("  - Create: any (cualquier visitante puede enviar mensajes)");
        console.log("  - Read: users (solo tú puedes leer los mensajes)");
        console.log("\n💡 Para leer mensajes:");
        console.log("  1. Ve a Appwrite Console → Databases → contact_messages");
        console.log("  2. Verás todos los mensajes recibidos");
        console.log("  3. Puedes actualizar el 'status' manualmente (new → read → replied)");
        console.log("\n" + "=".repeat(60) + "\n");

    } catch (error) {
        console.error("\n❌ Error al configurar collection:", error.message);

        if (error.code === 409) {
            console.log("\n⚠️  La collection 'contact_messages' ya existe.");
            console.log("\n📝 Añade esta línea a tu .env.local:\n");
            console.log("  APPWRITE_CONTACT_COLLECTION_ID=contact_messages\n");
        } else {
            console.error("\nDetalles del error:", error);
        }

        process.exit(1);
    }
}

// Ejecutar script
setupContactCollection();
